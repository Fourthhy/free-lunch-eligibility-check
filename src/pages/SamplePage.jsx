import React, { useState, useEffect } from 'react';
import { Label, Dropdown, DropdownItem } from 'flowbite-react';

// Function to get the current month index (0-indexed)
function getCurrentMonthIndex() {
    const now = new Date();
    return now.getMonth();
}

// Function to get the current year
// This function is now used to set the fixed year for the calendar
function getCurrentYear() {
    const now = new Date();
    return now.getFullYear();
}

export default function SamplePage() {
    // Get the current month and year when the component initializes
    const initialMonthIndex = getCurrentMonthIndex();
    // Use getCurrentYear to set a fixed year for the calendar
    const fixedYear = getCurrentYear(); // This will make the calendar always show the current year

    // State to hold the selected month index (0-indexed)
    const [selectedMonthIndex, setSelectedMonthIndex] = useState(initialMonthIndex);
    // State to hold the generated calendar collections
    const [collections, setCollections] = useState([]);

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Function to calculate non-Sunday collections for a given month and the fixed year
    const getNonSundayCollectionsForMonth = (monthIndex) => { // Removed 'year' parameter
        const localCollections = [];

        // No input validation needed as month is selected via dropdown
        // and year is automatically fetched and fixed.

        // Start date for the given month and the fixed year
        let currentDate = new Date(fixedYear, monthIndex, 1);

        // Helper to get day name

        // --- Process the first collection (days until the first Sunday) ---
        let firstCollection = [];
        // Ensure we are still in the target month and year
        while (currentDate.getMonth() === monthIndex && currentDate.getFullYear() === fixedYear) {
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
        if (currentDate.getMonth() === monthIndex && currentDate.getFullYear() === fixedYear && currentDate.getDay() === 0) {
            currentDate.setDate(currentDate.getDate() + 1); // Move to Monday
        }

        // --- Process subsequent collections (6 days each, Monday to Saturday) ---
        // Continue while still in the target month and year
        while (currentDate.getMonth() === monthIndex && currentDate.getFullYear() === fixedYear) {
            let currentCollection = [];
            // Collect 6 days (Monday to Saturday)
            for (let i = 0; i < 6; i++) {
                // Check if we've gone into the next month or year within the loop
                if (currentDate.getMonth() !== monthIndex || currentDate.getFullYear() !== fixedYear) {
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
            if (currentDate.getMonth() === monthIndex && currentDate.getFullYear() === fixedYear && currentDate.getDay() === 0) {
                currentDate.setDate(currentDate.getDate() + 1); // Move to Monday
            } else if (currentDate.getMonth() !== monthIndex || currentDate.getFullYear() !== fixedYear) {
                // If we've moved to the next month or year, break the loop
                break;
            }
        }

        return localCollections;
    };

    // useEffect hook to re-calculate collections whenever selectedMonthIndex changes
    useEffect(() => {
        setCollections(getNonSundayCollectionsForMonth(selectedMonthIndex));
    }, [selectedMonthIndex]); // Removed selectedYear from dependencies

    return (
        <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen flex flex-col items-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 text-center">
                Custom Calendar Collections for {fixedYear}
            </h1>

            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg mb-8 flex flex-col gap-4 justify-center">
                {/* Month Dropdown */}
                <div className="flex-1">
                    <Label htmlFor="month-dropdown" value="Select Month" className="mb-2 block text-gray-700 font-medium" />
                    <Dropdown
                        id="month-dropdown"
                        label={monthNames[selectedMonthIndex] || 'Select Month'}
                        dismissOnClick={true}
                        className="w-full"
                    >
                        {monthNames.map((month, index) => (
                            <DropdownItem
                                key={index}
                                onClick={() => setSelectedMonthIndex(index)}
                                className="text-gray-700 hover:bg-gray-100"
                            >
                                {month}
                            </DropdownItem>
                        ))}
                    </Dropdown>
                </div>

                {/* Removed Year Dropdown as per request */}
            </div>

            <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                    Collections for {monthNames[selectedMonthIndex] || 'Invalid Month'} {fixedYear}
                </h2>
                {collections.length === 0 ? (
                    <p className="text-gray-600 text-center">No collections generated. Please select a valid month.</p>
                ) : (
                    collections.map((collection, index) => (
                        <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md bg-blue-50">
                            <h3 className="text-lg font-medium text-blue-800 mb-2">
                                Week {index + 1}
                            </h3>
                            <ul className="list-disc list-inside text-gray-700">
                                {collection.map((day, dayIndex) => (
                                    <li key={dayIndex} className="py-0.5">
                                        {day.date}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}