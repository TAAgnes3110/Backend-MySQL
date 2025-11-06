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
};

