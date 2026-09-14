import { colors, fonts } from "../theme";

function Navbar({ userName, role }) {
  return (
    <div style={styles.navbar}>
      <div style={styles.logo}>🏠 RentProof</div>
      <div style={styles.userInfo}>
        <span style={styles.role}>{role}</span>
        <span style={styles.userName}>{userName}</span>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: colors.white,
    borderBottom: `1px solid ${colors.border}`,
    fontFamily: fonts.family,
  },
  logo: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: colors.primary,
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
  },
  role: {
    fontSize: "0.75rem",
    backgroundColor: colors.successLight,
    color: colors.success,
    padding: "0.2rem 0.6rem",
    borderRadius: "12px",
    fontWeight: "bold",
  },
  userName: {
    fontWeight: "bold",
    color: colors.textDark,
  },
};

export default Navbar;