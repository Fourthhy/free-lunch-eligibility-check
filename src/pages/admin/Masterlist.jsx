import { Button, Dropdown, DropdownItem } from "flowbite-react";
import { Pencil, Trash, ChevronLeft, ChevronRight } from "lucide-react"
import Header from "./Dashboard_Components/Header"


export default function Masterlist() {
    return (
        <>
            <div className="h-[100%] w-[100%]">
                <div className="h-[10%]">
                    <Header pageName={"Masterlist"} />
                </div>
                <div className="h-[90%] w-[100%] items-center justify-center flex">
                    <div className="h-[95%] w-[95%] border-[1px] bg-white rounded-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.10)] flex flex-col">
                        <div className="w-[100%] h-[15%] flex">
                            <div className="w-[60%] h-[100%] flex items-center justify-start">
                                <p className="font-Poppins text-[1.375rem] font-semibold text-[#232323] overflow white-space text-overflow pl-[42px]">
                                    All Students
                                </p>
                            </div>
                            <div className="w-[40%] h-[100%] flex items-center justify-evenly">
                                <Dropdown
                                    label={
                                        <>
                                            <span className="text-gray-500">Sort By: &nbsp;</span>
                                            <span className="font-semibold text-black">Course</span>
                                        </>
                                    }
                                    dismissOnClick={true}
                                    className="text-gray-500"
                                    style={{ backgroundColor: '#e5e7eb', height: '30px' }}>
                                    <DropdownItem>Name</DropdownItem>
                                    <DropdownItem>Course</DropdownItem>
                                    <DropdownItem>Student ID</DropdownItem>
                                </Dropdown>
                                <Button style={{ backgroundColor: "#1F3463", height: '30px' }}>Add Student</Button>
                            </div>
                        </div>
                        <div className="w-[100%] h-[75%]">
                            <div className="w-[100%] h-[100%]">
                                <div className="w-[100%] h-[100%] grid grid-rows-9 flex mx-[30px]">

                                    <div className="flex h-[100%]">
                                        <div className="h-[100%] w-[100%]">
                                            <p className="font-Poppins text-[#1F3463] text-[0.9rem] font-bold pl-[15px]">
                                                Student Name
                                            </p>
                                        </div>
                                        <div className="h-[100%] w-[100%]">
                                            <p className="font-Poppins text-[#1F3463] text-[0.9rem] font-bold pl-[15px]">
                                                Course/Year
                                            </p>
                                        </div>
                                        <div className="h-[100%] w-[100%]">
                                            <p className="font-Poppins text-[#1F3463] text-[0.9rem] font-bold pl-[15px]">
                                                Student ID no.
                                            </p>
                                        </div>
                                        <div className="h-[100%] w-[100%]">
                                            <p className="font-Poppins text-[#1F3463] text-[0.9rem] font-bold text-center">
                                                Action
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex">
                                        <div className="h-[100%] w-[100%]">
                                            <p className="font-Poppins text-black text-[0.9rem] pl-[15px]">
                                                Jane Cooper
                                            </p>
                                        </div>
                                        <div className="h-[100%] w-[100%] border-black border-[1px]">
                                            <p className="font-Poppins text-black text-[0.9rem] pl-[15px]">
                                                BSIS 3
                                            </p>
                                        </div>
                                        <div className="h-[100%] w-[100%]">
                                            <p className="font-Poppins text-black text-[0.9rem] pl-[15px]">
                                                22-00222MCM
                                            </p>
                                        </div>
                                        <div className="h-[100%] w-[100%] mr-[15px]">
                                            <p className="font-Poppins text-[#1F3463] text-[0.9rem] font-bold text-center flex items-center justify-center gap-3">
                                                <Pencil color="#5594E2" size="24px"/>
                                                <Trash color="#E46565" size="24px"/>
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="w-[100%] h-[10%] flex items-center justify-between">

                            <div className="bg-gray-300 rounded-[10px] py-1 px-2 w-[10%] flex items-center justify-center ml-[40px]">
                                <ChevronLeft size="1.1vw"/>
                                <span className="text-[0.9rem] font-Poppins text-gray-500">
                                    Previous                                    
                                </span>
                            </div>

                            <span className="text-[0.9rem] font-Poppins text-gray-500">
                                Page 1 of 100
                            </span>

                            <div className="bg-gray-300 rounded-[10px] py-1 px-2 w-[10%] flex items-center justify-center mr-[50px]">
                                <span className="text-[0.9rem] font-Poppins text-gray-500">
                                    Next                                   
                                </span>
                                <ChevronRight size="1.1vw"/>
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}