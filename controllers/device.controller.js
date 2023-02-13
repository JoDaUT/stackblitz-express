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
    return res.status(500).json({ errors: ["Error creating device"] });
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
  return res.status(200).json({ success: true, id });
};

module.exports = {
  getAll,
  add,
  remove,
  update,
};
