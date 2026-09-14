import { useState } from "react";
import { colors, fonts, buttonStyles, cardStyle } from "../../theme";
import Navbar from "../../components/Navbar";

function RentalRequests({ onBack, onAccept }) {
  const [requests, setRequests] = useState([
    {
      id: 15,
      propertyTitle: "Apartment A27",
      groupName: "Sara's group",
      members: ["Sara", "Amira"],
      totalRent: 800,
    },
    {
      id: 18,
      propertyTitle: "Studio C3",
      groupName: "Yasmine's group",
      members: ["Yasmine"],
      totalRent: 550,
    },
  ]);

  const handleAccept = (request) => {
    setRequests(requests.filter((r) => r.id !== request.id));
    onAccept(request);
  };

  const handleReject = (id) => {
    const confirmReject = window.confirm("Reject this request?");
    if (!confirmReject) return;
    setRequests(requests.filter((r) => r.id !== id));
  };

  return (
    <>
      <Navbar userName="Ahmed" role="Landlord" />
      <div style={styles.container}>
        <button onClick={onBack} style={styles.backButton}>
          ← Back to dashboard
        </button>

        <h1 style={styles.title}>Rental requests</h1>

        {requests.length === 0 && (
          <p style={styles.empty}>No pending requests right now.</p>
        )}

        <div style={styles.list}>
          {requests.map((request) => (
            <div key={request.id} style={cardStyle}>
              <div style={styles.cardInfo}>
                <h3 style={styles.cardTitle}>New rental request</h3>
                <p style={styles.line}>
                  <strong>Apartment:</strong> {request.propertyTitle}
                </p>
                <p style={styles.line}>
                  <strong>Requested by:</strong> {request.groupName}
                </p>
                <p style={styles.line}>
                  <strong>Members:</strong> {request.members.join(", ")}
                </p>
                <p style={styles.line}>
                  <strong>Total rent:</strong> {request.totalRent} DT/month
                </p>
              </div>

              <div style={styles.actions}>
                <button
                  onClick={() => handleAccept(request)}
                  style={buttonStyles.success}
                >
                  Accept request
                </button>
                <button
                  onClick={() => handleReject(request.id)}
                  style={buttonStyles.danger}
                >
                  Reject request
                </button>
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
  empty: {
    color: colors.textMuted,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  cardInfo: {
    marginBottom: "1rem",
  },
  cardTitle: {
    margin: "0 0 0.5rem 0",
    fontSize: "1.1rem",
    color: colors.textDark,
  },
  line: {
    margin: "0.2rem 0",
    color: colors.textDark,
  },
  actions: {
    display: "flex",
    gap: "0.5rem",
  },
};

export default RentalRequests;