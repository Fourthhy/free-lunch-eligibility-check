import { ChevronLeft, ChevronRight } from "lucide-react";
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
                            <div className="w-[100%] h-[8%] flex justify-between items-start"> {/*TITLE DESCRIPTION*/}
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

                            <div className="h-[88%] w-[100%] overflow-x-auto">
                                {/* This is the main scrolling container that wraps everything */}

                                {/* Table Header */}
                                <div className="h-[12%] w-max min-w-full border-gray-400 border-1 flex flex-nowrap">
                                    {/* The w-max and min-w-full ensure it expands but also takes full width if content is small */}
                                    <div className="border-r border-b border-t border-gray-200 flex-shrink-0 w-[190px] h-[100%] flex items-center pl-[25px] justify-start">
                                        {/* flex-shrink-0 ensures this column doesn't shrink */}
                                        <p className="text-[#1F3463] text-[1rem] font-bold font-Poppins">
                                            Students name
                                        </p>
                                    </div>
                                    {/* Generate day headers (1, 2, 3, etc.) dynamically if possible, or manually */}
                                    {/* For illustration, let's assume days up to 31 */}
                                    {collections.map((collection, index) => (
                                        <div className=" h-[100%] w-auto flex flex-col">
                                            <div className="h-[45%] border-t border-r border-b border-gray-200 flex items-center justify-center">
                                                <p className="text-[1rem] text-[#1F3463] font-semibold font-Poppins">
                                                    Week {index + 1}
                                                </p>
                                            </div>
                                            <div className="h-[55%] flex">
                                                {collection.map((day, dayIndex) => (
                                                    <div key={dayIndex} className="h-[100%] w-[55px] border-r border-b border-gray-200 flex items-center justify-center">
                                                        <p className="text-[1rem] text-[#1F3463] font-semibold font-Poppins">
                                                            {day.date}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Table Body - Data Rows */}
                                <div className="h-[88%] w-max min-w-full flex flex-col justify-evenly">
                                    {/* w-max and min-w-full ensure consistency with the header row's width */}
                                    {bsis.map((item, index) => (
                                        <div className="flex flex-nowrap w-[100%] h-[100%] border-b border-gray-200">
                                            <div className="flex-shrink-0 w-[190px] h-[100%] border-r border-gray-200 flex items-center justify-start pl-[25px]">
                                                <p className="text-[0.90rem] font-Poppins font-medium text-black" key={index}>
                                                    {index + 1}. {item.firstName} {item.lastName}
                                                </p>
                                            </div>
                                            {Object.entries(item.mealClaims).map(([day, claimed]) => (
                                                <div key={day} className="flex-shrink-0 w-[55px] h-[100%] border-r border-gray-200 flex items-center justify-center">
                                                    {claimed ? (<IoIosCheckbox color="#16c098" size="1.875rem" />) : (<AiFillCloseSquare color="#ed5b5a" size="1.875rem" />)}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="h-[6%] w-[100%] flex justify-between mt-1">
                                <div
                                    className="bg-[#F6F6F6] rounded-[10px] py-1 px-2 w-auto flex items-center justify-center ml-[40px] cursor-pointer hover:bg-gray-200" // Made width auto
                                >
                                    <ChevronLeft size="1.1vw" />
                                    <span className="text-[0.9rem] font-Poppins text-[#292D32] font-Regular ml-2"> {/* Added margin */}
                                        Previous
                                    </span>
                                </div>
                                <div
                                    className="bg-[#F6F6F6] rounded-[10px] py-[1px] px-2 w-auto flex items-center justify-center mr-[50px] cursor-pointer hover:bg-gray-200" // Made width auto
                                >
                                    <span className="text-[0.9rem] font-Poppins text-[#292D32] font-regular mr-2"> {/* Added margin */}
                                        Next
                                    </span>
                                    <ChevronRight size="1.1vw" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}