import { prismaClient } from "@repo/db/client";
import { Router } from "express";

const router = Router();

router.get("/available", async (req, res) => {
  try {
    const availableTriggers = await prismaClient.availableTriggers.findMany({});
    res.json({
      availableTriggers,
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal Servor Error",
    });
    return;
  }
});

export const triggerRouter: Router = router;
