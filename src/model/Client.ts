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
  website?: string;
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
    website: { type: String },
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
