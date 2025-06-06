import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "./Dashboard_Components/Header"; // Adjust path if Header.jsx is elsewhere

export default function Dashboard() {
    const [selectedItem, setSelectedItem] = useState(0); // For sidebar active state
    const [isRetract, setIsRetract] = useState(false);    // For sidebar retraction state
    const itemHighlightBorder = `rounded-tl-[15px] rounded-bl-[15px] bg-[#F8FAFB]`;
    const nav = useNavigate();
    const location = useLocation();

    const [pageName, setPageName] = useState("Dashboard"); // For Header title
    const [searchTerm, setSearchTerm] = useState("");     // Shared search term

    // Effect to sync pageName and selectedItem with the current route
    useEffect(() => {
        const path = location.pathname;
        let currentPName = "Dashboard";
        let currentSItem = 0; // Default to Dashboard

        if (path.includes("/dashboard/masterlist")) {
            currentPName = "Masterlist";
            currentSItem = 1;
        } else if (path.includes("/dashboard/schedule")) {
            currentPName = "Schedule";
            currentSItem = 2;
        } else if (path.includes("/dashboard/MealRecordHistory")) {
            currentPName = "Meal History";
            currentSItem = 3;
        } else if (path === "/dashboard" || path === "/dashboard/") { // Explicitly Dashboard
            currentPName = "Dashboard";
            currentSItem = 0;
        }
        
        setPageName(currentPName);
        if (selectedItem !== currentSItem) { // Only set if different to avoid potential loops if item click also updates path
            setSelectedItem(currentSItem);
        }

        // Clear search term if the page is not Masterlist or Meal History
        if (currentPName !== "Masterlist" && currentPName !== "Meal History") {
            if (searchTerm !== "") setSearchTerm(""); // Only set if it actually needs clearing
        }
    }, [location.pathname, selectedItem, searchTerm]); // Added selectedItem and searchTerm to deps for safety, though primary driver is pathname

    const handleSelectItem = (itemIndex) => {
        // Update selectedItem immediately for UI responsiveness
        setSelectedItem(itemIndex);
        
        let targetPath = "/dashboard";
        let newPageName = "Dashboard";

        if (itemIndex === 1) {
            targetPath = "/dashboard/masterlist";
            newPageName = "Masterlist";
        } else if (itemIndex === 2) {
            targetPath = "/dashboard/schedule";
            newPageName = "Schedule";
        } else if (itemIndex === 3) {
            targetPath = "/dashboard/MealRecordHistory";
            newPageName = "Meal History";
        }
        
        nav(targetPath); // Navigate
        setPageName(newPageName); // Set page name directly

        // Clear search term if navigating away from Masterlist or Meal History via sidebar explicitly
        if (itemIndex !== 1 && itemIndex !== 3) {
            if (searchTerm !== "") setSearchTerm("");
        }
    };

    // Handler for search input changes from Header
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        // When search term changes, the Masterlist/MealHistory component's useEffect
        // (which depends on pageSearchTerm from context) should reset its own currentPageIndex to 0
        // and refetch. Dashboard doesn't need to manage Masterlist's page index directly.
    };

    return (
        <>
            <div className="w-screen h-screen flex bg-[#F8FAFB]">
                {/* Sidebar Start - Using your exact structure */}
                <div className={!isRetract ? `w-[20%]` : `w-[9%]`}> {/* Simplified condition */}
                    <div className="bg-[#1F3463]">
                        <div className="grid grid-cols-1 grid-rows-9 h-screen">
                            <div className="row-span-1">
                                <div className="h-[100%] w-[100%] flex items-center justify-center">
                                    <img src="/sidebar-icons/sidebar_lv_logo.svg" alt="LVCC Logo" className="overflow-y-hidden" />
                                </div>
                            </div>
                            <div className="row-span-7 h-[100%]">
                                <div className="h-[50%] flex flex-col gap-3 justify-evenly ml-[20px]">
                                    {/* Dashboard Item */}
                                    <div>
                                        <div className={selectedItem === 0 ? itemHighlightBorder : ''} onClick={() => handleSelectItem(0)}>
                                            <div className="m-[10px] flex items-center cursor-pointer">
                                                <svg width="1.7vw" height="2.70vh" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0 0.956177V25.791H24.328V22.2432H3.041V0.956177H0ZM15.205 0.956177V18.6953H21.287V0.956177H15.205ZM6.082 8.05184V18.6953H12.164V8.05184H6.082Z" fill={selectedItem === 0 ? `#1F3463` : `white`} />
                                                </svg>
                                                {!isRetract && (<p className={`font-Poppins font-weight ml-[10px] text-[1.3rem] font-medium ${selectedItem === 0 ? `text-[#1F3463]` : `text-white`}`}>Dashboard</p>)}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Masterlist Item */}
                                    <div>
                                        <div className={selectedItem === 1 ? itemHighlightBorder : ''} onClick={() => handleSelectItem(1)}>
                                            <div className="m-[10px] flex items-center cursor-pointer">
                                                <svg width="1.7vw" height="2.70vh" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0 0.523804V11.1723H9.12726V0.523804H0ZM12.1697 0.523804V4.0733H24.3394V0.523804H12.1697ZM12.1697 7.62279V11.1723H21.297V7.62279H12.1697ZM0 14.7218V25.3702H9.12726V14.7218H0ZM12.1697 14.7218V18.2713H24.3394V14.7218H12.1697ZM12.1697 21.8208V25.3702H21.297V21.8208H12.1697Z" fill={selectedItem === 1 ? `#1F3463` : `white`} />
                                                </svg>
                                                {!isRetract && (<p className={`font-Poppins font-weight ml-[10px] text-[1.3rem] font-medium ${selectedItem === 1 ? `text-[#1F3463]` : `text-white`}`}>Masterlist</p>)}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Schedule Item */}
                                    <div>
                                        <div className={selectedItem === 2 ? itemHighlightBorder : ''} onClick={() => handleSelectItem(2)}>
                                            <div className="m-[10px] flex items-center cursor-pointer">
                                                <svg width="1.7vw" height="2.70vh" viewBox="0 0 25 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0.39788 0.877441V8.97899H24.7025V0.877441H0.39788ZM0.39788 13.0298V32.9191C0.39788 33.1216 0.536764 33.2836 0.710368 33.2836H24.3553C24.5289 33.2836 24.6678 33.1216 24.6678 32.9191V13.0298H0.363159H0.39788ZM3.86997 17.0805H7.34207V21.1313H3.86997V17.0805ZM10.8142 17.0805H14.2863V21.1313H10.8142V17.0805ZM17.7583 17.0805H21.2304V21.1313H17.7583V17.0805ZM3.86997 25.1821H7.34207V29.2329H3.86997V25.1821ZM10.8142 25.1821H14.2863V29.2329H10.8142V25.1821Z" fill={selectedItem === 2 ? `#1F3463` : `white`} />
                                                </svg>
                                                {!isRetract && (<p className={`font-Poppins font-weight ml-[10px] text-[1.3rem] font-medium ${selectedItem === 2 ? `text-[#1F3463]` : `text-white`}`}>Schedule</p>)}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Meal History Item */}
                                    <div>
                                        <div className={selectedItem === 3 ? itemHighlightBorder : ''} onClick={() => handleSelectItem(3)}>
                                            <div className="m-[10px] flex items-center cursor-pointer">
                                                <svg width="1.7vw" height="2.70vh" viewBox="0 0 40 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M23.3334 3.08325H10C9.11597 3.08325 8.26812 3.4081 7.643 3.98634C7.01788 4.56458 6.66669 5.34883 6.66669 6.16659V30.8333C6.66669 31.651 7.01788 32.4353 7.643 33.0135C8.26812 33.5917 9.11597 33.9166 10 33.9166H30C30.8841 33.9166 31.7319 33.5917 32.357 33.0135C32.9822 32.4353 33.3334 31.651 33.3334 30.8333V12.3333L23.3334 3.08325Z" stroke={selectedItem === 3 ? `#1F3463` : `white`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M23.3333 3.08325V12.3333H33.3333" stroke={selectedItem === 3 ? `#1F3463` : `white`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M26.6666 20.0417H13.3333" stroke={selectedItem === 3 ? `#1F3463` : `white`} strokeWidth="3" strokeLinecap="square" strokeLinejoin="round"/>
                                                    <path d="M26.6666 26.2083H13.3333" stroke={selectedItem === 3 ? `#1F3463` : `white`} strokeWidth="3" strokeLinecap="square" strokeLinejoin="round"/>
                                                    <path d="M16.6666 13.875H15H13.3333" stroke={selectedItem === 3 ? `#1F3463` : `white`} strokeWidth="3" strokeLinecap="square" strokeLinejoin="round"/>
                                                </svg>
                                                {!isRetract && (<p className={`font-Poppins font-weight ml-[10px] text-[1.3rem] font-medium ${selectedItem === 3 ? `text-[#1F3463]` : `text-white`}`}>Meal History</p>)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row-span-1">
                                <div className="h-[100%] w-[100%] flex items-center justify-start ml-[30px]">
                                    <div className="flex items-center cursor-pointer" onClick={() => { setIsRetract(!isRetract) }}>
                                        <div style={isRetract ? { transform: 'rotate(180deg)' } : {}}>
                                            <svg width="26" height="26" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                <path d="M10.2193 ... Z" fill="white" /> {/* Shortened path for brevity */}
                                            </svg>
                                        </div>
                                        {!isRetract && (<p className="text-white font-Poppins ml-[20px] text-[1.2vw]">Close</p>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Sidebar End */}

                {/* Main Content Start */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="h-[10%] flex-shrink-0">
                        <Header
                            pageName={pageName}
                            searchTerm={searchTerm}
                            onSearchChange={handleSearchChange}
                            showSearch={pageName === "Masterlist" || pageName === "Meal History"}
                        />
                    </div>
                    <div className="flex-1 overflow-y-auto bg-[#F8FAFB]"> {/* Added bg to match overall, ensure Outlet content is padded if needed */}
                        <Outlet context={{ pageSearchTerm: searchTerm }} />
                    </div>
                </div>
                {/* Main Content End */}
            </div>
        </>
    );
}