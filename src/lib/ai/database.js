// Using Supabase example - adapt to your DB

import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Save AI citation results
export async function saveAICitations(results) {
  try {
    const { data, error } = await supabase
      .from('ai_citations')
      .insert(results);

    if (error) throw error;

    console.log(`✅ Saved ${results.length} AI citation records`);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error saving to database:', error);
    return { success: false, error: error.message };
  }
}

// Get citations for a client
export async function getClientCitations(clientId, dateRange = 30) {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - dateRange);

    const { data, error } = await supabase
      .from('ai_citations')
      .select('*')
      .eq('client_id', clientId)
      .gte('timestamp', startDate.toISOString())
      .order('timestamp', { ascending: false });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('❌ Error fetching citations:', error);
    return { success: false, error: error.message };
  }
}

// Calculate statistics
export function calculateStats(citations) {
  const total = citations.length;
  const mentioned = citations.filter(c => c.mentioned).length;
  const mentionRate = total > 0 ? (mentioned / total * 100).toFixed(1) : 0;

  // Average position (when mentioned)
  const positions = citations
    .filter(c => c.mentioned && c.position)
    .map(c => c.position);

  const avgPosition = positions.length > 0
    ? (positions.reduce((a, b) => a + b, 0) / positions.length).toFixed(1)
    : null;

  // By platform
  const byPlatform = {};
  citations.forEach(c => {
    if (!byPlatform[c.ai_platform]) {
      byPlatform[c.ai_platform] = { total: 0, mentioned: 0 };
    }
    byPlatform[c.ai_platform].total++;
    if (c.mentioned) byPlatform[c.ai_platform].mentioned++;
  });

  return {
    total,
    mentioned,
    mentionRate: `${mentionRate}%`,
    avgPosition,
    byPlatform
  };
}