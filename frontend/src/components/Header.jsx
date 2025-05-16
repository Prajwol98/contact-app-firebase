import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow p-4 mb-4">
      <div className="max-w-3xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-700">Contact Manager</h1>
        <nav>
          <Link to="/" className="mr-4 text-blue-600">
            Home
          </Link>
          <Link
            to="/add"
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Add Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
