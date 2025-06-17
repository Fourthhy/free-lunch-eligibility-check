import { useState } from "react";
import { Search, LockKeyhole, LogOut, X } from "lucide-react";
import { RiListSettingsFill } from "react-icons/ri";
import { Dropdown, DropdownItem, Modal, ModalBody, Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function Header({ pageName, searchTerm, onSearchChange, showSearch }) {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const { admin, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin_login', { replace: true });
    };

    return (
        <>
            <div className="h-[100%] flex items-end justify-between overflow-y-visible">
                <div className="ml-[2%] flex items-center h-[100%]">
                    <p className={`font-Poppins text-[#1F3463] text-[1.875rem] font-bold overflow white-space text-overflow ${pageName === "Schedule" ? `pl-[60px]` : `pl-[15px]`}`}>
                        {pageName}
                    </p>
                </div>
                {showSearch && (
                    <div className="h-[100%] flex items-center relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" color="#303030" />
                        <input
                            type="text"
                            className="w-[42vw] h-[55%] pl-10 flex items-center rounded-[10px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.10)] font-Poppins"
                            placeholder="Search student name"
                            value={searchTerm || ""}
                            onChange={onSearchChange}
                        />
                    </div>
                )}
                <div className="mr-[5%] h-[100%] flex items-center">
                    <div className="flex items-center gap-2">
                        <div className="flex flex-col justify-center">
                            <p className="font-Poppins text-[1.2rem] font-bold text-black">
                                {admin ? admin.name : 'Admin User'}
                            </p>
                            <p className="font-Poppins text-[0.9rem] text-[#A4A4A4] mt-[-4px]">Administrator</p>
                        </div>
                         <img 
                            src={admin.profilePictureUrl || "/user_profile.png"} 
                            alt="user profile" 
                            className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover border-2 border-gray-200"
                            referrerPolicy="no-referrer"
                        />
                        <div>
                            <Dropdown label="" dismissOnClick={true} renderTrigger={() => <RiListSettingsFill color="#000000" size="24px" className="cursor-pointer"/>}>
                                <Link to="/changepassword">
                                    <DropdownItem>
                                        <div className="w-[100%] flex items-center justify-start gap-2">
                                            <LockKeyhole size="0.9rem" />
                                            <p className="text-black text-[0.75rem]">Change Password</p>
                                        </div>
                                    </DropdownItem>
                                </Link>
                                <DropdownItem onClick={() => setIsLoggingOut(true)}>
                                    <div className="w-[100%] flex items-center justify-start gap-2">
                                        <LogOut size="0.9rem" />
                                        <p className="text-black text-[0.75rem]">Log out</p>
                                    </div>
                                </DropdownItem>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={isLoggingOut} dismissible={false} size={"md"}>
                <ModalBody>
                    <div className="w-full flex justify-end">
                        <X className="cursor-pointer" onClick={() => setIsLoggingOut(false)} />
                    </div>
                    <div className="h-full flex flex-col items-center gap-3">
                        <div className="w-full flex justify-center"><LogOut color="#FF0000" size="4.02vw" /></div>
                        <div className="w-full flex justify-center"><p className="font-poppins text-[1.25rem] text-[#292D32] font-bold">Log Out?</p></div>
                        <div className="w-full flex justify-center"><p className="font-poppins text-[0.94rem] text-[#292D32] font-regular">Are you sure you want to log out?</p></div>
                        <div className="w-full flex justify-center gap-2">
                            <Button style={{ height: '50px', border: '1px solid gray', backgroundColor: "#ffffff", width: "50%" }} onClick={() => setIsLoggingOut(false)}>
                                <p className="text-black text-[0.875rem] font-Inter">Cancel</p>
                            </Button>
                            <Button style={{ backgroundColor: "#FF0000", height: '50px', width: "50%" }} onClick={handleLogout}>
                                <p className="font-Poppins text-[0.875rem] text-white">Log Out</p>
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}