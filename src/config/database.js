const { Sequelize } = require('sequelize');
const config = require('./config');
const logger = require('./logger');

let sequelize = null;

/**
 * Connect to MySQL database
 */
const connectDatabase = async () => {
  try {
    const { mysql } = config;
    sequelize = new Sequelize(
      mysql.database,
      mysql.username,
      mysql.password,
      {
        host: mysql.host,
        port: mysql.port,
        dialect: 'mysql',
        logging: config.env === 'development' ? console.log : false,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
        define: {
          timestamps: true,
          underscored: true,
        },
      }
    );

    await sequelize.authenticate();
    logger.info('MySQL connected successfully');
  } catch (error) {
    logger.error('MySQL connection error:', error);
    throw new Error(`Database connection failed: ${error.message}`);
  }
};

/**
 * Get database connection
 */
const getConnection = () => {
  return sequelize;
};

/**
 * Close database connection
 */
const closeDatabase = async () => {
  try {
    if (sequelize) {
      await sequelize.close();
      logger.info('MySQL connection closed');
    }
  } catch (error) {
    logger.error('Error closing database connection:', error);
    throw error;
  }
};

module.exports = {
  connectDatabase,
  getConnection,
  closeDatabase,
  sequelize,
};

