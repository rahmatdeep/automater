import { kafka, TOPIC_NAME } from "@repo/kafka/kafka-client";

(async () => {
    const consumer = kafka.consumer({ groupId: "main-worker" });
    await consumer.connect();

    await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });

    await consumer.run({
      autoCommit: false,
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          partition,
          offset: message.offset,
          value: message.value?.toString(),
        });
        await new Promise((r) => setTimeout(r, 1000));
        await consumer.commitOffsets([
          {
            topic: TOPIC_NAME,
            partition,
            offset: (parseInt(message.offset) + 1).toString(),
          },
        ]);
      },
    });
  
})();
