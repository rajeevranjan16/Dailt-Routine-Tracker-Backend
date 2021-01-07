import express from "express";
const router = express.Router();
import {
  createRecord,
  showRecord,
  updateRecord,
  updateRecordInDatabase,
  deleteRecord,
  userRegistration,
  userLogin,
  deleteUser,
  tokenIsValid,
} from "./../controllers/controller.js";
import { auth } from "./../middleware/auth.js";

router
  .post("/create", createRecord)
  .post("/user/register", userRegistration)
  .post("/user/login", userLogin)
  .post("/user/tokenisvalid", tokenIsValid);
router.get("/show", showRecord);

router.get("/:id", updateRecord);
router.post("/:id", updateRecordInDatabase);
router.delete("/:id", deleteRecord).delete("/user/delete", auth, deleteUser);

export default router;
