import express from "express";
import controller from "../controller/Appointment";

const router = express.Router();

router.post("/create", controller.createAppointment);
router.post("/get", controller.getAppointment);
router.patch("/update/:appointmentId", controller.updateAppointment);
router.delete("/delete/:appointmentId", controller.deleteAppointment);

export = router;
