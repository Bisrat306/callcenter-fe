import React, { useState,useEffect } from "react";
import { useRouter } from "next/router";
import AdminNav from "../../components/AdminNav";
import { CSVLink } from "react-csv";
import { NEED_EXPORT_COLUMNS } from "../../utils/constants";
import Transport from "../../api/transport";
import { format } from "date-fns";

export default function Report() {
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

  const [users,setUsers] = useState([])
  const [reports,setReports] = useState([])

  const items = [
    { name: "Bisrat", num: "0911233223" },
    { name: "Turkey", num: "091133223" },
  ];
  const [report,setReport]=useState([])
  const [loading,setLoading] = useState(true)
  const [back,setBack] = useState(1)
  
  
  const [showModal,setShowModal] = useState(false)
  const [modalBody,setModalBody] = useState("")
  const [modalTitle,setModalTitle] = useState("")
  const [modalButtonText1,setModalButtonText1] = useState("")
  const [modalButtonText2,setModalButtonText2] = useState("")
  const [modalIsPrompt,setModalIsPrompt] = useState(false)

  const getUsers=()=>{
        setLoading(true)
        Transport.HTTP.getAllAgents(sessionStorage.getItem('token')).then(res=>{
          setUsers(res.data.results)
        }).catch(err=>{
          console.log(err)
          alert(JSON.stringify(err))
        })
        setLoading(false)
      }
  const getReport=()=>{
    if(fromTime!==""&&toTime!==""){
      var params={
        startDate:fromTime,
        endDate:toTime
      }
    }else if(fromTime!==""&&toTime===""){
      var params={
        startDate:fromTime
      }
    }else if(fromTime===""&&toTime!==""){
      var params={
        startDate:fromTime
      }
    }else{
          var params={ }
        }
    Transport.HTTP.getAllCallReport(sessionStorage.getItem('token'),params).then(res=>{
      setReports(res.data.results.call)
    }).catch(err=>{
      console.log(err)
      alert(JSON.stringify(err))
    })
    setLoading(false)
}
    const checkSession=()=>{
      if (sessionStorage.length===0){
        router.push('/')
      }
      else if(loading){
        getUsers()
        getReport()
      }
    }
    useEffect(()=>{
      checkSession()
    })

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
                <p className="text-3xl font-sans font-bold pl-2">Report</p>
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
          {/*HIDES AND UNHIDES FILTER VIEW*/}        
          <div className="bg-gray-200  p-5 ">
            <div className="filter-show bg-white p-5 shadow-lg flex flex-row justify-between">
                      <div onClick={() => {
                          document
                              .querySelector(".filter-content")
                              .classList.toggle("hidden");
                          document
                              .querySelector(".show-filters")
                              .classList.toggle("hidden");
                          document
                              .querySelector(".hide-filters")
                              .classList.toggle("hidden");
                          }}>
                                  <p className="show-filters hover:underline hover:decoration-blue-700 hover:text-blue-700 cursor-pointer">Show Filters</p>
                                  <p className="hide-filters hidden hover:underline hover:decoration-blue-700 hover:text-blue-700 cursor-pointer">Hide Filters</p>
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
              <div className="pl-7 pt-5">
                <div onClick={()=>{
                  setFromTime('')
                  setToTime('')
                  setLoading(true)
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 hover:fill-blue-700 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    <title>Reset Filter</title>
                  </svg>
                </div>                  
              </div>
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
                  <p className="text-sm text-indigo-900">Age</p>
                  <select
                    value={age}
                    onChange={(ev) => setAge(ev.target.value)}
                    className="px-3 border-solid border border-gray-400 h-10 mt-2 rounded-lg w-full text-sm text-gray-400"
                    name="zone"
                    id="zone"
                  >
                    <option value={-1}>Select Age</option>
                    <option value={"0-14"}>0-14</option>
                    <option value={"15-19"}>15-19</option>
                    <option value={"20-29"}>20-29</option>
                    <option value={"30-39"}>30-39</option>
                    <option value={"40+"}>40+</option>
                    <option value={"Unknown"}>Unknown</option>
                  </select>
                </div>
                <div className="w-full mb-2">
                  <p className="text-sm text-indigo-900">Sex</p>
                  <select
                    value={sex}
                    onChange={(ev) => setSex(ev.target.value)}
                    className="px-3 border-solid border border-gray-400 h-10 mt-2 rounded-lg w-full text-sm text-gray-400"
                    name="sex"
                    id="sex"
                  >
                    <option value={-1}>Select Sex</option>
                    <option value={"Female"}>Female</option>
                    <option value={"Male"}>Male</option>
                    <option value={"Unknown"}>Unknown</option>
                  </select>
                </div>
                <div className="w-full mb-2">
                  <p className="text-sm text-indigo-900">Type Of Case</p>
                  <select
                    value={caseType}
                    onChange={(ev) => {
                      if (ev.target.value === "Other") {
                        setOtherCaseType(true);
                        setCaseType(ev.target.value);
                        document
                          .querySelector(".caseOther")
                          .classList.toggle("hidden");
                      } else {
                        setCaseType(ev.target.value);
                        document
                          .querySelector(".caseOther")
                          .classList.add("hidden");
                      }
                    }}
                    className="px-3 border-solid border border-gray-400 h-10 mt-2 rounded-lg w-full text-sm text-gray-400"
                    name="zone"
                    id="zone"
                  >
                    <option value={-1}>Select Case Type</option>
                    <option value={"Rape"}>Rape</option>
                    <option value={"Domestic Violence"}>
                      Domestic Violence
                    </option>
                    <option value={"Sexual Harrasment"}>
                      Sexual Harrasment
                    </option>
                    <option value={"Marital Rape"}>Marital Rape</option>
                    <option value={"Acid Attack"}>Acid Attack</option>
                    <option value={"Confinement"}>Confinement</option>
                    <option value={"Forced Marriage"}>Forced Marriage</option>
                    <option value={"Verbal/Psychological Abuse"}>
                      Verbal/Psychological Abuse
                    </option>
                    <option value={"Child Marriage"}>Child Marriage</option>
                    <option value={"FGM"}>FGM</option>
                    <option value={"Trafficking"}>Trafficking</option>
                    <option value={"Unknown"}>Unknown</option>
                    <option value={"Other"}>Other</option>
                  </select>
                  <input
                    type="text"
                    placeholder={"Other Case"}
                    className="caseOther hidden p-3 border-solid border border-gray-400 h-10 mt-2 rounded-md w-full text-sm"
                    id="color"
                    onChange={(ev) => {
                      if (otherCaseType) {
                        setCaseType(ev.target.value);
                      }
                    }}
                  />
                </div>

                <div className="w-full mb-2">
                  <p className="text-sm text-indigo-900">Disability</p>
                  <select
                    value={disability}
                    onChange={(ev) => setDisability(ev.target.value)}
                    className="px-3 border-solid border border-gray-400 h-10 mt-2 rounded-lg w-full text-sm text-gray-400"
                    name="zone"
                    id="zone"
                  >
                    <option value={-1}>Select Disability</option>
                    <option value={"Vision Impairment"}>
                      Vision Impairment
                    </option>
                    <option value={"Deaf or Hard of hearing"}>
                      Deaf or Hard of hearing
                    </option>
                    <option value={"Mental Health Conditions"}>
                      Mental Health Conditions
                    </option>
                    <option value={"Autism Spectrum Disorder"}>
                      Autism Spectrum Disorder
                    </option>
                    <option value={"Physical Disability"}>
                      Physical Disability
                    </option>
                    <option value={"No Disability"}>No Disability</option>
                    <option value={"Unknown"}>Unknown</option>
                  </select>
                </div>
              </div>
              <div className=" flex bg-white items-center justify-center p-8  w-full sm-w-10 h-32 gap-3 ">
                <div className="w-full mb-2">
                  <p className="text-sm text-indigo-900">HIV Status</p>
                  <select
                    value={hivStat}
                    onChange={(ev) => setHivStat(ev.target.value)}
                    className="px-3 border-solid border border-gray-400 h-10 mt-2 rounded-lg w-full text-sm text-gray-400"
                    name="zone"
                    id="zone"
                  >
                    <option value={-1}>Select Status</option>
                    <option value={"Positive"}>Positive</option>
                    <option value={"Negative"}>Negative</option>
                    <option value={"Tested"}>Tested</option>
                    <option value={"Not-Tested"}>Not-Tested</option>
                    <option value={"Unknown"}>Unknown</option>
                  </select>
                </div>
                <div className="w-full mb-2">
                  <p className="text-sm text-indigo-900">What was provided?</p>
                  <select
                    value={provision}
                    onChange={(ev) => setProvision(ev.target.value)}
                    className="px-3 border-solid border border-gray-400 h-10 mt-2 rounded-lg w-full text-sm text-gray-400"
                    name="zone"
                    id="zone"
                  >
                    <option value={-1}>Select Provision</option>
                    <option value={"Information"}>Information</option>
                    <option value={"Psychological First-Aid"}>
                      Psychological First-Aid
                    </option>
                    <option value={"Referral"}>Referral</option>
                    <option value={"Unknown"}>Unknown</option>
                  </select>
                </div>
                <div className="w-full mb-2">
                  <p className="text-sm text-indigo-900">Location</p>
                  <select
                    value={location}
                    onChange={(ev) => setLocation(ev.target.value)}
                    className="px-3 border-solid border border-gray-400 h-10 mt-2 rounded-lg w-full text-sm text-gray-400"
                    name="zone"
                    id="zone"
                  >
                    <option value={-1}>Select Time</option>
                    <option value={"On-Going"}>On-Going</option>
                    <option value={"Past Event"}>Past Event</option>
                    <option value={"Emergency"}>Emergency</option>
                    <option value={"Unknown"}>Unknown</option>
                  </select>
                </div>
                <div className="w-full mb-2">
                  <p className="text-sm text-indigo-900">Un-serviced Call</p>
                  <select
                    value={unservicedCall}
                    onChange={(ev) => setUnservicedCall(ev.target.value)}
                    className="px-3 border-solid border border-gray-400 h-10 mt-2 rounded-lg w-full text-sm text-gray-400"
                    name="zone"
                    id="zone"
                  >
                    <option value={-1}>Select Call</option>
                    <option value={"Prank/Abuse"}>Prank/Abuse</option>
                    <option value={"Silent"}>Silent</option>
                  </select>
                </div>
                <div className="w-full mb-2">
                  <p className="text-sm text-indigo-900">Marital Status</p>
                  <select
                    value={maritalStatus}
                    onChange={(ev) => setMaritalStatu(ev.target.value)}
                    className="px-3 border-solid border border-gray-400 h-10 mt-2 rounded-lg w-full text-sm text-gray-400"
                    name="zone"
                    id="zone"
                  >
                    <option value={-1}>Select Status</option>
                    <option value={"Single"}>Single</option>
                    <option value={"Married"}>Married</option>
                    <option value={"Separated"}>Separated</option>
                    <option value={"Divorced"}>Divorced</option>
                    <option value={"Unknown"}>Unknown</option>
                  </select>
                </div>
                <div className="w-full mb-2">
                  <p className="text-sm text-indigo-900">
                    Interest to join the support group
                  </p>
                  <select
                    value={joinGroup}
                    onChange={(ev) => setJoinGroup(ev.target.value)}
                    className="px-3 border-solid border border-gray-400 h-10 mt-2 rounded-lg w-full text-sm text-gray-400"
                    name="zone"
                    id="zone"
                  >
                    <option value={-1}>Select Answer</option>
                    <option value={"Yes"}>Yes</option>
                    <option value={"No"}>No</option>
                    <option value={"Unknown"}>Unknown</option>
                  </select>
                </div>
              </div>
              <div className=" flex bg-white items-center justify-center p-8  w-full sm-w-10 h-32 gap-3">
                <div className="w-full mb-2">
                  <p className="text-sm text-indigo-900">Caller Status</p>
                  <select
                    className="px-3 border-solid border border-gray-400 h-10 mt-2 rounded-lg w-full text-sm text-gray-400"
                    value={callerStatus}
                    onChange={(ev) => setCallerStatus(ev.target.value)}
                    name="zone"
                    id="zone"
                  >
                    <option value={-1}>Select Status</option>
                    <option value={"On-Going"}>New Caller</option>
                    <option value={"Past Event"}>Continuous</option>
                    <option value={"Unknown"}>Unknown</option>
                  </select>
                </div>
                <div className="w-full mb-2">
                  <p className="text-sm text-indigo-900">Time of Abuse</p>
                  <select
                    value={abuseTime}
                    onChange={(ev) => {
                      setAbuseTime(ev.target.value);
                    }}
                    className="px-3 border-solid border border-gray-400 h-10 mt-2 rounded-lg w-full text-sm text-gray-400"
                    name="zone"
                    id="zone"
                  >
                    <option value={-1}>Select Time</option>
                    <option value={"On-Going"}>On-Going</option>
                    <option value={"Past Event"}>Past Event</option>
                    <option value={"Emergency"}>Emergency</option>
                    <option value={"Unknown"}>Unknown</option>
                  </select>
                </div>
                <div className="w-full mb-2">
                  <p className="text-sm text-indigo-900">Call Receiver</p>
                  <select
                    value={callReceiver}
                    onChange={(ev) => {
                      setCallReceiver(ev.target.value);
                    }}
                    className="px-3 border-solid border border-gray-400 h-10 mt-2 rounded-lg w-full text-sm text-gray-400"
                    name="zone"
                    id="zone"
                  >
                    <option value={-1}>Select Time</option>
                    <option value={"On-Going"}>On-Going</option>
                    <option value={"Past Event"}>Past Event</option>
                    <option value={"Emergency"}>Emergency</option>
                    <option value={"Unknown"}>Unknown</option>
                  </select>
                </div>
                <div className="w-full mb-2"></div>
                <div className="w-full mb-2"></div>
                <div className="group w-full mb-2 items-center justify-end">
                  <button
                    className="flex items-center justify-center rounded-lg  h-10 w-full mt-6 mr-10 bg-blue-400 group-hover:bg-blue-600"
                    onClick={() => {
                      getReport();
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
                  {
                  loading ?
                      <div>                      
                        <svg role="status" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                        </svg>    
                      </div>:
                      <div className="overflow-hidden ">
                        <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                          <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                              <th
                                scope="col"
                                className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                              >
                                Date
                              </th>
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
                                Gender
                              </th>                            
                              <th
                                scope="col"
                                className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                              >
                                Location
                              </th>
                              <th
                                scope="col"
                                className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                              >
                                Caller Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                            {reports.length!==0?
                            reports.map((report,index)=>{
                             return(
                              <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {format(new Date(report.timeOfCall), 'MM-dd-yyyy')}
                                </td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {users.filter(i=>i._id===report.agentId)[0].name}
                                </td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                                  {report.sex}
                                </td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                                  {report.location}
                                </td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {report.callerStatus}
                                </td>
                              </tr>)
                               
                            }):
                              
                              <p className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                              >
                                Report Not available</p>}
                          </tbody>
                        </table>
                      </div>}
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
