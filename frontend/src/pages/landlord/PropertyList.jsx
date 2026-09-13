import { useState } from "react";

function PropertyList({ onBack }) {
  // Données fictives pour l'instant — seront remplacées par GET /api/properties plus tard
  const [properties, setProperties] = useState([
    { id: 7, title: "Apartment A27", rent: 800, status: "Available" },
    { id: 14, title: "Apartment B14", rent: 900, status: "Rented" },
    { id: 22, title: "Studio C3", rent: 550, status: "Available" },
  ]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Delete this property?");
    if (!confirmDelete) return;

    // Plus tard : fetch(`/api/properties/${id}`, { method: "DELETE" })
    setProperties(properties.filter((p) => p.id !== id));
  };

  const handleEdit = (id) => {
    // Plus tard : ouvrir un formulaire pré-rempli avec PUT /api/properties/:id
    alert(`Edit property #${id} (not built yet)`);
  };

  const handleViewTenants = (id) => {
    alert(`View tenants for property #${id} (not built yet)`);
  };

  return (
    <div style={styles.container}>
      <button onClick={onBack} style={styles.backButton}>
        ← Back to dashboard
      </button>

      <h1 style={styles.title}>My properties</h1>

      <div style={styles.list}>
        {properties.map((property) => (
          <div key={property.id} style={styles.card}>
            <div style={styles.cardInfo}>
              <h3 style={styles.cardTitle}>{property.title}</h3>
              <p style={styles.cardRent}>{property.rent} DT/month</p>
              <span
                style={{
                  ...styles.statusBadge,
                  backgroundColor:
                    property.status === "Available" ? "#e6f7ec" : "#fdeeea",
                  color:
                    property.status === "Available" ? "#1a7f4b" : "#c0392b",
                }}
              >
                {property.status}
              </span>
            </div>

            <div style={styles.actions}>
              {property.status === "Rented" ? (
                <button
                  onClick={() => handleViewTenants(property.id)}
                  style={styles.actionButton}
                >
                  View tenants
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleEdit(property.id)}
                    style={styles.actionButton}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(property.id)}
                    style={styles.deleteButton}
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
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
    padding: "1rem 1.5rem",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
  },
  cardInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
  },
  cardTitle: {
    margin: 0,
    fontSize: "1.1rem",
  },
  cardRent: {
    margin: 0,
    color: "#555",
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
  actionButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#0077cc",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  deleteButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#c0392b",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
};

export default PropertyList;