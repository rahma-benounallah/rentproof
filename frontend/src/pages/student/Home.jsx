function Home({ onFindApartment, onLogin, onRegister }) {
  return (
    <div style={styles.page}>
      <header style={styles.nav}>
        <span style={styles.logo}>RentProof</span>
        <div style={styles.navActions}>
          <button className="rp-btn" onClick={onLogin} style={styles.navLink}>
            Log in
          </button>
          <button className="rp-btn" onClick={onRegister} style={styles.navCta}>
            Create account
          </button>
        </div>
      </header>

      <section style={styles.hero} className="rp-hero-enter">
        <div style={styles.heroText}>
          <h1 style={styles.h1}>Find your student home in Gabès</h1>
          <p style={styles.sub}>
            Browse apartments, team up with roommates, and turn the deal into
            a rental agreement both sides can trust — before anyone pays a
            dinar.
          </p>
          <div style={styles.heroActions}>
            <button
              className="rp-btn"
              onClick={onFindApartment}
              style={styles.primaryCta}
            >
              Find an apartment
            </button>
            <button className="rp-btn" onClick={onRegister} style={styles.secondaryCta}>
              Create account
            </button>
          </div>
        </div>

        <HomeGraphic />
      </section>

      <section style={styles.stepsSection}>
        <ol style={styles.steps}>
          <StepCard
            icon="🔎"
            title="Find apartments"
            body="Filter listings near campus by price, size, and neighborhood."
          />
          <StepCard
            icon="🧑‍🤝‍🧑"
            title="Find roommates"
            body="Form a group with friends and split the rent automatically."
          />
          <StepCard
            icon="🔏"
            title="Create verifiable agreements"
            body="Landlord and tenants both accept — recorded so it can't be disputed."
          />
        </ol>
      </section>
    </div>
  );
}

function StepCard({ icon, title, body }) {
  return (
    <li className="rp-card rp-card--hoverable" style={styles.stepCard}>
      <span style={styles.stepIcon}>{icon}</span>
      <h3 style={styles.stepTitle}>{title}</h3>
      <p style={styles.stepBody}>{body}</p>
    </li>
  );
}

function HomeGraphic() {
  return (
    <svg
      width="220"
      height="220"
      viewBox="0 0 220 220"
      style={styles.heroGraphic}
      role="img"
      aria-label="Illustration of a house key"
    >
      <rect x="18" y="120" width="184" height="14" rx="7" fill="var(--line-soft)" />
      <g transform="translate(38,40)">
        <path
          d="M40 0 L80 22 V70 L40 92 L0 70 V22 Z"
          fill="var(--brand-soft)"
          stroke="var(--brand)"
          strokeWidth="2"
        />
        <path d="M40 0 V92" stroke="var(--brand-border)" strokeWidth="1" />
      </g>
      <g transform="translate(90,95)">
        <circle cx="18" cy="18" r="16" fill="none" stroke="var(--amber)" strokeWidth="6" />
        <rect x="30" y="14" width="46" height="8" rx="4" fill="var(--amber)" />
        <rect x="62" y="22" width="8" height="14" rx="2" fill="var(--amber)" />
        <rect x="74" y="22" width="8" height="10" rx="2" fill="var(--amber)" />
      </g>
    </svg>
  );
}

const styles = {
  page: {
    fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
    color: "var(--text)",
    background: "var(--bg)",
    textAlign: "left",
    minHeight: "100%",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.1rem 2rem",
    borderBottom: "1px solid var(--line)",
    background: "var(--card)",
  },
  logo: {
    fontWeight: 700,
    fontSize: "1.1rem",
    color: "var(--brand)",
    letterSpacing: "-0.02em",
  },
  navActions: { display: "flex", alignItems: "center", gap: "0.75rem" },
  navLink: {
    background: "none",
    border: "none",
    color: "var(--text)",
    fontSize: "0.95rem",
    padding: "0.5rem 0.25rem",
  },
  navCta: {
    background: "var(--brand)",
    color: "#fff",
    border: "none",
    borderRadius: "var(--radius-pill)",
    padding: "0.55rem 1.15rem",
    fontSize: "0.9rem",
    fontWeight: 600,
  },
  hero: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "2.5rem",
    padding: "4rem 2rem",
    maxWidth: 1080,
    margin: "0 auto",
    flexWrap: "wrap",
  },
  heroText: { maxWidth: 520 },
  h1: {
    fontSize: "2.5rem",
    lineHeight: 1.12,
    letterSpacing: "-0.02em",
    margin: "0 0 1rem",
    fontWeight: 600,
  },
  sub: {
    fontSize: "1.05rem",
    lineHeight: 1.55,
    color: "var(--text-soft)",
    margin: "0 0 1.75rem",
  },
  heroActions: { display: "flex", gap: "0.85rem", flexWrap: "wrap" },
  primaryCta: {
    background: "var(--brand)",
    color: "#fff",
    border: "none",
    borderRadius: "var(--radius-sm)",
    padding: "0.85rem 1.5rem",
    fontSize: "1rem",
    fontWeight: 600,
    boxShadow: "var(--shadow)",
  },
  secondaryCta: {
    background: "transparent",
    color: "var(--text)",
    border: "1.5px solid var(--line)",
    borderRadius: "var(--radius-sm)",
    padding: "0.85rem 1.5rem",
    fontSize: "1rem",
    fontWeight: 600,
  },
  heroGraphic: { flexShrink: 0 },
  stepsSection: {
    borderTop: "1px solid var(--line)",
    padding: "2.5rem 2rem 3.5rem",
  },
  steps: {
    listStyle: "none",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1.25rem",
    maxWidth: 1080,
    margin: "0 auto",
    padding: 0,
  },
  stepCard: {
    background: "var(--card)",
    border: "1px solid var(--line)",
    borderRadius: "var(--radius-md)",
    padding: "1.5rem",
    boxShadow: "var(--shadow)",
  },
  stepIcon: { fontSize: "1.6rem" },
  stepTitle: { fontSize: "1.05rem", margin: "0.75rem 0 0.4rem", fontWeight: 600 },
  stepBody: { margin: 0, color: "var(--text-soft)", fontSize: "0.92rem", lineHeight: 1.5 },
};

export default Home;
