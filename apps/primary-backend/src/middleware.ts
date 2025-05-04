import { NextFunction, Request, Response } from "express";
import jwt, { JwtHeader } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization as unknown as string;

  try {
    const payload = jwt.verify(token, process.env.JWT_PASSWORD as string);
    if (!payload) {
      res.status(403).json({
        message: "Unauthorized",
      });
      return;
    }
    //@ts-ignore
    req.id = payload.id;
    next();
  } catch (e) {
    res.status(403).json({
      message: "Unauthorized",
    });
    return;
  }
}
