const Joi = require('joi');

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').default('development'),
    PORT: Joi.number().default(3000),
    MYSQL_HOST: Joi.string().required().description('MySQL host'),
    MYSQL_PORT: Joi.number().default(3306),
    MYSQL_DB: Joi.string().required().description('MySQL database name'),
    MYSQL_USER: Joi.string().required().description('MySQL username'),
    MYSQL_PASSWORD: Joi.string().required().description('MySQL password'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30),
    CORS_ORIGIN: Joi.string().default('http://localhost:3000'),
    LOG_LEVEL: Joi.string().valid('error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly').default('info'),
    // OAuth Google
    GOOGLE_CLIENT_ID: Joi.string().optional(),
    GOOGLE_CLIENT_SECRET: Joi.string().optional(),
    GOOGLE_CALLBACK_URL: Joi.string().optional(),
    // OAuth Facebook
    FACEBOOK_APP_ID: Joi.string().optional(),
    FACEBOOK_APP_SECRET: Joi.string().optional(),
    FACEBOOK_CALLBACK_URL: Joi.string().optional(),
    // OAuth GitHub
    GITHUB_CLIENT_ID: Joi.string().optional(),
    GITHUB_CLIENT_SECRET: Joi.string().optional(),
    GITHUB_CALLBACK_URL: Joi.string().optional(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mysql: {
    host: envVars.MYSQL_HOST,
    port: envVars.MYSQL_PORT || 3306,
    database: envVars.MYSQL_DB,
    username: envVars.MYSQL_USER,
    password: envVars.MYSQL_PASSWORD,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
  },
  cors: {
    origin: envVars.CORS_ORIGIN,
  },
  logLevel: envVars.LOG_LEVEL,
  google: {
    clientId: envVars.GOOGLE_CLIENT_ID,
    clientSecret: envVars.GOOGLE_CLIENT_SECRET,
    callbackURL: envVars.GOOGLE_CALLBACK_URL || 'http://localhost:3000/v1/auth/google/callback',
  },
  facebook: {
    appId: envVars.FACEBOOK_APP_ID,
    appSecret: envVars.FACEBOOK_APP_SECRET,
    callbackURL: envVars.FACEBOOK_CALLBACK_URL || 'http://localhost:3000/v1/auth/facebook/callback',
  },
  github: {
    clientId: envVars.GITHUB_CLIENT_ID,
    clientSecret: envVars.GITHUB_CLIENT_SECRET,
    callbackURL: envVars.GITHUB_CALLBACK_URL || 'http://localhost:3000/v1/auth/github/callback',
  },
};

