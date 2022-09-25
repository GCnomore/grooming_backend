import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Client from "../model/Client";

const createClient = (req: Request, res: Response, next: NextFunction) => {
  const {
    name,
    address,
    email,
    password,
    phone,
    contactName,
    website,
    petLimit,
  } = req.body;

  const client = new Client({
    _id: new mongoose.Types.ObjectId(),
    name,
    address,
    email,
    password,
    phone,
    contactName,
    website,
    petLimit,
  });

  return client
    .save()
    .then((client) => res.status(201).json({ client }))
    .catch((error) => res.status(500).json({ error }));
};

const getClient = (req: Request, res: Response, next: NextFunction) => {
  const clientId = req.body.clientId;

  return Client.findById(clientId)
    .then((client) =>
      client
        ? res.status(200).json({ client })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const updateClient = (req: Request, res: Response, next: NextFunction) => {
  const {
    name,
    address,
    email,
    password,
    phone,
    contactName,
    website,
    petLimit,
  } = req.body;
  const clientId = req.params.clientId;

  return Client.findById(clientId).then((client) => {
    if (client) {
      client.set({
        name: name ?? client.name,
        address: address ?? client.address,
        email: email ?? client.email,
        password: password ?? client.password,
        phone: phone ?? client.phone,
        contactName: contactName ?? client.contactName,
        website: website ?? client.website,
        petLimit: petLimit ?? client.petLimit,
      });

      return client
        .save()
        .then((client) => res.status(201).json({ client }))
        .catch((error) => res.status(500).json({ error }));
    } else {
      res.status(404).json({ message: "Not found" });
    }
  });
};

const deleteClient = (req: Request, res: Response, next: NextFunction) => {
  const clientId = req.body.clientId;

  return Client.findByIdAndDelete(clientId)
    .then((client) =>
      client
        ? res.status(200).json({ message: "Client deleted" })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default { createClient, getClient, updateClient, deleteClient };
