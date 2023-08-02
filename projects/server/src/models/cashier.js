'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cashier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cashier.hasMany(models.cartDetail)
      Cashier.hasOne(models.Otp)
      Cashier.hasMany(models.Cart)
      Cashier.hasMany(models.Transaction)
    }
  }
  Cashier.init({
    username: {type:DataTypes.STRING, allowNull:false},
    password: {type:DataTypes.STRING, allowNull:false},
    email: {type:DataTypes.STRING, allowNull:false},
    phone: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    imgProfile: DataTypes.STRING,
    isAdmin: {type: DataTypes.BOOLEAN, defaultValue:false},
    isDeleted: {type: DataTypes.BOOLEAN, defaultValue:false},
    isBanned:{type: DataTypes.BOOLEAN, defaultValue:false},
  }, {
    sequelize,
    modelName: 'Cashier',
  });
  return Cashier;
};