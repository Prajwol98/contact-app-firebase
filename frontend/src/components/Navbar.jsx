import { Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import AddContact from "./AddContact";

const Navbar = () => {
  return (
    <div>
      <nav>
        <div className="flex gap-4">
          <Link to="/" className="text-white hover:text-gray-200">
            Home
          </Link>
          <Link to="/AddContact" className="text-white hover:text-gray-200">
            Add Contact
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AddContact" element={<AddContact />} />
      </Routes>
    </div>
  );
};

export default Navbar;
