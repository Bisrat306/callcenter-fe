import React, {useEffect, useState} from "react";
import {Router, useRouter} from "next/router";
import Modal from "../../components/modals.js"


export default function AddCall() {

    
    const router=useRouter()
    const [showModal,setShowModal] = useState(false)
    const [modalBody,setModalBody] = useState("")
    const [modalTitle,setModalTitle] = useState("")
    const [modalButtonText1,setModalButtonText1] = useState("")
    const [modalButtonText2,setModalButtonText2] = useState("")
    const [modalIsPrompt,setModalIsPrompt] = useState(false)

    const [callTime,setCallTime]=useState('')
    const [age,setAge]=useState('')
    const [sex,setSex]=useState('')
    const [caseType,setCaseType]=useState('')
    const [abuseTime,setAbuseTime]=useState('')
    const [disability,setDisability]=useState('')
    const [hivStat,setHivStat]=useState('')
    const [provision,setProvision]=useState('')
    const [location,setLocation]=useState('')
    const [unservicedCall,setUnservicedCall]=useState('')
    const [maritalStatus,setMaritalStatu]=useState('')
    const [joinGroup,setJoinGroup]=useState('')
    const [callerStatus,setCallerStatus]=useState('')
    const [otherCaseType,setOtherCaseType]=useState(false)

    const showMod=()=>{
        
        let data={
            "age":age,
            "sex":sex,
            "caseType":caseType,
            "abuseTime":abuseTime,
            "disability":disability,
            "hivStat":hivStat,
            "provision":provision,
            "location":location,
            "unservicedCall":unservicedCall,
            "maritalStatus":maritalStatus,
            "joinGroup":unservicedCall,
            "callerStatus":callerStatus,
            "callTime":callTime

        }
        console.log(data)
        setModalTitle("Success")
        setModalBody(JSON.stringify(data))                
        setModalButtonText1("Close")
        setShowModal(true)
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
                        setShowModal(!showModal);}}
                    button2Action={()=>{                        
                        setShowModal(!showModal);
                    }}
                />

            }
            
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

            <div className="grid grid-cols-12 grid-flow-row bg-gray-100 h-screen">
                <div className="bg-white mb-2 col-span-12" >
                        <div className="flex flex-row items-center p-5 shadow-md justify-between">
                            <div className="flex flex-row items-center">
                                    <img src="call_center.png" height={24} width={182}/>
                                    <p  className="text-lg text-indigo-900">
                                        Register calls
                                    </p>
                            </div>
                            <div className="flex flex-row cursor-pointer" onClick={()=>{document.querySelector('.userDropDown').classList.toggle('hidden')}}>
                                <img src="user.png" className="h-12 pr-3"/>
                                <div className="flex flex-col">
                                    <p className="text-black text-xl ">User Name</p>
                                    <p className="text-gray-400 text-base">Call Receiver</p>
                
                                </div>
                            </div>
                        </div> 
                </div>
                <div className="flex flex-col self-start  col-span-12 p-5 h-screen ">
                    <div className=" flex bg-white items-center justify-center w-full p-8 h-32  gap-6 rounded-lg">
                        <div className="w-full mb-2">
                            <p className="text-sm text-indigo-900">
                               Time of Call
                            </p>
                            <input  
                                    value={callTime}
                                    onChange={ev=>setCallTime(ev.target.value)}
                                    type="datetime-local"
                                    className={ "p-3 border-solid border border-gray-400 h-10 mt-2 rounded-lg w-full text-sm"}/>
                        </div>
                        <div className="w-full mb-2">
                            <p
                                className="text-sm text-indigo-900">
                                Age
                            </p>
                            <select
                                value={age}
                                onChange={ev=>setAge(ev.target.value)}
                                className="px-3 border-solid border border-gray-400 h-10 mt-2 rounded-lg w-full text-sm text-gray-400"
                                name="zone" id="zone">
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
                            <p
                                className="text-sm text-indigo-900">
                                Sex
                            </p>
                            <select
                                value={sex}
                                onChange={ev=>setSex(ev.target.value)}
                                className="px-3 border-solid border border-gray-400 h-10 mt-2 rounded-lg w-full text-sm text-gray-400"
                                name="sex" id="sex">
                                <option value={-1}>Select Sex</option>
                                <option value={"Female"}>Female</option>
                                <option value={"Male"}>Male</option>
                                <option value={"Unknown"}>Unknown</option>
                            </select>
                        </div> 
                        <div className="w-full mb-2">
                            <p
                                className="text-sm text-indigo-900">
                                Type Of Case
                            </p>
                            <select
                                value={caseType}
                                onChange={(ev)=>{
                                    if(ev.target.value==='Other'){
                                        setOtherCaseType(true)
                                        setCaseType(ev.target.value)
                                        document.querySelector('.caseOther').classList.toggle('hidden')}
                                    else{
                                        setCaseType(ev.target.value);
                                        document.querySelector('.caseOther').classList.add('hidden')}
                                }}
                                className="px-3 border-solid border border-gray-400 h-10 mt-2 rounded-lg w-full text-sm text-gray-400"
                                name="zone" id="zone">
                                <option value={-1}>Select Case Type</option>
                                <option value={"Rape"}>Rape</option>
                                <option value={"Domestic Violence"}>Domestic Violence</option>
                                <option value={"Sexual Harrasment"}>Sexual Harrasment</option>
                                <option value={"Marital Rape"}>Marital Rape</option>
                                <option value={"Acid Attack"}>Acid Attack</option>
                                <option value={"Confinement"}>Confinement</option>
                                <option value={"Forced Marriage"}>Forced Marriage</option>
                                <option value={"Verbal/Psychological Abuse"}>Verbal/Psychological Abuse</option>
                                <option value={"Child Marriage"}>Child Marriage</option>
                                <option value={"FGM"}>FGM</option>
                                <option value={"Trafficking"}>Trafficking</option>
                                <option value={"Unknown"}>Unknown</option>
                                <option value={"Other"}>Other</option>
                            </select>
                            <input  type="text" placeholder={"Other Case"}
                                    className="caseOther hidden p-3 border-solid border border-gray-400 h-10 mt-2 rounded-md w-full text-sm" id="color"
                                    onChange={(ev)=>{
                                        if(otherCaseType){setCaseType(ev.target.value);}
                                        }}/>
                            
                        </div>                 
                    </div>
                    <div className=" flex bg-white items-center justify-center p-8  w-full sm-w-10 h-32 gap-6 ">
                        <div className="w-full mb-2">
                            <p
                                className="text-sm text-indigo-900">
                                Time of Abuse
                            </p>
                            <select
                                value={abuseTime}
                                onChange={(ev)=>{
                                    setAbuseTime(ev.target.value)
                                }}
                                className="px-3 border-solid border border-gray-400 h-10 mt-2 rounded-lg w-full text-sm text-gray-400"
                                name="zone" id="zone">
                                <option value={-1}>Select Time</option>
                                <option value={"On-Going"}>On-Going</option>
                                <option value={"Past Event"}>Past Event</option>
                                <option value={"Emergency"}>Emergency</option>
                                <option value={"Unknown"}>Unknown</option>
                            </select>
                        </div> 
                        <div className="w-full mb-2">
                            <p
                                className="text-sm text-indigo-900">
                                Disability
                            </p>
                            <select
                            
                                value={disability}
                                onChange={ev=>setDisability(ev.target.value)}
                                className="px-3 border-solid border border-gray-400 h-10 mt-2 rounded-lg w-full text-sm text-gray-400"
                                name="zone" id="zone">
                                <option value={-1}>Select Disability</option>
                                <option value={"Vision Impairment"}>Vision Impairment</option>
                                <option value={"Deaf or Hard of hearing"}>Deaf or Hard of hearing</option>
                                <option value={"Mental Health Conditions"}>Mental Health Conditions</option>
                                <option value={"Autism Spectrum Disorder"}>Autism Spectrum Disorder</option>
                                <option value={"Physical Disability"}>Physical Disability</option>
                                <option value={"No Disability"}>No Disability</option>
                                <option value={"Unknown"}>Unknown</option>
                            </select>
                        </div> 
                        <div className="w-full mb-2">
                            <p
                                className="text-sm text-indigo-900">
                                HIV Status
                            </p>
                            <select
                                
                                value={hivStat}
                                onChange={ev=>setHivStat(ev.target.value)}
                                className="px-3 border-solid border border-gray-400 h-10 mt-2 rounded-lg w-full text-sm text-gray-400"
                                name="zone" id="zone">
                                <option value={-1}>Select Status</option>
                                <option value={"Positive"}>Positive</option>
                                <option value={"Negative"}>Negative</option>
                                <option value={"Tested"}>Tested</option>
                                <option value={"Not-Tested"}>Not-Tested</option>
                                <option value={"Unknown"}>Unknown</option>
                            </select>
                        </div>
                        <div className="w-full mb-2">
                            <p
                                className="text-sm text-indigo-900">
                                What was provided?
                            </p>
                            <select                                
                                value={provision}
                                onChange={ev=>setProvision(ev.target.value)}
                                className="px-3 border-solid border border-gray-400 h-10 mt-2 rounded-lg w-full text-sm text-gray-400"
                                name="zone" id="zone">
                                <option value={-1}>Select Provision</option>
                                <option value={"Information"}>Information</option>
                                <option value={"Psychological First-Aid"}>Psychological First-Aid</option>
                                <option value={"Referral"}>Referral</option>
                                <option value={"Unknown"}>Unknown</option>
                            </select>
                        </div>                   
                    </div>
                    <div className=" flex bg-white items-center justify-center p-8  w-full sm-w-10 h-32 gap-6">
                        <div className="w-full mb-2">
                            <p
                                className="text-sm text-indigo-900">
                                Location
                            </p>
                            <select
                                
                                value={location}
                                onChange={ev=>setLocation(ev.target.value)}
                                className="px-3 border-solid border border-gray-400 h-10 mt-2 rounded-lg w-full text-sm text-gray-400"
                                name="zone" id="zone">
                                <option value={-1}>Select Time</option>
                                <option value={"On-Going"}>On-Going</option>
                                <option value={"Past Event"}>Past Event</option>
                                <option value={"Emergency"}>Emergency</option>
                                <option value={"Unknown"}>Unknown</option>
                            </select>
                        </div> 
                        <div className="w-full mb-2">
                            <p
                                className="text-sm text-indigo-900">
                                Un-serviced Call
                            </p>
                            <select
                                
                                value={unservicedCall}
                                onChange={ev=>setUnservicedCall(ev.target.value)}
                                className="px-3 border-solid border border-gray-400 h-10 mt-2 rounded-lg w-full text-sm text-gray-400"
                                name="zone" id="zone">
                                <option value={-1}>Select Call</option>
                                <option value={"Prank/Abuse"}>Prank/Abuse</option>
                                <option value={"Silent"}>Silent</option>
                            </select>
                        </div> 
                        <div className="w-full mb-2">
                            <p
                                className="text-sm text-indigo-900">
                                Marital Status
                            </p>
                            <select
                                
                                value={maritalStatus}
                                onChange={ev=>setMaritalStatu(ev.target.value)}
                                className="px-3 border-solid border border-gray-400 h-10 mt-2 rounded-lg w-full text-sm text-gray-400"
                                name="zone" id="zone">
                                <option value={-1}>Select Status</option>
                                <option value={"Single"}>Single</option>
                                <option value={"Married"}>Married</option>
                                <option value={"Separated"}>Separated</option>
                                <option value={"Divorced"}>Divorced</option>
                                <option value={"Unknown"}>Unknown</option>
                            </select>
                        </div>
                        <div className="w-full mb-2">
                            <p
                                className="text-sm text-indigo-900">
                                Interest to join the support group
                            </p>
                            <select                                
                                value={joinGroup}
                                onChange={ev=>setJoinGroup(ev.target.value)}
                                className="px-3 border-solid border border-gray-400 h-10 mt-2 rounded-lg w-full text-sm text-gray-400"
                                name="zone" id="zone">
                                <option value={-1}>Select Answer</option>
                                <option value={"Yes"}>Yes</option>
                                <option value={"No"}>No</option>
                                <option value={"Unknown"}>Unknown</option>
                            </select>
                        </div>                   
                    </div>
                    <div className=" flex bg-white items-center justify-center p-8  w-full sm-w-10 h-32 gap-6">
                        <div className="w-full mb-2">
                            <p
                                className="text-sm text-indigo-900">
                                Caller Status
                            </p>
                            <select
                                className="px-3 border-solid border border-gray-400 h-10 mt-2 rounded-lg w-full text-sm text-gray-400"
                                value={callerStatus}
                                onChange={ev=>setCallerStatus(ev.target.value)}
                                name="zone" id="zone">
                                <option value={-1}>Select Status</option>
                                <option value={"On-Going"}>New Caller</option>
                                <option value={"Past Event"}>Continuous</option>
                                <option value={"Unknown"}>Unknown</option>
                            </select>
                        </div> 
                        <div className="group w-full mb-2 items-center justify-end">
                            <button
                                className="flex items-center justify-center rounded-lg  h-10 w-full mt-6 mr-10 bg-blue-400 group-hover:bg-blue-600"
                                onClick={() => {
                                showMod();
                                }}
                            >
                                <p className="text-black text-lg font-semibold group-hover:text-white ">
                                Submit
                                </p>
                            </button>
                        </div>
                        <div className="w-full mb-2"></div>
                        <div className="w-full mb-2"></div>
                    </div>


                </div>

            </div>
    </>
    )
}
