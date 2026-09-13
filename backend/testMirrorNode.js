require("dotenv").config();
const {
    readTopicMessages
} = require("./services/hedera/hcs/readTopicMessages");

async function test() {
    try {
        const data = await readTopicMessages();

        console.log("Messages found:", data.messages.length);

        for (const message of data.messages) {
            const decoded = Buffer
                .from(message.message, "base64")
                .toString("utf8");

            console.log("\nHCS Message:");
            console.log(decoded);
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

test();