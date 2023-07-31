'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactionDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transactionDetail.belongsTo(models.Transaction)
      transactionDetail.belongsTo(models.Product)
    }
  }
  transactionDetail.init({
    totalItems: {
      type: DataTypes.INTEGER
    },
    totalPrice: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'transactionDetail',
  });
  return transactionDetail;
};