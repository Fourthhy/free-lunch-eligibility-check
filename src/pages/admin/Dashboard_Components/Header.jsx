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
            <div className="h-[100%] flex items-end justify-between overflow-y-visible bg-white shadow-sm"> {/* Added bg-white and shadow for typical header look */}
                <div className="ml-[2%] flex items-center h-[100%]">
                    <p className="font-Poppins text-[#1F3463] text-[1.875rem] font-bold">
                        {pageName}
                    </p>
                </div>

                {showSearch && (
                    <div className="h-[100%] flex items-center relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/> {/* Adjusted icon styling */}
                        <input
                            type="text"
                            className="w-[35vw] md:w-[30vw] lg:w-[25vw] h-[55%] pl-10 pr-3 py-2 flex items-center rounded-[10px] bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 font-Poppins text-sm" // Adjusted styling
                            placeholder="Search..."
                            value={searchTerm || ""}
                            onChange={onSearchChange}
                        />
                    </div>
                )}

                {admin && (
                    <div className="mr-[2%] md:mr-[3%] lg:mr-[5%] h-[100%] flex items-center"> {/* Adjusted margin */}
                        <div className="flex items-center gap-2 md:gap-3">
                            <div className="flex flex-col justify-center text-right"> {/* Text alignment for name/role */}
                                <p className="font-Poppins text-[1rem] md:text-[1.1rem] font-semibold text-gray-800"> {/* Adjusted size/color */}
                                    {admin.name || "Admin User"}
                                </p>
                                <p className="font-Poppins text-[0.8rem] md:text-[0.85rem] text-gray-500 mt-[-2px]"> {/* Adjusted size/color */}
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
                                    renderTrigger={() => <RiListSettingsFill color="#555" size="22px" className="cursor-pointer hover:text-blue-600" />} // Adjusted icon styling
                                >
                                    <Link to="/changepassword">
                                        <DropdownItem>
                                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                                <LockKeyhole size="16px" /> Change Password
                                            </div>
                                        </DropdownItem>
                                    </Link>
                                    <DropdownItem onClick={handleLogout}>
                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                            <LogOut size="16px" /> Log out
                                        </div>
                                    </DropdownItem>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}