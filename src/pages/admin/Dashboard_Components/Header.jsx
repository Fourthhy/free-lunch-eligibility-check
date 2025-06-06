import React from 'react';
import { Search, LockKeyhole, LogOut } from "lucide-react";
import { RiListSettingsFill } from "react-icons/ri";
import { Dropdown, DropdownItem } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext"; // Ensure this path is correct for your structure

export default function Header({ pageName, searchTerm, onSearchChange, showSearch }) {
    const navigate = useNavigate();
    const { admin, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/admin_login", { replace: true });
    };

    return (
        <>
            <div className="h-[100%] flex items-center justify-between overflow-y-visible">
                
                {/* Page Name Section (Left) */}
                <div className="ml-[2%] flex items-center h-[100%]">
                    <p className="font-Poppins text-[#1F3463] text-[1.875rem] font-bold overflow white-space text-overflow">
                        {pageName}
                    </p>
                </div>

                {/* Search Bar Section (Middle) */}
                {/* The container uses flex-grow to take available space and centers its content. Made invisible if showSearch is false. */}
                <div className={`flex-grow flex justify-center items-center h-[100%] px-2 sm:px-4 ${showSearch ? 'visible' : 'invisible'}`}> 
                    {showSearch && ( // The input itself is only rendered if showSearch is true for efficiency
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2" color="#303030  "> {/* Container for search input, controls height and max-width */}
                            <Search className="w-[42vw] h-[55%] pl-10 flex items-center rounded-[10px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.10)] font-Poppins"/>
                            <input
                                type="text"
                                className="w-[42vw] h-[55%] pl-10 flex items-center rounded-[10px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.10)] font-Poppins"
                                placeholder="Search student by name or  identification number..." // Original simpler placeholder
                                value={searchTerm || ""}
                                onChange={onSearchChange}
                            />
                        </div>
                    )}
                </div>
                
                {/* User Profile and Actions Section (Right) */}
                <div className="flex items-center h-[100%] flex-shrink-0">
                    {admin && (
                        <div className="flex items-center gap-2 md:gap-3">
                            <div className="flex flex-col justify-center text-right">
                                <p className="font-Poppins text-[1rem] md:text-[1.1rem] font-semibold text-gray-800 truncate">
                                    {admin.name || "Admin User"}
                                </p>
                                <p className="font-Poppins text-[0.8rem] md:text-[0.85rem] text-gray-500 mt-[-2px]">
                                    Administrator
                                </p>
                            </div>
                            <img 
                                src={admin.profilePictureUrl || "/user_profile.png"} 
                                alt="user profile" 
                                className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover border-2 border-gray-200"
                            />
                            <div>
                                <Dropdown 
                                    label="" 
                                    dismissOnClick={true} 
                                    renderTrigger={() => <RiListSettingsFill color="#4B5563" size="24px" className="cursor-pointer hover:text-blue-600" />} // Slightly darker icon
                                >
                                    <Link to="/changepassword">
                                        <DropdownItem>
                                            <div className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600">
                                                <LockKeyhole size="16px" /> Change Password
                                            </div>
                                        </DropdownItem>
                                    </Link>
                                    <DropdownItem onClick={handleLogout}>
                                        <div className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600">
                                            <LogOut size="16px" /> Log out
                                        </div>
                                    </DropdownItem>
                                </Dropdown>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}