import React, { useState } from "react";
import { useRouter } from "next/router";
import Transport from "../api/transport"
import Modal from "../components/modals";
import jwt_decode from "jwt-decode";


export default function Login() {
  const [email,setEmail] = useState('')
  const [newPassword,setNewPassword]= useState('')
  const [confirmPassword,setConfirmPassword]= useState('')
  const [loading,setLoading] = useState(false)
  const [back,setBack] = useState(1)
  const router=useRouter()

  const [showModal,setShowModal] = useState(false)
  const [modalBody,setModalBody] = useState("")
  const [modalTitle,setModalTitle] = useState("")
  const [modalButtonText1,setModalButtonText1] = useState("")
  const [modalButtonText2,setModalButtonText2] = useState("")
  const [modalIsPrompt,setModalIsPrompt] = useState(false)


  const userLogin=()=>{
    if(newPassword===''||confirmPassword===''){
        setModalTitle("Error")
        setModalBody("Please make sure you have filled all necessary fields.")                
        setModalButtonText1("Close")
        setShowModal(true)

    }else{
        var data={
          password:newPassword
        }
        Transport.HTTP.resetPassword(sessionStorage.getItem('token'),data).then(res=>{
            setModalTitle("Success")
          setModalBody("Your password has been successfully changed.")                
          setModalButtonText1("Close")
          setShowModal(true)
        }).catch((err)=>
        {   
            setBack(0)
          setModalTitle("Error")
          setModalBody(JSON.stringify(err))                
          setModalButtonText1("Close")
          setShowModal(true)
          
        })
        setLoading(false)

      }
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
                      {setShowModal(!showModal); if(back){router.back();}setBack(1)}}}
                    button2Action={()=>{                        
                        setShowModal(!showModal);
                    }}
                />

            }
      <div className="items-center justify-center h-full bg-[url('../public/operator.jpg.png')] bg-cover ">
        <div className="flex content-center items-center justify-center h-screen ">
          <div className="w-full lg:w-4/12 px-4">
            <div className=" flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"> 
              
                       
              <div className="flex-auto px-4 lg:px-10 py-10 pt-10">
                  <div className=" w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      New Password
                    </label>
                    <input
                        type="password"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                        onChange={(ev)=>setNewPassword(ev.target.value)}
                    />
                  </div>

                  <div className=" w-full mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      onChange={(ev)=>{setConfirmPassword(ev.target.value)}}
                    />
                  </div>
                  {loading && <div>
                    
                    <svg role="status" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                    </svg>
  
                    </div>}

                  <div className="text-center mt-6">
                    <button
                      className="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg hover:bg-gray-600 outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={()=>{
                        //router.push('/callcenter')
                      userLogin() }}
                    >
                      Change Password
                    </button>
                  </div>
              </div>
            </div>
            <div className="hidden flex flex-wrap mt-6 ">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                  <small>Forgot password?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

