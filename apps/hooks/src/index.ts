import express from "express";
import { prismaClient } from "@repo/db/client";

const app = express();

app.use(express.json());

app.post("/hooks/catch/:userId/:zapId", (req, res) => {
  const { userId, zapId } = req.params;

  //store in trigger in db

  // push it to a queue
});
