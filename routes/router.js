import express from "express";
const router = express.Router();
import {
  createRecord,
  showRecord,
  updateRecord,
  updateRecordInDatabase,
  deleteRecord,
} from "./../controllers/controller.js";

router.post("/create", createRecord);
router.get("/show", showRecord);

router.get("/:id", updateRecord);
router.post("/:id", updateRecordInDatabase);
router.delete("/:id", deleteRecord);

export default router;
