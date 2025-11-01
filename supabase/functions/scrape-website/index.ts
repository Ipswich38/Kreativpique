import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ScrapeRequest {
  jobId: string
  url: string
  options?: {
    maxDepth?: number
    followLinks?: boolean
    delayBetweenRequests?: number
    maxPages?: number
    includeImages?: boolean
    includeExternalLinks?: boolean
  }
}

interface ScrapeResult {
  url: string
  title: string
  headings: string[]
  content: string
  links: string[]
  images: string[]
  metadata: {
    description?: string
    keywords?: string
    author?: string
    publishDate?: string
    wordCount: number
    language?: string
  }
  timestamp: string
  duration: number
}

async function scrapeUrl(url: string, options: any = {}): Promise<ScrapeResult> {
  const startTime = Date.now()

  try {
    // Validate URL
    const urlObj = new URL(url)
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      throw new Error('Only HTTP and HTTPS URLs are supported')
    }

    // Fetch the page
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'kreativpique-bot/1.0 (+https://kreativpique.com/bot)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
      },
      signal: AbortSignal.timeout(30000)
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const html = await response.text()

    // Simple HTML parsing without external dependencies
    const result: ScrapeResult = {
      url,
      title: extractTitle(html),
      headings: extractHeadings(html),
      content: extractContent(html),
      links: extractLinks(html, url, options.includeExternalLinks || false),
      images: options.includeImages ? extractImages(html, url) : [],
      metadata: extractMetadata(html),
      timestamp: new Date().toISOString(),
      duration: Date.now() - startTime
    }

    return result
  } catch (error) {
    throw new Error(`Failed to scrape ${url}: ${error.message}`)
  }
}

function extractTitle(html: string): string {
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i)
  return titleMatch ? titleMatch[1].trim() : 'No title found'
}

function extractHeadings(html: string): string[] {
  const headings: string[] = []
  const headingRegex = /<h[1-6][^>]*>([^<]*)<\/h[1-6]>/gi
  let match

  while ((match = headingRegex.exec(html)) !== null) {
    const text = match[1].replace(/<[^>]*>/g, '').trim()
    if (text) {
      headings.push(text)
    }
  }

  return headings
}

function extractContent(html: string): string {
  // Remove script, style, nav, header, footer elements
  let content = html.replace(/<(script|style|nav|header|footer|aside)[^>]*>[\s\S]*?<\/\1>/gi, '')

  // Remove all HTML tags
  content = content.replace(/<[^>]*>/g, ' ')

  // Clean up whitespace
  content = content.replace(/\s+/g, ' ').trim()

  return content || 'No content found'
}

function extractLinks(html: string, baseUrl: string, includeExternal: boolean): string[] {
  const links: string[] = []
  const linkRegex = /<a[^>]+href\s*=\s*["']([^"']+)["'][^>]*>/gi
  const baseUrlObj = new URL(baseUrl)
  let match

  while ((match = linkRegex.exec(html)) !== null) {
    try {
      const linkUrl = new URL(match[1], baseUrl)

      if (includeExternal || linkUrl.hostname === baseUrlObj.hostname) {
        links.push(linkUrl.href)
      }
    } catch {
      // Skip invalid URLs
    }
  }

  return [...new Set(links)]
}

function extractImages(html: string, baseUrl: string): string[] {
  const images: string[] = []
  const imgRegex = /<img[^>]+src\s*=\s*["']([^"']+)["'][^>]*>/gi
  let match

  while ((match = imgRegex.exec(html)) !== null) {
    try {
      const imageUrl = new URL(match[1], baseUrl)
      images.push(imageUrl.href)
    } catch {
      // Skip invalid URLs
    }
  }

  return [...new Set(images)]
}

function extractMetadata(html: string) {
  const metadata: any = { wordCount: 0 }

  // Meta description
  const descMatch = html.match(/<meta[^>]+name\s*=\s*["']description["'][^>]+content\s*=\s*["']([^"']*)["']/i) ||
                   html.match(/<meta[^>]+property\s*=\s*["']og:description["'][^>]+content\s*=\s*["']([^"']*)["']/i)
  if (descMatch) metadata.description = descMatch[1]

  // Meta keywords
  const keywordsMatch = html.match(/<meta[^>]+name\s*=\s*["']keywords["'][^>]+content\s*=\s*["']([^"']*)["']/i)
  if (keywordsMatch) metadata.keywords = keywordsMatch[1]

  // Author
  const authorMatch = html.match(/<meta[^>]+name\s*=\s*["']author["'][^>]+content\s*=\s*["']([^"']*)["']/i)
  if (authorMatch) metadata.author = authorMatch[1]

  // Language
  const langMatch = html.match(/<html[^>]+lang\s*=\s*["']([^"']*)["']/i)
  if (langMatch) metadata.language = langMatch[1]

  // Word count
  const textContent = extractContent(html)
  metadata.wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length

  return metadata
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    if (req.method === 'POST') {
      const scrapeRequest: ScrapeRequest = await req.json()
      const { jobId, url, options = {} } = scrapeRequest

      console.log(`Starting scrape job ${jobId} for URL: ${url}`)

      // Update job status to running
      await supabase
        .from('scrape_jobs')
        .update({
          status: 'running',
          last_run: new Date().toISOString()
        })
        .eq('id', jobId)

      try {
        // Scrape the URL
        const result = await scrapeUrl(url, options)

        // If followLinks is enabled and maxPages > 1, scrape additional pages
        const results = [result]

        if (options.followLinks && options.maxPages > 1) {
          const additionalUrls = result.links.slice(0, options.maxPages - 1)

          for (const linkUrl of additionalUrls) {
            try {
              // Add delay between requests
              if (options.delayBetweenRequests) {
                await new Promise(resolve => setTimeout(resolve, options.delayBetweenRequests))
              }

              const linkResult = await scrapeUrl(linkUrl, { ...options, followLinks: false })
              results.push(linkResult)
            } catch (error) {
              console.error(`Failed to scrape linked URL ${linkUrl}:`, error.message)
            }
          }
        }

        // Update job with results
        const { error: updateError } = await supabase
          .from('scrape_jobs')
          .update({
            status: 'completed',
            pages_scraped: results.length,
            duration_seconds: Math.round(result.duration / 1000),
            result_data: {
              results,
              summary: {
                total_pages: results.length,
                total_words: results.reduce((sum, r) => sum + r.metadata.wordCount, 0),
                total_links: results.reduce((sum, r) => sum + r.links.length, 0),
                total_images: results.reduce((sum, r) => sum + r.images.length, 0)
              }
            }
          })
          .eq('id', jobId)

        if (updateError) {
          throw new Error(`Failed to update job: ${updateError.message}`)
        }

        console.log(`✅ Completed scrape job ${jobId} - scraped ${results.length} pages`)

        return new Response(
          JSON.stringify({
            success: true,
            jobId,
            results: results.length,
            summary: {
              total_pages: results.length,
              total_words: results.reduce((sum, r) => sum + r.metadata.wordCount, 0),
              duration: result.duration
            }
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        )

      } catch (scrapeError) {
        // Update job with error
        await supabase
          .from('scrape_jobs')
          .update({
            status: 'failed',
            error_message: scrapeError.message,
            duration_seconds: 0
          })
          .eq('id', jobId)

        throw scrapeError
      }
    }

    // GET request - get pending scrape jobs and process them
    if (req.method === 'GET') {
      const { data: pendingJobs, error: jobsError } = await supabase
        .from('scrape_jobs')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: true })
        .limit(5)

      if (jobsError) {
        throw new Error(`Failed to fetch pending jobs: ${jobsError.message}`)
      }

      const processedJobs = []

      for (const job of pendingJobs || []) {
        try {
          console.log(`Processing pending job ${job.id} for URL: ${job.url}`)

          // Update status to running
          await supabase
            .from('scrape_jobs')
            .update({
              status: 'running',
              last_run: new Date().toISOString()
            })
            .eq('id', job.id)

          // Scrape the URL
          const result = await scrapeUrl(job.url, {
            includeImages: true,
            includeExternalLinks: false,
            maxPages: 1
          })

          // Update with results
          await supabase
            .from('scrape_jobs')
            .update({
              status: 'completed',
              pages_scraped: 1,
              duration_seconds: Math.round(result.duration / 1000),
              result_data: {
                results: [result],
                summary: {
                  total_pages: 1,
                  total_words: result.metadata.wordCount,
                  total_links: result.links.length,
                  total_images: result.images.length
                }
              }
            })
            .eq('id', job.id)

          processedJobs.push({
            jobId: job.id,
            url: job.url,
            status: 'completed',
            duration: result.duration
          })

        } catch (error) {
          console.error(`Failed to process job ${job.id}:`, error.message)

          await supabase
            .from('scrape_jobs')
            .update({
              status: 'failed',
              error_message: error.message
            })
            .eq('id', job.id)

          processedJobs.push({
            jobId: job.id,
            url: job.url,
            status: 'failed',
            error: error.message
          })
        }

        // Add delay between jobs
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: `Processed ${processedJobs.length} pending scrape jobs`,
          jobs: processedJobs
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 405,
      }
    )

  } catch (error) {
    console.error('Scraping error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})