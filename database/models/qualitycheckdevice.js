"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class QualityCheckDevice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      QualityCheckDevice.belongsTo(models.Device, { foreignKey: "deviceId" });
    }
  }
  QualityCheckDevice.init(
    {
      capacity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "QualityCheckDevice",
    }
  );
  return QualityCheckDevice;
};
