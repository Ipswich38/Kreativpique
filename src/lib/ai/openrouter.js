import axios from 'axios';
import 'dotenv/config';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1/chat/completions';

export const AI_MODELS = {
  CLAUDE: 'anthropic/claude-3.5-sonnet',
  GPT4: 'openai/gpt-4o',
  GEMINI: 'google/gemini-pro-1.5',
  PERPLEXITY: 'perplexity/llama-3.1-sonar-large-128k-online'
};

export async function queryAI(model, query) {
  try {
    const response = await axios.post(
      OPENROUTER_BASE_URL,
      {
        model: model,
        messages: [
          {
            role: 'user',
            content: query
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://kreativpique.com', // Optional: your site
          'X-Title': 'Kreativpique AI Search Platform' // Optional: your app name
        }
      }
    );

    return {
      success: true,
      model: model,
      response: response.data.choices[0].message.content,
      usage: response.data.usage
    };
  } catch (error) {
    console.error(`Error querying ${model}:`, error.message);
    return {
      success: false,
      model: model,
      error: error.message
    };
  }
}

// Test function
export async function testOpenRouter() {
  console.log('Testing OpenRouter connection...');

  const result = await queryAI(
    AI_MODELS.CLAUDE,
    'Say "Hello from OpenRouter!" in one sentence.'
  );

  if (result.success) {
    console.log('✅ OpenRouter working!');
    console.log('Response:', result.response);
  } else {
    console.log('❌ OpenRouter failed:', result.error);
  }

  return result;
}