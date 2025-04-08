import Navbar from "./components/Navbar";
import { FaSearch } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/firebase";
import { FaRegUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const contactCollection = collection(db, "contact-app");
        const snapShot = await getDocs(contactCollection);  
        const contactList = snapShot.docs.map((doc) =>{
          return{
            id:doc.id,
            ...doc.data()
          }
        } 
      ); 
        setContacts(contactList);  
       
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div className="container mx-auto max-w-[400px] p-4">
      <Navbar />
      <div className="flex items-center justify-center relative">
        <FaSearch className="absolute left-4 h-5 w-5 text-gray-500" />
        <input
          type="text"
          placeholder="Enter the contact..."
          className="pl-12 h-10 text-black rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <CiCirclePlus className="ml-5 h-[25px] w-[25px] text-white bg-amber-800 rounded-2xl hover:cursor-pointer" />
      </div>

      {/* Optionally, render the fetched contacts */}
      <div>
        {contacts.length > 0 ? (
          contacts.map((contact, index) => (
            <div key={index} className="bg-amber-500 rounded-lg p-4 mt-5">
              
              <div className="flex items-center ">
             <FaRegUserCircle className="mr-2 text-white"/>
              <p className="text-white">{contact.name}</p> 
              </div>
              <div className="flex items-center">
             <MdEmail className="mr-2 text-white"/> 
             <p className="text-white">{contact.email}</p>
              </div>
              <div className="flex justify-end">
              <CiEdit className="text-green-700"/>
              <MdDelete className="text-red-700" />
              </div>
              </div>
            
          ))
        ) : (
          <p>No contacts found</p>
        )}
      </div>
    </div>
  );
}

export default App;
