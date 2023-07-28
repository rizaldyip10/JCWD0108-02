'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cartDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cartDetail.belongsTo(models.Cashier)
      cartDetail.belongsTo(models.Product)
    }
  }
  cartDetail.init({
    totalItems: {
      type: DataTypes.INTEGER
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
  }
  }, {
    sequelize,
    modelName: 'cartDetail',
  });
  return cartDetail;
};