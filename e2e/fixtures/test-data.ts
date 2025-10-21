/**
 * Test Data Generators
 * Provides consistent test data for E2E tests
 */

export const TEST_PRESENTATION_ID = 'd4a27c1c-8b2d-48a9-99c9-2298037e9e81';
export const DEV_PROFILE_ID = '00000000-0000-0000-0000-000000000000';

/**
 * Sample conversation messages for testing
 */
export const SAMPLE_CONVERSATION = {
  messages: [
    {
      role: 'user',
      content: 'I want to create a pitch deck for TestCorp, an AI code assistant',
    },
    {
      role: 'assistant',
      content: 'Great! Let me help you create a professional pitch deck. What specific problem does TestCorp solve?',
    },
    {
      role: 'user',
      content: 'Developers spend too much time on repetitive coding tasks',
    },
    {
      role: 'assistant',
      content: 'Excellent problem statement. How does TestCorp solve this?',
    },
    {
      role: 'user',
      content: 'We provide AI-powered code completion that learns from codebases',
    },
    {
      role: 'assistant',
      content: 'Interesting solution! Who are your target customers?',
    },
    {
      role: 'user',
      content: 'Enterprise software development teams',
    },
    {
      role: 'assistant',
      content: 'Perfect. What\'s your business model?',
    },
    {
      role: 'user',
      content: 'SaaS subscription at $20 per developer per month',
    },
    {
      role: 'assistant',
      content: 'Great! We have all the information needed. Ready to generate your pitch deck?',
    },
  ],
};

/**
 * Sample startup data for pitch deck generation
 */
export const SAMPLE_STARTUP_DATA = {
  company_name: 'TestCorp AI',
  industry: 'Artificial Intelligence',
  problem: 'Developers spend 40% of their time on repetitive coding tasks',
  solution: 'AI-powered code completion that learns from your codebase',
  target_market: 'Enterprise software development teams (10M+ developers)',
  business_model: 'SaaS subscription: $20/user/month',
  unique_value_prop: '10x faster coding with context-aware AI suggestions',
  traction: 'Beta: 500 developers, 90% retention, $10k MRR',
  team: 'Ex-Google engineers with 15+ years AI/ML experience',
  ask: 'Raising $2M seed for product development and go-to-market',
};

/**
 * Sample presentation structure for testing
 */
export const SAMPLE_PRESENTATION = {
  title: 'TestCorp AI Pitch Deck',
  category: 'pitch_deck',
  theme: 'mystique',
  slide_count: 10,
  status: 'completed',
  is_public: true,
  outline: {
    slides: [
      { slideNumber: 1, title: 'Cover', type: 'cover' },
      { slideNumber: 2, title: 'Problem', type: 'content' },
      { slideNumber: 3, title: 'Solution', type: 'content' },
      { slideNumber: 4, title: 'Product', type: 'content' },
      { slideNumber: 5, title: 'Market Size', type: 'content' },
      { slideNumber: 6, title: 'Business Model', type: 'content' },
      { slideNumber: 7, title: 'Traction', type: 'content' },
      { slideNumber: 8, title: 'Competition', type: 'content' },
      { slideNumber: 9, title: 'Team', type: 'content' },
      { slideNumber: 10, title: 'The Ask', type: 'content' },
    ],
  },
};

/**
 * Generate random test data
 */
export function generateRandomStartupData() {
  const timestamp = Date.now();
  
  return {
    company_name: `TestStartup${timestamp}`,
    industry: 'Technology',
    problem: 'Sample problem statement for testing',
    solution: 'Sample solution for testing',
    target_market: 'Test market segment',
    business_model: 'Test business model',
  };
}

/**
 * API endpoint helpers
 */
export const ENDPOINTS = {
  chat: '/functions/v1/chat',
  pitchDeckAssistant: '/functions/v1/pitch-deck-assistant',
  generatePitchDeck: '/functions/v1/generate-pitch-deck',
  presentations: '/rest/v1/presentations',
  pitchConversations: '/rest/v1/pitch_conversations',
};

/**
 * Expected response structures for validation
 */
export const EXPECTED_SCHEMAS = {
  pitchDeckAssistant: {
    conversation_id: 'string',
    message: 'string',
    completeness: 'number',
    collected_data: 'object',
    ready_to_generate: 'boolean',
  },
  generatePitchDeck: {
    success: 'boolean',
    presentation_id: 'string',
    title: 'string',
    slide_count: 'number',
  },
};

/**
 * Validate response structure matches expected schema
 */
export function validateResponseSchema(data: any, schemaKey: keyof typeof EXPECTED_SCHEMAS): boolean {
  const schema = EXPECTED_SCHEMAS[schemaKey];
  
  for (const [key, expectedType] of Object.entries(schema)) {
    const actualType = typeof data[key];
    if (actualType !== expectedType) {
      console.error(`Schema mismatch: ${key} expected ${expectedType}, got ${actualType}`);
      return false;
    }
  }
  
  return true;
}
