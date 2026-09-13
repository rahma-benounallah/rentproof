import { useState } from "react";

function CreateAgreement({ request, onBack, onGenerate }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [distribution, setDistribution] = useState(
    // Répartition égale par défaut entre les membres du groupe
    Object.fromEntries(
      request.members.map((name) => [
        name,
        Math.round(request.totalRent / request.members.length),
      ])
    )
  );

  const handleDistributionChange = (name, value) => {
    setDistribution({ ...distribution, [name]: Number(value) });
  };

  const totalDistributed = Object.values(distribution).reduce(
    (sum, val) => sum + val,
    0
  );
  const isBalanced = totalDistributed === request.totalRent;

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!isBalanced) {
      alert(
        `The distributed amounts (${totalDistributed} DT) must equal the total rent (${request.totalRent} DT).`
      );
      return;
    }
    if (!startDate || !endDate) {
      alert("Please set both start and end dates.");
      return;
    }

    const agreement = {
      propertyTitle: request.propertyTitle,
      tenants: request.members,
      monthlyRent: request.totalRent,
      startDate,
      endDate,
      distribution,
    };

    // Plus tard : POST /api/agreements, puis le Membre 4 crée le hash/NFT/HCS
    console.log("Agreement generated:", agreement);
    onGenerate(agreement);
  };

  return (
    <div style={styles.container}>
      <button onClick={onBack} style={styles.backButton}>
        ← Back to dashboard
      </button>

      <h1 style={styles.title}>Create rental agreement</h1>

      <div style={styles.summaryBox}>
        <p style={styles.line}>
          <strong>Property:</strong> {request.propertyTitle}
        </p>
        <p style={styles.line}>
          <strong>Tenants:</strong> {request.members.join(", ")}
        </p>
        <p style={styles.line}>
          <strong>Monthly rent:</strong> {request.totalRent} DT
        </p>
      </div>

      <form onSubmit={handleGenerate} style={styles.form}>
        <label style={styles.label}>
          Start date
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={styles.input}
            required
          />
        </label>

        <label style={styles.label}>
          End date
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={styles.input}
            required
          />
        </label>

        <div>
          <p style={styles.distributionTitle}>Rent distribution</p>
          {request.members.map((name) => (
            <label key={name} style={styles.distributionRow}>
              <span>{name}</span>
              <input
                type="number"
                value={distribution[name]}
                onChange={(e) =>
                  handleDistributionChange(name, e.target.value)
                }
                style={styles.smallInput}
              />
              <span>DT</span>
            </label>
          ))}
          <p
            style={{
              ...styles.totalLine,
              color: isBalanced ? "#1a7f4b" : "#c0392b",
            }}
          >
            Total: {totalDistributed} DT / {request.totalRent} DT
          </p>
        </div>

        <button type="submit" style={styles.submitButton}>
          Generate agreement
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "sans-serif",
    maxWidth: "500px",
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
    marginBottom: "1rem",
  },
  summaryBox: {
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
    padding: "1rem 1.5rem",
    marginBottom: "1.5rem",
  },
  line: {
    margin: "0.3rem 0",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    fontWeight: "bold",
    fontSize: "0.9rem",
    gap: "0.3rem",
  },
  input: {
    padding: "0.6rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    fontWeight: "normal",
  },
  distributionTitle: {
    fontWeight: "bold",
    fontSize: "0.9rem",
    marginBottom: "0.5rem",
  },
  distributionRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "0.5rem",
    fontWeight: "normal",
  },
  smallInput: {
    width: "80px",
    padding: "0.4rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "0.9rem",
  },
  totalLine: {
    fontWeight: "bold",
    marginTop: "0.5rem",
  },
  submitButton: {
    marginTop: "1rem",
    padding: "0.8rem",
    backgroundColor: "#0077cc",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

export default CreateAgreement;