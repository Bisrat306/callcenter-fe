import React, { useState,useEffect } from "react";
import { useRouter } from "next/router";
import AdminNav from "../../../components/AdminNav";
import { CSVLink } from "react-csv";
import { NEED_EXPORT_COLUMNS, USER_DETAIL_EXPORT_COLUMNS } from "../../../utils/constants";
import ModalImage from "react-modal-image";
import { format } from "date-fns";
import Transport from "../../../api/transport";

export default function UserDetail() {
  const router = useRouter();
  const [loading,setLoading] = useState(true)
    const [user,setUser] = useState({})
    const [fname,setFname]=useState("")
    const [lname,setLname]=useState("")
    const [uname,setUname]=useState("")
    const [role,setRole]=useState("")
    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const [back,setBack]=useState(1)
    const [fromTime,setFromTime]=useState("")
    const [toTime,setToTime]=useState("")
    const [report,setReport]=useState([])
    const [fullReport,setFullReport]=useState([])

  const [totalItem,setTotalItem]=useState(0)
  const [maxPage,setMaxPage]=useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [numberOfItems, setNumberOfItems] = useState(10)

    
  const items = [
    { name: "Bisrat", num: "0911233223" },
    { name: "Turkey", num: "091133223" },
  ];

    
    const [showModal,setShowModal] = useState(false)
    const [modalBody,setModalBody] = useState("")
    const [modalTitle,setModalTitle] = useState("")
    const [modalButtonText1,setModalButtonText1] = useState("")
    const [modalButtonText2,setModalButtonText2] = useState("")
    const [modalIsPrompt,setModalIsPrompt] = useState(false)

    
    const getReport=()=>{
      if(fromTime!==""&&toTime!==""){
        var params={
          startDate:fromTime,
          endDate:toTime,
          page:pageNumber,
          pageSize:numberOfItems
        }
      }else if(fromTime!==""&&toTime===""){
        var params={
          startDate:fromTime,
          page:pageNumber,
          pageSize:numberOfItems
        }
      }else if(fromTime===""&&toTime!==""){
        var params={
          startDate:fromTime,
          page:pageNumber,
          pageSize:numberOfItems
        }
      }else{
            var params={            
              page:pageNumber,
              pageSize:numberOfItems
             }
          }
      Transport.HTTP.getAgentReport(sessionStorage.getItem('token'),router?.query?.id,params).then(res=>{
        setReport(res.data.results.call)
        setFullReport(res.data.results.all)
        setTotalItem(res.data.results.totalCount)
        setMaxPage(Math.ceil(res.data.results.totalCount/10))
      }).catch(err=>{
        console.log(err)
      })
      setLoading(false)
    }
    const getUser=()=>{
      Transport.HTTP.getUser(sessionStorage.getItem('token'),router?.query?.id,fromTime,toTime).then(res=>{
        setUser(res.data.results)
        setFname(res.data.results.name.split(" ")[0])
        setLname(res.data.results.name.split(" ")[1])
        setUname(res.data.results.uname)
        setRole(res.data.results.role)

      }).catch(err=>{
        console.log(err)
      })
      setLoading(false)
    }
    const checkSession=()=>{
      if (sessionStorage.length===0){
        router.push('/')
      }
      else if(loading){
        getUser()
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
                    <div    className="flex group items-center px-4 py-3 border-b bg-white hover:bg-blue-300 -mx-2"
                        >     
                        <p className="text-gray-600 text-sm mx-2 group-hover:text-white">
                            <span className="font-bold" >Change Password </span>
                        </p>
                    </div>
                    <div    className="flex  group items-center px-4 py-3 bg-white hover:bg-blue-300 -mx-2"
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
                
          {loading? <div>
                    
                    <svg role="status" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                    </svg>
  
                    </div>:     
            <div className="bg-gray-200  p-5">
                <div className="bg-white p-5 shadow-lg flex flex-col justify-between">
                    <div className="flex flex-row gap-5 items-center">
                        <p className="text-black text-lg font-sans font-black mt-3 mb-2">User Profile</p>
                        <div 
                              onClick={()=>{
                                router.push({
                                  'pathname':'/admin/user/edit-user',
                                  query: {id:user._id}
                                })
                                }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-black hover:stroke-blue-700 h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24">
                                <title>Edit User</title>
                                <path strokeLinecap="round" strokLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                    </div>
                    <div className="p-5 shadow-md w-full flex flex-row gap-6">
                        <div className="w-full p-2">
                                            <ModalImage
                                              small={'../../operator.jpg'}
                                              large={'../../operator.jpg'}
                                              showRotate={true}
                                              alt="User Image"
                                              className="h-60"
                                          />

                        </div>
                        <div className="w-full p-2 flex flex-col gap-5">
                            <div className="flex flex-row gap-5 ">
                                <div className="flex flex-col gap-3 w-1/2">
                                    <p className="text-lg text-blue-800 font-black font-sans">First Name</p>
                                    <p className="text-base text-gray-400 font-semibold font-sans">{fname}</p>
                                </div>
                                <div className="flex flex-col gap-3 w-1/2">
                                    <p className="text-lg text-blue-800 font-black font-sans">Last Name</p>
                                    <p className="text-base text-gray-400 font-semibold font-sans">{lname}</p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-5 ">
                            <div className="flex flex-col gap-3 w-1/2">
                                    <p className="text-lg text-blue-800 font-black font-sans">User Name</p>
                                    <p className="text-base text-gray-400 font-semibold font-sans">{uname}</p>
                                </div>
                                <div className="flex flex-col gap-3 w-1/2">
                                    <p className="text-lg text-blue-800 font-black font-sans">User Type</p>
                                    <p className="text-base text-gray-400 font-semibold font-sans">{role}</p>
                                </div>
                            </div>


                        </div>
                    </div>    
                </div>
            </div>}
                  
                

          {/*HIDES AND UNHIDES FILTER VIEW*/}        
          <div className="bg-gray-200  p-5">
                <div className="bg-white p-5 shadow-lg flex flex-row justify-between">
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
                        data={fullReport}
                        headers={USER_DETAIL_EXPORT_COLUMNS}
                        filename={process.browser&&sessionStorage.getItem("name").concat("_report.csv")}
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
                        data={report}
                        headers={USER_DETAIL_EXPORT_COLUMNS}
                        filename={process.browser&&sessionStorage.getItem("name").concat("_report.csv")}
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
                </div>
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
                  {loading ? <div>
                    
                    <svg role="status" clasNames="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                    </svg>
  
                    </div>:
                    <div className="overflow-hidden ">
                      
                      {report.length===0?
                      
                      <p className=" p-10 hover:underline hover:decoration-blue-700 hover:text-blue-700 cursor-pointer">Report not available</p>:
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
                                Gender
                            </th>                            
                            <th
                              scope="col"
                              className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                            >Caller Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                          { report.map((rep,index)=>{
                            return(
                            <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            { format(new Date(rep.timeOfCall), 'MM-dd-yyyy') }
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {rep.sex}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                              {rep.callerStatus}
                            </td>
                          </tr>)})}
                        </tbody>
                      </table>}
                      <nav aria-label="Page navigation" className="mb-5 mt-3">
                                    <ul className="inline-flex">
                                        {
                                            pageNumber>1?
                                            <li>
                                                <button className="h-10 px-5 text-gray-600 transition-colors duration-150 bg-white rounded-l-lg focus:shadow-outline hover:bg-gray-100" 
                                                disabled={pageNumber==1}
                                                onClick={()=>{setPageNumber(pageNumber-1);setLoading(true)}}>
                                                Prev
                                                </button>
                                            </li>
                                            :
                                            <li>
                                                <button className="h-10 px-5 text-gray-200 transition-colors duration-150 bg-gray-100 rounded-l-lg focus:shadow-outline " 
                                                disabled={pageNumber==1}
                                                onClick={()=>{setPageNumber(pageNumber-1);setLoading(true)}}>
                                                Prev
                                                </button>
                                            </li>
                        
                                        }
                                        <li className="mt-2"><span button className="h-10 px-5 text-l text-gray-600 transition-colors duration-150 bg-white">Page{' '} <strong>{pageNumber} of {maxPage}</strong></span></li>
                                        {
                                            pageNumber<maxPage?
                                            <li>
                                                <button className="h-10 px-5 text-gray-600 transition-colors duration-150 bg-white rounded-l-lg focus:shadow-outline hover:bg-gray-100" 
                                                disabled={pageNumber==maxPage}
                                                onClick={()=>{setPageNumber(pageNumber+1);setLoading(true)}}>
                                                Next
                                                </button>
                                            </li>
                                            :
                                            <li>
                                                <button className="h-10 px-5 text-gray-200 transition-colors duration-150 bg-gray-100 rounded-l-lg focus:shadow-outline " 
                                                disabled={pageNumber==maxPage}>
                                                Next
                                                </button>
                                            </li>
                        
                                        }
                                    </ul>
                      </nav>
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
