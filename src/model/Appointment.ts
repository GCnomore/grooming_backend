import mongoose, { Document, Schema } from "mongoose";
import { IPet, IUser } from "./User";

export interface IAppointment {
  date: Date;
  location: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  customer: IUser;
  client: string;
  pet: IPet[];
  cutStyle?: string;
  cutImage?: File;
  services: string[];
}

export interface IAppointmentModel extends IAppointment, Document {}

const AppointmentSchema: Schema = new Schema(
  {
    date: { type: Date, required: true },
    location: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
    customer: { type: Schema.Types.ObjectId, required: true },
    client: { type: Schema.Types.ObjectId, required: true },
    pet: { type: Array, required: true },
    cutStyle: { type: String },
    cutImage: { data: Buffer, contentType: String },
    services: { type: Array, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

export default mongoose.model<IAppointmentModel>(
  "Appointment",
  AppointmentSchema
);
