const { sequelize } = require('../config/database');

// Initialize models
const models = {
  User: require('./user.model')(sequelize),
};

module.exports = models;

