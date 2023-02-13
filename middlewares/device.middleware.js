const { Device } = require("../database/models");

async function deviceExists(req, res, next) {
  const { name, factoryId, ip } = req.body;
  console.log({ name, factoryId, ip });
  const device = await Device.findOne({
    where: { name, ip },
  });

  if (device) {
    return res.status(400).json({ errors: ["Device already exists"] });
  }

  next();
}

async function isValidDevice(req, res, next) {
  const { ip } = req.body;
  const validIp =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ip
    );
  if (!validIp) {
    return res.status(400).json({ errors: ["Invalid device data"] });
  }
  next();
}

module.exports = {
  deviceExists,
  isValidDevice,
};
