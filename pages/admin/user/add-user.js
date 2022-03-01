import React, { useState } from "react";
import { useRouter } from "next/router";
import AdminNav from "../../../components/AdminNav";
import { CSVLink } from "react-csv";
import { NEED_EXPORT_COLUMNS } from "../../../utils/constants";
import UserListComponent from "../../../components/UserListComponent";
import ModalImage from "react-modal-image";
import Modal from "../../../components/modals";

export default function AddUser() {
  const router = useRouter();
  const users=[
                  {
                    name:"Bisrat",
                    id:1,
                    src:"../user.png"
                  },
                  {
                    name:"Abebe",
                    id:2,
                    src:"../user.png"
                  }
              ]
    const [fname,setFname]=useState("")
    const [lname,setLname]=useState("")
    const [uname,setUname]=useState("")
    const [role,setRole]=useState("")
    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);

    
    const [showModal,setShowModal] = useState(false)
    const [modalBody,setModalBody] = useState("")
    const [modalTitle,setModalTitle] = useState("")
    const [modalButtonText1,setModalButtonText1] = useState("")
    const [modalButtonText2,setModalButtonText2] = useState("")
    const [modalIsPrompt,setModalIsPrompt] = useState(false)
  
    const uploadToClient = (event) => {
      if (event.target.files && event.target.files[0]) {
        const i = event.target.files[0];
  
        setImage(i);
        setCreateObjectURL(URL.createObjectURL(i));
      }
    };
    const addUser=()=>{
      setShowModal(true)
      setModalTitle("Success")
      setModalBody("Successfully added user.")
      setModalButtonText1("Close")
      }

  return (
    <>
        {
                showModal &&
                <Modal
                    isPrompt={modalIsPrompt}
                    title={modalTitle}
                    body={modalBody}
                    button1Text={modalButtonText1}
                    button2Text={modalButtonText2}
                    button1Action={(val)=>{
                        setShowModal(!showModal);}}
                    button2Action={()=>{                        
                        setShowModal(!showModal);
                    }}
                />

            }

        {/*USER DROPDOWN*/}
        <div className="hidden userDropDown absolute right-10 mt-24  w-64 bg-white rounded-md shadow-lg overflow-hidden z-20 backdrop-grayscale-0" >                        
                <div className="py-2">
                    <div    className="flex group items-center px-4 py-3 border-b bg-white hover:bg-blue-300 -mx-2 cursor-pointer"
                        >     
                        <p className="text-gray-600 text-sm mx-2 group-hover:text-white">
                            <span className="font-bold" >Change Password </span>
                        </p>
                    </div>
                    <div    className="flex  group items-center px-4 py-3 bg-white hover:bg-blue-300 -mx-2 cursor-pointer"
                        onClick={()=>{sessionStorage.clear(); router.push('/')}}
                        >     
                        <p className="text-gray-600 group-hover:text-white text-sm mx-2">
                            <span className="font-bold" >Log Out </span>
                        </p>
                    </div>
                </div>
            </div> 
      <div className="flex grid grid-cols-12 grid-flow-row  h-screen">
        <div className="flex flex-col col-span-2 grid-flow-row bg-white h-screen">
          <AdminNav />
        </div>
        <div className="flex flex-col col-span-10 grid-flow-row bg-gray-200 h-screen">
          <div className="max-h-24 pl-8 pr-10 pb-10 pt-5  items-centre w-full bg-gray-300 shadow-lg justify-between">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 8h16M4 16h16"
                  />
                </svg>
                <p className="text-3xl font-sans font-bold pl-2">Add User</p>
                <div
                  id="search-toggle"
                  className="search-icon cursor-pointer pl-3"
                  onClick={() => {
                    document
                      .querySelector(".search-content")
                      .classList.toggle("hidden");
                  }}
                >
                  <svg
                    className="fill-current pointer-events-none text-grey-darkest w-4 h-4 inline"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                  </svg>
                </div>
              </div>
              <div className="flex flex-row cursor-pointer" onClick={()=>{document.querySelector('.userDropDown').classList.toggle('hidden')}}>
                <img src="../../user.png" className="h-12 pr-3" />
                <div className="flex flex-col">
                  <p className="text-black text-xl ">User Name</p>
                  <p className="text-gray-400 text-base">User role</p>
                </div>
              </div>
            </div>
            <div
              className="search-content hidden relative w-full bg-white shadow-xl"
              id="search-content"
            >
              <div className="container mx-auto py-4 text-black">
                <input
                  id="searchfield"
                  type="search"
                  placeholder="Search..."
                  autoFocus="autofocus"
                  className="w-full text-grey-800 transition focus:outline-none focus:border-transparent p-2 appearance-none leading-normal text-xl lg:text-2xl"
                />
              </div>
            </div>
          </div>        
          <div className="bg-gray-200  p-5">            
            <div className="bg-white p-5 shadow-lg flex flex-col justify-between">
                <p className="text-black text-lg font-sans font-black">Create User Profile</p>
                <div className="p-5 shadow-lg flex flex-col gap-5">
                  <div className="flex flex-row gap-6">         
                  {createObjectURL &&
                              <ModalImage
                                              small={createObjectURL}
                                              large={createObjectURL}
                                              showRotate={true}
                                              alt="Received Shipment"
                                              className="h-20"
                                          />}
                  <div>
                  <h4>Select Image</h4>
                  <input type="file" name="myImage" onChange={uploadToClient} />  
                  </div>     
                  </div>
                <div className="flex flex-row gap-5">
                  <div className="w-full mb-2">
                    <p className="text-sm text-indigo-900">First Name</p>
                    
                    <input placeholder={"Eg. Abebe"} className="p-3 border-solid border border-gray-400 h-10 mt-2 rounded-md w-full text-sm"
                               value={fname}   onChange={ev=>{setFname(ev.target.value)}}
                              />
                  </div>
                  <div className="w-full mb-2">
                    <p className="text-sm text-indigo-900">Father Name</p>
                    
                    <input placeholder={"Eg. Beso"} className="p-3 border-solid border border-gray-400 h-10 mt-2 rounded-md w-full text-sm"
                            value={lname}      onChange={ev=>{setLname(ev.target.value)}}
                              />
                  </div>
                  <div className="w-full mb-2">
                    <p className="text-sm text-indigo-900">Username</p>
                    
                    <input placeholder={"Eg. A_Beso"} className="p-3 border-solid border border-gray-400 h-10 mt-2 rounded-md w-full text-sm"
                                  value={uname}
                                  onChange={ev=>{setUname(ev.target.value)}}
                              />
                  </div>
                  <div className="w-full mb-2">
                                <p className="text-sm text-indigo-900">
                                    User Type
                                </p>

                                <select
                                    value={role}
                                    onChange={ev=>{
                                        setRole(ev.target.value)
                                    }}
                                    className="px-3 border-solid border border-gray-400 h-10 mt-2 rounded-md w-full text-sm text-gray-400"
                                    name="region" id="region">
                                    <option value={-1}>Select User Type</option>
                                    <option value={"Supervisor"}>Supervisor</option>
                                    <option value={"Agent"}>Agent</option>
                                </select>
                            </div>
                  <div className="group w-full mb-2 items-center justify-end">
                    <button
                      className="flex items-center justify-center rounded-lg  h-10 w-full mt-6 mr-10 bg-blue-400 group-hover:bg-blue-600"
                      onClick={() => {
                        addUser()
                      }}
                    >
                      <p className="text-white text-lg font-semibold group-hover:text-white ">
                        Submit
                      </p>
                    </button>
                  </div>
                </div>
                </div>
              </div>
            </div>
          
        </div>
      </div>
    </>
  );
}
