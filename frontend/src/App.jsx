import { useState } from "react";
import LandlordDashboard from "./LandlordDashboard";
import AddProperty from "./AddProperty";
import PropertyList from "./PropertyList";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  if (currentPage === "addProperty") {
    return <AddProperty onBack={() => setCurrentPage("dashboard")} />;
  }

  if (currentPage === "propertyList") {
    return <PropertyList onBack={() => setCurrentPage("dashboard")} />;
  }

  return (
    <LandlordDashboard
      onAddProperty={() => setCurrentPage("addProperty")}
      onViewProperties={() => setCurrentPage("propertyList")}
    />
  );
}

export default App;