const https = require("https");

function readTopicMessages() {
    return new Promise((resolve, reject) => {
        const topicId = process.env.HEDERA_RENTAL_TOPIC_ID;

        if (!topicId) {
            reject(new Error("HEDERA_RENTAL_TOPIC_ID is missing"));
            return;
        }

        const url =
            `https://testnet.mirrornode.hedera.com/api/v1/topics/${topicId}/messages`;

        https.get(url, (response) => {
            let data = "";

            response.on("data", (chunk) => {
                data += chunk;
            });

            response.on("end", () => {
                if (response.statusCode !== 200) {
                    reject(
                        new Error(`Mirror Node error: ${response.statusCode}`)
                    );
                    return;
                }

                try {
                    const parsedData = JSON.parse(data);
                    resolve(parsedData);
                } catch (error) {
                    reject(new Error("Mirror Node returned invalid JSON"));
                }
            });
        }).on("error", (error) => {
            reject(error);
        });
    });
}

module.exports = {
    readTopicMessages
};