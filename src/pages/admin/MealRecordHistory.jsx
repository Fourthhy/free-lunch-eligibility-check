import { IoIosCheckbox } from "react-icons/io";
import { AiFillCloseSquare } from "react-icons/ai";
import { Dropdown, DropdownItem } from "flowbite-react"
import React, { useState, useEffect } from 'react';
import Header from "./Dashboard_Components/Header";
import bsis from "../../sample-data/MealHistoryClaims/bsis.json"

// -- GUIDE FOR SORTING THE DAYS USING THE SUNDAY REMOVER
function getCurrentMonthIndex() {
    const now = new Date();
    return now.getMonth();
}

function getCurrentYear() {
    const now = new Date();
    return now.getFullYear();
}


export default function MealRecordHistory() {
    const initialMonthIndex = getCurrentMonthIndex();
    const initialYear = getCurrentYear();

    const [selectedMonthIndex, setSelectedMonthIndex] = useState(initialMonthIndex);
    const [collections, setCollections] = useState([]);
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const courseList = [
        'BSIS', 'BSSW', 'BAB', 'BSAIS', 'BSA', 'ACT'
    ]

    const getNonSundayCollectionsForMonth = (monthIndex) => { // Removed 'year' parameter
        const localCollections = [];

        // No input validation needed as month is selected via dropdown
        // and year is automatically fetched and fixed.

        // Start date for the given month and the fixed year
        let currentDate = new Date(initialYear, monthIndex, 1);

        // Helper to get day name

        // --- Process the first collection (days until the first Sunday) ---
        let firstCollection = [];
        // Ensure we are still in the target month and year
        while (currentDate.getMonth() === monthIndex && currentDate.getFullYear() === initialYear) {
            if (currentDate.getDay() === 0) { // If it's Sunday
                // Stop collecting for the first week, as Sundays are excluded
                break;
            }
            firstCollection.push({
                date: currentDate.getDate(),
            });
            currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
        }
        if (firstCollection.length > 0) {
            localCollections.push(firstCollection);
        }

        // Move past the first Sunday if we landed on one and are still in the target month/year
        if (currentDate.getMonth() === monthIndex && currentDate.getFullYear() === initialYear && currentDate.getDay() === 0) {
            currentDate.setDate(currentDate.getDate() + 1); // Move to Monday
        }

        // --- Process subsequent collections (6 days each, Monday to Saturday) ---
        // Continue while still in the target month and year
        while (currentDate.getMonth() === monthIndex && currentDate.getFullYear() === initialYear) {
            let currentCollection = [];
            // Collect 6 days (Monday to Saturday)
            for (let i = 0; i < 6; i++) {
                // Check if we've gone into the next month or year within the loop
                if (currentDate.getMonth() !== monthIndex || currentDate.getFullYear() !== initialYear) {
                    break;
                }
                currentCollection.push({
                    date: currentDate.getDate(),
                });
                currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
            }

            if (currentCollection.length > 0) {
                localCollections.push(currentCollection);
            }

            // If we're still in the target month/year and the current day is a Sunday, move past it
            if (currentDate.getMonth() === monthIndex && currentDate.getFullYear() === initialYear && currentDate.getDay() === 0) {
                currentDate.setDate(currentDate.getDate() + 1); // Move to Monday
            } else if (currentDate.getMonth() !== monthIndex || currentDate.getFullYear() !== initialYear) {
                // If we've moved to the next month or year, break the loop
                break;
            }
        }

        return localCollections;
    };

    useEffect(() => {
        setCollections(getNonSundayCollectionsForMonth(selectedMonthIndex));
    }, [selectedMonthIndex]);

    return (
        <>
            <div className="h-[100%] w-[100%]">
                <div className="h-[10%]">
                    <Header pageName={"Meal History"} />
                </div>
                <div className="h-[90%] w-[100%] flex items-center justify-center">
                    <div className="w-[74.80vw] h-[84.77vh] border-[1px] border-gray-200 rounded-[10px] bg-white flex items-center justify-center">
                        <div className="h-[93%] w-[95%]">
                            <div className="w-[100%] h-[5%] flex justify-between items-start"> {/*TITLE DESCRIPTION*/}
                                <p className="text-[0.875rem] font-Poppins text-[#292D32] font-medium">
                                    This table shows the claimed and unclaimed meal record of LVCC students.
                                </p>
                                <div className="flex">
                                    <Dropdown
                                        label={
                                            <>
                                                <span className="text-[#1A2B88] font-Poppins font-semibold text-[0.875rem]">
                                                    Program
                                                </span>
                                            </>
                                        }
                                        dismissOnClick={true}
                                        className="text-gray-500"
                                        style={{ backgroundColor: '#F6F6F6', height: '30px' }}>
                                        {courseList.map((program) => (
                                            <DropdownItem><span className="text-[0.95rem] font-semibold font-Poppins text-[#1A2B88]">{program}</span></DropdownItem>
                                        ))}
                                    </Dropdown>
                                    <Dropdown
                                        label={
                                            <>
                                                <span className="text-[#1A2B88] font-Poppins font-semibold text-[0.875rem]">
                                                    Month
                                                </span>
                                            </>
                                        }
                                        dismissOnClick={true}
                                        className="text-gray-500 ml-[15px]"
                                        style={{ backgroundColor: '#F6F6F6', height: '30px' }}>
                                        {monthNames.map((month) => (
                                            <DropdownItem><span className="text-[0.95rem] font-semibold font-Poppins text-[#1A2B88]">{month}</span></DropdownItem>
                                        ))}
                                    </Dropdown>
                                </div>
                            </div>
                            <div className="h-[10%] w-[100%] border-gray-400 border-1"> {/*CONTENT*/}
                                <div className="border-1 h-[100%] w-[100%] border-t border-b border-gray-200">
                                    <div className="border-r border-gray-200 w-[20%] h-[100%] flex items-center pl-[25px] justify-start">
                                        <p className="text-[#1F3463] text-[1rem] font-bold font-Poppins">
                                            Students name
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[80%] w-[100%] flex flex-col justify-evenly overflow-x-auto">
                                {/* Main scrolling container */}
                                {bsis.map((item, index) => (
                                    <div className="flex flex-nowrap h-[100%] border-b border-gray-200">
                                        {/* This div now allows its content to extend horizontally */}
                                        <div className="flex-shrink-0 w-[20%] h-[100%] border-r border-gray-200 flex items-center justify-start pl-[25px]">
                                            {/* flex-shrink-0 prevents this column from shrinking */}
                                            <p className="text-[0.90rem] font-Poppins font-medium text-black" key={index}>
                                                {index + 1}. {item.firstName} {item.lastName}
                                            </p>
                                        </div>
                                        {Object.entries(item.mealClaims).map(([day, claimed]) => (
                                            <div key={day} className="flex-shrink-0 w-[55px] h-[100%] border-r border-gray-200 flex items-center justify-center">
                                                {/* Each day column now has a fixed width, e.g., 50px */}
                                                {/* flex-shrink-0 ensures they don't shrink */}
                                                {claimed ? (<IoIosCheckbox color="#16c098" size="1.875rem" />) : (<AiFillCloseSquare color="#ed5b5a" size="1.875rem" />)}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}