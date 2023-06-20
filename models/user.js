'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helpers/encryptor');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Username Must be filled!',
        },
        notEmpty: {
          msg: 'Username Must be filled!',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password Must be filled!',
        },
        notEmpty: {
          msg: 'Password Must be filled!',
        },
        len: {
          args: [6, 8],
          msg: 'Password Must be between 6 and 8 characters!',
        },
      },
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    user.password = hashPass(user.password)
  })
  return User;
};