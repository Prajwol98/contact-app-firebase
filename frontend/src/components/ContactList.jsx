import React, { useEffect, useState } from "react";
import { FaUserEdit, FaTrash, FaPhone, FaEnvelope } from "react-icons/fa";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch contacts from backend
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/contacts");
        const data = await response.json();
        setContacts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // Delete contact handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await fetch(`http://localhost:5000/api/contacts/${id}`, {
          method: "DELETE",
        });
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact._id !== id)
        );
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    }
  };

  // Placeholder for edit functionality
  const handleEdit = (id) => {
    console.log("Edit contact with ID:", id);
    // Implement edit logic or navigate to an edit page/form
  };

  if (loading) return <div className="text-center">Loading contacts...</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Contacts</h2>

      {contacts.length === 0 ? (
        <p className="text-gray-500">No contacts found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map((contact) => (
            <div key={contact._id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">{contact.name}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(contact._id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaUserEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <FaPhone className="text-green-500" />
                <span>{contact.phone}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <FaEnvelope className="text-blue-500" />
                <span>{contact.email}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactList;
