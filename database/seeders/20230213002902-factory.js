"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Factories",
      [
        {
          name: "Burlington",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Wilmington",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Factories", null, {});
  },
};
