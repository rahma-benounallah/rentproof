export const colors = {
  primary: "#0077cc",
  primaryDark: "#005fa3",
  success: "#1a7f4b",
  successLight: "#e6f7ec",
  danger: "#c0392b",
  dangerLight: "#fdeeea",
  warning: "#a56b00",
  warningLight: "#fdf3e3",
  background: "#f5f5f5",
  border: "#ddd",
  textDark: "#222",
  textMuted: "#666",
  white: "#ffffff",
};

export const fonts = {
  family: "'Segoe UI', sans-serif",
};

export const radius = {
  small: "6px",
  medium: "10px",
  pill: "12px",
};

export const shadow = "0 1px 4px rgba(0,0,0,0.1)";

// Styles de boutons réutilisables partout dans l'app
export const buttonStyles = {
  primary: {
    padding: "0.8rem 1.5rem",
    backgroundColor: colors.primary,
    color: colors.white,
    border: "none",
    borderRadius: radius.small,
    fontSize: "1rem",
    cursor: "pointer",
  },
  secondary: {
    padding: "0.8rem 1.5rem",
    backgroundColor: colors.white,
    color: colors.primary,
    border: `2px solid ${colors.primary}`,
    borderRadius: radius.small,
    fontSize: "1rem",
    cursor: "pointer",
  },
  danger: {
    padding: "0.6rem 1.2rem",
    backgroundColor: colors.danger,
    color: colors.white,
    border: "none",
    borderRadius: radius.small,
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  success: {
    padding: "0.6rem 1.2rem",
    backgroundColor: colors.success,
    color: colors.white,
    border: "none",
    borderRadius: radius.small,
    cursor: "pointer",
    fontSize: "0.9rem",
  },
};

// Style de carte réutilisable partout
export const cardStyle = {
  backgroundColor: colors.background,
  borderRadius: radius.medium,
  padding: "1.5rem",
  boxShadow: shadow,
};