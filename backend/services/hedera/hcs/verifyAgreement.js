const { hashAgreement } = require("../utils/hashAgreement");
const { readTopicMessages } = require("./readTopicMessages");

async function verifyAgreement(agreement) {
    const currentHash = hashAgreement(agreement);

    const data = await readTopicMessages();

    for (const message of data.messages) {
        try {
            const decoded = Buffer
                .from(message.message, "base64")
                .toString("utf8");

            const event = JSON.parse(decoded);

            if (
                event.eventType === "AGREEMENT_CREATED" &&
                event.agreementId === agreement.agreementId
            ) {
                if (event.agreementHash === currentHash) {
                    return {
                        verified: true,
                        message: "Agreement verified successfully",
                        currentHash,
                        recordedHash: event.agreementHash
                    };
                }

                return {
                    verified: false,
                    message: "Agreement has been modified",
                    currentHash,
                    recordedHash: event.agreementHash
                };
            }
        } catch (error) {
            console.log("Skipping invalid HCS message");
        }
    }

    return {
        verified: false,
        message: "No Hedera record found for this agreement",
        currentHash
    };
}

module.exports = {
    verifyAgreement
};