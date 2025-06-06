import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import React, { useState, useEffect } from "react"; // Added useEffect
import { Outlet, useNavigate, useLocation } from "react-router-dom"; // Added useLocation, useOutletContext


export default function Dashboard() {
   const [selectedItem, setSelectedItem] = useState(0);
    const [isRetract, setIsRetract] = useState(false);
    const itemHighlightBorder = `rounded-tl-[15px] rounded-bl-[15px] bg-[#F8FAFB]`;
    const nav = useNavigate();
    const location = useLocation(); // Get current location

    // State for pageName (already exists indirectly via selectedItem, but explicit can be clearer)
    const [pageName, setPageName] = useState("Dashboard");

    // NEW: State for search term, to be shared between Header and child Outlet component
    const [searchTerm, setSearchTerm] = useState("");

    // Update pageName based on selectedItem or route changes
    useEffect(() => {
        const path = location.pathname;
        if (path.includes("/dashboard/masterlist")) {
            setPageName("Masterlist");
            setSelectedItem(1); // Sync selectedItem if navigating directly
        } else if (path.includes("/dashboard/schedule")) {
            setPageName("Schedule");
            setSelectedItem(2);
        } else if (path.includes("/dashboard/MealRecordHistory")) {
            setPageName("Meal History");
            setSelectedItem(3);
        } else if (path === "/dashboard" || path === "/dashboard/") {
            setPageName("Dashboard");
            setSelectedItem(0);
        }
        // When page changes, clear the search term if it's not for Masterlist/Meal History
        if (!path.includes("/dashboard/masterlist") && !path.includes("/dashboard/MealRecordHistory")) {
            setSearchTerm("");
        }
    }, [location.pathname]);


    const handleSelectItem = (item) => {
        setSelectedItem(item);
        // Clear search term when navigating away from Masterlist/Meal History via sidebar
        if (item !== 1 && item !== 3) { // Assuming Masterlist is 1, Meal History is 3
            setSearchTerm("");
        }
        switch (item) {
            case 0: nav("/dashboard"); break;
            case 1: nav("/dashboard/masterlist"); break;
            case 2: nav("/dashboard/schedule"); break;
            case 3: nav("/dashboard/MealRecordHistory"); break;
            default: alert("Pressed!");
        }
    };

    // Handler for search input changes from Header
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <div className="w-screen h-screen flex bg-[#F8FAFB]">
                <div className={isRetract == 0 ? `w-[20%]` : `w-[9%]`}>
                    <div className="bg-[#1F3463]">
                        <div className="grid grid-cols-1 grid-rows-9 h-screen">
                            <div className="row-span-1">
                                <div className="h-[100%] w-[100%] flex items-center justify-center">
                                    <img src="/sidebar-icons/sidebar_lv_logo.svg" alt="image" className="overflow-y-hidden" />
                                </div>
                            </div>
                            <div className="row-span-7 h-[100%]">
                                <div className="h-[50%] flex flex-col gap-3 justify-evenly ml-[20px]">

                                    <div>
                                        <div className={selectedItem == 0 ? itemHighlightBorder : ''} onClick={() => { handleSelectItem(0) }}>
                                            <div className="m-[10px] flex items-center">
                                                <svg width="1.7vw" height="2.70vh" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0 0.956177V25.791H24.328V22.2432H3.041V0.956177H0ZM15.205 0.956177V18.6953H21.287V0.956177H15.205ZM6.082 8.05184V18.6953H12.164V8.05184H6.082Z" fill={selectedItem == 0 ? `#1F3463` : `white`} />
                                                </svg>
                                                {
                                                    isRetract == false ? (<p className={`font-Poppins font-weight ml-[10px] text-[1.3rem] font-medium ${selectedItem == 0 ? `text-[#1F3463]` : `text-white`}`}>
                                                        Dashboard
                                                    </p>) : ''
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className={selectedItem == 1 ? itemHighlightBorder : ''} onClick={() => { handleSelectItem(1) }}>
                                            <div className="m-[10px] flex items-center">
                                                <svg width="1.7vw" height="2.70vh" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0 0.523804V11.1723H9.12726V0.523804H0ZM12.1697 0.523804V4.0733H24.3394V0.523804H12.1697ZM12.1697 7.62279V11.1723H21.297V7.62279H12.1697ZM0 14.7218V25.3702H9.12726V14.7218H0ZM12.1697 14.7218V18.2713H24.3394V14.7218H12.1697ZM12.1697 21.8208V25.3702H21.297V21.8208H12.1697Z" fill={selectedItem == 1 ? `#1F3463` : `white`} />
                                                </svg>
                                                {
                                                    isRetract == false ? (
                                                        <p className={`font-Poppins font-weight ml-[10px] text-[1.3rem] font-medium ${selectedItem == 1 ? `text-[#1F3463]` : `text-white`}`}>
                                                            Masterlist
                                                        </p>
                                                    ) : ''
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className={selectedItem == 2 ? itemHighlightBorder : ''} onClick={() => { handleSelectItem(2) }}>
                                            <div className="m-[10px] flex items-center">
                                                <svg width="1.7vw" height="2.70vh" viewBox="0 0 25 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0.39788 0.877441V8.97899H24.7025V0.877441H0.39788ZM0.39788 13.0298V32.9191C0.39788 33.1216 0.536764 33.2836 0.710368 33.2836H24.3553C24.5289 33.2836 24.6678 33.1216 24.6678 32.9191V13.0298H0.363159H0.39788ZM3.86997 17.0805H7.34207V21.1313H3.86997V17.0805ZM10.8142 17.0805H14.2863V21.1313H10.8142V17.0805ZM17.7583 17.0805H21.2304V21.1313H17.7583V17.0805ZM3.86997 25.1821H7.34207V29.2329H3.86997V25.1821ZM10.8142 25.1821H14.2863V29.2329H10.8142V25.1821Z" fill={selectedItem == 2 ? `#1F3463` : `white`} />
                                                </svg>
                                                {
                                                    isRetract == false ? (
                                                        <p className={`font-Poppins font-weight ml-[10px] text-[1.3rem] font-medium ${selectedItem == 2 ? `text-[#1F3463]` : `text-white`}`}>
                                                            Schedule
                                                        </p>
                                                    ) : ""
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    {/*MEAL HISTORY SECTION*/}
                                    <div>
                                        <div className={selectedItem === 3 ? itemHighlightBorder : ''} onClick={() => { handleSelectItem(3) }}>
                                            <div className="m-[10px] flex items-center">
                                                <svg width="1.7vw" height="2.70vh" viewBox="0 0 40 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M23.3334 3.08325H10C9.11597 3.08325 8.26812 3.4081 7.643 3.98634C7.01788 4.56458 6.66669 5.34883 6.66669 6.16659V30.8333C6.66669 31.651 7.01788 32.4353 7.643 33.0135C8.26812 33.5917 9.11597 33.9166 10 33.9166H30C30.8841 33.9166 31.7319 33.5917 32.357 33.0135C32.9822 32.4353 33.3334 31.651 33.3334 30.8333V12.3333L23.3334 3.08325Z" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill={selectedItem == 3 ? `#1F3463` : ``}/>
                                                    <path d="M23.3333 3.08325V12.3333H33.3333" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <path d="M26.6666 20.0417H13.3333" stroke="white" stroke-width="3" stroke-linecap="square" stroke-linejoin="round"/>
                                                    <path d="M26.6666 26.2083H13.3333" stroke="white" stroke-width="3" stroke-linecap="square" stroke-linejoin="round"/>
                                                    <path d="M16.6666 13.875H15H13.3333" stroke="white" stroke-width="3" stroke-linecap="square" stroke-linejoin="round"/>
                                                </svg>
                                                {
                                                    isRetract == false ? (
                                                        <p className={`font-Poppins font-weight ml-[10px] text-[1.3rem] font-medium ${selectedItem == 3 ? `text-[#1F3463]` : `text-white`}`}>
                                                            Meal History
                                                        </p>
                                                    ) : ""
                                                }
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {/*CLOSE ICON*/}
                            <div className="row-span-1">
                                <div className="h-[100%] w-[100%] flex items-center justify-start ml-[30px]">
                                    <div className="flex items-center" onClick={() => { setIsRetract(!isRetract) }}>
                                        <div style={isRetract == 0 ? {} : { transform: 'rotate(180deg)' }}>
                                            <svg width="26" height="26" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                <path d="M10.2193 0H17.7807C19.3487 0 20.5922 -1.11759e-07 21.593 0.081846C22.6183 0.165128 23.4841 0.340308 24.2767 0.742359C25.5599 1.39691 26.6029 2.44091 27.2562 3.72472C27.6597 4.51446 27.8349 5.38174 27.9182 6.40697C28 7.40779 28 8.65128 28 10.2193V17.7807C28 19.3487 28 20.5922 27.9182 21.593C27.8349 22.6183 27.6597 23.4841 27.2576 24.2767C26.6035 25.5597 25.56 26.6027 24.2767 27.2562C23.4841 27.6597 22.6183 27.8349 21.593 27.9182C20.5922 28 19.3487 28 17.7807 28H10.2193C8.65128 28 7.40779 28 6.40697 27.9182C5.38174 27.8349 4.5159 27.6597 3.72472 27.2576C2.44123 26.6037 1.39772 25.5602 0.743795 24.2767C0.340308 23.4841 0.165128 22.6183 0.081846 21.593C-1.11759e-07 20.5922 0 19.3487 0 17.7807V10.2193C0 8.65128 -1.11759e-07 7.40779 0.081846 6.40697C0.165128 5.38174 0.340308 4.5159 0.742359 3.72472C1.39666 2.44101 2.44069 1.39748 3.72472 0.743795C4.51446 0.340308 5.38174 0.165128 6.40697 0.081846C7.40779 -1.11759e-07 8.65128 0 10.2193 0ZM6.58215 2.22851C5.6919 2.30031 5.13908 2.43959 4.70113 2.66215C3.82327 3.10952 3.10952 3.82327 2.66215 4.70113C2.43959 5.13908 2.30174 5.6919 2.22851 6.58215C2.15528 7.48677 2.15385 8.64123 2.15385 10.2667V17.7333C2.15385 19.3602 2.15385 20.5147 2.22851 21.4178C2.30031 22.3081 2.43959 22.8609 2.66215 23.2989C3.10952 24.1767 3.82327 24.8905 4.70113 25.3378C5.13908 25.5604 5.6919 25.6983 6.58215 25.7715C7.14503 25.8174 7.8041 25.8347 8.61539 25.8433V2.15672C7.8041 2.1639 7.14503 2.18256 6.58215 2.22851ZM20.5046 8.93128C20.3027 8.72961 20.029 8.61633 19.7436 8.61633C19.4582 8.61633 19.1845 8.72961 18.9826 8.93128L14.6749 13.239C14.4732 13.4409 14.3599 13.7146 14.3599 14C14.3599 14.2854 14.4732 14.5591 14.6749 14.761L18.9826 19.0687C19.0812 19.1745 19.2001 19.2594 19.3322 19.3183C19.4643 19.3771 19.6069 19.4088 19.7515 19.4113C19.8961 19.4139 20.0397 19.3873 20.1738 19.3331C20.3079 19.2789 20.4297 19.1983 20.532 19.0961C20.6342 18.9938 20.7148 18.872 20.769 18.7379C20.8232 18.6038 20.8498 18.4602 20.8472 18.3156C20.8447 18.171 20.813 18.0284 20.7541 17.8963C20.6953 17.7642 20.6104 17.6453 20.5046 17.5467L16.958 14L20.5046 10.4533C20.7063 10.2514 20.8196 9.97769 20.8196 9.69231C20.8196 9.40692 20.7063 9.13321 20.5046 8.93128Z" fill="white" />
                                            </svg>
                                        </div>
                                        {
                                            isRetract == false ? (<p className="text-white font-Poppins ml-[20px] text-[1.2vw]">
                                                Close
                                            </p>) : ''
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
        </>
    )
}