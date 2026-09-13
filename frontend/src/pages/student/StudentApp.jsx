import { useState } from "react";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import SearchApartments from "./SearchApartments";
import PropertyDetails from "./PropretyDetails";
import StudentGroup from "./StudentGroup";
import Agreement from "./Agreement";
import Verification from "./Verification";

// Same pattern as the landlord side's App.jsx: one piece of state picks
// the current screen, and callbacks passed as props move the student
// forward or back through the journey. Member 3 swaps the mock data below
// for real API calls without touching the page components.
function StudentApp({ onExit }) {
  const [page, setPage] = useState("home");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [group, setGroup] = useState({
    name: "",
    members: [],
  });
  const [agreement, setAgreement] = useState(null);

  function goHome() {
    setPage("home");
  }

  function handleRegister(form) {
    // Member 3: POST /api/auth/register
    const currentUser = {
      name: form.name,
      email: form.email,
      status: "accepted",
    };

    setStudentName(form.name);
    setGroup((g) => ({
      ...g,
      name: `${form.name}'s apartment group`,
      members: [currentUser],
    }));
    setPage("search");
  }

  function handleLogin(form) {
    // Member 3: POST /api/auth/login
    const currentUser = {
      name: form.email.split("@")[0] || "Student",
      email: form.email,
      status: "accepted",
    };

    setStudentName(currentUser.name);
    setGroup((g) => ({
      ...g,
      name: `${currentUser.name}'s apartment group`,
      members: [currentUser],
    }));
    setPage("search");
  }

  function handleInvite(friendOrEmail) {
    // Member 3: POST /api/groups/:id/invite
    const friend =
      typeof friendOrEmail === "string"
        ? {
            name: friendOrEmail.split("@")[0],
            email: friendOrEmail.trim(),
            status: "pending",
          }
        : {
            ...friendOrEmail,
            name: friendOrEmail.name || friendOrEmail.email.split("@")[0],
            email: friendOrEmail.email.trim(),
            status: friendOrEmail.status || "pending",
          };

    if (!friend.email) return;

    const alreadyExists = group.members.some(
      (member) => member.email.toLowerCase() === friend.email.toLowerCase()
    );

    if (alreadyExists) return;

    setGroup((g) => ({
      ...g,
      members: [...g.members, friend],
    }));
  }

  function handleSendRequest(property) {
    // Member 3: POST /api/rental-requests { propertyId, groupId }
    setAgreement({
      property: property.title,
      landlord: "Ahmed",
      rent: property.price,
      tenants: group.members.map((m) => m.name),
      start: "01/10/2026",
      end: "30/09/2027",
    });
    setPage("agreement");
  }

  function handleAcceptAgreement() {
    // Member 3: POST /api/agreements/:id/accept
    // Member 4 then mints the NFT + records the HCS event.
  }

  const verification = agreement && {
    id: "001",
    rent: agreement.rent,
    nftToken: "0.0.987654",
    nftSerial: "14",
    hash: "84cb7de21f0a9e6b3c8d1a4f5e2b7c9081de3f4a6b7c8d9e0f1a2b3c4d5e6f70",
    explorerUrl: "https://hashscan.io/testnet",
    history: [
      "Agreement created",
      "Agreement accepted",
      "RentalRight created",
    ],
  };

  switch (page) {
    case "register":
      return (
        <Register
          onRegister={handleRegister}
          onSwitchToLogin={() => setPage("login")}
          onBack={goHome}
        />
      );

    case "login":
      return (
        <Login
          onLogin={handleLogin}
          onSwitchToRegister={() => setPage("register")}
          onBack={goHome}
        />
      );

    case "search":
      return (
        <SearchApartments
          onHome={goHome}
          onViewDetails={(property) => {
            setSelectedProperty(property);
            setPage("details");
          }}
        />
      );

    case "details":
      return (
        <PropertyDetails
          property={selectedProperty}
          group={group}
          onHome={goHome}
          onBack={() => setPage("search")}
          onManageGroup={() => setPage("group")}
          onSendRequest={handleSendRequest}
        />
      );

    case "group":
      return (
        <StudentGroup
          group={group}
          onHome={goHome}
          onInvite={handleInvite}
          onContinue={() =>
            setPage(selectedProperty ? "details" : "search")
          }
        />
      );

    case "agreement":
      return (
        <Agreement
          agreement={agreement}
          onHome={goHome}
          onAccept={() => {
            handleAcceptAgreement();
            setPage("verification");
          }}
        />
      );

    case "verification":
      return <Verification verification={verification} onHome={goHome} />;

    default:
      return (
        <Home
          onFindApartment={() => setPage("search")}
          onLogin={() => setPage("login")}
          onRegister={() => setPage("register")}
        />
      );
  }
}

export default StudentApp;
