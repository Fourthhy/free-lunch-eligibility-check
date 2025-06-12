import React, { useState, useEffect, useCallback } from 'react';
import { Button, Dropdown, DropdownItem, Modal, ModalBody } from "flowbite-react";
import { Pencil, Trash, TriangleAlert, X } from "lucide-react"
import { RiPencilFill, RiArrowDropDownLine } from "react-icons/ri";
import { BiSolidTrash } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"; // Ensure this path is correct

// Constants
const PROGRAM_CODES = ["BSIS", "BSSW", "BAB", "BSAIS", "BSA", "ACT"];
const YEAR_LEVELS = ["1", "2", "3", "4"];
const DISPLAY_DAYS_ORDER_LOWERCASE = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const WEEKDAY_NAMES_FOR_MODAL = [
    { id: "monday", name: "Monday" }, { id: "tuesday", name: "Tuesday" },
    { id: "wednesday", name: "Wednesday" }, { id: "thursday", name: "Thursday" },
    { id: "friday", name: "Friday" }, { id: "saturday", name: "Saturday" },
];

// --- Data Transformation Helper ---
const transformBackendScheduleToFrontendView = (backendData, selectedProgram) => {
    if (!backendData || backendData.length === 0) return [];
    const groupedByYear = {};
    backendData.forEach(entry => {
        if (entry.program.toUpperCase() === selectedProgram.toUpperCase()) {
            const year = String(entry.yearLevel);
            const courseNameKey = `${entry.program} ${year}`;
            if (!groupedByYear[year]) groupedByYear[year] = {};
            if (!groupedByYear[year][courseNameKey]) {
                groupedByYear[year][courseNameKey] = {
                    id: courseNameKey, // For React key, using courseNameKey
                    courseName: courseNameKey, // e.g., "BSIS 1"
                    program: entry.program,
                    yearLevel: entry.yearLevel,
                    monday: false, _id_monday: null, tuesday: false, _id_tuesday: null,
                    wednesday: false, _id_wednesday: null, thursday: false, _id_thursday: null,
                    friday: false, _id_friday: null, saturday: false, _id_saturday: null,
                };
            }
            const dayKey = entry.dayOfWeek.toLowerCase();
            if (groupedByYear[year][courseNameKey].hasOwnProperty(dayKey)) {
                groupedByYear[year][courseNameKey][dayKey] = entry.isEligible;
                groupedByYear[year][courseNameKey][`_id_${dayKey}`] = entry._id;
            }
        }
    });
    const frontendView = [];
    YEAR_LEVELS.forEach(year => { // Ensure year level order
        if (groupedByYear[year]) {
            PROGRAM_CODES.forEach(progCode => { // Ensure program order within year if necessary (though current UI filters by one program)
                const key = `${progCode} ${year}`;
                if (groupedByYear[year][key] && progCode === selectedProgram) { // Only add for selected program
                    frontendView.push(groupedByYear[year][key]);
                }
            });
        }
    });
    return frontendView;
};

export default function Schedule() {
    const { token } = useAuth();
    const [courseDisplayData, setCourseDisplayData] = useState([]);
    const [currentProgramFilter, setCurrentProgramFilter] = useState(PROGRAM_CODES[0]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [selectedRowsForDelete, setSelectedRowsForDelete] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [modalSelectedProgram, setModalSelectedProgram] = useState(PROGRAM_CODES[0]);
    const [modalDisplayCourse, setModalDisplayCourse] = useState(PROGRAM_CODES[0]);
    const [modalSelectedYear, setModalSelectedYear] = useState(YEAR_LEVELS[0]);
    const [modalDisplayProgramYear, setModalDisplayProgramYear] = useState(YEAR_LEVELS[0]);
    const [modalSelectedEligibleDays, setModalSelectedEligibleDays] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState(null);

    const fetchScheduleForProgram = useCallback(async (programName) => {
        if (!token || !programName) { setCourseDisplayData([]); return; }
        setIsLoading(true); setApiError(null);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/schedules`, {
                headers: { Authorization: `Bearer ${token}` }, params: { program: programName }
            });
            if (response.data?.success) {
                const transformedData = transformBackendScheduleToFrontendView(response.data.data, programName);
                setCourseDisplayData(transformedData);
            } else {
                setApiError(response.data?.message || "Failed to fetch schedule."); setCourseDisplayData([]);
            }
        } catch (err) {
            console.error("Fetch schedule error:", err);
            setApiError(err.response?.data?.error?.message || err.message || "Error fetching schedule.");
            setCourseDisplayData([]);
        } finally { setIsLoading(false); }
    }, [token]);

    useEffect(() => {
        fetchScheduleForProgram(currentProgramFilter);
    }, [currentProgramFilter, fetchScheduleForProgram]);

    const handleProgramFilterChange = (selectedProgram) => {
        setCurrentProgramFilter(selectedProgram);
        setIsEditMode(false); setIsDeleteMode(false); setSelectedRowsForDelete([]); setApiError(null);
    };

    const handleEligibilityChange = async (currentEligibility, dayKey, courseNameKey) => {
        const targetCourse = courseDisplayData.find(item => item.courseName === courseNameKey);
        if (!targetCourse) return;
        const dayMongoId = targetCourse[`_id_${dayKey.toLowerCase()}`];
        if (!dayMongoId) {
            setApiError(`Cannot update: ${dayKey} for ${courseNameKey} is not yet scheduled. Use 'Add Schedule'.`); return;
        }
        const newEligibility = !currentEligibility;
        const originalData = JSON.parse(JSON.stringify(courseDisplayData));
        setCourseDisplayData(prevData => prevData.map(item =>
            item.courseName === courseNameKey ? { ...item, [dayKey.toLowerCase()]: newEligibility } : item
        ));
        setApiError(null);
        try {
            await axios.put(`${import.meta.env.VITE_API_BASE_URL}/schedules/${dayMongoId}`,
                { isEligible: newEligibility }, { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (err) {
            console.error("Update eligibility error:", err);
            setApiError(err.response?.data?.error?.message || "Failed to update schedule.");
            setCourseDisplayData(originalData);
        }
    };

    const handleCloseAddModal = () => { // Was handleModalClose
        setIsAddModalOpen(false);
        resetAddModalForm(); // Ensure reset on any close
    };

    // Renamed your original handleEnableEdit and handleEnableDelete
    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
        if (!isEditMode) setIsDeleteMode(false); // Turn off delete mode if turning on edit
        setSelectedRowsForDelete([]); // Clear delete selections
    };
    const toggleDeleteMode = () => {
        setIsDeleteMode(!isDeleteMode);
        if (!isDeleteMode) setIsEditMode(false); // Turn off edit mode if turning on delete
    };

    const handleRowSelectionForDelete = (event) => {
        const courseNameKey = event.target.value;
        setSelectedRowsForDelete(prev =>
            prev.includes(courseNameKey) ? prev.filter(cn => cn !== courseNameKey) : [...prev, courseNameKey]
        );
    };

    const handleModalDaySelection = (event) => {
        const dayId = event.target.value; // e.g., "monday"
        setModalSelectedEligibleDays(prev =>
            prev.includes(dayId) ? prev.filter(d => d !== dayId) : [...prev, dayId]
        );
    };

    const resetAddModalForm = () => {
        setModalSelectedProgram(PROGRAM_CODES[0]);
        setModalDisplayCourse(PROGRAM_CODES[0]);
        setModalSelectedYear(YEAR_LEVELS[0]);
        setModalDisplayProgramYear(YEAR_LEVELS[0]);
        setModalSelectedEligibleDays([]);
        setApiError(null); // Clear API error when opening/resetting modal
    };

    const handleOpenAddModal = () => {
        resetAddModalForm();
        setIsAddModalOpen(true);
        setIsEditMode(false); // Turn off other modes
        setIsDeleteMode(false);
    };

    const handleModalCourseSelect = (course) => {
        setModalSelectedProgram(course);
        setModalDisplayCourse(course);
    };

    const handleModalProgramYearSelect = (year) => {
        setModalSelectedYear(year);
        setModalDisplayProgramYear(year);
    };

    const handleSaveNewSchedule = async () => {
        if (!modalSelectedProgram || !modalSelectedYear || modalSelectedEligibleDays.length === 0) {
            alert("Please select program, year, and at least one eligible day."); return;
        }
        const scheduleDaysPayload = WEEKDAY_NAMES_FOR_MODAL.map(dayInfo => ({
            dayOfWeek: dayInfo.name, // Capitalized: "Monday"
            isEligible: modalSelectedEligibleDays.includes(dayInfo.id)
        }));
        const payload = {
            program: modalSelectedProgram, yearLevel: parseInt(modalSelectedYear, 10), scheduleDays: scheduleDaysPayload
        };
        setIsLoading(true); setApiError(null);
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/schedules`, payload, { headers: { Authorization: `Bearer ${token}` } });
            setIsAddModalOpen(false);
            fetchScheduleForProgram(currentProgramFilter); // Refresh current view
            resetAddModalForm();
        } catch (err) {
            console.error("Add schedule error:", err);
            setApiError(err.response?.data?.error?.message || err.message || "Error adding schedule.");
        } finally { setIsLoading(false); }
    };

    const handleDeleteSelectedSchedules = async () => {
        if (selectedRowsForDelete.length === 0) { alert("No schedules selected for deletion."); return; }
        setIsLoading(true); setApiError(null);
        let errorsEncountered = false;
        try {
            for (const courseNameKey of selectedRowsForDelete) {
                const targetCourse = courseDisplayData.find(item => item.courseName === courseNameKey);
                if (targetCourse) {
                    for (const day of DISPLAY_DAYS_ORDER_LOWERCASE) {
                        const dayMongoId = targetCourse[`_id_${day}`];
                        if (dayMongoId) {
                            try {
                                await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/schedules/${dayMongoId}`, { headers: { Authorization: `Bearer ${token}` } });
                            } catch (delErr) { errorsEncountered = true; }
                        }
                    }
                }
            }
            if (errorsEncountered) setApiError("Some schedule entries could not be deleted.");
        } catch (err) { setApiError("An error occurred during deletion."); }
        finally {
            fetchScheduleForProgram(currentProgramFilter);
            setSelectedRowsForDelete([]);
            setIsDeleteMode(false); setIsLoading(false);
        }
    };

    return (
        <>
            <div className="h-[100%] w-[100%]">
                {/* Header is rendered by Dashboard.jsx (parent) */}
                <div className="h-[90%] w-[100%] flex items-center justify-center">
                    <div className="h-[85%] w-[85%] shadow-sm shadow-gray-200 border-gray rounded-[15px] flex flex-col items-center justify-center bg-white">

                        <div className="h-[15%] w-[90%] flex items-center justify-between">
                            <Dropdown
                                label={<span className="text-[#1A2B88] font-Poppins font-bold text-[0.75rem]">{currentProgramFilter || "Select Program"}</span>}
                                dismissOnClick={true}
                                className="text-gray-500" // Original class
                                style={{ backgroundColor: '#e5e7eb', height: '30px' }}
                            >
                                {PROGRAM_CODES.map((prog) => (
                                    <DropdownItem key={prog} onClick={() => handleProgramFilterChange(prog)}>
                                        <span className="text-[0.87rem] font-bold font-Poppins text-[#1A2B88]">{prog}</span>
                                    </DropdownItem>
                                ))}
                            </Dropdown>
                            <div className="flex justify-center items-center gap-5">
                                <RiPencilFill className="cursor-pointer" size="24px" color={isEditMode ? `#5594E2` : `#000000`} onClick={toggleEditMode} />
                                <BiSolidTrash className="cursor-pointer" size="24px" color={isDeleteMode ? `#E46565` : `#000000`} onClick={toggleDeleteMode} />
                                <Button style={{ backgroundColor: "#1F3463", height: '35px' }} onClick={handleOpenAddModal}>Add Schedule</Button>
                            </div>
                        </div>

                        {/* This is your original table structure for display */}
                        <div className="relative h-[70%] w-[90%] shadow-sm shadow-gray-200 flex justify-center">
                            <div className="h-full w-full grid grid-cols-1"> {/* Original had grid-cols-[repeat(5, 1fr)] which doesn't match 7 day cols + course/year */}
                                {/* Header Row - Using your original structure */}
                                <div className={`h-full w-full grid ${isDeleteMode ? `grid-cols-[40px_repeat(7,_1fr)]` : `grid-cols-7`}`}> {/*This div is the header row */}
                                    {isDeleteMode ? (<span></span>) : ""} {/* Empty cell for checkbox column */}
                                    <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#1F3463] flex items-center justify-center">
                                        <p className="font-Poppins font-semibold text-white text-[1.1vw]">Course / Year</p>
                                    </div>
                                    {/* Dynamically create day headers based on DISPLAY_DAYS_ORDER_LOWERCASE */}
                                    {DISPLAY_DAYS_ORDER_LOWERCASE.map(day => (
                                        <div key={day} className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#1F3463] flex items-center justify-center">
                                            <p className="font-Poppins font-semibold text-white text-[1.1vw] capitalize">{day}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Data Rows - This part maps over courseDisplayData */}
                                {/* This assumes the outer h-full w-full grid grid-cols-1 handles row stacking */}
                                {/* The original had map directly after header, implying rows are direct children of this grid */}
                                {isLoading && <div className="col-span-full text-center p-4">Loading schedule...</div>}
                                {!isLoading && apiError && <div className="col-span-full text-center p-4 text-red-500">Error: {apiError}</div>}
                                {!isLoading && !apiError && courseDisplayData.length === 0 && <div className="col-span-full text-center p-4">No schedule data for {currentProgramFilter}.</div>}

                                {!isLoading && !apiError && courseDisplayData.map((item) => (
                                    <div key={item.id} className={`h-full w-full grid flex items-center row-span-1 ${isDeleteMode ? `grid-cols-[40px_repeat(7,_1fr)]` : `grid-cols-7`}`}>
                                        {isDeleteMode ? (
                                            <div className="flex items-center justify-center h-full border-gray-400 border-[0.5px]">
                                                <input
                                                    type="checkbox"
                                                    value={item.courseName} // Value for deletion logic
                                                    checked={selectedRowsForDelete.includes(item.courseName)}
                                                    onChange={handleRowSelectionForDelete}
                                                    className="h-5 w-5 rounded-full border-2 border-gray-400 bg-white checked:border-red-500 checked:bg-[radial-gradient(circle_at_center,_#EF4444_60%,_transparent_60%)] appearance-none cursor-pointer"
                                                />
                                            </div>
                                        ) : null}
                                        <div className="border-gray-400 border-[0.5px] w-[100%] h-[100%] bg-white flex items-center justify-center">
                                            <p className="font-Poppins font-bold text-[#1F3463] text-[1.1vw]">{item.courseName}</p>
                                        </div>
                                        {DISPLAY_DAYS_ORDER_LOWERCASE.map(dayKey => (
                                            <div key={dayKey} className={`border-gray-400 border-[0.5px] w-[100%] h-[100%] bg-opacity-30 flex items-center justify-center ${item[dayKey] ? `bg-[#16C098]` : `bg-[#EA4343]`}`}>
                                                {isEditMode ? (
                                                    <Dropdown label={item[dayKey] ? "Eligible" : "Ineligible"} inline className={`font-Poppins font-semibold text-[1.1vw] ${item[dayKey] ? `text-[#16C098]` : `text-[#EA4343]`}`}>
                                                        <DropdownItem onClick={() => handleEligibilityChange(item[dayKey], dayKey, item.courseName)}>
                                                            <span className={`font-Poppins text-[0.87rem] font-semibold text-center w-[100%] ${!item[dayKey] ? 'text-[#16C098]' : 'text-[#EA4343]'}`}>
                                                                Set to {!item[dayKey] ? "Eligible" : "Ineligible"}
                                                            </span>
                                                        </DropdownItem>
                                                    </Dropdown>
                                                ) : (
                                                    <p className={`font-Poppins font-semibold text-[1.1vw] ${item[dayKey] ? `text-[#16C098]` : `text-[#EA4343]`}`}>
                                                        {item[dayKey] ? "Eligible" : "Ineligible"}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="h-[15%] w-[90%] flex items-center justify-end">
                            {isEditMode && (<Button style={{ backgroundColor: "#1F3463", height: '35px' }} onClick={() => { setIsEditMode(false); }}>Done Editing</Button>)}
                            {isDeleteMode && (<Button style={{ backgroundColor: "#E46565", height: '35px' }} onClick={handleDeleteSelectedSchedules} disabled={selectedRowsForDelete.length === 0 || isLoading}>Delete Selected</Button>)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Schedule Modal (using your original structure with dynamic parts) */}
            <Modal show={isAddModalOpen} size={"md"} dismissible onClose={handleCloseAddModal}>
                <ModalBody>
                    <div className="flex flex-col gap-5">
                        <div className="flex justify-between items-center">
                            <p className="text-[1.5rem] font-Poppins font-regular text-[#1F3463] font-bold">Add Schedule</p>
                            <RxCross2 className="cursor-pointer" size={24} onClick={handleCloseAddModal} />
                        </div>
                        {apiError && <p className="text-red-500 text-sm text-center">{apiError}</p>}
                        <div className="w-[100%] flex gap-1">
                            <Dropdown renderTrigger={() => (<div className="relative flex w-[50%] h-[6vh] border-[1px] px-[10px] rounded-[10px] items-center justify-between cursor-pointer focus:border-gray-500 focus:outline-gray-100 border-gray-300"><span className={modalSelectedProgram ? "text-black text-[0.87rem]" : "text-[#949494] text-[0.87rem]"}>{modalDisplayCourse}</span><RiArrowDropDownLine size="2em" color="#000000" /></div>)} placement="bottom-start">
                                {PROGRAM_CODES.map((prog) => (<DropdownItem key={prog} onClick={() => handleModalCourseSelect(prog)}>{prog}</DropdownItem>))}
                            </Dropdown>
                            <Dropdown renderTrigger={() => (<div className="relative flex w-[50%] h-[6vh] border-[1px] px-[10px] rounded-[10px] items-center justify-between cursor-pointer focus:border-gray-500 focus:outline-gray-100 border-gray-300"><span className={modalSelectedYear ? "text-black text-[0.87rem]" : "text-[#949494] text-[0.87rem]"}>{modalDisplayProgramYear}</span><RiArrowDropDownLine size="2em" color="#000000" /></div>)} placement="bottom-start">
                                {YEAR_LEVELS.map((yr) => (<DropdownItem key={yr} onClick={() => handleModalProgramYearSelect(yr)}>{yr}</DropdownItem>))}
                            </Dropdown>
                        </div>
                        <div className="w-[100%] border-[#D9D9D9] rounded-[12px] border-[1px] h-auto p-3">
                            <p className="font-Inter text-[0.80rem] font-extralight pl-[15px] pt-[5px] mb-2">Select eligible days</p>
                            <div className="grid grid-cols-2 gap-x-2"> {/* Your original: h-[80%] w-[100%] flex */}
                                {WEEKDAY_NAMES_FOR_MODAL.map((day) => ( // Your original sliced these, showing all now
                                    <div key={day.id} className="flex items-center mb-2"> {/* Your original: w-[100%] pl-[15px] mt-[10px] */}
                                        <div className="w-[100%] h-[100%] flex items-center gap-3">
                                            <input type="checkbox" id={`modal-${day.id}`} value={day.id} checked={modalSelectedEligibleDays.includes(day.id)} onChange={handleModalDaySelection}
                                                className="h-5 w-5 rounded-full border-2 border-[#1f3562] checked:border-blue-500 checked:bg-[radial-gradient(circle_at_center,_#1f3562_60%,_transparent_60%)] appearance-none cursor-pointer" />
                                            <label htmlFor={`modal-${day.id}`} className="font-Inter text-[0.87rem] text-black capitalize">{day.name}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-[100%] flex gap-1">
                            <button type="button" className="h-[6vh] w-[50%] bg-[#DADADA] rounded-[5px] hover:bg-gray-400" onClick={handleCloseAddModal} disabled={isLoading}><p className="font-Poppins text-[0.87rem] text-black">Cancel</p></button>
                            <button type="button" className="h-[6vh] w-[50%] bg-[#1F3463] rounded-[5px] hover:bg-blue-800" onClick={handleSaveNewSchedule} disabled={isLoading}><p className="font-Poppins text-[0.87rem] text-white">{isLoading ? "Saving..." : "Save"}</p></button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}