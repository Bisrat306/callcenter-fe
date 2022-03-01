import React, { useState } from "react";
import { useRouter } from "next/router";
import SideNavButton from "../../components/SideNavButtons";
import { buttons } from "../../utils/constants";
import AdminNav from "../../components/AdminNav";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default function Admin() {
    const router=useRouter();
    const YearData = [
        {year: '2022', calls: 1800},
        {year: '2021', calls: 3600},
        {year: '2020', calls: 4200},
        {year: '2019', calls: 4000}
    ];
    const yearChart = (
        <LineChart width={1200} height={300} data={YearData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="calls" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
        </LineChart>
      );
      const monthData = [
        {month: 'Jan', calls: 300},
        {month: 'Feb', calls: 120},
        {month: 'Mar', calls: 1500},
        {month: 'Apr', calls: 30},
        {month: 'May', calls: 0},
        {month: 'Jun', calls: 0},
        {month: 'July', calls: 10}
    ];
    const monthChart = (
        <LineChart width={1200} height={300} data={monthData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="calls" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
        </LineChart>
      );
      const weekData = [
        {week: '52', calls: 30},
        {week: '51', calls: 100},
        {week: '50', calls: 150}
    ];
    const weekChart = (
        <LineChart width={1200} height={300} data={weekData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="calls" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
        </LineChart>
      );
      const dayData = [
        {day: 'Mon', calls: 30},
        {day: 'Tue', calls: 12},
        {day: 'Wen', calls: 15},
        {day: 'Thu', calls: 3},
        {day: 'Fri', calls: 0},
        {day: 'Sat', calls: 0},
        {day: 'Sun', calls: 10}
    ];
    const dayChart = (
        <LineChart width={1200} height={300} data={dayData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="calls" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
        </LineChart>
      );

    return( <>
            {/*USER DROPDOWN*/}
            <div className="hidden userDropDown absolute right-10 mt-24  w-64 bg-white rounded-md shadow-lg overflow-hidden z-20 backdrop-grayscale-0" >                        
                <div className="py-2">
                    <div    className="flex group items-center px-4 py-3 border-b bg-white hover:bg-blue-300 -mx-2 cursor-pointer"
                        >     
                        <p className="text-gray-600 text-sm mx-2 group-hover:text-white ">
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
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                                </svg>
                                <p className="text-3xl font-sans font-bold pl-2">Overview</p>
                                <div id="search-toggle" className="search-icon cursor-pointer pl-3" onClick={()=>{document.querySelector('.search-content').classList.toggle('hidden')}}>
                                    <svg className="fill-current pointer-events-none text-grey-darkest w-4 h-4 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                            
                                    >
                                    <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                                    </svg>
                                </div>
                            </div>             
                            <div className="flex flex-row cursor-pointer" onClick={()=>{document.querySelector('.userDropDown').classList.toggle('hidden')}}>
                                <img src="user.png" className="h-12 pr-3"/>
                                <div className="flex flex-col">
                                    <p className="text-black text-xl ">User Name</p>
                                    <p className="text-gray-400 text-base">User role</p>
                
                                </div>
                            </div>
                        </div>                        
                        <div className="search-content hidden relative w-full bg-white shadow-xl" id="search-content">
                            <div className="container mx-auto py-4 text-black">
                                <input id="searchfield" type="search" placeholder="Search..." autoFocus="autofocus" className="w-full text-grey-800 transition focus:outline-none focus:border-transparent p-2 appearance-none leading-normal text-xl lg:text-2xl"/>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-200  p-5">
                        <div className="bg-white rounded-3xl shadow-lg ">
                            <div className="flex flex-row p-10 gap-6">
                                <div className="w-1/4 h-36 bg-green-300 rounded-3xl flex flex-row items-center gap-3">
                                    {/*Phone svg*/}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20" fill="none" viewBox="0 0 24 24" stroke="green">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 3l-6 6m0 0V4m0 5h5M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
                                    </svg>
                                    <div >
                                        <p className="text-xl text-green-800">
                                            Total Calls - Year
                                        </p>
                                        <div className="flex flex-row gap-1">
                                            <p className="text-xl font-bold text-green-800">
                                                3600 
                                            </p>
                                            <div className="flex flex-row items-end mb-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mb-1" fill="none" viewBox="0 0 24 24" stroke="green">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="M8 7l4-4m0 0l4 4m-4-4v18" />
                                                </svg>
                                                <p className="text-sm font-bold text-green-800">25%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/4 h-36 bg-blue-300 rounded-3xl flex flex-row items-center gap-3">
                                    {/*Phone svg*/}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20" fill="none" viewBox="0 0 24 24" stroke="blue">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 3l-6 6m0 0V4m0 5h5M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
                                    </svg>
                                    <div >
                                        <p className="text-xl text-blue-800">
                                            Total Calls - Month
                                        </p>
                                        <div className="flex flex-row gap-1">
                                            <p className="text-xl font-bold text-blue-800">
                                                300 
                                            </p>
                                            <div className="flex flex-row items-end mb-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mb-1" fill="none" viewBox="0 0 24 24" stroke="black">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="M18 12H6" />
                                                </svg>
                                                <p className="text-sm font-bold text-blue-800">0%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/4 h-36 bg-purple-300 rounded-3xl flex flex-row items-center gap-3">
                                    {/*Phone svg*/}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20" fill="none" viewBox="0 0 24 24" stroke="purple">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 3l-6 6m0 0V4m0 5h5M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
                                    </svg>
                                    <div >
                                        <p className="text-xl text-purple-800">
                                            Total Calls - Week
                                        </p>
                                        <div className="flex flex-row gap-1">
                                            <p className="text-xl font-bold text-purple-800">
                                                100 
                                            </p>
                                            <div className="flex flex-row items-end mb-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mb-1" fill="none" viewBox="0 0 24 24" stroke="green">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="M8 7l4-4m0 0l4 4m-4-4v18" />
                                                </svg>
                                                <p className="text-sm font-bold text-purple-800">25%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/4 h-36 bg-red-300 rounded-3xl flex flex-row items-center gap-3">
                                    {/*Phone svg*/}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20" fill="none" viewBox="0 0 24 24" stroke="red">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 3l-6 6m0 0V4m0 5h5M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
                                    </svg>
                                    <div >
                                        <p className="text-xl text-red-800">
                                            Total Calls - Day
                                        </p>
                                        <div className="flex flex-row gap-1">
                                            <p className="text-xl font-bold text-red-800">
                                                11 
                                            </p>
                                            <div className="flex flex-row items-end mb-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mb-1" fill="none" viewBox="0 0 24 24" stroke="red">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                                </svg>
                                                <p className="text-sm font-bold text-red-800">15%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="bg-gray-200 rounded-3xl p-5">
                        <div className="bg-white rounded-3xl">
                            <div className="flex flex-col p-5 ">
                                <div className="flex flex-row items-center p-5 rounded-md gap-3">
                                    <p className="text-2xl text-black ">Stats</p>
                                    <div className="flex flex-row w-full items-center">
                                        <p className="text-md text-black pl-3 pr-3 ">From:</p>
                                        <input type="date" className="p-3 border-solid border border-gray-400 h-10 mr-2  rounded-md w-1/6 text-sm"/>
                                        <p className="text-md text-black pl-3 pr-3">To:</p>
                                        <input type="date" className=" p-3 border-solid border border-gray-400 h-10 mr-2  rounded-md w-1/6 text-sm" />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between p-5 rounded-md gap-3">
                                    <div className="flex flex-col gap-6">
                                        <p className="p-3 text-lg font-medium">Calls by Year</p>                                           
                                        {yearChart}
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between p-5 rounded-md gap-3">
                                    <div className="flex flex-col gap-6">
                                        <p className="p-3 text-lg font-medium">Calls by Month</p>                                           
                                        {monthChart}
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between p-5 rounded-md gap-3">
                                    <div className="flex flex-col gap-6">
                                        <p className="p-3 text-lg font-medium">Calls by Week</p>                                           
                                        {weekChart}
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between p-5 rounded-md gap-3">
                                    <div className="flex flex-col gap-6">
                                        <p className="p-3 text-lg font-medium">Calls by Day</p>                                           
                                        {dayChart}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
    </>)
}