import StudentLayout from "./StudentLayout";

function PropertyDetails({ property, group, onHome, onBack, onManageGroup, onSendRequest }) {
  if (!property) return null;

  const hasGroup = Boolean(group && group.members.length > 0);

  return (
    <StudentLayout activeStep="search" onHome={onHome}>
      <button className="rp-btn" onClick={onBack} style={styles.backLink}>
        ← Back to results
      </button>

      <div style={{ ...styles.banner, background: property.hue }} />

      <div style={styles.layout}>
        <div style={styles.main}>
          <h1 style={styles.title}>{property.title}</h1>
          <p style={styles.meta}>
            {property.neighborhood} · {property.bedrooms} bedroom
            {property.bedrooms > 1 ? "s" : ""} · Landlord: Ahmed
          </p>

          <p style={styles.desc}>
            A bright, well-kept place a short walk from campus. Furnished
            bedrooms, shared kitchen, and reliable internet — the landlord
            has confirmed availability for the coming semester.
          </p>

          <h3 style={styles.subhead}>What's included</h3>
          <ul style={styles.list}>
            <li>Furnished bedrooms</li>
            <li>High-speed internet</li>
            <li>Water and building maintenance</li>
          </ul>
        </div>

        <aside style={styles.sidebar}>
          <p style={styles.price}>{property.price} DT/month</p>

          {hasGroup ? (
            <div style={styles.groupNotice}>
              <p style={styles.groupNoticeTitle}>Sending as {group.name}</p>
              <p style={styles.groupNoticeBody}>
                {group.members.length} tenant
                {group.members.length > 1 ? "s" : ""} ·{" "}
                {Math.round(property.price / group.members.length)} DT each
              </p>
            </div>
          ) : (
            <div style={styles.warnNotice}>
              You'll need a roommate group (even a group of one) before
              sending a request.
            </div>
          )}

          {hasGroup ? (
            <button
              className="rp-btn"
              onClick={() => onSendRequest(property)}
              style={styles.primaryBtn}
            >
              Send rental request
            </button>
          ) : (
            <button className="rp-btn" onClick={onManageGroup} style={styles.primaryBtn}>
              Set up my group
            </button>
          )}
        </aside>
      </div>
    </StudentLayout>
  );
}

const styles = {
  backLink: {
    background: "none",
    border: "none",
    color: "var(--brand)",
    fontSize: "0.9rem",
    padding: 0,
    marginBottom: "1rem",
  },
  banner: { height: 160, borderRadius: "var(--radius-md)", marginBottom: "1.5rem" },
  layout: { display: "flex", gap: "2rem", flexWrap: "wrap" },
  main: { flex: "2 1 360px" },
  title: { fontSize: "1.6rem", fontWeight: 600, margin: "0 0 0.3rem" },
  meta: { color: "var(--text-soft)", margin: "0 0 1.2rem" },
  desc: { lineHeight: 1.6, margin: "0 0 1.4rem" },
  subhead: { fontSize: "1rem", fontWeight: 600, margin: "0 0 0.6rem" },
  list: { margin: 0, paddingLeft: "1.2rem", lineHeight: 1.8, color: "var(--text-soft)" },
  sidebar: {
    flex: "1 1 240px",
    alignSelf: "flex-start",
    background: "var(--card)",
    border: "1px solid var(--line)",
    borderRadius: "var(--radius-md)",
    padding: "1.5rem",
    boxShadow: "var(--shadow)",
  },
  price: { fontSize: "1.5rem", fontWeight: 700, margin: "0 0 1rem" },
  groupNotice: {
    background: "var(--mint-soft)",
    borderRadius: "var(--radius-sm)",
    padding: "0.8rem 1rem",
    marginBottom: "1.1rem",
  },
  groupNoticeTitle: { fontWeight: 600, fontSize: "0.9rem", margin: "0 0 0.2rem" },
  groupNoticeBody: { fontSize: "0.85rem", color: "var(--text-soft)", margin: 0 },
  warnNotice: {
    background: "var(--amber-soft)",
    color: "var(--amber)",
    borderRadius: "var(--radius-sm)",
    padding: "0.8rem 1rem",
    fontSize: "0.85rem",
    marginBottom: "1.1rem",
    lineHeight: 1.5,
  },
  primaryBtn: {
    width: "100%",
    background: "var(--brand)",
    color: "#fff",
    border: "none",
    borderRadius: "var(--radius-sm)",
    padding: "0.8rem",
    fontWeight: 600,
    fontSize: "0.95rem",
  },
};

export default PropertyDetails;
