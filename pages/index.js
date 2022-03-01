import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword]= useState('')
  const router=useRouter()
  return (
    <>
      <div className="container mx-auto items-center justify-center h-full">
        <div className="flex content-center items-center justify-center h-screen ">
          <div className="w-full lg:w-4/12 px-4">
            <div className=" flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">             
              <div className="flex-auto px-4 lg:px-10 py-10 pt-10">
                  <div className=" w-full mb-3">
                    <label
                      className="block uppercase text-blue-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      onChange={(ev)=>setEmail(ev.target.value)}
                    />
                  </div>

                  <div className=" w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      onChange={(ev)=>{setPassword(ev.target.value)}}
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-gray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={()=>{router.push('/callcenter')}}
                    >
                      Sign In
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

