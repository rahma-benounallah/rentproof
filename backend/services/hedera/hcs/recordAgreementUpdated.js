const { hashAgreement } = require("../utils/hashAgreement");
const { submitRentalEvent } = require("./submitRentalEvent");

async function recordAgreementUpdated(agreement) {

    const agreementHash = hashAgreement(agreement);

    const eventData = {
        eventType: "AGREEMENT_UPDATED",
        agreementId: agreement.agreementId,
        version: agreement.version,
        agreementHash: agreementHash,
        timestamp: new Date().toISOString()
    };

    const result = await submitRentalEvent(eventData);

    return {
        ...result,
        agreementHash
    };
}

module.exports = {
    recordAgreementUpdated
};