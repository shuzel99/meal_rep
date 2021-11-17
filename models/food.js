'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  food.init({
    food_name: DataTypes.STRING,
    photo: DataTypes.STRING,
    serving_qty: DataTypes.INTEGER,
    serving_unit: DataTypes.STRING,
    serving_weight_grams: DataTypes.INTEGER,
    nf_calories: DataTypes.INTEGER,
    nf_total_fat: DataTypes.INTEGER,
    nf_cholesterol: DataTypes.INTEGER,
    nf_sugars: DataTypes.INTEGER,
    nf_protein: DataTypes.INTEGER,
    consumed_at: DataTypes.TIME,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'food',
  });
  return food;
};