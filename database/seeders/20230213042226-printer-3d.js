"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Printer3Ds",
      [
        {
          deviceId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          deviceId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          deviceId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          deviceId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Printer3Ds", null, {});
  },
};
