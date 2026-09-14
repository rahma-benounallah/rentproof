import { useState } from "react";

// Shared shell for Register.jsx and Login.jsx so both stay visually
// identical and only the fields/copy differ.
function AuthForm({
  mode, // "register" | "login"
  onSubmit,
  onSwitch,
  onBack,
}) {
  const isRegister = mode === "register";
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.password || (isRegister && !form.name)) {
      setError("Please fill in every field.");
      return;
    }
    setError("");
    onSubmit(form);
  }

  return (
    <div style={styles.page}>
      <button className="rp-btn" onClick={onBack} style={styles.backLink}>
        ← Back to RentProof
      </button>

      <div style={styles.card}>
        <h1 style={styles.title}>
          {isRegister ? "Create your account" : "Welcome back"}
        </h1>
        <p style={styles.subtitle}>
          {isRegister
            ? "Set up your student profile to start searching."
            : "Log in to pick up your search where you left off."}
        </p>

        <div style={styles.rolePill}>
          <span style={styles.roleDot} /> Student account
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {isRegister && (
            <Field label="Name">
              <input
                className="rp-input"
                style={styles.input}
                type="text"
                placeholder="Sara"
                value={form.name}
                onChange={update("name")}
              />
            </Field>
          )}

          <Field label="Email">
            <input
              className="rp-input"
              style={styles.input}
              type="email"
              placeholder="sara@email.com"
              value={form.email}
              onChange={update("email")}
            />
          </Field>

          <Field label="Password">
            <input
              className="rp-input"
              style={styles.input}
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={update("password")}
            />
          </Field>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" className="rp-btn" style={styles.submit}>
            {isRegister ? "Create account" : "Log in"}
          </button>
        </form>

        <p style={styles.switchLine}>
          {isRegister ? "Already have an account?" : "New to RentProof?"}{" "}
          <button className="rp-btn" onClick={onSwitch} style={styles.switchLink}>
            {isRegister ? "Log in" : "Create one"}
          </button>
        </p>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label style={styles.field}>
      <span style={styles.label}>{label}</span>
      {children}
    </label>
  );
}

const styles = {
  page: {
    minHeight: "100%",
    background: "var(--bg)",
    fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
    color: "var(--text)",
    textAlign: "left",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  backLink: {
    alignSelf: "flex-start",
    background: "none",
    border: "none",
    color: "var(--text-soft)",
    fontSize: "0.9rem",
    marginBottom: "1.5rem",
    padding: 0,
  },
  card: {
    width: "100%",
    maxWidth: 380,
    background: "var(--card)",
    border: "1px solid var(--line)",
    borderRadius: "var(--radius-lg)",
    boxShadow: "var(--shadow)",
    padding: "2rem",
  },
  title: { fontSize: "1.5rem", fontWeight: 600, margin: "0 0 0.4rem" },
  subtitle: { color: "var(--text-soft)", fontSize: "0.92rem", margin: "0 0 1.1rem" },
  rolePill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    background: "var(--brand-soft)",
    color: "var(--brand)",
    fontSize: "0.8rem",
    fontWeight: 600,
    padding: "0.3rem 0.7rem",
    borderRadius: "var(--radius-pill)",
    marginBottom: "1.4rem",
  },
  roleDot: { width: 6, height: 6, borderRadius: "50%", background: "var(--brand)" },
  form: { display: "flex", flexDirection: "column", gap: "1rem" },
  field: { display: "flex", flexDirection: "column", gap: "0.4rem" },
  label: { fontSize: "0.82rem", fontWeight: 600, color: "var(--text)" },
  input: {
    border: "1.5px solid var(--line)",
    borderRadius: "var(--radius-sm)",
    padding: "0.65rem 0.8rem",
    fontSize: "0.95rem",
    fontFamily: "inherit",
  },
  error: { color: "var(--coral)", fontSize: "0.85rem", margin: 0 },
  submit: {
    marginTop: "0.3rem",
    background: "var(--brand)",
    color: "#fff",
    border: "none",
    borderRadius: "var(--radius-sm)",
    padding: "0.8rem",
    fontSize: "0.98rem",
    fontWeight: 600,
  },
  switchLine: {
    textAlign: "center",
    fontSize: "0.88rem",
    color: "var(--text-soft)",
    marginTop: "1.4rem",
    marginBottom: 0,
  },
  switchLink: {
    background: "none",
    border: "none",
    color: "var(--brand)",
    fontWeight: 600,
    fontSize: "0.88rem",
    padding: 0,
  },
};

export default AuthForm;
 