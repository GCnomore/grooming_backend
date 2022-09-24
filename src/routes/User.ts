import express from "express";
import controller from "../controller/User";

const router = express.Router();

router.post("/create", controller.createUser);
router.post("/get", controller.getUser);
router.patch("/update/:userId", controller.updateUser);
router.delete("/delete/:userId", controller.deleteUser);

export = router;
