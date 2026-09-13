import { useState } from "react";
import StudentLayout from "./StudentLayout";

function Agreement({ agreement, onHome, onAccept }) {
  const [accepted, setAccepted] = useState(false);
  const share = Math.round(agreement.rent / agreement.tenants.length);

  function handleAccept() {
    setAccepted(true);
    onAccept();
  }

  return (
    <StudentLayout activeStep="agreement" onHome={onHome}>
      <h1 style={styles.h1}>Your rental agreement</h1>
      <p style={styles.sub}>Review the terms — every tenant must accept.</p>

      <div style={styles.card}>
        <div style={styles.row}>
          <span style={styles.rowLabel}>Apartment</span>
          <span style={styles.rowValue}>{agreement.property}</span>
        </div>
        <div style={styles.row}>
          <span style={styles.rowLabel}>Landlord</span>
          <span style={styles.rowValue}>{agreement.landlord}</span>
        </div>
        <div style={styles.row}>
          <span style={styles.rowLabel}>Lease dates</span>
          <span style={styles.rowValue}>
            {agreement.start} → {agreement.end}
          </span>
        </div>

        <div style={styles.divider} />

        <h3 style={styles.splitTitle}>Monthly rent split</h3>
        {agreement.tenants.map((name) => (
          <div key={name} style={styles.row}>
            <span style={styles.rowLabel}>{name}</span>
            <span style={styles.rowValue}>{share} DT</span>
          </div>
        ))}
        <div style={{ ...styles.row, ...styles.totalRow }}>
          <span style={styles.rowLabel}>Total</span>
          <span style={styles.rowValue}>{agreement.rent} DT/month</span>
        </div>
      </div>

      {accepted ? (
        <div style={styles.acceptedNotice}>
          ✓ You've accepted. Waiting on the other party before this becomes
          active.
        </div>
      ) : (
        <button className="rp-btn" onClick={handleAccept} style={styles.acceptBtn}>
          Accept agreement
        </button>
      )}
    </StudentLayout>
  );
}

const styles = {
  h1: { fontSize: "1.7rem", fontWeight: 600, margin: "0 0 0.3rem" },
  sub: { color: "var(--text-soft)", margin: "0 0 1.5rem" },
  card: {
    background: "var(--card)",
    border: "1px solid var(--line)",
    borderRadius: "var(--radius-md)",
    boxShadow: "var(--shadow)",
    padding: "1.5rem 1.6rem",
    marginBottom: "1.5rem",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.55rem 0",
  },
  rowLabel: { color: "var(--text-soft)", fontSize: "0.92rem" },
  rowValue: { fontWeight: 600, fontSize: "0.92rem" },
  divider: { borderTop: "1px solid var(--line-soft)", margin: "0.75rem 0" },
  splitTitle: { fontSize: "0.95rem", fontWeight: 600, margin: "0 0 0.3rem" },
  totalRow: { borderTop: "1px dashed var(--line)", marginTop: "0.3rem", paddingTop: "0.75rem" },
  acceptBtn: {
    background: "var(--brand)",
    color: "#fff",
    border: "none",
    borderRadius: "var(--radius-sm)",
    padding: "0.85rem 1.5rem",
    fontWeight: 600,
    fontSize: "0.98rem",
  },
  acceptedNotice: {
    background: "var(--mint-soft)",
    color: "var(--mint)",
    borderRadius: "var(--radius-sm)",
    padding: "0.9rem 1.1rem",
    fontWeight: 600,
    fontSize: "0.9rem",
  },
};

export default Agreement;
