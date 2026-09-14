import { useState } from "react";
import { colors, fonts, buttonStyles, cardStyle } from "../../theme";
import Navbar from "../../components/Navbar";

function PropertyList({ onBack }) {
  const [properties, setProperties] = useState([
    { id: 7, title: "Apartment A27", rent: 800, status: "Available" },
    { id: 14, title: "Apartment B14", rent: 900, status: "Rented" },
    { id: 22, title: "Studio C3", rent: 550, status: "Available" },
  ]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Delete this property?");
    if (!confirmDelete) return;
    setProperties(properties.filter((p) => p.id !== id));
  };

  const handleEdit = (id) => {
    alert(`Edit property #${id} (not built yet)`);
  };

  const handleViewTenants = (id) => {
    alert(`View tenants for property #${id} (not built yet)`);
  };

  return (
    <>
      <Navbar userName="Ahmed" role="Landlord" />
      <div style={styles.container}>
        <button onClick={onBack} style={styles.backButton}>
          ← Back to dashboard
        </button>

        <h1 style={styles.title}>My properties</h1>

        <div style={styles.list}>
          {properties.map((property) => (
            <div key={property.id} style={{ ...cardStyle, ...styles.card }}>
              <div style={styles.cardInfo}>
                <h3 style={styles.cardTitle}>{property.title}</h3>
                <p style={styles.cardRent}>{property.rent} DT/month</p>
                <span
                  style={{
                    ...styles.statusBadge,
                    backgroundColor:
                      property.status === "Available"
                        ? colors.successLight
                        : colors.dangerLight,
                    color:
                      property.status === "Available"
                        ? colors.success
                        : colors.danger,
                  }}
                >
                  {property.status}
                </span>
              </div>

              <div style={styles.actions}>
                {property.status === "Rented" ? (
                  <button
                    onClick={() => handleViewTenants(property.id)}
                    style={buttonStyles.primary}
                  >
                    View tenants
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(property.id)}
                      style={buttonStyles.primary}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(property.id)}
                      style={buttonStyles.danger}
                    >
                      Delete
                    </button>
                  </>
                )}
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
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
  },
  cardTitle: {
    margin: 0,
    fontSize: "1.1rem",
    color: colors.textDark,
  },
  cardRent: {
    margin: 0,
    color: colors.textMuted,
  },
  statusBadge: {
    display: "inline-block",
    padding: "0.2rem 0.6rem",
    borderRadius: "12px",
    fontSize: "0.8rem",
    fontWeight: "bold",
    width: "fit-content",
  },
  actions: {
    display: "flex",
    gap: "0.5rem",
  },
};

export default PropertyList;