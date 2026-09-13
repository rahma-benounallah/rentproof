import { useState } from "react";

function AgreementDashboard({ onBack }) {
  // Données fictives — structure à confirmer avec Membre 3 (backend) et Membre 4 (Hedera)
  const [agreements] = useState([
    {
      id: "001",
      propertyTitle: "Apartment A27",
      tenants: ["Sara", "Amira"],
      status: "ACTIVE",
      hederaStatus: {
        nftCreated: true,
        hcsRecorded: true,
      },
    },
    {
      id: "002",
      propertyTitle: "Studio C3",
      tenants: ["Yasmine"],
      status: "PENDING",
      hederaStatus: {
        nftCreated: false,
        hcsRecorded: false,
      },
    },
  ]);

  return (
    <div style={styles.container}>
      <button onClick={onBack} style={styles.backButton}>
        ← Back to dashboard
      </button>

      <h1 style={styles.title}>My rental agreements</h1>

      <div style={styles.list}>
        {agreements.map((agreement) => (
          <div key={agreement.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Agreement #{agreement.id}</h3>
              <span
                style={{
                  ...styles.statusBadge,
                  backgroundColor:
                    agreement.status === "ACTIVE" ? "#e6f7ec" : "#fdf3e3",
                  color:
                    agreement.status === "ACTIVE" ? "#1a7f4b" : "#a56b00",
                }}
              >
                {agreement.status}
              </span>
            </div>

            <p style={styles.line}>
              <strong>Property:</strong> {agreement.propertyTitle}
            </p>
            <p style={styles.line}>
              <strong>Tenants:</strong> {agreement.tenants.join(", ")}
            </p>

            <div style={styles.hederaBox}>
              <p style={styles.hederaLine}>
                {agreement.hederaStatus.nftCreated ? "✅" : "⏳"} RentalRight
                NFT created
              </p>
              <p style={styles.hederaLine}>
                {agreement.hederaStatus.hcsRecorded ? "✅" : "⏳"} HCS event
                recorded
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "sans-serif",
    maxWidth: "600px",
    margin: "0 auto",
  },
  backButton: {
    marginBottom: "1rem",
    background: "none",
    border: "none",
    color: "#0077cc",
    cursor: "pointer",
    fontSize: "1rem",
  },
  title: {
    fontSize: "1.6rem",
    marginBottom: "1.5rem",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
    padding: "1.5rem",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
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
  },
  statusBadge: {
    padding: "0.2rem 0.6rem",
    borderRadius: "12px",
    fontSize: "0.8rem",
    fontWeight: "bold",
  },
  line: {
    margin: "0.3rem 0",
    color: "#333",
  },
  hederaBox: {
    marginTop: "1rem",
    paddingTop: "1rem",
    borderTop: "1px solid #ddd",
  },
  hederaLine: {
    margin: "0.3rem 0",
    fontSize: "0.9rem",
  },
};

export default AgreementDashboard;