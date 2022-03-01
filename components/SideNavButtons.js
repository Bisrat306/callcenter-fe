import React from "react";
export default function SideNavButton(props){
    if (props.active==true && props.name!=="Overview"){
        return(
              < >
              <div className="group w-full ">
                  <div className="w-full flex flex-row mt-4">
                      <div className="w-1/12">
                      </div>
                      <div className="w-full justify-between">   
                        <button
                        onClick={()=>{
                        props.action && props.action()}
                        }
                        className="flex  items-center rounded-l-2xl  bg-blue-200 group-hover:bg-blue-300  h-12 w-full  px-5 "  stroke="white" >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 fill-blue-800  group-hover:fill-blue-800" fill="none" stroke="none" viewBox="0 0 24 24" >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={props.icon}/>
                                </svg>
                        <p className="ml-3 text-sky-700 group-hover:text-white text-left text-xl font-semibold">{props.name}</p>
                    </button>
                      </div>
                      <div className="w-2 rounded-t-lg rounded-b-lg bg-blue-700 group-hover:bg-blue-800"> 
                      </div>
                  </div>
              </div>
              </>
        );
    }else if(props.active==true && props.name==="Overview"){
        return(
        < >
        <div className="group w-full ">
            <div className="w-full flex flex-row mt-4">
                <div className="w-1/12">
                </div>
                <div className="w-full justify-between">            
                    <button
                        onClick={()=>{
                        props.action && props.action()}
                        }
                        className="flex  items-center rounded-l-2xl  bg-blue-200 group-hover:bg-blue-300  h-12 w-full  px-5 " stroke="#828282" >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 fill-blue-700 group-hover:fill-blue-800" viewBox="0 0 20 20" >
                                    <path d= {props.icon} />
                                </svg>
                        <p className="ml-3 text-sky-700 group-hover:text-white text-left text-xl font-semibold">{props.name}</p>
                    </button>
                </div>
                <div className="w-2 rounded-t-lg rounded-b-lg bg-blue-700 group-hover:bg-blue-800"> 
                </div>
            </div>
        </div>
        </>
      );
    }else{
    return(
        <>
        <div className="group w-full">
            <div className="w-full flex flex-row mt-4 ">
            <div className="w-1/12">
            </div>
            <div className="w-full justify-between">            
                <button
                    onClick={()=>{
                    props.action && props.action()}
                    }
                    className="flex  items-center rounded-l-2xl group-hover:bg-blue-300  h-12 w-full  px-5 " stroke="#828282" >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 fill-gray-500 group-hover:fill-blue-800" viewBox="0 0 20 20" >
                                <path d= {props.icon} />
                            </svg>
                    <p className="ml-3 text-gray-400 text-left text-xl font-semibold group-hover:text-white">{props.name}</p>
                </button>
            </div>
            </div>
        </div>
      </>
    );
        }
}

