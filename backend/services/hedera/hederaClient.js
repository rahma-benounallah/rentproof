require("dotenv").config();

const {
  Client,
  PrivateKey,
  AccountId,
} = require("@hashgraph/sdk");

function getHederaClient() {
  const network = process.env.HEDERA_NETWORK || "testnet";

  const accountId = AccountId.fromString(
    process.env.HEDERA_ACCOUNT_ID
  );

  const privateKey = PrivateKey.fromString(
    process.env.HEDERA_PRIVATE_KEY
  );

  let client;

  if (network === "mainnet") {
    client = Client.forMainnet();
  } else {
    client = Client.forTestnet();
  }

  client.setOperator(accountId, privateKey);

  return client;
}

module.exports = {
  getHederaClient,
};