"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Furnance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Furnance.belongsTo(models.Device, { foreignKey: "deviceId" });
    }
  }
  Furnance.init(
    {
      maxTemperature: { type: DataTypes.FLOAT, allowNull: false },
    },
    {
      sequelize,
      modelName: "Furnance",
    }
  );
  return Furnance;
};
