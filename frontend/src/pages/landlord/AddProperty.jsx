import { useState } from "react";
import { colors, fonts, buttonStyles } from "../../theme";
import Navbar from "../../components/Navbar";

function AddProperty({ onBack }) {
  const [form, setForm] = useState({
    title: "",
    address: "",
    rent: "",
    bedrooms: "",
    maxStudents: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New property submitted:", form);
    alert("Property published! (check the browser console for now)");
  };

  return (
    <>
      <Navbar userName="Ahmed" role="Landlord" />
      <div style={styles.container}>
        <button onClick={onBack} style={styles.backButton}>
          ← Back to dashboard
        </button>

        <h1 style={styles.title}>Add a property</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Title
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Apartment near ISIMG"
              style={styles.input}
              required
            />
          </label>

          <label style={styles.label}>
            Address
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Gabès"
              style={styles.input}
              required
            />
          </label>

          <label style={styles.label}>
            Monthly rent (DT)
            <input
              type="number"
              name="rent"
              value={form.rent}
              onChange={handleChange}
              placeholder="800"
              style={styles.input}
              required
            />
          </label>

          <label style={styles.label}>
            Bedrooms
            <input
              type="number"
              name="bedrooms"
              value={form.bedrooms}
              onChange={handleChange}
              placeholder="2"
              style={styles.input}
              required
            />
          </label>

          <label style={styles.label}>
            Maximum students
            <input
              type="number"
              name="maxStudents"
              value={form.maxStudents}
              onChange={handleChange}
              placeholder="2"
              style={styles.input}
              required
            />
          </label>

          <label style={styles.label}>
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Apartment suitable for students..."
              style={{ ...styles.input, height: "80px" }}
            />
          </label>

          <button type="submit" style={buttonStyles.primary}>
            Publish property
          </button>
        </form>
      </div>
    </>
  );
}

const styles = {
  container: {
    padding: "2rem",
    fontFamily: fonts.family,
    maxWidth: "500px",
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
    color: colors.textDark,
  },
  input: {
    padding: "0.6rem",
    borderRadius: "6px",
    border: `1px solid ${colors.border}`,
    fontSize: "1rem",
    fontWeight: "normal",
  },
};

export default AddProperty;