const crypto = require("crypto");

function hashAgreement(agreement) {
    const agreementText = JSON.stringify(agreement);

    const hash = crypto
        .createHash("sha256")
        .update(agreementText)
        .digest("hex");

    return hash;
}

module.exports = {
    hashAgreement
};