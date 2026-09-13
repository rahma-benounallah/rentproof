const {
    TopicMessageSubmitTransaction
} = require("@hashgraph/sdk");

const {
    getHederaClient
} = require("../hederaClient");


async function submitRentalEvent(eventData) {
    const client = getHederaClient();

    try {
        const topicId = process.env.HEDERA_RENTAL_TOPIC_ID;

        if (!topicId) {
            throw new Error("HEDERA_RENTAL_TOPIC_ID is missing in .env");
        }

        // Convert the JavaScript object into text
        const message = JSON.stringify(eventData);

        console.log("Sending message to HCS topic...");

        const transaction = await new TopicMessageSubmitTransaction()
            .setTopicId(topicId)
            .setMessage(message)
            .execute(client);

        const receipt = await transaction.getReceipt(client);

        console.log("Message successfully submitted!");

        return {
            status: receipt.status.toString(),
            transactionId: transaction.transactionId.toString()
        };

    } finally {
        client.close();
    }
}


module.exports = {
    submitRentalEvent
};