const { hashAgreement } = require("../utils/hashAgreement");
const { submitRentalEvent } = require("./submitRentalEvent");

async function recordAgreementCreated(agreement) {
    // Create the agreement fingerprint
    const agreementHash = hashAgreement(agreement);

    // Data that will be recorded on Hedera
    const eventData = {
        eventType: "AGREEMENT_CREATED",
        agreementId: agreement.agreementId,
        agreementHash: agreementHash,
        timestamp: new Date().toISOString()
    };

    // Send the event to Hedera HCS
    const result = await submitRentalEvent(eventData);

    return {
        ...result,
        agreementHash
    };
}

module.exports = { recordAgreementCreated };