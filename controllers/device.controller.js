const { DataTypes } = require("sequelize");
const {
  Device,
  Printer3D,
  Furnance,
  QualityCheckDevice,
  sequelize,
} = require("../database/models");

const deviceTypeList = {
  "3dPrinter": Printer3D,
  Furnance: Furnance,
  qualityCheckDevice: QualityCheckDevice,
};

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
  const { name, type, status, ip, factoryId, deviceType, details } = req.body;
  const t = await sequelize.transaction();
  try {
    const newDevice = await Device.create(
      {
        name,
        type,
        status,
        ip,
        factoryId,
        deviceType,
      },
      { transaction: t }
    );

    let specificDevice = {};
    if (details) {
      const model = deviceTypeList[deviceType];
      specificDevice = await model.create(
        {
          deviceId: newDevice.id,
          ...details,
        },
        { transaction: t }
      );
    }
    await t.commit();
    const { deleted, ...rest } = {
      ...newDevice.toJSON(),
    };
    return res.status(201).json({ device: rest });
  } catch (errors) {
    console.log(errors);
    return res.status(400).json({
      errors: ["Error creating device. Check if the payload is valid"],
    });
  }
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

  const { name, type, status, ip, factoryId, details } = req.body;
  const t = await sequelize.transaction();
  try {
    const fieldsToUpdate = { name, type, status, ip, factoryId };

    const device = await Device.findOne({ where: { id } });

    await device.update({ ...fieldsToUpdate }, { where: { id } });
    const deviceUpdated = await Device.findOne({ where: { id } });
    let specificDevice = {};
    if (details) {
      const deviceType = device.deviceType;

      const model = deviceTypeList[deviceType];

      await model.update(
        { ...details },
        { where: { deviceId: id }, transaction: t }
      );
    }
    await t.commit();
    const { deleted, ...rest } = {
      ...deviceUpdated.toJSON(),
    };
    return res.status(200).json({ device: rest });
  } catch (errors) {
    console.log(errors);
    return res.status(400).json({
      errors: ["Error updating device. Check if the payload is valid"],
    });
  }
};

module.exports = {
  getAll,
  add,
  remove,
  update,
};
