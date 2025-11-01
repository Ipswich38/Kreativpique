import cron from 'node-cron';
import { CLIENTS } from '../config/clients.js';
import { monitorClient } from './aiMonitoring.js';
import { saveAICitations } from './database.js';

// Run monitoring for all clients
async function runDailyMonitoring() {
  console.log('\n🚀 Starting daily AI monitoring...');
  console.log(`   Time: ${new Date().toLocaleString()}`);

  for (const client of CLIENTS) {
    try {
      // Monitor AI citations
      const results = await monitorClient(client);

      // Save to database
      await saveAICitations(results);

    } catch (error) {
      console.error(`❌ Error monitoring ${client.name}:`, error);
    }
  }

  console.log('\n✅ Daily monitoring complete!');
}

// Schedule daily at 3 AM Dubai time (UTC+4)
// Cron format: minute hour day month weekday
export function startScheduler() {
  // Run every day at 3:00 AM
  cron.schedule('0 3 * * *', () => {
    runDailyMonitoring();
  });

  console.log('📅 Scheduler started - will run daily at 3:00 AM');
}

// For testing: run immediately
export async function runNow() {
  await runDailyMonitoring();
}