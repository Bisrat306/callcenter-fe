import React, { useState } from "react";
import { useRouter } from "next/router";
import AdminNav from "../../components/AdminNav";
import { CSVLink } from "react-csv";
import { NEED_EXPORT_COLUMNS } from "../../utils/constants";

export default function UserReport() {
  const router = useRouter();

  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [callReceiver, setCallReceiver] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [caseType, setCaseType] = useState("");
  const [abuseTime, setAbuseTime] = useState("");
  const [disability, setDisability] = useState("");
  const [hivStat, setHivStat] = useState("");
  const [provision, setProvision] = useState("");
  const [location, setLocation] = useState("");
  const [unservicedCall, setUnservicedCall] = useState("");
  const [maritalStatus, setMaritalStatu] = useState("");
  const [joinGroup, setJoinGroup] = useState("");
  const [callerStatus, setCallerStatus] = useState("");
  const [otherCaseType, setOtherCaseType] = useState(false);

  const items = [
    { name: "Bisrat", num: "0911233223" },
    { name: "Turkey", num: "091133223" },
  ];

  return (
    <>
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
                <p className="text-3xl font-sans font-bold pl-2">User Report</p>
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
          {/*HIDES AND UNHIDES FILTER VIEW*/}        
          <div className="bg-gray-200  p-5">
                <div className="bg-white p-5 shadow-lg flex flex-row justify-between">
                    <div onClick={() => {
                document
                    .querySelector(".filter-content")
                    .classList.toggle("hidden");
                }}>
                        <p className="hover:underline hover:decoration-blue-700 hover:text-blue-700 cursor-pointer">Show Filters</p>
                    </div>
                <div>
                    <button
                    className=" bg-yellow-700m text-gray-400 hover:text-white hover:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    >
                    <CSVLink
                        data={items}
                        headers={NEED_EXPORT_COLUMNS}
                        filename={"trial".concat("_report.csv")}
                        target="_blank"
                    >
                        Download Full Report
                    </CSVLink>
                    </button>
                    <button
                    className=" bg-yellow-700m text-gray-400 hover:text-white hover:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    >
                    <CSVLink
                        data={items}
                        headers={NEED_EXPORT_COLUMNS}
                        filename={"trial".concat("_report.csv")}
                        target="_blank"
                    >
                        Download Filtered Report
                    </CSVLink>
                    </button>
                </div>
            </div>
          </div>

          {/*FILTERS*/}
          <div className="filter-content hidden bg-gray-200  p-5">
            <div className="bg-white rounded-3xl shadow-lg ">
              <div className=" flex bg-white items-center justify-center w-full p-8 h-32  gap-3 rounded-lg">
                <div className="w-full mb-2">
                  <p className="text-sm text-indigo-900">From Date</p>
                  <input
                    value={fromTime}
                    onChange={(ev) => setFromTime(ev.target.value)}
                    type="date"
                    className={
                      "p-3 border-solid border border-gray-400 h-10 mt-2 rounded-lg w-full text-sm"
                    }
                  />
                </div>
                <div className="w-full mb-2">
                  <p className="text-sm text-indigo-900">To Date</p>
                  <input
                    value={toTime}
                    onChange={(ev) => setToTime(ev.target.value)}
                    type="date"
                    className={
                      "p-3 border-solid border border-gray-400 h-10 mt-2 rounded-lg w-full text-sm"
                    }
                  />
                </div>
                <div className="w-full mb-2">
                  <p className="text-sm text-indigo-900">Caller Status</p>
                  
                  <input placeholder={"Eg. Abebe Beso"} className="p-3 border-solid border border-gray-400 h-10 mt-2 rounded-md w-full text-sm"
                                onChange={ev=>{setCallReceiver(ev.target.value)}}
                            />
                </div>
                <div className="group w-full mb-2 items-center justify-end">
                  <button
                    className="flex items-center justify-center rounded-lg  h-10 w-full mt-6 mr-10 bg-blue-400 group-hover:bg-blue-600"
                    onClick={() => {
                      showMod();
                    }}
                  >
                    <p className="text-black text-lg font-semibold group-hover:text-white ">
                      Search
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>

        {/*Table*/}
          <div className="bg-gray-200  p-5">
            <div className="bg-white rounded-3xl shadow-lg ">
              <div className="flex flex-col">
                <div className="overflow-x-auto shadow-md sm:rounded-lg">
                  <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden ">
                      <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                          <tr>
                            <th
                              scope="col"
                              className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                            >
                              Call Receiver
                            </th>                            
                            <th
                              scope="col"
                              className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                            >
                              Number of Calls
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                          <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              Abebe Beso
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                              140
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
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
