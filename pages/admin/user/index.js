import React, { useState,useEffect } from "react";
import { useRouter } from "next/router";
import AdminNav from "../../../components/AdminNav";
import { CSVLink } from "react-csv";
import { NEED_EXPORT_COLUMNS } from "../../../utils/constants";
import UserListComponent from "../../../components/UserListComponent";
import Modal from "../../../components/modals";
import Transport from "../../../api/transport";

export default function User() {
  const router = useRouter();
  const [users,setUsers]=useState([])
  const [loading,setLoading] = useState(true)
  const [back,setBack] = useState(1)
  
  
  const [showModal,setShowModal] = useState(false)
  const [modalBody,setModalBody] = useState("")
  const [modalTitle,setModalTitle] = useState("")
  const [modalButtonText1,setModalButtonText1] = useState("")
  const [modalButtonText2,setModalButtonText2] = useState("")
  const [modalIsPrompt,setModalIsPrompt] = useState(false)

  const getAllUser=()=>{
    Transport.HTTP.getUsers(sessionStorage.getItem('token')).then(res=>{
      setUsers(res.data.results.data)
    }).catch(err=>{
      console.log(err)
      alert(JSON.stringify(err))
    })
    setLoading(false)
}
  const delUser=(id)=>{
        setLoading(true)
        Transport.HTTP.removeUser(id,sessionStorage.getItem('token')).then(res=>{
          setShowModal(true)
          setModalTitle("Success")
          setModalBody("Successfully deleted user.")
          setModalButtonText1("Close")
        }).then(err=>{
          setBack(0)
          setModalTitle("Error")
          setModalButtonText1("close")
          setShowModal(true)
        })
        
        setLoading(true)
          
  }
  const checkSession=()=>{
    if (sessionStorage.length===0){
      router.push('/')
    }
    else if(loading){
      getAllUser()
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
                <p className="text-3xl font-sans font-bold pl-2">User</p>
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
                <img src="../user.png" className="h-12 pr-3" />
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

          {/*Paginated User LIst*/}        
          <div className="bg-gray-200  p-5">
            <div className="bg-white p-5 shadow-lg flex flex-row justify-between">
                    <div className="flex flex-col p-10 w-full rounded-md shadow-md">
                      <div className="flex flex-row items-center justify-between">                        
                        <p className="text-black font-sans font-black">All Users</p>
                        <div 
                          onClick={()=>{router.push('/admin/user/add-user')}}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 hover:fill-blue-700 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                          <title>Add User</title>
                        </svg>
                        </div>
                      </div>
                      {loading? <div>
                    
                    <svg role="status" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                    </svg>
  
                    </div>:
                      
                      users && users.length!==0?
                      users.map((user,i)=>{
                        // eslint-disable-next-line react/jsx-key
                        return (<UserListComponent  
                                        name={user.name} 
                                        id={"new"+user._id} 
                                        src={"../user.png"} 
                                        hovered={()=>{document.querySelector(".new"+user._id).classList.toggle('hidden')}} 
                                        clicked={()=>{
                                            router.push({
                                              'pathname':'/admin/user/user-detail',
                                              query: {id:user._id}
                                            })
                                        }}
                                        editClicked={()=>{
                                          router.push({
                                            'pathname':'/admin/user/edit-user',
                                            query: {id:user._id}
                                          })
                                        }}
                                        deleteClicked={()=>{
                                         delUser(user._id)
                                        }}
                                      />)
                                    }
                      )
                        :
                        <p>No users to display</p>

                      }
                      </div>
                    </div>
          </div>
        </div>
      </div>
    </>
  );
}
