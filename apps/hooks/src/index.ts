import express from "express";
import { prismaClient } from "@repo/db/client";

const app = express();

app.use(express.json());

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const { userId, zapId } = req.params;
  const {body} = req
  await prismaClient.$transaction(async (tx) => {
    const run = await prismaClient.zapRun.create({
      data: {
        zapId: zapId,
      },
    });

    await prismaClient.zapRunOutbox.create({
      data: {
        zapRunId: zapId,
      },
    });
  });
});
