const {
    submitRentalEvent
} = require("./services/hedera/hcs/submitRentalEvent");


async function testHCS() {
    const result = await submitRentalEvent({
        event: "TEST_EVENT",
        agreementId: 1,
        message: "Hello from RentProof"
    });

    console.log(result);
}


testHCS().catch((error) => {
    console.error("HCS test failed:", error);
});