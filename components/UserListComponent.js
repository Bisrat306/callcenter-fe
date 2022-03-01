import React from "react";
export default function UserListComponent(props){
    return(

        <div      
            onMouseOver={()=>{props.hovered && props.hovered()}}
            onMouseOut={()=>{props.hovered && props.hovered()}}            
            className="flex items-center md:mt-5 mt-1 h-20 w-full border-b-2 border-green-200 p-1 rounded-md listing justify-between hover:bg-slate-200 ">           

            <div className="flex flex-row items-center cursor-pointer"
            onClick={()=>{props.clicked && props.clicked()}}  
            >
                <img src={props.src} className="h-12"/>
                <p className="text-gray-500 md:text-base text-sm ml-2 hover:text-blue-400">
                   {props.name}{console.log(props.name)}
                </p>
            </div>
            <div className={props.id + " hidden flex flex-row rounded-l-3xl bg-blue-400 h-20 items-center w-1/6 " }
            >
                <div className="group p-5 cursor-pointer " onClick={()=>{props.editClicked && props.editClicked()}} >
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-white hover:stroke-black h-8 w-8" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </div>
                <div className="group p-5 cursor-pointer" onClick={()=>{props.deleteClicked && props.deleteClicked()}} >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 stroke-white hover:stroke-red-700 fill-white hover:fill-red-700" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>

                </div>
            </div>

        </div>
    );
}