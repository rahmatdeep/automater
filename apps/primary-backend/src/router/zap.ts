import { Router } from "express";
import { authMiddleware } from "../middleware";
import { ZapCreateSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

const router = Router();

router.post("/", authMiddleware, async (req, res) => {
  const parsedData = ZapCreateSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(411).json({
      message: "Invalid Inputs",
    });
    return;
  }
  try {
    await prismaClient.zap.create({
      data: {
        //@ts-ignore
        userId: req.id,
        trigger: {
          create: {
            availableTriggersId: parsedData.data.availableTriggerId,
          },
        },
        action: {
          create: parsedData.data.actions.map((x, index) => ({
            availableActionsId: x.availableActionId,
            sortingOrder: index,
          })),
        },
      },
    });

    res.json({
      message: "Zap created successfully",
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal Servor Error",
    });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  const zaps = await prismaClient.zap.findMany({
    where: {
      //@ts-ignore
      userId: req.id,
    },
    include: {
      action: {
        include: {
          type: true,
        },
      },
      trigger:{
        include:{
          type: true
        }
      }
    },
  });

  res.json({
    zaps,
  });
  return;
});

router.get("/:zapId", authMiddleware, async (req, res) => {
  const zapId = req.params.zapId

  try{
    const zap = await prismaClient.zap.findFirst({
      where: {
        id: zapId,
        //@ts-ignore
        userId: req.id
      },
      include: {
        action: {
          include: {
            type: true,
          },
        },
        trigger:{
          include:{
            type: true
          }
        }
      }
    }) 
    res.json({
      zap
    })
    return
  }catch(e){
    console.log(e)
    res.status(500).json({
      message: "Internal Servor Error"
    })
    return
  }
});

export const zapRouter: Router = router;
