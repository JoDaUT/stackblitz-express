"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Printer3D extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Printer3D.belongsTo(models.Device, { foreignKey: "deviceId" });
    }
  }
  Printer3D.init(
    {
      deviceId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Printer3D",
    }
  );
  return Printer3D;
};
