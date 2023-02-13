'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Printer3D extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Printer3D.init({
    deviceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Printer3D',
  });
  return Printer3D;
};