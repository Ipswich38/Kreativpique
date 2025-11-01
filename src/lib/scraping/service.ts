import axios from 'axios'
import * as cheerio from 'cheerio'
import { supabase } from '../supabase'
import type { Tables, TablesInsert, TablesUpdate } from '../database.types'

export type ScrapeJob = Tables<'scrape_jobs'>
export type ScrapeJobInsert = TablesInsert<'scrape_jobs'>
export type ScrapeJobUpdate = TablesUpdate<'scrape_jobs'>

export interface ScrapeResult {
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

export interface ScrapeOptions {
  maxDepth?: number
  followLinks?: boolean
  respectRobotsTxt?: boolean
  delayBetweenRequests?: number
  userAgent?: string
  timeout?: number
  maxPages?: number
  includeImages?: boolean
  includeExternalLinks?: boolean
  selectors?: {
    title?: string
    content?: string
    headings?: string
    links?: string
    images?: string
  }
}

export class ScrapingService {
  private readonly defaultOptions: Required<ScrapeOptions> = {
    maxDepth: 1,
    followLinks: false,
    respectRobotsTxt: true,
    delayBetweenRequests: 1000,
    userAgent: 'kreativpique-bot/1.0 (+https://kreativpique.com/bot)',
    timeout: 30000,
    maxPages: 10,
    includeImages: true,
    includeExternalLinks: false,
    selectors: {
      title: 'title, h1',
      content: 'main, article, .content, #content, .post, .entry',
      headings: 'h1, h2, h3, h4, h5, h6',
      links: 'a[href]',
      images: 'img[src]'
    }
  }

  async scrapeUrl(
    url: string,
    options: ScrapeOptions = {}
  ): Promise<ScrapeResult> {
    const startTime = Date.now()
    const opts = { ...this.defaultOptions, ...options }

    try {
      // Validate URL
      const urlObj = new URL(url)
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        throw new Error('Only HTTP and HTTPS URLs are supported')
      }

      // Check robots.txt if enabled
      if (opts.respectRobotsTxt) {
        const canScrape = await this.checkRobotsTxt(url, opts.userAgent)
        if (!canScrape) {
          throw new Error('Scraping not allowed by robots.txt')
        }
      }

      // Fetch the page
      const response = await axios.get(url, {
        timeout: opts.timeout,
        headers: {
          'User-Agent': opts.userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1'
        },
        maxRedirects: 5
      })

      if (response.status !== 200) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      // Parse HTML
      const $ = cheerio.load(response.data)

      // Extract data
      const result: ScrapeResult = {
        url,
        title: this.extractTitle($, opts.selectors.title),
        headings: this.extractHeadings($, opts.selectors.headings),
        content: this.extractContent($, opts.selectors.content),
        links: this.extractLinks($, opts.selectors.links, url, opts.includeExternalLinks),
        images: opts.includeImages ? this.extractImages($, opts.selectors.images, url) : [],
        metadata: this.extractMetadata($),
        timestamp: new Date().toISOString(),
        duration: Date.now() - startTime
      }

      return result
    } catch (error) {
      throw new Error(`Failed to scrape ${url}: ${error.message}`)
    }
  }

  async scrapeMultipleUrls(
    urls: string[],
    options: ScrapeOptions = {}
  ): Promise<ScrapeResult[]> {
    const opts = { ...this.defaultOptions, ...options }
    const results: ScrapeResult[] = []

    for (const url of urls.slice(0, opts.maxPages)) {
      try {
        const result = await this.scrapeUrl(url, options)
        results.push(result)

        // Respect delay between requests
        if (opts.delayBetweenRequests > 0) {
          await new Promise(resolve => setTimeout(resolve, opts.delayBetweenRequests))
        }
      } catch (error) {
        console.error(`Failed to scrape ${url}:`, error.message)
        // Continue with next URL instead of failing completely
      }
    }

    return results
  }

  private extractTitle($: cheerio.CheerioAPI, selector: string): string {
    const title = $(selector).first().text().trim()
    return title || $('title').text().trim() || 'No title found'
  }

  private extractHeadings($: cheerio.CheerioAPI, selector: string): string[] {
    const headings: string[] = []
    $(selector).each((_, element) => {
      const text = $(element).text().trim()
      if (text) {
        headings.push(text)
      }
    })
    return headings
  }

  private extractContent($: cheerio.CheerioAPI, selector: string): string {
    // Try specific content selectors first
    let content = $(selector).first().text().trim()

    // Fallback to body content if specific selectors fail
    if (!content) {
      // Remove script and style elements
      $('script, style, nav, header, footer, aside').remove()
      content = $('body').text().trim()
    }

    // Clean up whitespace
    content = content.replace(/\s+/g, ' ').trim()

    return content || 'No content found'
  }

  private extractLinks(
    $: cheerio.CheerioAPI,
    selector: string,
    baseUrl: string,
    includeExternal: boolean
  ): string[] {
    const links: string[] = []
    const baseUrlObj = new URL(baseUrl)

    $(selector).each((_, element) => {
      const href = $(element).attr('href')
      if (href) {
        try {
          const linkUrl = new URL(href, baseUrl)

          // Filter internal/external links based on option
          if (includeExternal || linkUrl.hostname === baseUrlObj.hostname) {
            links.push(linkUrl.href)
          }
        } catch {
          // Skip invalid URLs
        }
      }
    })

    // Remove duplicates
    return [...new Set(links)]
  }

  private extractImages(
    $: cheerio.CheerioAPI,
    selector: string,
    baseUrl: string
  ): string[] {
    const images: string[] = []

    $(selector).each((_, element) => {
      const src = $(element).attr('src')
      if (src) {
        try {
          const imageUrl = new URL(src, baseUrl)
          images.push(imageUrl.href)
        } catch {
          // Skip invalid URLs
        }
      }
    })

    return [...new Set(images)]
  }

  private extractMetadata($: cheerio.CheerioAPI) {
    const metadata: ScrapeResult['metadata'] = {
      wordCount: 0
    }

    // Meta description
    metadata.description = $('meta[name="description"]').attr('content') ||
                          $('meta[property="og:description"]').attr('content')

    // Meta keywords
    metadata.keywords = $('meta[name="keywords"]').attr('content')

    // Author
    metadata.author = $('meta[name="author"]').attr('content') ||
                     $('meta[property="article:author"]').attr('content')

    // Publish date
    metadata.publishDate = $('meta[property="article:published_time"]').attr('content') ||
                          $('meta[name="date"]').attr('content') ||
                          $('time[datetime]').attr('datetime')

    // Language
    metadata.language = $('html').attr('lang') || $('meta[http-equiv="content-language"]').attr('content')

    // Word count
    const textContent = $('body').text()
    metadata.wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length

    return metadata
  }

  private async checkRobotsTxt(url: string, userAgent: string): Promise<boolean> {
    try {
      const urlObj = new URL(url)
      const robotsTxtUrl = `${urlObj.protocol}//${urlObj.hostname}/robots.txt`

      const response = await axios.get(robotsTxtUrl, {
        timeout: 5000,
        headers: { 'User-Agent': userAgent }
      })

      const robotsTxt = response.data
      const lines = robotsTxt.split('\n')

      let currentUserAgent = ''
      let isRelevantSection = false

      for (const line of lines) {
        const trimmedLine = line.trim().toLowerCase()

        if (trimmedLine.startsWith('user-agent:')) {
          currentUserAgent = trimmedLine.substring(11).trim()
          isRelevantSection = currentUserAgent === '*' ||
                             currentUserAgent === userAgent.toLowerCase() ||
                             currentUserAgent.includes('kreativpique')
        }

        if (isRelevantSection && trimmedLine.startsWith('disallow:')) {
          const disallowedPath = trimmedLine.substring(9).trim()
          if (disallowedPath === '/' || urlObj.pathname.startsWith(disallowedPath)) {
            return false
          }
        }
      }

      return true
    } catch {
      // If we can't fetch robots.txt, assume scraping is allowed
      return true
    }
  }

  // Database operations
  async createScrapeJob(job: ScrapeJobInsert): Promise<ScrapeJob> {
    try {
      const { data, error } = await supabase
        .from('scrape_jobs')
        .insert(job)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating scrape job:', error)
      throw error
    }
  }

  async updateScrapeJob(id: string, updates: ScrapeJobUpdate): Promise<ScrapeJob> {
    try {
      const { data, error } = await supabase
        .from('scrape_jobs')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating scrape job:', error)
      throw error
    }
  }

  async getScrapeJobs(clientId?: string) {
    try {
      let query = supabase
        .from('scrape_jobs')
        .select('*')
        .order('created_at', { ascending: false })

      if (clientId) {
        query = query.eq('client_id', clientId)
      }

      const { data, error } = await query

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching scrape jobs:', error)
      throw error
    }
  }

  async getScrapeJob(id: string): Promise<ScrapeJob | null> {
    try {
      const { data, error } = await supabase
        .from('scrape_jobs')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching scrape job:', error)
      throw error
    }
  }

  // Extract content for AI optimization
  async extractContentForOptimization(url: string): Promise<{
    title: string
    headings: string[]
    content: string
    keywords: string[]
    readabilityScore: number
  }> {
    const result = await this.scrapeUrl(url, {
      includeImages: false,
      includeExternalLinks: false
    })

    // Extract keywords from content
    const keywords = this.extractKeywords(result.content)

    // Calculate simple readability score
    const readabilityScore = this.calculateReadabilityScore(result.content)

    return {
      title: result.title,
      headings: result.headings,
      content: result.content,
      keywords,
      readabilityScore
    }
  }

  private extractKeywords(content: string): string[] {
    // Simple keyword extraction (in production, you'd use more sophisticated NLP)
    const words = content.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3)

    const wordFreq = new Map<string, number>()
    words.forEach(word => {
      wordFreq.set(word, (wordFreq.get(word) || 0) + 1)
    })

    return Array.from(wordFreq.entries())
      .sort(([,a], [,b]) => b - a)
      .slice(0, 20)
      .map(([word]) => word)
  }

  private calculateReadabilityScore(content: string): number {
    // Simple readability score based on sentence and word length
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0)
    const words = content.split(/\s+/).filter(w => w.length > 0)

    if (sentences.length === 0 || words.length === 0) return 0

    const avgWordsPerSentence = words.length / sentences.length
    const avgLettersPerWord = words.reduce((sum, word) => sum + word.length, 0) / words.length

    // Simplified Flesch Reading Ease formula
    const score = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgLettersPerWord)

    // Normalize to 0-100 scale
    return Math.max(0, Math.min(100, score))
  }
}

export const scrapingService = new ScrapingService()