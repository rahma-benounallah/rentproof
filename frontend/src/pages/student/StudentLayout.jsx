const journeySteps = [
  { key: "search", label: "Search" },
  { key: "group", label: "Group" },
  { key: "request", label: "Request" },
  { key: "agreement", label: "Agreement" },
  { key: "verify", label: "Verify" },
];

function StudentLayout({ activeStep, onHome, children }) {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <button className="rp-btn" onClick={onHome} style={styles.brandButton}>
          RentProof
        </button>
        <div style={styles.headerActions}>
          <span style={styles.pill}>Student</span>
        </div>
      </header>

      <nav style={styles.stepsWrap} aria-label="Student journey">
        <div style={styles.steps}>
          {journeySteps.map((step) => {
            const isActive = step.key === activeStep;
            const currentIndex = journeySteps.findIndex((item) => item.key === activeStep);
            const stepIndex = journeySteps.findIndex((item) => item.key === step.key);
            const isComplete = currentIndex >= stepIndex;

            return (
              <div
                key={step.key}
                style={{
                  ...styles.step,
                  ...(isActive ? styles.stepActive : {}),
                  ...(isComplete ? styles.stepDone : {}),
                }}
              >
                <span style={styles.stepNumber}>{stepIndex + 1}</span>
                <span>{step.label}</span>
              </div>
            );
          })}
        </div>
      </nav>

      <main style={styles.content}>{children}</main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100%",
    background: "var(--bg)",
    color: "var(--text)",
    fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 2rem",
    background: "var(--card)",
    borderBottom: "1px solid var(--line)",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  brandButton: {
    background: "none",
    border: "none",
    color: "var(--brand)",
    fontSize: "1.05rem",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    padding: 0,
  },
  headerActions: { display: "flex", alignItems: "center", gap: "0.75rem" },
  pill: {
    display: "inline-flex",
    alignItems: "center",
    background: "var(--brand-soft)",
    color: "var(--brand)",
    borderRadius: "var(--radius-pill)",
    padding: "0.38rem 0.7rem",
    fontSize: "0.8rem",
    fontWeight: 700,
  },
  stepsWrap: {
    background: "var(--card)",
    borderBottom: "1px solid var(--line)",
    boxShadow: "var(--shadow)",
  },
  steps: {
    maxWidth: 1080,
    margin: "0 auto",
    padding: "1rem 2rem",
    display: "flex",
    flexWrap: "wrap",
    gap: "0.75rem",
  },
  step: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    background: "var(--line-soft)",
    border: "1px solid var(--line)",
    borderRadius: "var(--radius-pill)",
    padding: "0.45rem 0.8rem",
    fontSize: "0.8rem",
    color: "var(--text-soft)",
    transition: "all 0.15s ease",
  },
  stepActive: {
    background: "var(--brand-soft)",
    borderColor: "var(--brand-border)",
    color: "var(--brand)",
    fontWeight: 700,
  },
  stepDone: {
    background: "var(--mint-soft)",
    borderColor: "rgba(31,157,99,0.25)",
    color: "var(--mint)",
  },
  stepNumber: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    background: "var(--card)",
    border: "1px solid currentColor",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.7rem",
    fontWeight: 700,
  },
  content: {
    maxWidth: 1080,
    margin: "0 auto",
    padding: "2rem",
  },
};

export default StudentLayout;
