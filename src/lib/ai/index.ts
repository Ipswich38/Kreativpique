import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface CitationResult {
  mentioned: boolean;
  position: number | null;
  context: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  sentimentScore: number;
  fullResponse: string;
  url?: string;
  timestamp: Date;
}

export interface AIProvider {
  name: 'chatgpt' | 'claude' | 'perplexity' | 'gemini';
  checkCitation(query: string, clientName: string): Promise<CitationResult>;
}

// OpenAI (ChatGPT) Provider
export class OpenAIProvider implements AIProvider {
  name: 'chatgpt' = 'chatgpt';
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async checkCitation(query: string, clientName: string): Promise<CitationResult> {
    try {
      const response = await this.client.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'user', content: query }
        ],
        temperature: 0.1,
      });

      const content = response.choices[0].message.content || '';

      return this.analyzeCitation(content, clientName);
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error('Failed to check ChatGPT citation');
    }
  }

  private analyzeCitation(content: string, clientName: string): CitationResult {
    const lowerContent = content.toLowerCase();
    const lowerClientName = clientName.toLowerCase();

    // Check if client is mentioned
    const mentioned = lowerContent.includes(lowerClientName);

    // Calculate position if mentioned
    let position: number | null = null;
    if (mentioned) {
      const sentences = content.split(/[.!?]+/);
      for (let i = 0; i < sentences.length; i++) {
        if (sentences[i].toLowerCase().includes(lowerClientName)) {
          position = i + 1;
          break;
        }
      }
    }

    // Extract context around mention
    const mentionIndex = lowerContent.indexOf(lowerClientName);
    let context = '';
    if (mentionIndex !== -1) {
      const start = Math.max(0, mentionIndex - 100);
      const end = Math.min(content.length, mentionIndex + lowerClientName.length + 100);
      context = content.substring(start, end);
    }

    // Simple sentiment analysis (can be enhanced with AI)
    const sentiment = this.calculateSentiment(context || content);
    const sentimentScore = this.calculateSentimentScore(context || content);

    return {
      mentioned,
      position,
      context,
      sentiment,
      sentimentScore,
      fullResponse: content,
      timestamp: new Date()
    };
  }

  private calculateSentiment(text: string): 'positive' | 'neutral' | 'negative' {
    const positiveWords = ['excellent', 'great', 'best', 'outstanding', 'recommended', 'top', 'premier', 'luxury', 'quality'];
    const negativeWords = ['poor', 'bad', 'worst', 'terrible', 'avoid', 'disappointing', 'overpriced'];

    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;

    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  private calculateSentimentScore(text: string): number {
    // Simple scoring from -1 to 1
    const sentiment = this.calculateSentiment(text);
    switch (sentiment) {
      case 'positive': return 0.7;
      case 'negative': return -0.7;
      default: return 0;
    }
  }
}

// Anthropic (Claude) Provider
export class AnthropicProvider implements AIProvider {
  name: 'claude' = 'claude';
  private client: Anthropic;

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  async checkCitation(query: string, clientName: string): Promise<CitationResult> {
    try {
      const message = await this.client.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 1024,
        temperature: 0.1,
        messages: [
          { role: 'user', content: query }
        ],
      });

      const content = message.content[0].type === 'text' ? message.content[0].text : '';

      return this.analyzeCitation(content, clientName);
    } catch (error) {
      console.error('Anthropic API error:', error);
      throw new Error('Failed to check Claude citation');
    }
  }

  private analyzeCitation(content: string, clientName: string): CitationResult {
    // Similar analysis logic as OpenAI
    const lowerContent = content.toLowerCase();
    const lowerClientName = clientName.toLowerCase();

    const mentioned = lowerContent.includes(lowerClientName);

    let position: number | null = null;
    if (mentioned) {
      const sentences = content.split(/[.!?]+/);
      for (let i = 0; i < sentences.length; i++) {
        if (sentences[i].toLowerCase().includes(lowerClientName)) {
          position = i + 1;
          break;
        }
      }
    }

    const mentionIndex = lowerContent.indexOf(lowerClientName);
    let context = '';
    if (mentionIndex !== -1) {
      const start = Math.max(0, mentionIndex - 100);
      const end = Math.min(content.length, mentionIndex + lowerClientName.length + 100);
      context = content.substring(start, end);
    }

    const sentiment = this.calculateSentiment(context || content);
    const sentimentScore = this.calculateSentimentScore(context || content);

    return {
      mentioned,
      position,
      context,
      sentiment,
      sentimentScore,
      fullResponse: content,
      timestamp: new Date()
    };
  }

  private calculateSentiment(text: string): 'positive' | 'neutral' | 'negative' {
    const positiveWords = ['excellent', 'great', 'best', 'outstanding', 'recommended', 'top', 'premier', 'luxury', 'quality'];
    const negativeWords = ['poor', 'bad', 'worst', 'terrible', 'avoid', 'disappointing', 'overpriced'];

    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;

    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  private calculateSentimentScore(text: string): number {
    const sentiment = this.calculateSentiment(text);
    switch (sentiment) {
      case 'positive': return 0.7;
      case 'negative': return -0.7;
      default: return 0;
    }
  }
}

// Google Gemini Provider
export class GeminiProvider implements AIProvider {
  name: 'gemini' = 'gemini';
  private client: GoogleGenerativeAI;

  constructor(apiKey: string) {
    this.client = new GoogleGenerativeAI(apiKey);
  }

  async checkCitation(query: string, clientName: string): Promise<CitationResult> {
    try {
      const model = this.client.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(query);
      const response = await result.response;
      const content = response.text();

      return this.analyzeCitation(content, clientName);
    } catch (error) {
      console.error('Google Gemini API error:', error);
      throw new Error('Failed to check Gemini citation');
    }
  }

  private analyzeCitation(content: string, clientName: string): CitationResult {
    const lowerContent = content.toLowerCase();
    const lowerClientName = clientName.toLowerCase();

    const mentioned = lowerContent.includes(lowerClientName);

    let position: number | null = null;
    if (mentioned) {
      const sentences = content.split(/[.!?]+/);
      for (let i = 0; i < sentences.length; i++) {
        if (sentences[i].toLowerCase().includes(lowerClientName)) {
          position = i + 1;
          break;
        }
      }
    }

    const mentionIndex = lowerContent.indexOf(lowerClientName);
    let context = '';
    if (mentionIndex !== -1) {
      const start = Math.max(0, mentionIndex - 100);
      const end = Math.min(content.length, mentionIndex + lowerClientName.length + 100);
      context = content.substring(start, end);
    }

    const sentiment = this.calculateSentiment(context || content);
    const sentimentScore = this.calculateSentimentScore(context || content);

    return {
      mentioned,
      position,
      context,
      sentiment,
      sentimentScore,
      fullResponse: content,
      timestamp: new Date()
    };
  }

  private calculateSentiment(text: string): 'positive' | 'neutral' | 'negative' {
    const positiveWords = ['excellent', 'great', 'best', 'outstanding', 'recommended', 'top', 'premier', 'luxury', 'quality'];
    const negativeWords = ['poor', 'bad', 'worst', 'terrible', 'avoid', 'disappointing', 'overpriced'];

    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;

    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  private calculateSentimentScore(text: string): number {
    const sentiment = this.calculateSentiment(text);
    switch (sentiment) {
      case 'positive': return 0.7;
      case 'negative': return -0.7;
      default: return 0;
    }
  }
}

// Perplexity Provider
export class PerplexityProvider implements AIProvider {
  name: 'perplexity' = 'perplexity';
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async checkCitation(query: string, clientName: string): Promise<CitationResult> {
    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'pplx-70b-online',
          messages: [
            { role: 'user', content: query }
          ],
          temperature: 0.1,
        }),
      });

      if (!response.ok) {
        throw new Error(`Perplexity API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;

      return this.analyzeCitation(content, clientName);
    } catch (error) {
      console.error('Perplexity API error:', error);
      throw new Error('Failed to check Perplexity citation');
    }
  }

  private analyzeCitation(content: string, clientName: string): CitationResult {
    const lowerContent = content.toLowerCase();
    const lowerClientName = clientName.toLowerCase();

    const mentioned = lowerContent.includes(lowerClientName);

    let position: number | null = null;
    if (mentioned) {
      const sentences = content.split(/[.!?]+/);
      for (let i = 0; i < sentences.length; i++) {
        if (sentences[i].toLowerCase().includes(lowerClientName)) {
          position = i + 1;
          break;
        }
      }
    }

    const mentionIndex = lowerContent.indexOf(lowerClientName);
    let context = '';
    if (mentionIndex !== -1) {
      const start = Math.max(0, mentionIndex - 100);
      const end = Math.min(content.length, mentionIndex + lowerClientName.length + 100);
      context = content.substring(start, end);
    }

    const sentiment = this.calculateSentiment(context || content);
    const sentimentScore = this.calculateSentimentScore(context || content);

    return {
      mentioned,
      position,
      context,
      sentiment,
      sentimentScore,
      fullResponse: content,
      timestamp: new Date()
    };
  }

  private calculateSentiment(text: string): 'positive' | 'neutral' | 'negative' {
    const positiveWords = ['excellent', 'great', 'best', 'outstanding', 'recommended', 'top', 'premier', 'luxury', 'quality'];
    const negativeWords = ['poor', 'bad', 'worst', 'terrible', 'avoid', 'disappointing', 'overpriced'];

    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;

    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  private calculateSentimentScore(text: string): number {
    const sentiment = this.calculateSentiment(text);
    switch (sentiment) {
      case 'positive': return 0.7;
      case 'negative': return -0.7;
      default: return 0;
    }
  }
}

// AI Service Manager
export class AIServiceManager {
  private providers: Map<string, AIProvider> = new Map();

  constructor() {
    // Initialize providers with API keys from environment
    const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const anthropicKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    const googleKey = import.meta.env.VITE_GOOGLE_API_KEY;
    const perplexityKey = import.meta.env.VITE_PERPLEXITY_API_KEY;

    if (openaiKey) {
      this.providers.set('chatgpt', new OpenAIProvider(openaiKey));
    }
    if (anthropicKey) {
      this.providers.set('claude', new AnthropicProvider(anthropicKey));
    }
    if (googleKey) {
      this.providers.set('gemini', new GeminiProvider(googleKey));
    }
    if (perplexityKey) {
      this.providers.set('perplexity', new PerplexityProvider(perplexityKey));
    }
  }

  async checkCitation(
    platform: 'chatgpt' | 'claude' | 'perplexity' | 'gemini',
    query: string,
    clientName: string
  ): Promise<CitationResult> {
    const provider = this.providers.get(platform);
    if (!provider) {
      throw new Error(`Provider not configured for platform: ${platform}`);
    }

    return await provider.checkCitation(query, clientName);
  }

  async checkAllPlatforms(
    query: string,
    clientName: string,
    platforms: ('chatgpt' | 'claude' | 'perplexity' | 'gemini')[]
  ): Promise<Record<string, CitationResult>> {
    const results: Record<string, CitationResult> = {};

    // Run checks in parallel for better performance
    const promises = platforms.map(async (platform) => {
      try {
        const result = await this.checkCitation(platform, query, clientName);
        results[platform] = result;
      } catch (error) {
        console.error(`Failed to check ${platform}:`, error);
        // Return a failed result instead of throwing
        results[platform] = {
          mentioned: false,
          position: null,
          context: '',
          sentiment: 'neutral',
          sentimentScore: 0,
          fullResponse: '',
          timestamp: new Date()
        };
      }
    });

    await Promise.all(promises);
    return results;
  }

  getAvailablePlatforms(): string[] {
    return Array.from(this.providers.keys());
  }
}

// Export singleton instance
export const aiService = new AIServiceManager();