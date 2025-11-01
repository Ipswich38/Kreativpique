// Security configuration for production deployment

export const SECURITY_CONFIG = {
  // Content Security Policy
  csp: {
    directives: {
      'default-src': ["'self'"],
      'script-src': [
        "'self'",
        "'unsafe-inline'", // Required for Vite in development
        'https://js.stripe.com',
        'https://app.posthog.com',
        'https://browser.sentry-cdn.com'
      ],
      'style-src': [
        "'self'",
        "'unsafe-inline'" // Required for CSS-in-JS libraries
      ],
      'img-src': [
        "'self'",
        'data:',
        'https:',
        'blob:'
      ],
      'font-src': [
        "'self'",
        'https://fonts.gstatic.com'
      ],
      'connect-src': [
        "'self'",
        'https://*.supabase.co',
        'https://api.stripe.com',
        'https://app.posthog.com',
        'https://*.sentry.io',
        'https://api.openai.com',
        'https://api.anthropic.com',
        'https://generativelanguage.googleapis.com',
        'https://api.perplexity.ai',
        'https://api.resend.com',
        'https://googleads.googleapis.com',
        'https://graph.facebook.com',
        'https://api.linkedin.com'
      ],
      'frame-src': [
        'https://js.stripe.com'
      ],
      'object-src': ["'none'"],
      'base-uri': ["'self'"],
      'form-action': ["'self'"]
    }
  },

  // Rate limiting configuration
  rateLimiting: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // requests per window
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false,
    skipFailedRequests: false
  },

  // CORS configuration
  cors: {
    origin: process.env.NODE_ENV === 'production'
      ? [process.env.VITE_APP_URL || 'https://kreativpique.vercel.app']
      : ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'x-client-info',
      'apikey'
    ]
  },

  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your-jwt-secret',
    expiresIn: '24h',
    issuer: 'kreativpique',
    audience: 'kreativpique-users'
  },

  // Encryption configuration
  encryption: {
    algorithm: 'aes-256-gcm',
    keyLength: 32,
    ivLength: 16,
    tagLength: 16,
    encoding: 'hex' as const
  },

  // Session configuration
  session: {
    name: 'kreativpique-session',
    secret: process.env.SESSION_SECRET || process.env.JWT_SECRET || 'your-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: 'strict' as const
    }
  },

  // API timeout configuration
  timeouts: {
    api: parseInt(process.env.API_TIMEOUT_MS || '30000'),
    database: parseInt(process.env.DB_TIMEOUT_MS || '10000'),
    external: parseInt(process.env.EXTERNAL_API_TIMEOUT_MS || '15000'),
    scraping: parseInt(process.env.SCRAPING_TIMEOUT_MS || '30000')
  },

  // Password requirements
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: false,
    maxLength: 128
  },

  // File upload constraints
  uploads: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedMimeTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'text/csv',
      'application/json'
    ],
    allowedExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.pdf', '.csv', '.json']
  },

  // API key validation
  apiKeys: {
    headerName: 'x-api-key',
    queryParam: 'api_key',
    validateFormat: (key: string) => /^[a-zA-Z0-9_-]{32,}$/.test(key)
  },

  // Input validation
  validation: {
    email: {
      maxLength: 254,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    url: {
      maxLength: 2048,
      allowedProtocols: ['http:', 'https:']
    },
    text: {
      maxLength: 10000,
      allowedChars: /^[\w\s\.\-\@\#\$\%\&\*\(\)\+\=\[\]\{\}\|\\\:\;\"\'\<\>\,\?\!\/]*$/
    }
  },

  // Database security
  database: {
    ssl: process.env.NODE_ENV === 'production',
    connectionLimit: 10,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnectInterval: 1000,
    reconnectDecay: 1.5,
    reconnectDelayMax: 60000
  },

  // Logging configuration
  logging: {
    level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
    sensitiveFields: [
      'password',
      'token',
      'secret',
      'key',
      'authorization',
      'cookie',
      'session'
    ],
    retention: {
      error: '30d',
      warn: '14d',
      info: '7d',
      debug: '1d'
    }
  },

  // Feature flags for security features
  features: {
    enableRateLimiting: process.env.ENABLE_RATE_LIMITING !== 'false',
    enableCSP: process.env.ENABLE_CSP !== 'false',
    enableHSTS: process.env.ENABLE_HSTS !== 'false',
    enableXSSProtection: process.env.ENABLE_XSS_PROTECTION !== 'false',
    requireHTTPS: process.env.NODE_ENV === 'production',
    enableSessionSecurity: process.env.ENABLE_SESSION_SECURITY !== 'false'
  }
}

// Security headers for responses
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Content-Security-Policy': Object.entries(SECURITY_CONFIG.csp.directives)
    .map(([directive, values]) => `${directive} ${values.join(' ')}`)
    .join('; ')
}

// Validation helpers
export const validateInput = {
  email: (email: string): boolean => {
    return email.length <= SECURITY_CONFIG.validation.email.maxLength &&
           SECURITY_CONFIG.validation.email.pattern.test(email)
  },

  url: (url: string): boolean => {
    try {
      const parsed = new URL(url)
      return url.length <= SECURITY_CONFIG.validation.url.maxLength &&
             SECURITY_CONFIG.validation.url.allowedProtocols.includes(parsed.protocol)
    } catch {
      return false
    }
  },

  text: (text: string): boolean => {
    return text.length <= SECURITY_CONFIG.validation.text.maxLength &&
           SECURITY_CONFIG.validation.text.allowedChars.test(text)
  },

  password: (password: string): { valid: boolean; errors: string[] } => {
    const errors: string[] = []
    const config = SECURITY_CONFIG.password

    if (password.length < config.minLength) {
      errors.push(`Password must be at least ${config.minLength} characters`)
    }

    if (password.length > config.maxLength) {
      errors.push(`Password must be no more than ${config.maxLength} characters`)
    }

    if (config.requireUppercase && !/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter')
    }

    if (config.requireLowercase && !/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter')
    }

    if (config.requireNumbers && !/\d/.test(password)) {
      errors.push('Password must contain at least one number')
    }

    if (config.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character')
    }

    return {
      valid: errors.length === 0,
      errors
    }
  }
}

// Sanitization helpers
export const sanitizeInput = {
  text: (input: string): string => {
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .substring(0, SECURITY_CONFIG.validation.text.maxLength)
  },

  email: (input: string): string => {
    return input
      .trim()
      .toLowerCase()
      .substring(0, SECURITY_CONFIG.validation.email.maxLength)
  },

  url: (input: string): string => {
    return input
      .trim()
      .substring(0, SECURITY_CONFIG.validation.url.maxLength)
  }
}

// Rate limiting helpers
export const createRateLimitKey = (identifier: string, action: string): string => {
  return `rate_limit:${action}:${identifier}`
}

export const getRateLimitConfig = (action: string) => {
  const configs = {
    login: { windowMs: 15 * 60 * 1000, max: 5 }, // 5 attempts per 15 minutes
    register: { windowMs: 60 * 60 * 1000, max: 3 }, // 3 attempts per hour
    password_reset: { windowMs: 60 * 60 * 1000, max: 3 }, // 3 attempts per hour
    api: { windowMs: 15 * 60 * 1000, max: 100 }, // 100 requests per 15 minutes
    citation_check: { windowMs: 60 * 1000, max: 10 }, // 10 checks per minute
    email_send: { windowMs: 60 * 60 * 1000, max: 10 } // 10 emails per hour
  }

  return configs[action as keyof typeof configs] || SECURITY_CONFIG.rateLimiting
}