import React, { useState, useEffect, useCallback } from 'react';
import { IoIosCheckbox } from "react-icons/io";
import { AiFillCloseSquare } from "react-icons/ai";
import { Dropdown, DropdownItem } from "flowbite-react";
import axios from 'axios';
import { useOutletContext } from "react-router-dom"; // <<<< ADD THIS IMPORT
import { useAuth } from "../../context/AuthContext"; // Ensure this path is correct
// Removed Header import, assuming it's part of Dashboard.jsx
// REMOVE mock data import: import bsis from "../../sample-data/MealHistoryClaims/bsis.json"

const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];
const courseList = ['BSIS', 'BSSW', 'BAB', 'BSAIS', 'BSA', 'ACT']; // For Program dropdown UI

// Helper to get the number of days in a month for a given year
const getDaysInMonth = (year, monthIndex) => {
    return new Date(year, monthIndex + 1, 0).getDate();
};

// Generates day headers for the table (Mon-Sat for each week)
const getNonSundayCollectionsForMonth = (year, monthIndex) => {
    const collections = [];
    let currentDate = new Date(year, monthIndex, 1);
    while (currentDate.getMonth() === monthIndex) {
        if (currentDate.getDay() === 0) { // Skip Sunday
            currentDate.setDate(currentDate.getDate() + 1);
            continue;
        }
        let weekCollection = [];
        let weekLabelNumber = Math.ceil(currentDate.getDate() / 7); // Approximate week number
        // Collect days for the current week (Mon-Sat) or until month ends
        for (let i = 0; i < 6 && currentDate.getMonth() === monthIndex; i++) {
            if (currentDate.getDay() === 0) break; // Stop if we hit next Sunday within the 6 days
            weekCollection.push({ date: currentDate.getDate() });
            currentDate.setDate(currentDate.getDate() + 1);
        }
        if (weekCollection.length > 0) {
            collections.push({ weekLabel: `Week ${weekLabelNumber}`, days: weekCollection });
        }
    }
    return collections;
};


// --- Data Transformation Helper ---
const transformMealRecordsToFrontendView = (mealRecordsFromAPI, year, monthIndex) => {
    if (!mealRecordsFromAPI || mealRecordsFromAPI.length === 0) return [];

    const studentsData = {}; // { studentId: { studentInfo, mealClaims: {day: status} } }

    mealRecordsFromAPI.forEach(record => {
        if (!record.student) return; // Skip records without student info (should not happen with populate)

        const studentId = record.student._id;
        if (!studentsData[studentId]) {
            studentsData[studentId] = {
                // Ensure all expected fields for a student row are present
                id: studentId, // Or record.student.studentIdNumber for display consistency
                studentIdForDisplay: record.student.studentIdNumber, // The human-readable ID
                firstName: record.student.name ? record.student.name.split(" ")[0] : "N/A",
                lastName: record.student.name ? record.student.name.split(" ").slice(1).join(" ") : "",
                program: record.student.program, // For potential filtering or display elsewhere
                mealClaims: {} // { '1': true, '2': false ... } for the selected month
            };
        }
        const recordDate = new Date(record.dateChecked);
        if (recordDate.getFullYear() === year && recordDate.getMonth() === monthIndex) {
            const dayOfMonth = recordDate.getDate();
            // Assuming 'CLAIMED' is true, others false for the checkbox UI
            studentsData[studentId].mealClaims[dayOfMonth] = (record.status === 'CLAIMED');
        }
    });
    return Object.values(studentsData);
};


export default function MealRecordHistory() {
    const { token } = useAuth();
    const initialYear = new Date().getFullYear();
    const initialMonthIndex = new Date().getMonth(); // 0-11

    const [selectedYear, setSelectedYear] = useState(initialYear); // Year might change if UI allows
    const [selectedMonthIndex, setSelectedMonthIndex] = useState(initialMonthIndex);
    
    const [tableDayCollections, setTableDayCollections] = useState([]); // For table headers: [[{date:1}, {date:2}], [{date:8}..]]
    const [displayedRecords, setDisplayedRecords] = useState([]); // Transformed data for table body

    // Filter states
    const [selectedProgramFilter, setSelectedProgramFilter] = useState(""); // e.g. "BSIS" - currently UI only
    const [searchTerm, setSearchTerm] = useState(""); // For student name search

    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState(null);

    // Update table day headers when month/year changes
    useEffect(() => {
        setTableDayCollections(getNonSundayCollectionsForMonth(selectedYear, selectedMonthIndex));
    }, [selectedYear, selectedMonthIndex]);

    const fetchMealHistory = useCallback(async (year, monthIdx, studentNameSearch = "") => {
        if (!token) {
            setApiError("Authentication required.");
            return;
        }
        setIsLoading(true);
        setApiError(null);
        setDisplayedRecords([]); // Clear previous records

        const monthForAPI = `${year}-${(monthIdx + 1).toString().padStart(2, '0')}`; // YYYY-MM

        try {
            const params = { month: monthForAPI, limit: 1000 }; // Fetch many records for the month, client-side paginate students if needed
            if (studentNameSearch) {
                params.searchStudentName = studentNameSearch;
            }
            // If selectedProgramFilter were to be used for backend filtering,
            // you'd need to translate program name to studentIds or modify backend.
            // For now, program filter is only for UI.

            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/meal-records`, {
                headers: { Authorization: `Bearer ${token}` },
                params: params
            });

            if (response.data?.success) {
                const transformed = transformMealRecordsToFrontendView(response.data.data, year, monthIdx);
                setDisplayedRecords(transformed);
            } else {
                setApiError(response.data?.message || "Failed to fetch meal records.");
            }
        } catch (err) {
            console.error("Fetch meal records error:", err);
            setApiError(err.response?.data?.error?.message || err.message || "Error fetching meal records.");
        } finally {
            setIsLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchMealHistory(selectedYear, selectedMonthIndex, searchTerm);
    }, [selectedYear, selectedMonthIndex, searchTerm, fetchMealHistory]);
    
    // Handler for the search input in Header (passed from Dashboard.jsx)
    // This component is a child of Dashboard via Outlet, so it can use useOutletContext if Dashboard provides searchTerm
    // For now, assuming Header has its own search bar for this page, or we need to lift state.
    // Your Header.jsx shows search bar if pageName is "Meal History". We need to get that search term.
    // Let's assume for now that Dashboard.jsx passes `pageSearchTerm` via outlet context.
    const outletContext = useOutletContext();
    const pageSearchTerm = outletContext?.pageSearchTerm !== undefined ? outletContext.pageSearchTerm : "";

    useEffect(() => {
        setSearchTerm(pageSearchTerm); // Sync local searchTerm if it comes from Dashboard context
    }, [pageSearchTerm]);


    return (
        <>
            <div className="h-[100%] w-[100%]">
                {/* Header is rendered by Dashboard.jsx (parent) */}
                <div className="h-[90%] w-[100%] flex items-center justify-center">
                    <div className="w-[74.80vw] h-[84.77vh] border-[1px] border-gray-200 rounded-[10px] bg-white flex items-center justify-center">
                        <div className="h-[93%] w-[95%]">
                            <div className="w-[100%] h-[5%] flex justify-between items-center mb-2"> {/* Adjusted items-center and mb */}
                                <p className="text-[0.875rem] font-Poppins text-[#292D32] font-medium">
                                    This table shows the claimed and unclaimed meal record of LVCC students.
                                </p>
                                <div className="flex">
                                    {/* Program Dropdown - Currently for UI filtering only, not API */}
                                    <Dropdown
                                        label={<span className="text-[#1A2B88] font-Poppins font-semibold text-[0.875rem]">{selectedProgramFilter || "All Programs"}</span>}
                                        dismissOnClick={true} className="text-gray-500"
                                        style={{ backgroundColor: '#F6F6F6', height: '30px' }}>
                                        <DropdownItem onClick={() => setSelectedProgramFilter("")}><span className="text-[0.95rem] font-semibold font-Poppins text-[#1A2B88]">All Programs</span></DropdownItem>
                                        {courseList.map((program) => (
                                            <DropdownItem key={program} onClick={() => setSelectedProgramFilter(program)}>
                                                <span className="text-[0.95rem] font-semibold font-Poppins text-[#1A2B88]">{program}</span>
                                            </DropdownItem>
                                        ))}
                                    </Dropdown>
                                    {/* Month Dropdown */}
                                    <Dropdown
                                        label={<span className="text-[#1A2B88] font-Poppins font-semibold text-[0.875rem]">{monthNames[selectedMonthIndex]} {selectedYear}</span>}
                                        dismissOnClick={true} className="text-gray-500 ml-[15px]"
                                        style={{ backgroundColor: '#F6F6F6', height: '30px' }}>
                                        {monthNames.map((month, index) => (
                                            <DropdownItem key={month} onClick={() => setSelectedMonthIndex(index)}>
                                                <span className="text-[0.95rem] font-semibold font-Poppins text-[#1A2B88]">{month} {selectedYear}</span>
                                            </DropdownItem>
                                        ))}
                                        {/* TODO: Add year change capability if needed */}
                                    </Dropdown>
                                </div>
                            </div>

                            <div className="h-[88%] w-[100%] overflow-x-auto">
                                {/* Table Header */}
                                <div className="h-[12%] w-max min-w-full border-gray-400 border-1 flex flex-nowrap sticky top-0 bg-white z-10"> {/* Added sticky header */}
                                    <div className="border-r border-b border-t border-gray-200 flex-shrink-0 w-[190px] h-[100%] flex items-center pl-[25px] justify-start">
                                        <p className="text-[#1F3463] text-[1rem] font-bold font-Poppins">Students name</p>
                                    </div>
                                    {tableDayCollections.map((collection, index) => (
                                        <div key={`week-${index}`} className="h-[100%] w-auto flex flex-col">
                                            <div className="h-[45%] border-t border-r border-b border-gray-200 flex items-center justify-center px-2">
                                                <p className="text-[1rem] text-[#1F3463] font-semibold font-Poppins">{collection.weekLabel}</p>
                                            </div>
                                            <div className="h-[55%] flex">
                                                {collection.days.map((day, dayIndex) => (
                                                    <div key={dayIndex} className="h-[100%] w-[55px] border-r border-b border-gray-200 flex items-center justify-center">
                                                        <p className="text-[1rem] text-[#1F3463] font-semibold font-Poppins">{day.date}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Table Body - Data Rows */}
                                <div className="h-[88%] w-max min-w-full flex flex-col"> {/* Removed justify-evenly to stack rows */}
                                    {isLoading && <div className="w-full flex justify-center items-center p-10"><p>Loading records...</p></div>}
                                    {!isLoading && apiError && <div className="w-full flex justify-center items-center p-10 text-red-500"><p>Error: {apiError}</p></div>}
                                    {!isLoading && !apiError && displayedRecords.length === 0 && <div className="w-full flex justify-center items-center p-10"><p>No meal records found for the selected criteria.</p></div>}
                                    
                                    {!isLoading && !apiError && displayedRecords.map((item, index) => (
                                        // Filter by selectedProgramFilter on client-side for now
                                        (selectedProgramFilter === "" || item.program === selectedProgramFilter) && (
                                            <div key={item.id || index} className="flex flex-nowrap w-[100%] min-h-[50px] border-b border-gray-200"> {/* Added min-h */}
                                                <div className="flex-shrink-0 w-[190px] h-full border-r border-gray-200 flex items-center justify-start pl-[25px]">
                                                    <p className="text-[0.90rem] font-Poppins font-medium text-black">
                                                        {index + 1}. {item.firstName} {item.lastName} ({item.studentIdForDisplay})
                                                    </p>
                                                </div>
                                                {/* This assumes tableDayCollections and mealClaims align by day number which might be complex */}
                                                {/* We need to iterate through all days of the month and check against item.mealClaims */}
                                                {tableDayCollections.flatMap(week => week.days).map((dayHeader) => (
                                                    <div key={`${item.id}-${dayHeader.date}`} className="flex-shrink-0 w-[55px] h-full border-r border-gray-200 flex items-center justify-center">
                                                        {item.mealClaims[dayHeader.date] === true ? (<IoIosCheckbox color="#16c098" size="1.875rem" />) 
                                                        : item.mealClaims[dayHeader.date] === false ? (<AiFillCloseSquare color="#ed5b5a" size="1.875rem" />) 
                                                        : (<span className="text-gray-300">-</span>) /* No record for this day */
                                                        }
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>

                            {/* Pagination for students if needed - not implemented in this pass */}
                            <div className="h-[5%] pt-2"> {/* Adjusted to pt-2 from h-[5%] */}
                                {/* If displaying many students, pagination controls would go here */}
                                {/* For now, "some content" is kept from original */}
                                <p className="text-xs text-gray-400 text-center">Meal claim data for {monthNames[selectedMonthIndex]} {selectedYear}.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}