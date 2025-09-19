import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();

(async () => {
  await prismaClient.availableTriggers.create({
    data: {
      id: "webhook",
      name: "Webhook",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ1br_iLWHygV0qvoSqHxdotYCI-vLaR4owg&s",
    },
  });

  await prismaClient.availableActions.createMany({
    data: [
      {
        id: "email",
        name: "Email",
        image:
          "https://t3.ftcdn.net/jpg/01/70/65/08/360_F_170650817_gT28zz1u3arUvEqdYp7YpuTfVTiGoAJL.jpg",
      },
      {
        id: "send-sol",
        name: "Solana",
        image:
          "https://s3.coinmarketcap.com/static-gravity/image/5cc0b99a8dd84fbfa4e150d84b5531f2.png",
      },
    ],
  });
})();
