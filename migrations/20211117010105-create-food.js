'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('food', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      food_name: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
      },
      serving_qty: {
        type: Sequelize.INTEGER
      },
      serving_unit: {
        type: Sequelize.STRING
      },
      serving_weight_grams: {
        type: Sequelize.INTEGER
      },
      nf_calories: {
        type: Sequelize.INTEGER
      },
      nf_total_fat: {
        type: Sequelize.INTEGER
      },
      nf_cholesterol: {
        type: Sequelize.INTEGER
      },
      nf_sugars: {
        type: Sequelize.INTEGER
      },
      nf_protein: {
        type: Sequelize.INTEGER
      },
      consumed_at: {
        type: Sequelize.TIME
      },
      userId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('food');
  }
};