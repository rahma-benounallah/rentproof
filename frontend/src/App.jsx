import { useState } from "react";
import LandlordDashboard from "./pages/landlord/LandlordDashboard";
import AddProperty from "./pages/landlord/AddProperty";
import PropertyList from "./pages/landlord/PropertyList";
import RentalRequests from "./pages/landlord/RentalRequests";
import CreateAgreement from "./pages/landlord/CreateAgreement";

function App() {
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

  if (currentPage === "createAgreement" && selectedRequest) {
    return (
      <CreateAgreement
        request={selectedRequest}
        onBack={() => setCurrentPage("dashboard")}
        onGenerate={(agreement) => {
          alert(
            `Agreement created for ${agreement.tenants.join(
              ", "
            )}! (Hedera integration comes next)`
          );
          setCurrentPage("dashboard");
        }}
      />
    );
  }

  return (
    <LandlordDashboard
      onAddProperty={() => setCurrentPage("addProperty")}
      onViewProperties={() => setCurrentPage("propertyList")}
      onViewRequests={() => setCurrentPage("rentalRequests")}
    />
  );
}

export default App;