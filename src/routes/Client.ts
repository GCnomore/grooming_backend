import express from "express";
import controller from "../controller/Client";

const router = express.Router();

router.post("/create", controller.createClient);
router.post("/get", controller.getClient);
router.patch("/update/:clientId", controller.updateClient);
router.delete("/delete/:clientId", controller.deleteClient);

export = router;
