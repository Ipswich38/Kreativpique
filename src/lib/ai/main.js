import { startScheduler, runNow } from './scheduler.js';
import { testOpenRouter } from './openrouter.js';

async function main() {
  console.log('🎯 Kreativpique AI Search Platform');
  console.log('==================================\n');

  // Test OpenRouter connection
  console.log('Testing OpenRouter...');
  const test = await testOpenRouter();

  if (!test.success) {
    console.error('❌ OpenRouter test failed. Check your API key.');
    process.exit(1);
  }

  console.log('\n✅ OpenRouter connected successfully!');

  // Start scheduler
  startScheduler();

  // Optional: Run monitoring immediately for testing
  if (process.argv.includes('--run-now')) {
    console.log('\n🚀 Running monitoring now...');
    await runNow();
  }

  console.log('\n✅ Platform running. Monitoring will run daily at 3 AM.');
}

main();