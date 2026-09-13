import { useState } from "react";
import StudentLayout from "./StudentLayout";

const suggestedFriends = [
  { name: "Amine", email: "amine@email.com" },
  { name: "Yassine", email: "yassine@email.com" },
  { name: "Salma", email: "salma@email.com" },
  { name: "Hana", email: "hana@email.com" },
];

function StudentGroup({ group, onHome, onInvite, onContinue }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleInvite(e) {
    e.preventDefault();
    if (!email.trim()) return;

    onInvite({
      name: name.trim() || email.split("@")[0],
      email: email.trim(),
      status: "pending",
    });

    setName("");
    setEmail("");
  }

  function isAlreadyAdded(friendEmail) {
    return group.members.some(
      (member) => member.email.toLowerCase() === friendEmail.toLowerCase()
    );
  }

  return (
    <StudentLayout activeStep="group" onHome={onHome}>
      <h1 style={styles.h1}>Build your roommate group</h1>
      <p style={styles.sub}>
        Select your friends from the list or invite someone new, then continue.
      </p>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Current members</h3>
          <ul style={styles.memberList}>
            {group.members.map((member) => (
              <li key={`${member.email}-${member.name}`} style={styles.memberItem}>
                <div>
                  <p style={styles.memberName}>{member.name}</p>
                  <p style={styles.memberEmail}>{member.email}</p>
                </div>
                <span
                  style={{
                    ...styles.status,
                    ...(member.status === "accepted"
                      ? styles.statusAccepted
                      : styles.statusPending),
                  }}
                >
                  {member.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Suggested friends</h3>
          <div style={styles.friendList}>
            {suggestedFriends.map((friend) => {
              const alreadyAddedFriend = isAlreadyAdded(friend.email);

              return (
                <div key={friend.email} style={styles.friendItem}>
                  <div>
                    <p style={styles.friendName}>{friend.name}</p>
                    <p style={styles.friendEmail}>{friend.email}</p>
                  </div>

                  <button
                    className="rp-btn"
                    type="button"
                    onClick={() => onInvite(friend)}
                    disabled={alreadyAddedFriend}
                    style={{
                      ...styles.friendBtn,
                      ...(alreadyAddedFriend ? styles.friendBtnDisabled : {}),
                    }}
                  >
                    {alreadyAddedFriend ? "Added" : "Add"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Invite a roommate</h3>
          <form onSubmit={handleInvite} style={styles.form}>
            <label style={styles.field}>
              <span style={styles.label}>Friend name</span>
              <input
                className="rp-input"
                style={styles.input}
                type="text"
                placeholder="Amine"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label style={styles.field}>
              <span style={styles.label}>Email address</span>
              <input
                className="rp-input"
                style={styles.input}
                type="email"
                placeholder="roommate@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <button className="rp-btn" type="submit" style={styles.inviteBtn}>
              Invite friend
            </button>
          </form>
        </div>
      </div>

      <div style={styles.footer}>
        <button className="rp-btn" onClick={onContinue} style={styles.continueBtn}>
          Continue to details
        </button>
      </div>
    </StudentLayout>
  );
}

const styles = {
  h1: { fontSize: "1.7rem", fontWeight: 600, margin: "0 0 0.3rem" },
  sub: { color: "var(--text-soft)", margin: "0 0 1.5rem" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "1.25rem",
  },
  card: {
    background: "var(--card)",
    border: "1px solid var(--line)",
    borderRadius: "var(--radius-md)",
    boxShadow: "var(--shadow)",
    padding: "1.4rem",
  },
  cardTitle: { fontSize: "1rem", fontWeight: 600, margin: "0 0 1rem" },
  memberList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
  },
  memberItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.75rem",
    padding: "0.65rem 0.75rem",
    background: "var(--line-soft)",
    borderRadius: "var(--radius-sm)",
  },
  memberName: { margin: 0, fontWeight: 600, fontSize: "0.92rem" },
  memberEmail: { margin: "0.2rem 0 0", fontSize: "0.8rem", color: "var(--text-soft)" },
  status: {
    borderRadius: "var(--radius-pill)",
    fontSize: "0.72rem",
    fontWeight: 700,
    padding: "0.25rem 0.5rem",
    textTransform: "capitalize",
  },
  statusAccepted: { background: "var(--mint-soft)", color: "var(--mint)" },
  statusPending: { background: "var(--amber-soft)", color: "var(--amber)" },
  friendList: { display: "flex", flexDirection: "column", gap: "0.75rem" },
  friendItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.75rem",
    padding: "0.75rem",
    background: "var(--line-soft)",
    borderRadius: "var(--radius-sm)",
  },
  friendName: { margin: 0, fontWeight: 600, fontSize: "0.92rem" },
  friendEmail: { margin: "0.2rem 0 0", fontSize: "0.8rem", color: "var(--text-soft)" },
  friendBtn: {
    background: "var(--brand-soft)",
    color: "var(--brand)",
    border: "none",
    borderRadius: "var(--radius-sm)",
    padding: "0.5rem 0.8rem",
    fontWeight: 600,
    fontSize: "0.85rem",
  },
  friendBtnDisabled: {
    background: "var(--line)",
    color: "var(--text-soft)",
    cursor: "not-allowed",
    opacity: 0.8,
  },
  form: { display: "flex", flexDirection: "column", gap: "1rem" },
  field: { display: "flex", flexDirection: "column", gap: "0.4rem" },
  label: { fontSize: "0.8rem", fontWeight: 600, color: "var(--text)" },
  input: {
    border: "1.5px solid var(--line)",
    borderRadius: "var(--radius-sm)",
    padding: "0.7rem 0.8rem",
    fontFamily: "inherit",
    fontSize: "0.95rem",
  },
  inviteBtn: {
    background: "var(--brand)",
    color: "#fff",
    border: "none",
    borderRadius: "var(--radius-sm)",
    padding: "0.75rem",
    fontWeight: 600,
    fontSize: "0.95rem",
  },
  footer: { display: "flex", justifyContent: "flex-end", marginTop: "1.5rem" },
  continueBtn: {
    background: "var(--brand)",
    color: "#fff",
    border: "none",
    borderRadius: "var(--radius-sm)",
    padding: "0.85rem 1.4rem",
    fontWeight: 700,
    fontSize: "0.96rem",
  },
};

export default StudentGroup;
