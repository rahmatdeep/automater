import { z } from "zod";

export const SignupSchema = z.object({
  username: z.string().min(5),
  password: z.string().min(6),
  name: z.string().min(3),
});

export const SigninSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const ZapCreateSchema = z.object({
  availableTriggerId: z.string(),
  triggerMetadata: z.any().optional(),
  actions: z.array(
    z.object({
      availableActionId: z.string(),
      actionMetadata: z.any().optional(),
    })
  ),
});

export interface Zap {
  id: string;
  triggerId: string;
  userId: number;
  action: {
    id: string;
    zapId: string;
    actionId: string;
    sortingOrder: number;
    type: {
      id: string;
      name: string;
      image: string;
    };
  }[];
  trigger: {
    id: string;
    availableTriggersId: string;
    zapId: string;
    type: {
      id: string;
      name: string;
      image: string;
    };
  };
}
