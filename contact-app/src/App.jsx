import Navbar from "./components/Navbar";
import { FaSearch } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { useEffect, useState } from "react";
import {collection, getDocs} from "firebase/firestore"
import { db } from "./config/firebase";

function App() {
  const [contacts,setContact]=useState([])

  useEffect(()=>{
    const getData=async()=>{
      try {
          const contactCollection= collection(db,"contact-app")
          const snapShot = await getDocs(contactCollection);
          const contactList=snapShot.docs.map((doc)=>{doc.data()})
          setContact(contactList)
          console.log(contactList)
        
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  },[])
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
      <div>
        {contacts.length > 0 ? (
          contacts.map((contact, index) => (
            <div key={index}>
              <p>{contact.name}</p> {/* Assuming your contact data has a 'name' field */}
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
