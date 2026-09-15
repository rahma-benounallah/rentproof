const crypto = require("crypto");

const generateAgreementHash = (agreement) => {
  const canonicalData = JSON.stringify({
    groupId: agreement.groupId,
    propertyId: agreement.propertyId,
    landlordId: agreement.landlordId,
    totalRent: agreement.totalRent,
    startDate: agreement.startDate,
    endDate: agreement.endDate,
    members: agreement.members
  });

  return crypto
    .createHash("sha256")
    .update(canonicalData)
    .digest("hex");
};

module.exports = {
  generateAgreementHash
};