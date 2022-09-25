import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Appointment from "../model/Appointment";

const createAppointment = (req: Request, res: Response, next: NextFunction) => {
  const {
    date,
    location,
    customer,
    pet,
    cutStyle,
    cutImage,
    services,
    client,
  } = req.body;

  const appointment = new Appointment({
    _id: new mongoose.Types.ObjectId(),
    date,
    location,
    customer,
    pet,
    cutStyle,
    cutImage,
    services,
    client,
  });

  return appointment
    .save()
    .then((appointment) => res.status(201).json({ appointment }))
    .catch((error) => res.status(500).json({ error }));
};

const getAppointment = (req: Request, res: Response, next: NextFunction) => {
  const appointmentId = req.body.appointmentId;

  return Appointment.findById(appointmentId)
    .then((appointment) =>
      appointment
        ? res.status(200).json({ appointment })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const updateAppointment = (req: Request, res: Response, next: NextFunction) => {
  const { date, pet, cutStyle, cutImage, services } = req.body;
  const appointmentId = req.params.appointmentId;

  return Appointment.findById(appointmentId).then((appointment) => {
    if (appointment) {
      appointment.set({
        date: date ?? appointment.date,
        pet: pet ?? appointment.pet,
        cutStyle: cutStyle ?? appointment.cutStyle,
        cutImage: cutImage ?? appointment.cutImage,
        services: services ?? appointment.services,
      });

      return appointment
        .save()
        .then((appointment) => res.status(201).json({ appointment }))
        .catch((error) => res.status(500).json({ error }));
    } else {
      res.status(404).json({ message: "Not found" });
    }
  });
};

const deleteAppointment = (req: Request, res: Response, next: NextFunction) => {
  const appointmentId = req.body.appointmentId;

  return Appointment.findByIdAndDelete(appointmentId)
    .then((appointment) =>
      appointment
        ? res.status(200).json({ message: "Appointment deleted" })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createAppointment,
  getAppointment,
  updateAppointment,
  deleteAppointment,
};
