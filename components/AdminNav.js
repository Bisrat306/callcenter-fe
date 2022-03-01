import { useRouter } from "next/router";
import React,{useState} from "react";
import { buttons } from "../utils/constants";
import SideNavButton from "./SideNavButtons";

export default function AdminNav(props){
    const router=useRouter();
    return(
        <>
        {/*Logo Position*/}
        <div className="flex flex-col items-center h-48 w-full bg-white border-gray-300" onClick={()=>{router.push('/admin')}}>
                    
                    <img src={'../call_center.png'}/>
                
                </div>
                <p className="ml-10 text-lg text-black font-sans font-bold">Main Menu</p>

                {/*Menus*/}
                <SideNavButton action={()=>{router.push('/admin');}} name={buttons.OVERVIEW.name} icon={buttons.OVERVIEW.icon} active={'/admin'===router.pathname }/>
                <SideNavButton action={()=>{router.push('/admin/report');}} name={buttons.REPORT.name} icon={buttons.REPORT.icon} active={'/admin/report'===router.pathname }/>           
                {/*Log Out Option*/}
    </>
    );
}