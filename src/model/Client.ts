import mongoose, { Document, Schema } from "mongoose";

export interface IClient {
  name: string;
  address: {
    full: string;
    street: string;
    street2: string;
    city: string;
    state: string;
    zip: string;
  };
  email: string;
  password: string;
  phone: string;
  contactName: string;
  hours: {
    mon: string;
    tue: string;
    wed: string;
    thur: string;
    fri: string;
    sat: string;
    sun: string;
  };
  holidays: string[];
  website?: string;
  lat: string;
  lng: string;
  petLimit: {
    all: boolean;
    limit: number;
  };
}

export interface IClientModel extends IClient, Document {}

const ClientSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    address: {
      full: { type: String, required: true },
      street: { type: String, required: true },
      street2: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    contactName: { type: String, required: true },
    hours: {
      mon: { type: String, required: true },
      tue: { type: String, required: true },
      wed: { type: String, required: true },
      thur: { type: String, required: true },
      fri: { type: String, required: true },
      sat: { type: String, required: true },
      sun: { type: String, required: true },
    },
    holidays: [{ type: String, required: true }],
    website: { type: String },
    lat: { type: String, required: true },
    lng: { type: String, required: true },
    petLimit: {
      all: { type: Boolean, required: true, default: false },
      limit: { type: Number, required: true },
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

export default mongoose.model<IClientModel>("Client", ClientSchema);
