import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../model/User";
import { SECRET_KEY } from "../constants";

dotenv.config();

const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password, name } = req.body;

  return User.findOne({ email, password }).then((user) => {
    jwt.sign({ user }, SECRET_KEY, { expiresIn: "30 days" }, (err, token) => {
      if (!err) {
        res.status(200).json({ token });
      } else {
        res.status(401).send("jwt error");
      }
    });
  });
};
