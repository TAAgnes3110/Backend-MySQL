const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 255],
        },
      },
      role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user',
      },
      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'users',
      timestamps: true,
      underscored: true,
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 8);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            user.password = await bcrypt.hash(user.password, 8);
          }
        },
      },
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
      scopes: {
        withPassword: {
          attributes: { include: ['password'] },
        },
      },
    }
  );

  // Instance methods
  User.prototype.isPasswordMatch = async function (password) {
    return bcrypt.compare(password, this.password);
  };

  // Static methods
  User.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({
      where: {
        email,
        ...(excludeUserId && { id: { [sequelize.Sequelize.Op.ne]: excludeUserId } }),
      },
    });
    return !!user;
  };

  // Pagination helper
  User.paginate = async function (filter, options) {
    const { Op } = sequelize.Sequelize;
    const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
    const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
    const offset = (page - 1) * limit;

    let order = [['createdAt', 'DESC']];
    if (options.sortBy) {
      const sortingCriteria = [];
      options.sortBy.split(',').forEach((sortOption) => {
        const [key, orderDirection] = sortOption.split(':');
        sortingCriteria.push([key, orderDirection === 'desc' ? 'DESC' : 'ASC']);
      });
      order = sortingCriteria;
    }

    const where = {};
    if (filter) {
      Object.keys(filter).forEach((key) => {
        if (filter[key]) {
          where[key] = filter[key];
        }
      });
    }

    const { count, rows } = await this.findAndCountAll({
      where,
      limit,
      offset,
      order,
    });

    const totalPages = Math.ceil(count / limit);

    return {
      results: rows,
      page,
      limit,
      totalPages,
      totalResults: count,
    };
  };

  return User;
};

