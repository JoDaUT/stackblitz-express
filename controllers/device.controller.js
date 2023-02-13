const { DataTypes } = require("sequelize");
const { Device } = require("../database/models");

const getAll = async (req, res) => {
  const { offset = 0, limit = 10 } = req.params;
  const { count, rows } = await Device.findAndCountAll({
    where: {
      deleted: false,
    },
    attributes: { exclude: ["deleted"] },
    offset,
    limit,
  });
  return res.status(200).json({ data: { rows, count } });
};

const add = async (req, res) => {
  const { name, type, status, ip, deviceId, factoryId } = req.body;

  const newDevice = await Device.create({
    name,
    type,
    status,
    ip,
    deviceId,
    factoryId,
  });

  const { deleted, ...rest } = newDevice.toJSON();
  return res.status(201).json({ device: rest });
};

const remove = async (req, res) => {
  const id = req.params.id;
  const device = await Device.findOne({ where: { id, deleted: false } });
  if (device == null) {
    return res
      .status(404)
      .send({ errors: [`Device with id:${id} there no exists`] });
  }
  device.deleted = true;
  device.save();
  return res.status(200).json({ device });
};

const update = async (req, res) => {
  const id = req.params.id;
  return res.status(200).json({ success: true, id });
};

module.exports = {
  getAll,
  add,
  remove,
  update,
};
