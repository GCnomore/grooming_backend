import { Secret } from "jsonwebtoken";
import Cryptr from "cryptr";

export const SECRET_KEY: Secret = "2rjsdkanehahfmfRJf";
export const crypt = new Cryptr(process.env?.CRYPTR_SECRET ?? "");
