console.log("TEST FILE STARTED");

require("dotenv").config();

const {
    recordAgreementCreated
} = require("./services/hedera/hcs/recordAgreementCreated");

const agreement = {
    agreementId: 1,
    monthlyRent: 450,
    duration: "12 months",
    numberOfStudents: 2
};

async function test() {
    try {
        console.log("TEST FUNCTION STARTED");

        const result = await recordAgreementCreated(agreement);

        console.log("Agreement recorded successfully!");
        console.log("Hash:", result.agreementHash);
        console.log("Transaction ID:", result.transactionId);
        console.log("Status:", result.status);

    } catch (error) {
        console.error("Error:", error);
    }
}

test();