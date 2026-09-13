const {
    TopicCreateTransaction
} = require("@hashgraph/sdk");

const {
    getHederaClient
} = require("../hederaClient");

async function createRentalTopic() {
    const client = getHederaClient();

    try {
        console.log("Creating RentProof HCS topic...");

        const transaction = await new TopicCreateTransaction()
            .setTopicMemo("RentProof Rental Agreement Events")
            .execute(client);

        const receipt = await transaction.getReceipt(client);

        const topicId = receipt.topicId.toString();

        console.log("HCS topic created successfully!");
        console.log("Topic ID:", topicId);

        return topicId;

    } catch (error) {
        console.error("Error creating HCS topic:", error);

    } finally {
        client.close();
    }
}

createRentalTopic();