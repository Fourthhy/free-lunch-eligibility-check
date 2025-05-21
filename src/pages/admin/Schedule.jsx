import Header from "./Dashboard_Components/Header"
import { useState } from "react"
import { Button, Dropdown, DropdownItem, Modal, ModalBody } from "flowbite-react";
import { Pencil, Trash } from "lucide-react"
import { RiPencilFill, RiArrowDropDownLine } from "react-icons/ri";
import { BiSolidTrash } from "react-icons/bi";

import bsis from "../../sample-data/eliglbe_courses/bsis.json"
import bssw from "../../sample-data/eliglbe_courses/bssw.json"
import bab from "../../sample-data/eliglbe_courses/bab.json"
import bsais from "../../sample-data/eliglbe_courses/bsais.json"
import bsa from "../../sample-data/eliglbe_courses/bsa.json"
import act from "../../sample-data/eliglbe_courses/act.json"

export default function Schedule() {
    const [courseDisplayData, setCourseDisplayData] = useState(bsis);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isAddSchedule, setIsAddSchedule] = useState(true);
    const [selectedEligibleDays, setSelectedEligibleDays] = useState([])

    const [selectedCourse, setSelectedCourse] = useState("");
    const [displayCourse, setDisplayCourse] = useState("Choose Course");

    const [selectedProgramYear, setSelectedProgramYear] = useState("");
    const [displayProgramYear, setDisplayProgramYear] = useState("Choose year");

    const courseOrder = ["BSIS", "BSSW", "BAB", "BSAIS", "BSA", "ACT"]; // Add more as needed
    const programYear = ["1", "2", "3", "4"]; // Added "5" for flexibility

    const weekDays = [
        {
            id: "monday",
            "name": "monday"
        },
        {
            id: "tuesday",
            "name": "tuesday"
        },
        {
            id: "wednesday",
            "name": "wednesday"
        },
        {
            id: "thursday",
            "name": "thursday"
        },
        {
            id: "friday",
            "name": "friday"
        },
        {
            id: "saturday",
            "name": "saturday"
        }
    ]

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

    const handleOptionChange = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        console.log("onChange triggered for ID:", value);
        console.log("Checkbox isChecked:", isChecked);
        console.log("Current selectedOptions (before update):", selectedOptions);

        if (isChecked) {
            setSelectedOptions(prevSelectedOptions => {
                const updatedOptions = [...prevSelectedOptions, value];
                console.log("selectedOptions (after adding):", updatedOptions);
                return updatedOptions;
            });
        } else {
            setSelectedOptions(prevSelectedOptions => {
                const updatedOptions = prevSelectedOptions.filter((option) => option !== value);
                console.log("selectedOptions (after removing):", updatedOptions);
                return updatedOptions;
            });
        }
    };

    const handleSelectedEligibleDays = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedEligibleDays(prevSelectedDays => [...prevSelectedDays, value]);
        } else {
            setSelectedEligibleDays(prevSelectedDays => prevSelectedDays.filter((day) => day !== value));
        }
    }

    const handleSubmit = () => {
        setIsDelete(false);
        // Filter out the selected courses from the current display data
        // const updatedCourseData = courseDisplayData.filter(
        //     (item) => !selectedOptions.includes(item.courseName)
        // );
        // Update the state to re-render the list without the deleted items
        // setCourseDisplayData(updatedCourseData);
        // alert(`Deleted: ${selectedOptions.join(', ')}`);
        // setSelectedOptions([]); // Clear selections after deletion
    };

    const handleCourseSelect = (course) => {
        setSelectedCourse(course);
        setDisplayCourse(course);
    };

    const handleProgramYearSelect = (year) => {
        setSelectedProgramYear(year);
        setDisplayProgramYear(year);
    };

    const handleModalClose = () => {
        setIsAddSchedule(false);
        // resetModalForm(); // Reset form on any close action
    }

    const handleEnableEdit = () => {
        setIsEdit(true)
        setIsDelete(false)
    }

    const handleEnableDelete = () => {
        setIsDelete(true)
        setIsEdit(false)
    }

    const handleEnableAdd = () => {
        setIsAddSchedule(true)
        setIsDelete(false)
        setIsEdit(false)
    }

    return (
        <>
            <div className="h-[100%] w-[100%]">
                <div className="h-[10%]">
                    <Header pageName={"Schedule"} />
                </div>
                <div className="h-[90%] w-[100%] flex items-center justify-center">
                    <div className="h-[85%] w-[85%] shadow-sm shadow-gray-200 border-gray rounded-[15px] flex flex-col items-center justify-center">

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
                                <RiPencilFill className="cursor-pointer" size="24px" color={isEdit ? `#5594E2` : `#000000`} onClick={() =>  handleEnableEdit() } />
                                <BiSolidTrash className="cursor-pointer" size="24px" color={isDelete ? `#E46565` : `#000000`} onClick={() =>  handleEnableDelete() } />
                                <Button style={{ backgroundColor: "#1F3463", height: '35px' }} onClick={() => handleEnableAdd() }>Add Schedule</Button>
                            </div>
                        </div>

                        <div className="relative h-[70%] w-[100%] shadow-sm shadow-gray-200 flex justify-center">

                            <div className="h-[100%] w-[90%] grid grid-cols-[repeat(5, 1fr)]">
                                <div className={`h-full w-full grid ${isDelete ? `grid-cols-[40px_repeat(7,_1fr)]` : `grid grid-cols-7`}`}>
                                    {isDelete ? (<span></span>) : ""}
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
                                    <>
                                        <div className={`h-full w-full grid flex items-center row-span-1 ${isDelete ? `grid-cols-[40px_repeat(7,_1fr)]` : `grid grid-cols-7`}`}>
                                            {isDelete ? (
                                                <input
                                                    type="checkbox"
                                                    value={item.id}
                                                    onChange={handleOptionChange}
                                                    className="
                                                        h-5 w-5 rounded-full border-2 border-gray-400 bg-white
                                                        checked:border-red-500
                                                        checked:bg-[radial-gradient(circle_at_center,_#EF4444_60%,_transparent_60%)]
                                                        checked:bg-no-repeat checked:bg-center checked:bg-cover
                                                        focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50
                                                        appearance-none cursor-pointer transition-colors duration-200"
                                                />
                                            ) : ""}
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
                                                            {item.wednesday == true ? "Eligibile" : "Ineligible"}
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
                                    </>
                                ))}
                            </div>

                        </div>

                        <div className="h-[15%] w-[90%] flex items-center justify-end">
                            {isEdit && (
                                <Button
                                    style={{ backgroundColor: "#1F3463", height: '35px' }}
                                    onClick={() => { setIsEdit(false) }}>
                                    Save Changes
                                </Button>
                            )}
                            {isDelete && (
                                <Button
                                    style={{ backgroundColor: "#E46565", height: '35px' }}
                                    onClick={() => handleSubmit()}>
                                    Delete
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={isAddSchedule} size={"md"}>
                <ModalBody>
                    <div className="flex flex-col gap-5">
                        <p className="text-[1.5rem] font-Poppins font-regular text-[#1F3463] font-bold">
                            Add Schedule
                        </p>
                        <div className="w-[100%] flex gap-1">
                            <Dropdown
                                renderTrigger={() => (
                                    <div className="relative flex w-[50%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[#949494] rounded-[10px] items-center justify-between cursor-pointer"> {/* Changed to justify-between */}
                                        <span className={selectedCourse ? "text-black text-[0.87rem]" : "text-[#949494] text-[0.87rem]"}>
                                            {displayCourse}
                                        </span>
                                        <RiArrowDropDownLine size="2em" color="#000000" />
                                    </div>
                                )}
                                placement="bottom-start" // Adjusted placement
                            >

                                {courseOrder.map((course) => (
                                    <DropdownItem
                                        key={course}
                                        onClick={() => handleCourseSelect(course)}
                                        className={selectedCourse === course ? "bg-gray-100 text-black w-full" : "text-gray-700 hover:bg-gray-100 hover:text-black w-full"} // Ensure items take full width
                                    >
                                        <p className="px-[2px] font-Inter text-[0.87rem] text-black">{course}</p>
                                    </DropdownItem>
                                ))}
                            </Dropdown>
                            <Dropdown
                                renderTrigger={() => (
                                    <div className="relative flex w-[50%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[#949494] rounded-[10px] items-center justify-between cursor-pointer"> {/* Changed to justify-between */}
                                        <span className={selectedProgramYear ? "text-black text-[0.87rem]" : "text-[#949494] text-[0.87rem]"}>
                                            {displayProgramYear}
                                        </span>
                                        <RiArrowDropDownLine size="2em" color="#000000" />
                                    </div>
                                )}
                                placement="bottom-start" // Adjusted placement
                            >
                                {programYear.map((item) => (
                                    <DropdownItem key={item} onClick={() => handleProgramYearSelect(item)} className={selectedProgramYear === item ? "bg-gray-100 text-black w-full" : "text-gray-700 hover:bg-gray-100 hover:text-black w-full"}>
                                        <p className="font-Inter text-[0.87rem] text-black">{item}</p>
                                    </DropdownItem>
                                ))}
                            </Dropdown>
                        </div>
                        <div className="w-[100%] border-[#D9D9D9] rounded-[12px] border-[1px] h-[20vh]">
                            <div className="h-[20%] w-[100%]">
                                <p className="font-Inter text-[0.80rem] font-extralight pl-[15px] pt-[5px]">
                                    Select eligible days
                                </p>
                            </div>
                            <div className="h-[80%] w-[100%] flex">
                                <div className="h-[100%] w-[50%]">
                                    {weekDays.slice(0, 3).map((day, index) => (
                                        <div key={day.id} className="flex items-center w-[100%] pl-[15px] mt-[10px]">
                                            <div className="w-[100%] h-[100%] flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    id={day.id}
                                                    value={day.name}
                                                    onChange={handleSelectedEligibleDays}
                                                    className="
                                            h-5 w-5 rounded-full border-2 border-[#1f3562] bg-white
                                            checked:border-blue-500
                                            checked:bg-[radial-gradient(circle_at_center,_#1f3562_60%,_transparent_60%)]
                                            checked:bg-no-repeat checked:bg-center checked:bg-cover
                                            focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50
                                            appearance-none cursor-pointer transition-colors duration-200"
                                                />
                                                <label htmlFor={day.id} className="font-Inter text-[0.87rem] text-black capitalize">
                                                    {day.name}
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="h-[100%] w-[50%]">
                                    {weekDays.slice(3, 6).map((day, index) => (
                                        <div key={day.id} className="flex items-center w-[100%] pl-[15px] mt-[10px]">
                                            <div className="w-[100%] h-[100%] flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    id={day.id}
                                                    value={day.name}
                                                    onChange={handleSelectedEligibleDays}
                                                    className="
                                            h-5 w-5 rounded-full border-2 border-[#1f3562] bg-white
                                            checked:border-blue-500
                                            checked:bg-[radial-gradient(circle_at_center,_#1f3562_60%,_transparent_60%)]
                                            checked:bg-no-repeat checked:bg-center checked:bg-cover
                                            focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50
                                            appearance-none cursor-pointer transition-colors duration-200"
                                                />
                                                <label htmlFor={day.id} className="font-Inter text-[0.87rem] text-black capitalize">
                                                    {day.name}
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="w-[100%] flex gap-1">
                            <button type="button" className="h-[6vh] w-[50%] bg-[#DADADA] rounded-[5px] hover:bg-gray-400" onClick={handleModalClose}>
                                <p className="font-Poppins text-[0.87rem] text-black">
                                    Cancel
                                </p>
                            </button>
                            <button type="button" className="h-[6vh] w-[50%] bg-[#1F3463] rounded-[5px] hover:bg-blue-800" onClick={handleModalClose}>
                                <p className="font-Poppins text-[0.87rem] text-white">
                                    Save
                                </p>
                            </button>
                        </div>
                    </div>
                </ModalBody>
            </Modal >
        </>
    )
}