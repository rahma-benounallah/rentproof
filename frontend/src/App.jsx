import { useState } from "react";
import LandlordDashboard from "./LandlordDashboard";
import AddProperty from "./AddProperty";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  if (currentPage === "addProperty") {
    return <AddProperty onBack={() => setCurrentPage("dashboard")} />;
  }

  return (
    <LandlordDashboard onAddProperty={() => setCurrentPage("addProperty")} />
  );
}

export default App;