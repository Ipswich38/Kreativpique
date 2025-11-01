import { queryAI, AI_MODELS } from './openrouter.js';

// Analyze if client is mentioned in response
function analyzeResponse(response, clientName, clientDomain) {
  const lowerResponse = response.toLowerCase();
  const lowerName = clientName.toLowerCase();
  const lowerDomain = clientDomain.toLowerCase();

  // Check if mentioned by name or domain
  const mentioned = lowerResponse.includes(lowerName) ||
                    lowerResponse.includes(lowerDomain);

  if (!mentioned) {
    return {
      mentioned: false,
      position: null,
      context: null,
      sentiment: null
    };
  }

  // Find position (crude but works)
  // Split by common separators and find where client appears
  const lines = response.split(/\n|\.|\d+\./);
  let position = null;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].toLowerCase().includes(lowerName)) {
      position = i + 1;
      break;
    }
  }

  // Extract context (sentence mentioning them)
  const sentences = response.match(/[^.!?]+[.!?]+/g) || [];
  let context = null;

  for (const sentence of sentences) {
    if (sentence.toLowerCase().includes(lowerName)) {
      context = sentence.trim();
      break;
    }
  }

  // Basic sentiment analysis
  const positiveWords = ['best', 'top', 'excellent', 'premium', 'leading', 'trusted'];
  const negativeWords = ['avoid', 'poor', 'bad', 'worst'];

  let sentiment = 'neutral';
  if (context) {
    const lowerContext = context.toLowerCase();
    if (positiveWords.some(word => lowerContext.includes(word))) {
      sentiment = 'positive';
    } else if (negativeWords.some(word => lowerContext.includes(word))) {
      sentiment = 'negative';
    }
  }

  return {
    mentioned: true,
    position: position,
    context: context,
    sentiment: sentiment
  };
}

// Extract competitors mentioned
function extractCompetitors(response) {
  // Simple implementation - look for company names, websites
  const competitors = [];

  // Common competitor patterns
  const patterns = [
    /\b[A-Z][a-z]+ (?:Jets?|Aviation|Air|Charter|Airways?)\b/g,
    /\b(?:www\.)?[a-z0-9-]+\.[a-z]{2,}\b/gi
  ];

  patterns.forEach(pattern => {
    const matches = response.match(pattern) || [];
    competitors.push(...matches);
  });

  // Return unique competitors
  return [...new Set(competitors)].slice(0, 10);
}

// Main monitoring function
export async function monitorAICitations(client, query) {
  console.log(`\n🔍 Monitoring: "${query}" for ${client.name}`);

  const results = [];

  // Query all AI models
  for (const [modelName, modelId] of Object.entries(AI_MODELS)) {
    console.log(`  Testing ${modelName}...`);

    const aiResponse = await queryAI(modelId, query);

    if (!aiResponse.success) {
      console.log(`  ❌ ${modelName} failed`);
      continue;
    }

    // Analyze response
    const analysis = analyzeResponse(
      aiResponse.response,
      client.name,
      client.domain
    );

    const competitors = extractCompetitors(aiResponse.response);

    const result = {
      client_id: client.id,
      client_name: client.name,
      query: query,
      ai_platform: modelName,
      model: modelId,
      mentioned: analysis.mentioned,
      position: analysis.position,
      context: analysis.context,
      sentiment: analysis.sentiment,
      competitors: competitors,
      full_response: aiResponse.response.substring(0, 500), // Store first 500 chars
      timestamp: new Date().toISOString()
    };

    results.push(result);

    // Log result
    if (analysis.mentioned) {
      console.log(`  ✅ ${modelName}: MENTIONED at position #${analysis.position}`);
      console.log(`     Context: "${analysis.context?.substring(0, 80)}..."`);
    } else {
      console.log(`  ❌ ${modelName}: NOT MENTIONED`);
    }

    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  return results;
}

// Monitor all queries for a client
export async function monitorClient(client) {
  console.log(`\n🎯 Starting AI monitoring for ${client.name}`);
  console.log(`   Queries: ${client.queries.length}`);

  const allResults = [];

  for (const query of client.queries) {
    const results = await monitorAICitations(client, query);
    allResults.push(...results);

    // Delay between queries
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log(`\n✅ Completed AI monitoring for ${client.name}`);
  console.log(`   Total checks: ${allResults.length}`);
  console.log(`   Mentions: ${allResults.filter(r => r.mentioned).length}`);

  return allResults;
}