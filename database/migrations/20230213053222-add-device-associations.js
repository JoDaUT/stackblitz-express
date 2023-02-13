"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Devices", "factoryId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Factories",
        key: "id",
        as: "factoryId",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Devices", "factoryId");
  },
};
