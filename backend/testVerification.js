console.log("VERIFICATION TEST STARTED");

require("dotenv").config();

const { verifyAgreement } = require("./services/hedera/hcs/hcsService");

const agreement = {
    agreementId: 1,
    monthlyRent: 600,
    duration: "12 months",
    numberOfStudents: 2,
    version: 2
};

async function test() {
    try {
        const result = await verifyAgreement(agreement);

        console.log("Verification result:");
        console.log(result);

    } catch (error) {
        console.error("Error:", error);
    }
}

test();