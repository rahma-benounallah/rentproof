const { hashAgreement } = require("./services/hedera/utils/hashAgreement");

const agreement = {
    agreementId: 1,
    monthlyRent: 450,
    duration: "12 months",
    numberOfStudents: 2
};

const hash = hashAgreement(agreement);

console.log("Agreement:");
console.log(agreement);

console.log("\nSHA-256 hash:");
console.log(hash);