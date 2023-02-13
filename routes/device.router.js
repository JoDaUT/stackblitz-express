"use strict";

const express = require("express");
const {
  getAll,
  add,
  remove,
  update,
} = require("../controllers/device.controller");
const {
  doesNotExistById,
  deviceExists,
  isValidDevice,
} = require("../middlewares/device.middleware");
const router = express.Router();

router.get("/", getAll);
router.post("/", [deviceExists, isValidDevice], add);
router.delete("/:id", remove);
router.put("/:id", [doesNotExistById, isValidDevice], update);
module.exports = router;
