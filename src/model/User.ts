import mongoose, { Document, Schema } from "mongoose";

export interface IPet {
  type: string;
  breed: string;
  name: string;
  age: number;
  weight?: number;
  preferredServices: object[];
}

export interface IUser {
  name: string;
  //   email: string;
  password: string;
  //   pet: IPet[];
  //   createdAt: Date;
  //   updatedAt: Date;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    //  email: { type: String, required: true },
    password: { type: String, required: true },
    //  pet: { type: Array, required: true },
    //  createdAt: { type: Date, required: true },
    //  updatedAt: { type: Date, required: true },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IUserModel>("User", UserSchema);
