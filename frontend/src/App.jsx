import { useState } from "react";
import LandlordDashboard from "./pages/landlord/LandlordDashboard";
import AddProperty from "./pages/landlord/AddProperty";
import PropertyList from "./pages/landlord/PropertyList";
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