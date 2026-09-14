import { useMemo, useState } from "react";
import StudentLayout from "./StudentLayout";

// Mock data — Member 3 replaces this with `await api.get("/properties")`.
export const MOCK_PROPERTIES = [
  {
    id: 7,
    title: "Apartment near university",
    neighborhood: "Cité Universitaire",
    bedrooms: 2,
    price: 800,
    hue: "var(--brand)",
  },
  {
    id: 8,
    title: "Apartment in downtown",
    neighborhood: "Centre-ville",
    bedrooms: 3,
    price: 900,
    hue: "var(--amber)",
  },
  {
    id: 9,
    title: "Studio near the beach road",
    neighborhood: "Route de la Corniche",
    bedrooms: 1,
    price: 500,
    hue: "var(--mint)",
  },
  {
    id: 10,
    title: "Shared house, quiet street",
    neighborhood: "El Manara",
    bedrooms: 4,
    price: 1100,
    hue: "var(--coral)",
  },
];

function SearchApartments({ onHome, onViewDetails }) {
  const [maxPrice, setMaxPrice] = useState(1200);
  const [bedrooms, setBedrooms] = useState("any");

  const results = useMemo(
    () =>
      MOCK_PROPERTIES.filter(
        (p) =>
          p.price <= maxPrice &&
          (bedrooms === "any" || p.bedrooms === Number(bedrooms))
      ),
    [maxPrice, bedrooms]
  );

  return (
    <StudentLayout activeStep="search" onHome={onHome}>
      <h1 style={styles.h1}>Available apartments in Gabès</h1>
      <p style={styles.sub}>{results.length} places match your filters.</p>

      <div style={styles.filters}>
        <label style={styles.filterField}>
          <span style={styles.filterLabel}>Max price</span>
          <input
            type="range"
            min="400"
            max="1200"
            step="50"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
          <span style={styles.filterValue}>{maxPrice} DT/month</span>
        </label>

        <label style={styles.filterField}>
          <span style={styles.filterLabel}>Bedrooms</span>
          <select
            className="rp-input"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            style={styles.select}
          >
            <option value="any">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4+</option>
          </select>
        </label>
      </div>

      <div style={styles.grid}>
        {results.map((p) => (
          <PropertyCard key={p.id} property={p} onView={() => onViewDetails(p)} />
        ))}
        {results.length === 0 && (
          <p style={styles.empty}>
            Nothing matches yet — try raising the price or changing bedrooms.
          </p>
        )}
      </div>
    </StudentLayout>
  );
}

function PropertyCard({ property, onView }) {
  return (
    <article className="rp-card rp-card--hoverable" style={styles.card}>
      <div style={{ ...styles.cardBanner, background: property.hue }} />
      <div style={styles.cardBody}>
        <h3 style={styles.cardTitle}>{property.title}</h3>
        <p style={styles.cardMeta}>
          {property.neighborhood} · {property.bedrooms} bedroom
          {property.bedrooms > 1 ? "s" : ""}
        </p>
        <p style={styles.cardPrice}>{property.price} DT/month</p>
        <button className="rp-btn" onClick={onView} style={styles.viewBtn}>
          View details
        </button>
      </div>
    </article>
  );
}

const styles = {
  h1: { fontSize: "1.7rem", fontWeight: 600, margin: "0 0 0.3rem" },
  sub: { color: "var(--text-soft)", margin: "0 0 1.5rem" },
  filters: {
    display: "flex",
    gap: "2rem",
    flexWrap: "wrap",
    background: "var(--card)",
    border: "1px solid var(--line)",
    borderRadius: "var(--radius-md)",
    padding: "1.1rem 1.4rem",
    marginBottom: "1.75rem",
  },
  filterField: { display: "flex", flexDirection: "column", gap: "0.35rem", minWidth: 180 },
  filterLabel: { fontSize: "0.8rem", fontWeight: 600, color: "var(--text)" },
  filterValue: { fontSize: "0.8rem", color: "var(--text-soft)" },
  select: {
    border: "1.5px solid var(--line)",
    borderRadius: "var(--radius-sm)",
    padding: "0.4rem 0.6rem",
    fontFamily: "inherit",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "1.25rem",
  },
  card: {
    background: "var(--card)",
    border: "1px solid var(--line)",
    borderRadius: "var(--radius-md)",
    overflow: "hidden",
    boxShadow: "var(--shadow)",
    display: "flex",
    flexDirection: "column",
  },
  cardBanner: { height: 88 },
  cardBody: { padding: "1.1rem 1.2rem 1.3rem" },
  cardTitle: { fontSize: "1rem", fontWeight: 600, margin: "0 0 0.3rem" },
  cardMeta: { fontSize: "0.85rem", color: "var(--text-soft)", margin: "0 0 0.6rem" },
  cardPrice: { fontSize: "1.05rem", fontWeight: 700, margin: "0 0 0.9rem" },
  viewBtn: {
    width: "100%",
    background: "var(--brand-soft)",
    color: "var(--brand)",
    border: "none",
    borderRadius: "var(--radius-sm)",
    padding: "0.6rem",
    fontWeight: 600,
    fontSize: "0.9rem",
  },
  empty: { color: "var(--text-soft)" },
};

export default SearchApartments;
