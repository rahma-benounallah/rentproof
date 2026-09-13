function LandlordDashboard({ onAddProperty, onViewProperties }) {
  const landlordName = "Ahmed";
  const stats = {
    totalProperties: 3,
    available: 2,
    rented: 1,
    pendingRequests: 4,
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.welcome}>Welcome, {landlordName} 👋</h1>

      <div style={styles.statsGrid}>
        <StatCard label="My properties" value={stats.totalProperties} />
        <StatCard label="Available" value={stats.available} />
        <StatCard label="Rented" value={stats.rented} />
        <StatCard label="Pending requests" value={stats.pendingRequests} />
      </div>

      <div style={styles.buttonRow}>
        <button onClick={onAddProperty} style={styles.addButton}>
          + Add a property
        </button>
        <button onClick={onViewProperties} style={styles.viewButton}>
          View my properties
        </button>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div style={styles.card}>
      <p style={styles.cardValue}>{value}</p>
      <p style={styles.cardLabel}>{label}</p>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "sans-serif",
  },
  welcome: {
    fontSize: "1.8rem",
    marginBottom: "1.5rem",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "1rem",
  },
  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
    padding: "1.5rem",
    textAlign: "center",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
  },
  cardValue: {
    fontSize: "2rem",
    fontWeight: "bold",
    margin: 0,
  },
  cardLabel: {
    color: "#666",
    marginTop: "0.5rem",
  },
  buttonRow: {
    marginTop: "2rem",
    display: "flex",
    gap: "1rem",
  },
  addButton: {
    padding: "0.8rem 1.5rem",
    backgroundColor: "#0077cc",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  viewButton: {
    padding: "0.8rem 1.5rem",
    backgroundColor: "white",
    color: "#0077cc",
    border: "2px solid #0077cc",
    borderRadius: "6px",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

export default LandlordDashboard;