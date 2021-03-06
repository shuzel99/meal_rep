'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class meal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.meal.belongsTo(models.user)
      models.meal.belongsToMany(models.food, {through: "foodMeal"})
    }
  };
  meal.init({
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    ingredient: DataTypes.ARRAY(DataTypes.STRING),
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'meal',
  });
  return meal;
};