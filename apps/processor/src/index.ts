import { prismaClient } from "@repo/db/client";
import { kafka, TOPIC_NAME } from "@repo/kafka/kafka-client";
(async () => {
  const producer = kafka.producer();
  await producer.connect();

  while (true) {
    try {
      const pendingRows = await prismaClient.zapRunOutbox.findMany({
        where: {},
        take: 10,
      });

      producer.send({
        topic: TOPIC_NAME,
        messages: pendingRows.map((r) => ({
          value: r.zapRunId,
        })),
      });

      await prismaClient.zapRunOutbox.deleteMany({
        where: {
          id: {
            in: pendingRows.map((r) => r.id),
          },
        },
      });
    } catch (e) {
      console.error(e);
    }
  }
})();
