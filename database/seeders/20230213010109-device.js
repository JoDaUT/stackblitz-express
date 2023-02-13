"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Devices",
      [
        {
          name: "Printer 1",
          ip: "192.168.3.5",
          type: "Vida",
          status: "Online",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Printer 2",
          ip: "192.168.3.6",
          type: "Ender V3",
          status: "Online",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Printer 3",
          ip: "192.168.3.7",
          type: "Vida",
          status: "Offline",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Printer 4",
          ip: "192.168.3.5",
          type: "Vista",
          status: "Offline",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Furn 1",
          ip: "192.168.3.8",
          type: "Combi",
          status: "Online",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "QC 1",
          ip: "192.168.3.9",
          type: "Rapid",
          status: "Online",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Devices", null, {});
  },
};
