import { useState } from "react";

function RentalRequests({ onBack, onAccept }) {
  // Données fictives — seront remplacées par GET /api/rental-requests plus tard
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
    // Plus tard : PATCH /api/rental-requests/:id/accept
    setRequests(requests.filter((r) => r.id !== request.id));
    onAccept(request); // envoie la demande acceptée vers la création d'accord
  };

  const handleReject = (id) => {
    const confirmReject = window.confirm("Reject this request?");
    if (!confirmReject) return;

    // Plus tard : PATCH /api/rental-requests/:id/reject
    setRequests(requests.filter((r) => r.id !== id));
  };

  return (
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
          <div key={request.id} style={styles.card}>
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
                style={styles.acceptButton}
              >
                Accept request
              </button>
              <button
                onClick={() => handleReject(request.id)}
                style={styles.rejectButton}
              >
                Reject request
              </button>
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
  empty: {
    color: "#777",
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
  cardInfo: {
    marginBottom: "1rem",
  },
  cardTitle: {
    margin: "0 0 0.5rem 0",
    fontSize: "1.1rem",
  },
  line: {
    margin: "0.2rem 0",
    color: "#333",
  },
  actions: {
    display: "flex",
    gap: "0.5rem",
  },
  acceptButton: {
    padding: "0.6rem 1.2rem",
    backgroundColor: "#1a7f4b",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  rejectButton: {
    padding: "0.6rem 1.2rem",
    backgroundColor: "#c0392b",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
};

export default RentalRequests;