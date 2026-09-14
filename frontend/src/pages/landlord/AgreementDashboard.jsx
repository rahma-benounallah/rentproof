import { useState } from "react";
import { colors, fonts, cardStyle } from "../../theme";
import Navbar from "../../components/Navbar";

function AgreementDashboard({ onBack }) {
  const [agreements] = useState([
    {
      id: 25,
      status: "active",
      property: { id: 12, title: "Apartment A27", city: "Gabès" },
      landlord: { id: 5, name: "Ahmed" },
      tenants: [
        { id: 21, name: "Sara", rentShare: 400 },
        { id: 22, name: "Amira", rentShare: 400 },
      ],
      rent: { total: 800, currency: "TND" },
      period: { start: "2026-10-01", end: "2027-09-30" },
      version: 1,
      documentHash: "a81f3c9e7b2d...9d72",
      hedera: {
        network: "testnet",
        nft: { created: true, tokenId: "0.0.123456", serialNumber: 1 },
        hcs: {
          eventRecorded: true,
          topicId: "0.0.789012",
          transactionId: "0.0.123456@1727000000.123456789",
          consensusTimestamp: "2026-09-20T14:32:10.123Z",
        },
      },
      events: [
        { type: "AGREEMENT_CREATED", timestamp: "2026-09-20T14:30:00.000Z" },
        { type: "AGREEMENT_ACCEPTED", timestamp: "2026-09-20T14:31:00.000Z" },
        {
          type: "RENTAL_RIGHT_CREATED",
          timestamp: "2026-09-20T14:32:10.123Z",
        },
      ],
    },
    {
      id: 26,
      status: "pending",
      property: { id: 15, title: "Studio C3", city: "Gabès" },
      landlord: { id: 5, name: "Ahmed" },
      tenants: [{ id: 30, name: "Yasmine", rentShare: 550 }],
      rent: { total: 550, currency: "TND" },
      period: { start: "2026-10-15", end: "2027-09-30" },
      version: 1,
      documentHash: null,
      hedera: {
        network: "testnet",
        nft: { created: false, tokenId: null, serialNumber: null },
        hcs: {
          eventRecorded: false,
          topicId: null,
          transactionId: null,
          consensusTimestamp: null,
        },
      },
      events: [
        { type: "AGREEMENT_CREATED", timestamp: "2026-09-21T09:00:00.000Z" },
      ],
    },
  ]);

  const formatDate = (isoString) => {
    if (!isoString) return "—";
    return new Date(isoString).toLocaleString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const eventLabels = {
    AGREEMENT_CREATED: "Agreement created",
    AGREEMENT_ACCEPTED: "Agreement accepted",
    RENTAL_RIGHT_CREATED: "Rental right created",
  };

  return (
    <>
      <Navbar userName="Ahmed" role="Landlord" />
      <div style={styles.container}>
        <button onClick={onBack} style={styles.backButton}>
          ← Back to dashboard
        </button>

        <h1 style={styles.title}>My rental agreements</h1>

        <div style={styles.list}>
          {agreements.map((agreement) => (
            <div key={agreement.id} style={cardStyle}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>Agreement #{agreement.id}</h3>
                <span
                  style={{
                    ...styles.statusBadge,
                    backgroundColor:
                      agreement.status === "active"
                        ? colors.successLight
                        : colors.warningLight,
                    color:
                      agreement.status === "active"
                        ? colors.success
                        : colors.warning,
                  }}
                >
                  {agreement.status.toUpperCase()}
                </span>
              </div>

              <p style={styles.line}>
                <strong>Property:</strong> {agreement.property.title} (
                {agreement.property.city})
              </p>
              <p style={styles.line}>
                <strong>Tenants:</strong>{" "}
                {agreement.tenants
                  .map(
                    (t) => `${t.name} (${t.rentShare} ${agreement.rent.currency})`
                  )
                  .join(", ")}
              </p>
              <p style={styles.line}>
                <strong>Period:</strong> {agreement.period.start} →{" "}
                {agreement.period.end}
              </p>

              <div style={styles.hederaBox}>
                <p style={styles.hederaLine}>
                  {agreement.hedera.nft.created ? "✅" : "⏳"} Rental Right
                  NFT
                  {agreement.hedera.nft.created && (
                    <span style={styles.hederaDetail}>
                      {" "}
                      — Token {agreement.hedera.nft.tokenId} #
                      {agreement.hedera.nft.serialNumber}
                    </span>
                  )}
                </p>
                <p style={styles.hederaLine}>
                  {agreement.hedera.hcs.eventRecorded ? "✅" : "⏳"} HCS event
                  recorded
                  {agreement.hedera.hcs.eventRecorded && (
                    <span style={styles.hederaDetail}>
                      {" "}
                      — Topic {agreement.hedera.hcs.topicId}
                    </span>
                  )}
                </p>
                {agreement.hedera.hcs.consensusTimestamp && (
                  <p style={styles.hederaLine}>
                    🕒 Consensus:{" "}
                    {formatDate(agreement.hedera.hcs.consensusTimestamp)}
                  </p>
                )}
                {agreement.documentHash && (
                  <p style={styles.hederaLine}>
                    🔐 Hash: {agreement.documentHash}
                  </p>
                )}
              </div>

              <div style={styles.eventHistory}>
                <p style={styles.eventTitle}>Event history</p>
                {agreement.events.map((event, index) => (
                  <p key={index} style={styles.eventLine}>
                    ✓ {eventLabels[event.type] || event.type} —{" "}
                    {formatDate(event.timestamp)}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    padding: "2rem",
    fontFamily: fonts.family,
    maxWidth: "600px",
    margin: "0 auto",
  },
  backButton: {
    marginBottom: "1rem",
    background: "none",
    border: "none",
    color: colors.primary,
    cursor: "pointer",
    fontSize: "1rem",
  },
  title: {
    fontSize: "1.6rem",
    marginBottom: "1.5rem",
    color: colors.textDark,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.5rem",
  },
  cardTitle: {
    margin: 0,
    fontSize: "1.1rem",
    color: colors.textDark,
  },
  statusBadge: {
    padding: "0.2rem 0.6rem",
    borderRadius: "12px",
    fontSize: "0.8rem",
    fontWeight: "bold",
  },
  line: {
    margin: "0.3rem 0",
    color: colors.textDark,
    fontSize: "0.95rem",
  },
  hederaBox: {
    marginTop: "1rem",
    paddingTop: "1rem",
    borderTop: `1px solid ${colors.border}`,
  },
  hederaLine: {
    margin: "0.3rem 0",
    fontSize: "0.85rem",
  },
  hederaDetail: {
    color: colors.textMuted,
    fontWeight: "normal",
  },
  eventHistory: {
    marginTop: "1rem",
    paddingTop: "1rem",
    borderTop: `1px solid ${colors.border}`,
  },
  eventTitle: {
    fontWeight: "bold",
    fontSize: "0.9rem",
    marginBottom: "0.3rem",
    color: colors.textDark,
  },
  eventLine: {
    margin: "0.2rem 0",
    fontSize: "0.85rem",
    color: colors.textMuted,
  },
};

export default AgreementDashboard;