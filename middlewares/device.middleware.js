const { Device, Sequelize } = require("../database/models");

async function newDeviceRequired(req, res, next) {
  const { name, factoryId, ip } = req.body;
  const device = await Device.findOne({
    where: {
      [Sequelize.Op.or]: [
        { name, factoryId },
        { ip, factoryId },
      ],
    },
  });

  if (device) {
    return res.status(400).json({ errors: ["Device already exists"] });
  }

  next();
}

async function deviceExistsRequired(req, res, next) {
  const { id } = req.params;
  const device = await Device.findOne({
    where: { id },
  });

  if (!device) {
    return res.status(404).json({ errors: ["Device does not exist"] });
  }

  next();
}

async function isValidDevice(req, res, next) {
  const { ip, status } = req.body;
  const validIp =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ip
    );
  if (!validIp) {
    return res.status(400).json({ errors: ["Invalid device data"] });
  }

  if (!["Online", "Offline"].includes(status)) {
    return res.status(400).json({ errors: ["Invalid device data"] });
  }
  next();
}

module.exports = {
  newDeviceRequired,
  deviceExistsRequired,
  isValidDevice,
};
