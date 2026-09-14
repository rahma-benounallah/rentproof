import { colors, fonts, buttonStyles, cardStyle } from "../../theme";
import Navbar from "../../components/Navbar";

function LandlordDashboard({
  onAddProperty,
  onViewProperties,
  onViewRequests,
  onViewAgreements,
}) {
  const landlordName = "Ahmed";
  const stats = {
    totalProperties: 3,
    available: 2,
    rented: 1,
    pendingRequests: 4,
  };

  return (
    <>
      <Navbar userName={landlordName} role="Landlord" />
      <div style={styles.container}>
        <h1 style={styles.welcome}>Welcome, {landlordName} 👋</h1>

        <div style={styles.statsGrid}>
          <StatCard label="My properties" value={stats.totalProperties} />
          <StatCard label="Available" value={stats.available} />
          <StatCard label="Rented" value={stats.rented} />
          <StatCard label="Pending requests" value={stats.pendingRequests} />
        </div>

        <div style={styles.buttonRow}>
          <button onClick={onAddProperty} style={buttonStyles.primary}>
            + Add a property
          </button>
          <button onClick={onViewProperties} style={buttonStyles.secondary}>
            View my properties
          </button>
          <button onClick={onViewRequests} style={buttonStyles.secondary}>
            View requests
          </button>
          <button onClick={onViewAgreements} style={buttonStyles.secondary}>
            View agreements
          </button>
        </div>
      </div>
    </>
  );
}

function StatCard({ label, value }) {
  return (
    <div style={cardStyle}>
      <p style={styles.cardValue}>{value}</p>
      <p style={styles.cardLabel}>{label}</p>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    fontFamily: fonts.family,
  },
  welcome: {
    fontSize: "1.8rem",
    marginBottom: "1.5rem",
    color: colors.textDark,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "1rem",
  },
  cardValue: {
    fontSize: "2rem",
    fontWeight: "bold",
    margin: 0,
    textAlign: "center",
  },
  cardLabel: {
    color: colors.textMuted,
    marginTop: "0.5rem",
    textAlign: "center",
  },
  buttonRow: {
    marginTop: "2rem",
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
  },
};

export default LandlordDashboard;