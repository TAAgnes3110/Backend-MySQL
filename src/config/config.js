require('dotenv').config();

// Use validated config in production, fallback to simple config in development
let config;
try {
  config = require('./validateEnv');
} catch (error) {
  // Fallback for development if validation fails
  if (process.env.NODE_ENV !== 'production') {
    config = {
      env: process.env.NODE_ENV || 'development',
      port: process.env.PORT || 3000,
      mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        port: process.env.MYSQL_PORT || 3306,
        database: process.env.MYSQL_DB || 'template_backend',
        username: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'root',
      },
      jwt: {
        secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
        accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES || 30,
        refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS || 30,
      },
      cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
      },
      logLevel: process.env.LOG_LEVEL || 'info',
      // OAuth Config
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/v1/auth/google/callback',
      },
      facebook: {
        appId: process.env.FACEBOOK_APP_ID,
        appSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL || 'http://localhost:3000/v1/auth/facebook/callback',
      },
      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:3000/v1/auth/github/callback',
      },
      session: {
        secret: process.env.SESSION_SECRET || process.env.JWT_SECRET || 'your-session-secret',
      },
    };
  } else {
    throw error;
  }
}

module.exports = config;

