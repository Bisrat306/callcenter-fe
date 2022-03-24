import React, { useState, useEffect} from "react";
import { useRouter } from "next/router";
import AdminNav from "../../../components/AdminNav";
import { CSVLink } from "react-csv";
import { NEED_EXPORT_COLUMNS } from "../../../utils/constants";
import UserListComponent from "../../../components/UserListComponent";
import ModalImage from "react-modal-image";
import Modal from "../../../components/modals";
import Transport from "../../../api/transport";

export default function EditUser() {
  const router = useRouter();
  const [loading,setLoading] = useState(true)
    const [fname,setFname]=useState("")
    const [lname,setLname]=useState("")
    const [uname,setUname]=useState("")
    const [role,setRole]=useState("")
    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const [back,setBack]=useState(1)

    
    const [showModal,setShowModal] = useState(false)
    const [modalBody,setModalBody] = useState("")
    const [modalTitle,setModalTitle] = useState("")
    const [modalButtonText1,setModalButtonText1] = useState("")
    const [modalButtonText2,setModalButtonText2] = useState("")
    const [modalIsPrompt,setModalIsPrompt] = useState(false)

    const getUser=()=>{
      Transport.HTTP.getUser(sessionStorage.getItem('token'),router?.query?.id).then(res=>{
        setFname(res.data.results.name.split(" ")[0])
        setLname(res.data.results.name.split(" ")[1])
        setUname(res.data.results.uname)
        setRole(res.data.results.role)

      }).catch(err=>{
        console.log(err)
      })
      setLoading(false)
    }
    const updateUser=()=>{
      setLoading(true)
      var data={
        name: fname+" "+lname,
        uname: uname,
        role:  role
      }
      Transport.HTTP.updateUser(sessionStorage.getItem('token'),router?.query?.id,data).then(res=>{        
        console.log(res.data)
        setFname(res.data.results.name.split(" ")[0])
        setLname(res.data.results.name.split(" ")[1])
        setUname(res.data.results.uname)
        setRole(res.data.results.role)
        setShowModal(true)
          setModalTitle("Success")
          setModalBody("Successfully updated user.")
          setModalButtonText1("Close")

      }).catch(err=>{              
        setBack(0)
        setModalTitle("Error")
        if(err.message=="Network Error"){
            setModalBody('Network Error. Please, check your connection') 
        } else {
            setModalBody(err.response.message)}
        setModalButtonText1("close")
        setShowModal(true)
        setLoading(false)
      })
      setLoading(false)
    }
  
    const uploadToClient = (event) => {
      if (event.target.files && event.target.files[0]) {
        const i = event.target.files[0];
  
        setImage(i);
        setCreateObjectURL(URL.createObjectURL(i));
      }
    };
  
    const checkSession=()=>{
      if (sessionStorage.length===0){
        router.push('/')
      }
      else if(loading){
        getUser()
      }
    }
    useEffect(()=>{
      checkSession()
    })

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
                      {setShowModal(!showModal); if(back){router.back();}setBack(1)}}}
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
        <div className="flex flex-col col-span-10 grid-flow-row bg-gray-200 h-screen overflow-y-auto">
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
                <p className="text-3xl font-sans font-bold pl-2">Edit User</p>
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
                    <p className="text-black text-xl ">{process.browser && sessionStorage.getItem('userName')}</p>
                    <p className="text-gray-400 text-base">{process.browser && sessionStorage.getItem('role')}</p>
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
                <p className="text-black text-lg font-sans font-black">Update User Profile</p>
                {loading? <div>
                    
                    <svg role="status" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                    </svg>
  
                    </div>:
                <div className="p-5 shadow-lg flex flex-col gap-5">
                  <div className="hidden flex flex-row gap-6">         
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
                        updateUser()
                      }}
                    >
                      <p className="text-white text-lg font-semibold group-hover:text-white ">
                        Update
                      </p>
                    </button>
                  </div>
                </div>
                </div>}
              </div>
            </div>
          
        </div>
      </div>
    </>
  );
}
