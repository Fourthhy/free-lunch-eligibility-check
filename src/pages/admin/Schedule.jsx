import Header from "./Dashboard_Components/Header"
import { useState } from "react"
import { Button, Dropdown, DropdownItem } from "flowbite-react";
import { Pencil, Trash } from "lucide-react"
import { RiPencilFill } from "react-icons/ri";
import { BiSolidTrash } from "react-icons/bi";

import bsis from "../../sample-data/eliglbe_courses/bsis.json"
import bssw from "../../sample-data/eliglbe_courses/bssw.json"
import bab from "../../sample-data/eliglbe_courses/bab.json"
import bsais from "../../sample-data/eliglbe_courses/bsais.json"
import bsa from "../../sample-data/eliglbe_courses/bsa.json"
import act from "../../sample-data/eliglbe_courses/act.json"

export default function Schedule() {
    const [courseDisplayData, setCourseDisplayData] = useState(bsis);
    const [isEdit, setIsEdit] = useState(true)

    const handleChangeDisplayData = (selectedCourse) => {
        let data = [];
        switch (selectedCourse) {
            case "bsis":
                data = bsis;
                break;
            case "bssw":
                data = bssw;
                break;
            case "bab":
                data = bab;
                break;
            case "bsais":
                data = bsais;
                break;
            case "bsa":
                data = bsa;
                break;
            case "act":
                data = act;
                break;
            default:
                data = bsis;
                break;
        }
        setCourseDisplayData(data)
    }

    const handleEligibilityChange = (value, day, courseName) => {
        const updatedData = courseDisplayData.map(courseItem => {
            if (courseItem.courseName === courseName) {
                return { ...courseItem, [day]: !value };
            }
            return courseItem;
        });
        setCourseDisplayData(updatedData);
    };


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
                                        <span className="text-[#1A2B88] font-Poppins font-bold text-[0.75rem]">Select Program</span>
                                    </>
                                }
                                dismissOnClick={true}
                                className="text-gray-500"
                                style={{ backgroundColor: '#e5e7eb', height: '30px' }}>
                                <DropdownItem onClick={() => handleChangeDisplayData("bsis")}>  <span className="text-[0.87rem] font-bold font-Poppins text-[#1A2B88]">BSIS</span></DropdownItem>
                                <DropdownItem onClick={() => handleChangeDisplayData("bssw")}>  <span className="text-[0.87rem] font-bold font-Poppins text-[#1A2B88]">BSSW</span></DropdownItem>
                                <DropdownItem onClick={() => handleChangeDisplayData("bab")}>   <span className="text-[0.87rem] font-bold font-Poppins text-[#1A2B88]">BAB</span></DropdownItem>
                                <DropdownItem onClick={() => handleChangeDisplayData("bsa")}>   <span className="text-[0.87rem] font-bold font-Poppins text-[#1A2B88]">BSA</span></DropdownItem>
                                <DropdownItem onClick={() => handleChangeDisplayData("bsais")}> <span className="text-[0.87rem] font-bold font-Poppins text-[#1A2B88]">BSAIS</span></DropdownItem>
                                <DropdownItem onClick={() => handleChangeDisplayData("act")}>   <span className="text-[0.87rem] font-bold font-Poppins text-[#1A2B88]">ACT</span></DropdownItem>
                            </Dropdown>
                            <div className="flex justify-center items-center gap-5">
                                <RiPencilFill className="cursor-pointer" size="24px" color={isEdit ? `#5594E2` : `#000000`} onClick={() => setIsEdit(!isEdit)} />
                                <BiSolidTrash size="24px" color="#000000" />
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

                                {courseDisplayData.map((item) => (
                                    <div className="h-full w-full grid grid-cols-7">
                                        <div className="border-gray-400 border-[0.5px] w-[100%] h-[100%] bg-white flex items-center justify-center">
                                            <p className="font-Poppins font-bold text-[#1F3463] text-[1.1vw]">
                                                {item.courseName}
                                            </p>
                                        </div>
                                        <div className={`border-gray-400 border-[0.5px] w-[100%] h-[100%] bg-opacity-30 flex items-center justify-center ${item.monday ? `bg-[#16C098]` : `bg-[#EA4343]`}`}>
                                            <div className={`font-Poppins font-semibold text-[1.1vw] text-${item.monday ? '[#16C098]' : '[#EA4343]'}`}>
                                                {isEdit ? (
                                                    <Dropdown label={item.monday ? "Eligibile" : "Ineligible"} inline>
                                                        <DropdownItem onClick={() => handleEligibilityChange(item.monday, "monday", item.courseName)}>
                                                            <span className="text-[#16C098] font-Poppins text-[0.87rem] font-semibold text-center w-[100%]">
                                                                Eligibile
                                                            </span>
                                                        </DropdownItem>
                                                        <DropdownItem onClick={() => handleEligibilityChange(item.monday, "monday", item.courseName)}>
                                                            <span className="text-[#EA4343] font-Poppins text-[0.87rem] font-semibold text-center w-[100%]">
                                                                Ineligible
                                                            </span>
                                                        </DropdownItem>
                                                    </Dropdown>
                                                ) : (
                                                    <p className={`font-Poppins font-semibold text-[1.1vw] ${item.monday == true ? `text-[#16C098]` : `text-[#EA4343]`}`}>
                                                        {item.monday == true ? "Eligibile" : "Ineligible"}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className={`border-gray-400 border-[0.5px] w-[100%] h-[100%] bg-opacity-30 flex items-center justify-center ${item.tuesday == true ? `bg-[#16C098]` : `bg-[#EA4343]`}`}>
                                            <div className={`font-Poppins font-semibold text-[1.1vw] text-${item.tuesday ? '[#16C098]' : '[#EA4343]'}`}>
                                                {isEdit ? (
                                                    <Dropdown label={item.tuesday ? "Eligibile" : "Ineligible"} inline>
                                                        <DropdownItem onClick={() => handleEligibilityChange(item.tuesday, "tuesday", item.courseName)}>
                                                            <span className="text-[#16C098] font-Poppins text-[0.87rem] font-semibold text-center w-[100%]">
                                                                Eligibile
                                                            </span>
                                                        </DropdownItem>
                                                        <DropdownItem onClick={() => handleEligibilityChange(item.tuesday, "tuesday", item.courseName)}>
                                                            <span className="text-[#EA4343] font-Poppins text-[0.87rem] font-semibold text-center w-[100%]">
                                                                Ineligible
                                                            </span>
                                                        </DropdownItem>
                                                    </Dropdown>
                                                ) : (
                                                    <p className={`font-Poppins font-semibold text-[1.1vw] ${item.tuesday == true ? `text-[#16C098]` : `text-[#EA4343]`}`}>
                                                        {item.tuesday == true ? "Eligibile" : "Ineligible"}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className={`border-gray-400 border-[0.5px] w-[100%] h-[100%] bg-opacity-30 flex items-center justify-center ${item.wednesday == true ? `bg-[#16C098]` : `bg-[#EA4343]`}`}>
                                            <div className={`font-Poppins font-semibold text-[1.1vw] text-${item.wednesday ? '[#16C098]' : '[#EA4343]'}`}>
                                                {isEdit ? (
                                                    <Dropdown label={item.wednesday ? "Eligibile" : "Ineligible"} inline>
                                                        <DropdownItem onClick={() => handleEligibilityChange(item.wednesday, "wednesday", item.courseName)}>
                                                            <span className="text-[#16C098] font-Poppins text-[0.87rem] font-semibold text-center w-[100%]">
                                                                Eligibile
                                                            </span>
                                                        </DropdownItem>
                                                        <DropdownItem onClick={() => handleEligibilityChange(item.wednesday, "wednesday", item.courseName)}>
                                                            <span className="text-[#EA4343] font-Poppins text-[0.87rem] font-semibold text-center w-[100%]">
                                                                Ineligible
                                                            </span>
                                                        </DropdownItem>
                                                    </Dropdown>
                                                ) : (
                                                    <p className={`font-Poppins font-semibold text-[1.1vw] ${item.wednesday == true ? `text-[#16C098]` : `text-[#EA4343]`}`}>
                                                        {item.monday == true ? "Eligibile" : "Ineligible"}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className={`border-gray-400 border-[0.5px] w-[100%] h-[100%] bg-opacity-30 flex items-center justify-center ${item.thursday == true ? `bg-[#16C098]` : `bg-[#EA4343]`}`}>
                                            <div className={`font-Poppins font-semibold text-[1.1vw] text-${item.thursday ? '[#16C098]' : '[#EA4343]'}`}>
                                                {isEdit ? (
                                                    <Dropdown label={item.thursday ? "Eligibile" : "Ineligible"} inline>
                                                        <DropdownItem onClick={() => handleEligibilityChange(item.thursday, "thursday", item.courseName)}>
                                                            <span className="text-[#16C098] font-Poppins text-[0.87rem] font-semibold text-center w-[100%]">
                                                                Eligibile
                                                            </span>
                                                        </DropdownItem>
                                                        <DropdownItem onClick={() => handleEligibilityChange(item.thursday, "thursday", item.courseName)}>
                                                            <span className="text-[#EA4343] font-Poppins text-[0.87rem] font-semibold text-center w-[100%]">
                                                                Ineligible
                                                            </span>
                                                        </DropdownItem>
                                                    </Dropdown>
                                                ) : (
                                                    <p className={`font-Poppins font-semibold text-[1.1vw] ${item.thursday == true ? `text-[#16C098]` : `text-[#EA4343]`}`}>
                                                        {item.thursday == true ? "Eligibile" : "Ineligible"}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className={`border-gray-400 border-[0.5px] w-[100%] h-[100%] bg-opacity-30 flex items-center justify-center ${item.friday == true ? `bg-[#16C098]` : `bg-[#EA4343]`}`}>
                                            <div className={`font-Poppins font-semibold text-[1.1vw] text-${item.friday ? '[#16C098]' : '[#EA4343]'}`}>
                                                {isEdit ? (
                                                    <Dropdown label={item.friday ? "Eligibile" : "Ineligible"} inline>
                                                        <DropdownItem onClick={() => handleEligibilityChange(item.friday, "friday", item.courseName)}>
                                                            <span className="text-[#16C098] font-Poppins text-[0.87rem] font-semibold text-center w-[100%]">
                                                                Eligibile
                                                            </span>
                                                        </DropdownItem>
                                                        <DropdownItem onClick={() => handleEligibilityChange(item.friday, "friday", item.courseName)}>
                                                            <span className="text-[#EA4343] font-Poppins text-[0.87rem] font-semibold text-center w-[100%]">
                                                                Ineligible
                                                            </span>
                                                        </DropdownItem>
                                                    </Dropdown>
                                                ) : (
                                                    <p className={`font-Poppins font-semibold text-[1.1vw] ${item.friday == true ? `text-[#16C098]` : `text-[#EA4343]`}`}>
                                                        {item.friday == true ? "Eligibile" : "Ineligible"}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className={`border-gray-400 border-[0.5px] w-[100%] h-[100%] bg-opacity-30 flex items-center justify-center ${item.saturday == true ? `bg-[#16C098]` : `bg-[#EA4343]`}`}>
                                            <div className={`font-Poppins font-semibold text-[1.1vw] text-${item.saturday ? '[#16C098]' : '[#EA4343]'}`}>
                                                {isEdit ? (
                                                    <Dropdown label={item.saturday ? "Eligibile" : "Ineligible"} inline>
                                                        <DropdownItem onClick={() => handleEligibilityChange(item.saturday, "saturday", item.courseName)}>
                                                            <span className="text-[#16C098] font-Poppins text-[0.87rem] font-semibold text-center w-[100%]">
                                                                Eligibile
                                                            </span>
                                                        </DropdownItem>
                                                        <DropdownItem onClick={() => handleEligibilityChange(item.saturday, "saturday", item.courseName)}>
                                                            <span className="text-[#EA4343] font-Poppins text-[0.87rem] font-semibold text-center w-[100%]">
                                                                Ineligible
                                                            </span>
                                                        </DropdownItem>
                                                    </Dropdown>
                                                ) : (
                                                    <p className={`font-Poppins font-semibold text-[1.1vw] ${item.saturday == true ? `text-[#16C098]` : `text-[#EA4343]`}`}>
                                                        {item.saturday == true ? "Eligibile" : "Ineligible"}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="h-[15%] w-[90%] flex items-center justify-end">
                            {isEdit ? (
                                <Button style={{ backgroundColor: "#1F3463", height: '35px' }}>Save Changes</Button>
                            ) : ""}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}