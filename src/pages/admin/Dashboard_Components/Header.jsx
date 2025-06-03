import { Search, LockKeyhole, LogOut } from "lucide-react";
import { RiListSettingsFill } from "react-icons/ri";
import { Dropdown, DropdownItem } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext"; // Import useAuth

export default function Header({ pageName }) {
    const navigate = useNavigate();
    const { admin, logout } = useAuth(); // Get admin details and logout function from context

    const handleLogout = () => {
        logout(); // Call logout from context
        navigate("/admin_login", { replace: true });
    };

    return (
        <>
            <div className="h-[100%] flex items-end justify-between overflow-y-visible">
                <div className="ml-[2%] flex items-center h-[100%]">
                    <p className="font-Poppins text-[#1F3463] text-[1.875rem] font-bold overflow white-space text-overflow">
                        {pageName}
                    </p>
                </div>

                {pageName === "Masterlist" || pageName === "Meal History" ? (
                    <div className="h-[100%] flex items-center relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" color="#303030" />
                        <input
                            type="text"
                            className="w-[42vw] h-[55%] pl-10 flex items-center rounded-[10px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.10)] font-Poppins"
                            placeholder="Search"
                        />
                    </div>
                ) : ""}

                {/* Conditionally render user info only if admin object exists */}
                {admin && (
                    <div className="mr-[5%] h-[100%] flex items-center">
                        <div className="flex items-center gap-2">
                            <div className="flex flex-col justify-center">
                                {/* Display dynamic admin name */}
                                <p className="font-Poppins text-[1.2rem] font-bold text-black">
                                    {admin.name || "Admin User"} {/* Fallback if name is not there */}
                                </p>
                                <p className="font-Poppins text-[0.9rem] text-[#A4A4A4] mt-[-4px]">
                                    Administrator {/* Or use admin.role if you add it */}
                                </p>
                            </div>
                            {/* You could potentially use admin.profilePictureUrl here if available */}
                            <img src={admin.profilePictureUrl || "/user_profile.png"} alt="user profile" className="w-10 h-10 rounded-full object-cover" /> {/* Added some basic styling */}
                            <div>
                                <Dropdown label="" dismissOnClick={true} renderTrigger={() => <RiListSettingsFill color="#000000" size="24px" />}>
                                    <Link to="/changepassword">
                                        <DropdownItem>
                                            <div className="w-[100%] flex items-center justify-start gap-2">
                                                <LockKeyhole size="0.9rem" />
                                                <p className="text-black text-[0.75rem]">
                                                    Change Password
                                                </p>
                                            </div>
                                        </DropdownItem>
                                    </Link>
                                    <DropdownItem onClick={handleLogout}>
                                        <div className="w-[100%] flex items-center justify-start gap-2">
                                            <LogOut size="0.9rem" />
                                            <p className="text-black text-[0.75rem]">
                                                Log out
                                            </p>
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