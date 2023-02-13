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
          deviceType: "3dPrinter",
          factoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Printer 2",
          ip: "192.168.3.6",
          type: "Ender V3",
          status: "Online",
          deviceType: "3dPrinter",
          factoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Printer 3",
          ip: "192.168.3.7",
          type: "Vida",
          status: "Offline",
          deviceType: "3dPrinter",
          factoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Printer 1",
          ip: "192.168.3.5",
          type: "Vista",
          status: "Offline",
          deviceType: "3dPrinter",
          factoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Furn 1",
          ip: "192.168.3.8",
          type: "Combi",
          status: "Online",
          deviceType: "Furnance",
          factoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "QC 1",
          ip: "192.168.3.9",
          type: "Rapid",
          status: "Online",
          deviceType: "qualityCheckDevice",
          factoryId: 1,
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
