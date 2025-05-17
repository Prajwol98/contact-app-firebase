import { Routes, Route } from "react-router-dom";
import AddContact from "../pages/AddContact";
import EditContact from "../pages/EditContact";
import Header from "../components/Header";
function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-4 max-w-3xl mx-auto">
        <Routes>
          <Route path="/add" element={<AddContact />} />
          <Route path="/edit/:id" element={<EditContact />} />
        </Routes>
      </div>
    </div>
  );
}

export default HomePage;
