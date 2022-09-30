import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Logging from "../library/Logging";
import User, { IUser } from "../model/User";
import {
  create,
  deleteById,
  findByEmail,
  findById,
  update,
} from "../services/User";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, pet } = req.body;

  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    name,
    email,
    password,
    pet,
  });

  const user = await findByEmail(email);
  if (user) {
    return res.status(409).json({ message: "User already exists" });
  } else {
    const _newUser = await create(newUser);
    if (!_newUser) {
      return res.status(201).json({ user });
    } else {
      return res.status(500);
    }
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.body.userId;

  const user = await findById(userId);

  if (user) {
    return res.status(200).json({ user });
  } else {
    return res.status(404).json({ message: "Not found" });
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, password, pet } = req.body;
  const userId = req.params.userId;

  const user = await findById(userId);
  if (!user) {
    Logging.error("User doesn't exists");
    res.status(404).json({ message: "Not found" });
  } else {
    const updatedUser: IUser = {
      email: user.email,
      name: name ?? user.name,
      password: password ?? user.password,
      pet: pet ?? user.pet,
    };

    try {
      await update(user, updatedUser);
      return res.status(201);
    } catch (error) {
      Logging.error(`Update user error: ${error}`);
      return res.status(500).json({ error });
    }
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.body.userId;

  try {
    await deleteById(userId);
    Logging.warn(`User deleted: ${userId}`);
    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    Logging.error(`Delete user error: ${error}`);
    return res.status(500).json({ error });
  }
};

export default { createUser, getUser, updateUser, deleteUser };
