import mongoose, { Document, Schema } from "mongoose";

export interface IPet {
  type: string;
  name: string;
  breed: string;
  age: string;
  weight: string;
  size: string;
  preferredServices: object[];
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  pet: IPet[];
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    pet: { type: Array, required: true },
  },
  {
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: true },
  }
);

export default mongoose.model<IUserModel>("User", UserSchema);
