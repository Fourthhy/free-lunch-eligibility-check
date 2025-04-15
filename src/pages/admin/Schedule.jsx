import Header from "./Dashboard_Components/Header"
import { Button, Dropdown, DropdownItem } from "flowbite-react";
import { Pencil, Trash } from "lucide-react"

export default function Schedule() {
    return (
        <>
            <div className="h-[100%] w-[100%]">
                <div className="h-[10%]">
                    <Header pageName={"Schedule"} />
                </div>
                <div className="h-[90%] w-[100%] flex items-center justify-center">
                    <div className="h-[85%] w-[85%] border-[1px] shadow-sm shadow-gray-200 border-gray rounded-[15px] flex flex-col items-center justify-center">

                        <div className="h-[15%] w-[90%] flex items-center justify-between">
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
                                <DropdownItem>BSSW</DropdownItem>
                                <DropdownItem>BSA</DropdownItem>
                                <DropdownItem>BSAIS</DropdownItem>
                                <DropdownItem>BSIS</DropdownItem>
                                <DropdownItem>BAB</DropdownItem>
                                <DropdownItem>ACT</DropdownItem>
                            </Dropdown>
                            <div className="flex justify-center items-center gap-5">
                                <Pencil size="24px" />
                                <Trash size="24px" />
                                <Button style={{ backgroundColor: "#1F3463", height: '35px' }}>Add Schedule</Button>
                            </div>
                        </div>

                        <div className="h-[70%] w-[90%] border-[1px] shadow-sm shadow-gray-200">
                            <div className="h-[100%] w-[100%] grid grid-cols-[repea(5, 1fr)]">

                                <div className="h-full w-full grid grid-cols-7">
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#1F3463] flex items-center justify-center">
                                        <p className="font-Poppins font-semibold text-white text-[1.1vw]">
                                            Course / Year
                                        </p>
                                    </div>
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#1F3463] flex items-center justify-center">
                                        <p className="font-Poppins font-semibold text-white text-[1.1vw]">
                                            Monday
                                        </p>
                                    </div>
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#1F3463] flex items-center justify-center">
                                        <p className="font-Poppins font-semibold text-white text-[1.1vw]">
                                            Tuesday
                                        </p>
                                    </div>
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#1F3463] flex items-center justify-center">
                                        <p className="font-Poppins font-semibold text-white text-[1.1vw]">
                                            Wednesday
                                        </p>
                                    </div>
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#1F3463] flex items-center justify-center">
                                        <p className="font-Poppins font-semibold text-white text-[1.1vw]">
                                            Thursday
                                        </p>
                                    </div>
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#1F3463] flex items-center justify-center">
                                        <p className="font-Poppins font-semibold text-white text-[1.1vw]">
                                            Friday
                                        </p>
                                    </div>
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#1F3463] flex items-center justify-center">
                                        <p className="font-Poppins font-semibold text-white text-[1.1vw]">
                                            Saturday
                                        </p>
                                    </div>
                                </div>

                                <div className="h-full w-full grid grid-cols-7">
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-white flex items-center justify-center">
                                        <p className="font-Poppins font-bold text-[#1F3463] text-[1.1vw]">
                                            BSIS - 1
                                        </p>
                                    </div>
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#16C098] bg-opacity-30 flex items-center justify-center">
                                        <p className="font-Poppins font-semibold text-[#16C098] text-[1.1vw]">
                                            Eligible
                                        </p>
                                    </div>
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#EA4343] bg-opacity-30 flex items-center justify-center">
                                        <p className="font-Poppins font-semibold text-[#EA4343] text-[1.1vw]">
                                            Ineligible
                                        </p>
                                    </div>
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#16C098] bg-opacity-30 flex items-center justify-center">
                                        <p className="font-Poppins font-semibold text-[#16C098] text-[1.1vw]">
                                            Eligible
                                        </p>
                                    </div>
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#16C098] bg-opacity-30 flex items-center justify-center">
                                        <p className="font-Poppins font-semibold text-[#16C098] text-[1.1vw]">
                                            Eligible
                                        </p>
                                    </div>
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#EA4343] bg-opacity-30 flex items-center justify-center">
                                        <p className="font-Poppins font-semibold text-[#EA4343] text-[1.1vw]">
                                            Ineligible
                                        </p>
                                    </div>
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#16C098] bg-opacity-30 flex items-center justify-center">
                                        <p className="font-Poppins font-semibold text-[#16C098] text-[1.1vw]">
                                            Eligible
                                        </p>
                                    </div>
                                </div>

                                <div className="h-full w-full grid grid-cols-7">
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-white flex items-center justify-center">
                                        <p className="font-Poppins font-bold text-[#1F3463] text-[1.1vw]">
                                            BSIS - 2
                                        </p>
                                    </div>
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#16C098] bg-opacity-30 flex items-center justify-center">
                                        <p className="font-Poppins font-semibold text-[#16C098] text-[1.1vw]">
                                            Eligible
                                        </p>
                                    </div>
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#16C098] bg-opacity-30 flex items-center justify-center">
                                        <p className="font-Poppins font-semibold text-[#16C098] text-[1.1vw]">
                                            Eligible
                                        </p>
                                    </div>
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#EA4343] bg-opacity-30 flex items-center justify-center">
                                        <p className="font-Poppins font-semibold text-[#EA4343] text-[1.1vw]">
                                            Ineligible
                                        </p>
                                    </div>
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#16C098] bg-opacity-30 flex items-center justify-center">
                                        <p className="font-Poppins font-semibold text-[#16C098] text-[1.1vw]">
                                            Eligible
                                        </p>
                                    </div>
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#16C098] bg-opacity-30 flex items-center justify-center">
                                        <p className="font-Poppins font-semibold text-[#16C098] text-[1.1vw]">
                                            Eligible
                                        </p>
                                    </div>
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#EA4343] bg-opacity-30 flex items-center justify-center">
                                        <p className="font-Poppins font-semibold text-[#EA4343] text-[1.1vw]">
                                            Ineligible
                                        </p>
                                    </div>
                                </div>

                                <div className="h-full w-full grid grid-cols-7">
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-white flex items-center justify-center">
                                        <p className="font-Poppins font-bold text-[#1F3463] text-[1.1vw]">
                                            BSIS - 3
                                        </p>
                                    </div>
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#EA4343] bg-opacity-30 flex items-center justify-center">
                                        <p className="font-Poppins font-semibold text-[#EA4343] text-[1.1vw]">
                                            Ineligible
                                        </p>
                                    </div>
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#16C098] bg-opacity-30 flex items-center justify-center">
                                        <p className="font-Poppins font-semibold text-[#16C098] text-[1.1vw]">
                                            Eligible
                                        </p>
                                    </div>

                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#16C098] bg-opacity-30 flex items-center justify-center">
                                        <p className="font-Poppins font-semibold text-[#16C098] text-[1.1vw]">
                                            Eligible
                                        </p>
                                    </div>
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#16C098] bg-opacity-30 flex items-center justify-center">
                                        <p className="font-Poppins font-semibold text-[#16C098] text-[1.1vw]">
                                            Eligible
                                        </p>
                                    </div>
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#16C098] bg-opacity-30 flex items-center justify-center">
                                        <p className="font-Poppins font-semibold text-[#16C098] text-[1.1vw]">
                                            Eligible
                                        </p>
                                    </div>
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#16C098] bg-opacity-30 flex items-center justify-center">
                                        <p className="font-Poppins font-semibold text-[#16C098] text-[1.1vw]">
                                            Eligible
                                        </p>
                                    </div>
                                </div>

                                <div className="h-full w-full grid grid-cols-7">
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-white flex items-center justify-center">
                                        <p className="font-Poppins font-bold text-[#1F3463] text-[1.1vw]">
                                            BSIS - 4
                                        </p>
                                    </div>
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#16C098] bg-opacity-30 flex items-center justify-center">
                                        <p className="font-Poppins font-semibold text-[#16C098] text-[1.1vw]">
                                            Eligible
                                        </p>
                                    </div>
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#16C098] bg-opacity-30 flex items-center justify-center">
                                        <p className="font-Poppins font-semibold text-[#16C098] text-[1.1vw]">
                                            Eligible
                                        </p>
                                    </div>
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#16C098] bg-opacity-30 flex items-center justify-center">
                                        <p className="font-Poppins font-semibold text-[#16C098] text-[1.1vw]">
                                            Eligible
                                        </p>
                                    </div>
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#16C098] bg-opacity-30 flex items-center justify-center">
                                        <p className="font-Poppins font-semibold text-[#16C098] text-[1.1vw]">
                                            Eligible
                                        </p>
                                    </div>
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#EA4343] bg-opacity-30 flex items-center justify-center">
                                        <p className="font-Poppins font-semibold text-[#EA4343] text-[1.1vw]">
                                            Ineligible
                                        </p>
                                    </div>
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#16C098] bg-opacity-30 flex items-center justify-center">
                                        <p className="font-Poppins font-semibold text-[#16C098] text-[1.1vw]">
                                            Eligible
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="h-[15%] w-[90%]"></div>
                    </div>
                </div>
            </div>
        </>
    )
}