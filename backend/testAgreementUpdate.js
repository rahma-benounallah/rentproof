console.log("UPDATE TEST STARTED");

require("dotenv").config();

const {
    recordAgreementUpdated
} = require("./services/hedera/hcs/hcsService");

const agreement = {
    agreementId: 1,
    monthlyRent: 500,
    duration: "12 months",
    numberOfStudents: 2,
    version: 2
};

async function test() {
    try {
        const result = await recordAgreementUpdated(agreement);

        console.log("Agreement update recorded successfully!");
        console.log("Version:", agreement.version);
        console.log("Hash:", result.agreementHash);
        console.log("Transaction ID:", result.transactionId);
        console.log("Status:", result.status);

    } catch (error) {
        console.error("Error:", error);
    }
}

test();
