import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../model/User";

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, pet } = req.body;

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name,
    email,
    password,
    pet,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return user
    .save()
    .then((user) => res.status(201).json({ user }))
    .catch((error) => res.status(500).json({ error }));
};

const getUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return User.findById(userId)
    .then((user) =>
      user
        ? res.status(200).json({ user })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, password, pet } = req.body;
  const userId = req.params.userId;
  console.log("userId", userId);
  return User.findById(userId).then((user) => {
    console.log("user", user);
    if (user) {
      user.set({
        ...user,
        //   name: name ? name : user.name,
        password: password ? password : user.password,
        //   pet: pet ? pet : user.pet,
      });

      return user
        .save()
        .then((user) => res.status(201).json({ user }))
        .catch((error) => res.status(500).json({ error }));
    } else {
      res.status(404).json({ message: "Not found" });
    }
  });
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.body.userId;

  return User.findByIdAndDelete(userId)
    .then((user) =>
      user
        ? res.status(200).json({ message: "User deleted" })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default { createUser, getUser, updateUser, deleteUser };
