"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("QualityCheckDevices", "deviceId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Devices",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("QualityCheckDevices", "deviceId");
  },
};
