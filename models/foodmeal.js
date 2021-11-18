'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class foodMeal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  foodMeal.init({
    foodId: DataTypes.INTEGER,
    mealId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'foodMeal',
  });
  return foodMeal;
};