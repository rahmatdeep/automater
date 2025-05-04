import { Router } from "express";
import { authMiddleware } from "../middleware";
import { SigninSchema, SignupSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import bcrpyt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = Router();

router.post("/signup", async (req, res) => {
  const parsedData = SignupSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(411).json({
      message: "Incorrect Inputs",
    });
    return;
  }

  try {
    const userExsists = await prismaClient.user.findFirst({
      where: { email: parsedData.data.username },
    });

    if (userExsists) {
      res.status(403).json({
        message: "User already exsists",
      });
      return;
    }
  } catch (e) {
    console.log("Error", e);
    res.status(500).json({
      message: "Error while accessing db",
    });
  }
  try {
    const hashedPassword = await bcrpyt.hash(parsedData.data.password, 10);

    await prismaClient.user.create({
      data: {
        email: parsedData.data.username,
        password: hashedPassword,
        name: parsedData.data.name,
      },
    });
    // await sendEmail()
    res.json({
      message: "Please verify account by checking your email",
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Error while accessing db",
    });
    return;
  }
});

router.post("/signin", async (req, res) => {
  const parsedData = SigninSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(411).json({
      message: "Incorrect Inputs",
    });
    return;
  }
  try {
    const user = await prismaClient.user.findFirst({
      where: {
        email: parsedData.data.username,
      },
    });

    if (!user) {
      res.status(403).json({
        message: "User does not exsist",
      });
      return;
    }

    const isPasswordValid = await bcrpyt.compare(
      parsedData.data.password,
      user.password
    );

    if (!isPasswordValid) {
      res.status(401).json({
        message: "Password is invalid",
      });
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_PASSWORD as string
    );

    res.json({
      token,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal Servor Error",
    });
    return;
  }
});

router.get("/", authMiddleware, async (req, res) => {
  //@ts-ignore
  const id = req.id;
  try {
    const user = await prismaClient.user.findFirst({
      where: {
        id,
      },
      select: {
        email: true,
        name: true,
      },
    });

    res.json({
      user,
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal Servor Error",
    });
  }
});

export const userRouter: Router = router;
