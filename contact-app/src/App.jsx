import Navbar from "./components/Navbar";
import { FaSearch, FaRegUserCircle } from "react-icons/fa";
import { CiCirclePlus, CiEdit } from "react-icons/ci";
import { MdEmail, MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";
import { db } from "./config/firebase";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

function App() {
  const [contacts, setContacts] = useState([]);
  const [open, setOpen] = useState(false); // for delete dialog
  const [selectedContact, setSelectedContact] = useState(null); // for delete
  const [isAddModelOpen, setIsAddModelOpen] = useState(false); // for add modal
  const [newContact, setNewContact] = useState({ name: "", email: "" });
  const [searchTerm,setSearchTerm]=useState("")

  // DELETE FUNCTION
  const deleteTheItem = async (id) => {
    try {
      await deleteDoc(doc(db, "contact-app", id));
      setContacts((prev) => prev.filter((contact) => contact.id !== id));
      alert("Deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Error deleting item");
    }
  };

  // ADD FUNCTION
  const addNewContact = async () => {
    if (!newContact.name || !newContact.email) {
      alert("All fields are required");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "contact-app"), newContact);
      setContacts((prev) => [...prev, { id: docRef.id, ...newContact }]);
      setIsAddModelOpen(false);
      setNewContact({ name: "", email: "" });
      alert("Contact added successfully!");
    } catch (error) {
      console.error("Error adding contact:", error);
      alert("Failed to add contact");
    }
  };

  // FETCH CONTACTS
  useEffect(() => {
    const getData = async () => {
      try {
        const contactCollection = collection(db, "contact-app");
        const snapShot = await getDocs(contactCollection);
        const contactList = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContacts(contactList);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    getData();
  }, []);

  const editTheItem = (index) => {
    console.log("Edit item:", index);
  };

  const confirmDelete = () => {
    if (selectedContact !== null) {
      deleteTheItem(selectedContact);
      setSelectedContact(null);
      setOpen(false);
    }
  };

  return (
    <div className="container mx-auto max-w-[400px] p-4">
      <Navbar />

      {/* Search Bar & Add Button */}
      <div className="flex items-center justify-center relative">
        <FaSearch className="absolute left-4 h-5 w-5 text-gray-500" />
        <input
          type="text"
          placeholder="search..."
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
          className="pl-12 h-10 text-black rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
        <CiCirclePlus
          className="ml-3 h-6 w-6 text-white bg-amber-800 rounded-full cursor-pointer"
          onClick={() => setIsAddModelOpen(true)}
        />
      </div>

      {/* Contact List */}
      <div>
        {contacts.length > 0 ? (
          contacts.filter(contact=>contact.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((contact, index) => (
            <div key={contact.id} className="bg-amber-500 rounded-lg p-4 mt-5">
              <div className="flex items-center">
                <FaRegUserCircle className="mr-2 text-white" />
                <p className="text-white">{contact.name}</p>
              </div>
              <div className="flex items-center">
                <MdEmail className="mr-2 text-white" />
                <p className="text-white">{contact.email}</p>
              </div>
              <div className="flex justify-end gap-3 mt-2">
                <CiEdit className="text-green-700 w-6 h-6 cursor-pointer" onClick={() => editTheItem(index)} />
                <MdDelete
                  className="text-red-700 w-6 h-6 cursor-pointer"
                  onClick={() => {
                    setSelectedContact(contact.id);
                    setOpen(true);
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 mt-6">No contacts found</p>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
        <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
            <div className="flex items-start">
              <div className="bg-red-100 rounded-full p-2">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <DialogTitle className="text-lg font-medium text-gray-900">
                  Delete contact
                </DialogTitle>
                <p className="text-sm text-gray-500 mt-2">
                  Are you sure you want to delete this contact? This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500"
              >
                Delete
              </button>
              <button
                onClick={() => setOpen(false)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Add New Contact Dialog */}
      <Dialog open={isAddModelOpen} onClose={() => setIsAddModelOpen(false)} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
        <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
            <DialogTitle className="text-lg font-medium text-gray-900 mb-4">
              Add New Contact
            </DialogTitle>
            <input
              type="text"
              placeholder="Name"
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              className="w-full mb-3 border border-gray-300 px-3 py-2 rounded-md"
            />
            <input
              type="email"
              placeholder="Email"
              value={newContact.email}
              onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
              className="w-full mb-4 border border-gray-300 px-3 py-2 rounded-md"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={addNewContact}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
              >
                Add
              </button>
              <button
                onClick={() => setIsAddModelOpen(false)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}

export default App;
