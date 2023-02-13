"use strict";

const express = require("express");
const {
  getAll,
  add,
  remove,
  update,
} = require("../controllers/device.controller");
const {
  newDeviceRequired,
  deviceExistsRequired,
  isValidDevice,
} = require("../middlewares/device.middleware");
const router = express.Router();

router.get("/", getAll);
router.post("/", [newDeviceRequired, isValidDevice], add);
router.delete("/:id", remove);
router.put("/:id", [deviceExistsRequired, isValidDevice], update);
module.exports = router;
