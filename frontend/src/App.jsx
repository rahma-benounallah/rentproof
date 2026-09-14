import { useState } from "react";
import LandlordDashboard from "./pages/landlord/LandlordDashboard";
import AddProperty from "./pages/landlord/AddProperty";
import PropertyList from "./pages/landlord/PropertyList";
import RentalRequests from "./pages/landlord/RentalRequests";
import CreateAgreement from "./pages/landlord/CreateAgreement";
import AgreementDashboard from "./pages/landlord/AgreementDashboard";
import StudentApp from "./pages/student/StudentApp";

function App() {
  // Demo-only role switch: lets both Member 1's and Member 2's work be
  // reviewed from the same build. Real auth (Member 3) will decide this
  // from the logged-in user's role instead.
  const [role, setRole] = useState(null);

  if (role === "student") {
    return <StudentApp onExit={() => setRole(null)} />;
  }

  if (role === "landlord") {
    return <LandlordApp onExit={() => setRole(null)} />;
  }

  return (
    <div style={roleSelectStyles.page}>
      <h1 style={roleSelectStyles.title}>RentProof</h1>
      <p style={roleSelectStyles.subtitle}>Choose a view to preview</p>
      <div style={roleSelectStyles.buttons}>
        <button style={roleSelectStyles.button} onClick={() => setRole("student")}>
          Student view
        </button>
        <button style={roleSelectStyles.button} onClick={() => setRole("landlord")}>
          Landlord view
        </button>
      </div>
    </div>
  );
}

const roleSelectStyles = {
  page: {
    minHeight: "100svh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
  },
  title: { fontSize: "2rem", margin: 0, color: "#aa3bff" },
  subtitle: { color: "#6b6375", margin: "0 0 1rem" },
  buttons: { display: "flex", gap: "1rem" },
  button: {
    padding: "0.8rem 1.5rem",
    borderRadius: "8px",
    border: "1px solid #e5e4e7",
    background: "white",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

function LandlordApp() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedRequest, setSelectedRequest] = useState(null);

  if (currentPage === "addProperty") {
    return <AddProperty onBack={() => setCurrentPage("dashboard")} />;
  }

  if (currentPage === "propertyList") {
    return <PropertyList onBack={() => setCurrentPage("dashboard")} />;
  }

  if (currentPage === "rentalRequests") {
    return (
      <RentalRequests
        onBack={() => setCurrentPage("dashboard")}
        onAccept={(request) => {
          setSelectedRequest(request);
          setCurrentPage("createAgreement");
        }}
      />
    );
  }

  if (currentPage === "createAgreement"