const { getHederaClient } = require("./services/hedera/hederaClient");

async function testConnection() {
    const client = getHederaClient();

    console.log("Hedera client initialized successfully");

    client.close();
}

testConnection().catch(console.error);