import { useState } from "react";
import StudentLayout from "./StudentLayout";

function Verification({ verification, onHome }) {
  const [copied, setCopied] = useState(false);

  function copyHash() {
    navigator.clipboard?.writeText(verification.hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <StudentLayout activeStep="verify" onHome={onHome}>
      <div style={styles.headRow}>
        <h1 style={styles.h1}>Rental Agreement #{verification.id}</h1>
        <span style={styles.statusBadge}>● ACTIVE</span>
      </div>
      <p style={styles.sub}>Monthly rent: {verification.rent} DT</p>

      <div style={styles.grid}>
        <div style={styles.card}>
          <p style={styles.cardLabel}>RentalRight NFT</p>
          <p style={styles.nftToken}>{verification.nftToken}</p>
          <p style={styles.nftSerial}>Serial #{verification.nftSerial}</p>
        </div>

        <div style={styles.card}>
          <p style={styles.cardLabel}>Agreement hash</p>
          <div style={styles.hashRow}>
            <code style={styles.hash}>{verification.hash}</code>
            <button className="rp-btn" onClick={copyHash} style={styles.copyBtn}>
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </div>

      <h3 style={styles.timelineTitle}>Hedera history</h3>
      <ol style={styles.timeline}>
        {verification.history.map((item, i) => (
          <li key={item} style={styles.timelineItem}>
            <span style={styles.timelineDot}>✓</span>
            <span style={styles.timelineText}>{item}</span>
            {i < verification.history.length - 1 && (
              <span style={styles.timelineLine} />
            )}
          </li>
        ))}
      </ol>

      <a
        href={verification.explorerUrl}
        target="_blank"
        rel="noreferrer"
        className="rp-btn"
        style={styles.explorerBtn}
      >
        View Hedera history ↗
      </a>
    </StudentLayout>
  );
}

const styles = {
  headRow: { display: "flex", alignItems: "center", gap: "0.9rem", flexWrap: "wrap" },
  h1: { fontSize: "1.7rem", fontWeight: 600, margin: "0 0 0.3rem" },
  statusBadge: {
    background: "var(--mint-soft)",
    color: "var(--mint)",
    fontSize: "0.78rem",
    fontWeight: 700,
    padding: "0.3rem 0.7rem",
    borderRadius: "var(--radius-pill)",
  },
  sub: { color: "var(--text-soft)", margin: "0 0 1.5rem" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1.1rem",
    marginBottom: "2rem",
  },
  card: {
    background: "var(--card)",
    border: "1px solid var(--line)",
    borderRadius: "var(--radius-md)",
    boxShadow: "var(--shadow)",
    padding: "1.25rem 1.4rem",
  },
  cardLabel: {
    fontSize: "0.78rem",
    fontWeight: 600,
    color: "var(--text-soft)",
    margin: "0 0 0.5rem",
    textTransform: "none",
  },
  nftToken: { fontSize: "1.15rem", fontWeight: 700, margin: 0, fontFamily: "ui-monospace, monospace" },
  nftSerial: { color: "var(--text-soft)", margin: "0.2rem 0 0", fontSize: "0.88rem" },
  hashRow: { display: "flex", alignItems: "center", gap: "0.5rem" },
  hash: {
    fontFamily: "ui-monospace, monospace",
    fontSize: "0.85rem",
    background: "var(--line-soft)",
    padding: "0.4rem 0.6rem",
    borderRadius: "var(--radius-sm)",
    overflowWrap: "anywhere",
    flex: 1,
  },
  copyBtn: {
    background: "var(--brand-soft)",
    color: "var(--brand)",
    border: "none",
    borderRadius: "var(--radius-sm)",
    padding: "0.4rem 0.7rem",
    fontSize: "0.8rem",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  timelineTitle: { fontSize: "1rem", fontWeight: 600, margin: "0 0 0.9rem" },
  timeline: { listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column" },
  timelineItem: { display: "flex", alignItems: "center", gap: "0.8rem", position: "relative", paddingBottom: "1.6rem" },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: "50%",
    background: "var(--mint)",
    color: "#fff",
    fontSize: "0.75rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    zIndex: 1,
  },
  timelineText: { fontSize: "0.92rem" },
  timelineLine: {
    position: "absolute",
    left: 11,
    top: 24,
    width: 2,
    height: "calc(100% - 24px)",
    background: "var(--line)",
  },
  explorerBtn: {
    display: "inline-block",
    background: "var(--brand)",
    color: "#fff",
    borderRadius: "var(--radius-sm)",
    padding: "0.75rem 1.4rem",
    fontWeight: 600,
    fontSize: "0.92rem",
    textDecoration: "none",
  },
};

export default Verification;
