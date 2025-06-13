import { FaQuestionCircle } from "react-icons/fa";
import { CircleAlert, MoveLeft, Eye, EyeOff, X, LogOut } from "lucide-react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Modal, ModalBody, Button } from "flowbite-react";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { adminApi } from "../../../utils/api";

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [changePasswordModalState, setChangePasswordModalState] = useState(false);
    const [isChangePasswordSuccessful, setIsChangePasswordSuccessful] = useState(false);
    
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handlePasswordChange = async () => {
        setIsLoading(true);
        setChangePasswordModalState(false);
        try {
            await adminApi.changePassword(oldPassword, newPassword);
            setIsChangePasswordSuccessful(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleValidation = () => {
        setError(""); 
        if (!oldPassword || !newPassword || !confirmPassword) {
            setError("All password fields are required.");
            return;
        }
        if (newPassword.length < 6) {
            setError("New password must be at least 6 characters.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("New passwords do not match.");
            return;
        }
        setChangePasswordModalState(true);
    };

    const handleLogout = () => {
        logout();
        navigate('/admin_login');
    };

    return (
        <>
            <Modal show={changePasswordModalState} size={"md"} onClose={() => setChangePasswordModalState(false)}>
                <ModalBody>
                    <div className="w-[100%]">
                        <div className="flex justify-end">
                            <X className="cursor-pointer" onClick={() => setChangePasswordModalState(false)} />
                        </div>
                        <div className='w-[100%] flex flex-col items-center'>
                            <FaQuestionCircle fill="#FF0000" size="2.62rem" />
                            <p className="text-[0.94rem] text-black font-Poppins font-semibold text-center mt-2">
                                Are you sure you want to change your password?
                            </p>
                        </div>
                    </div>
                    <div className="w-[100%] flex gap-1 mt-6">
                        <button type="button" className="h-[6vh] w-[50%] bg-[#DADADA] rounded-[5px] hover:bg-gray-400 focus:outline-none" onClick={() => setChangePasswordModalState(false)}>
                            <p className="font-Poppins text-[0.87rem] text-black">Cancel</p>
                        </button>
                        <button type="button" className="h-[6vh] w-[50%] bg-[#FF0000] rounded-[5px] hover:bg-red-800" onClick={handlePasswordChange}>
                            <p className="font-Poppins text-[0.87rem] text-[white]">Change</p>
                        </button>
                    </div>
                </ModalBody>
            </Modal>
            
            <div className="w-full h-screen relative">
                <img src="/change_password_page_background.jpg" alt="Background for change password page" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 z-20 flex flex-col items-start justify-start m-4">
                <div className="cursor-pointer mb-4 overflow-y-hidden">
                    <div className="flex items-center">
                        {!isChangePasswordSuccessful && (
                            <Link to="/dashboard"><MoveLeft color="#ffffff" /></Link>
                        )}
                    </div>
                </div>
                <div className="flex items-center justify-center w-full h-full">
                    <div className="w-[35vw] h-[73vh] bg-white rounded-[15px] flex items-center justify-center">
                        {!isChangePasswordSuccessful ? (
                            <div className="h-[92%] w-[90%]">
                                <div>
                                    <p className="text-[1.56rem] text-black font-Poppins font-semibold">Change Your Password</p>
                                    <p className="text-[0.87rem] text-black font-Poppins font-regular pt-[5px]">Your password must be at least 6 characters and should include a combination of numbers.</p>
                                </div>
                                <div className="w-full h-[82%] flex flex-col items-center justify-evenly">
                                    <div className="w-full">
                                        <p className="text-[0.93rem] text-black font-Poppins font-regular pt-[5px]">Old Password</p>
                                        <div className="w-full relative">
                                            <input type={showOldPassword ? 'text' : 'password'} placeholder="Enter Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className={`flex w-[100%] h-[7vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[1.125rem] text-black rounded-[10px] ${error ? 'border-red-500' : 'border-gray-300'}`} />
                                            <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer h-[7vh]" onClick={() => setShowOldPassword(!showOldPassword)}>
                                                {showOldPassword ? <Eye className="h-5 w-5 text-black" /> : <EyeOff className="h-5 w-5 text-black" />}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <p className="text-[0.93rem] text-black font-Poppins font-regular pt-[5px]">New Password</p>
                                        <div className="w-full relative">
                                            <input type={showNewPassword ? 'text' : 'password'} placeholder="Enter New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={`flex w-[100%] h-[7vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[1.125rem] text-black rounded-[10px] ${error ? 'border-red-500' : 'border-gray-300'}`} />
                                            <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer h-[7vh]" onClick={() => setShowNewPassword(!showNewPassword)}>
                                                {showNewPassword ? <Eye className="h-5 w-5 text-black" /> : <EyeOff className="h-5 w-5 text-black" />}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <p className="text-[0.93rem] text-black font-Poppins font-regular pt-[5px]">Confirm Password</p>
                                        <div className="w-full relative">
                                            <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`flex w-[100%] h-[7vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[1.125rem] text-black rounded-[10px] ${error ? 'border-red-500' : 'border-gray-300'}`} />
                                            <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer h-[7vh]" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                {showConfirmPassword ? <Eye className="h-5 w-5 text-black" /> : <EyeOff className="h-5 w-5 text-black" />}
                                            </span>
                                        </div>
                                    </div>
                                    {error && (
                                        <div className="flex w-auto h-auto items-center mt-[5px]">
                                            <CircleAlert fill="#FF6B75" color="#ffffff" className="size-[1.4vw]" />
                                            <span className="text-[#FF6B75] text-[0.875rem] font-Poppins font-light pl-[10px]">{error}</span>
                                        </div>
                                    )}
                                    <div className="w-full">
                                        <button type="button" className="w-full h-full rounded-[10px] bg-[#1F3463] font-Poppins text-white text-[1.06rem] py-[1.3vh]" onClick={handleValidation} disabled={isLoading}>
                                            {isLoading ? "Saving..." : "Save Changes"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-[90%] w-[90%] flex flex-col justify-evenly">
                                <div className="w-full flex justify-center"><IoCheckmarkCircleSharp color="#35a953" size="6.18vw" /></div>
                                <div className="w-full flex justify-center"><p className="text-[2rem] text-black font-Poppins font-semibold">Password Changed!</p></div>
                                <div className="w-full flex justify-center mb-[20px]"><p className="text-[1.125rem] text-[#7a7a7a] font-Poppins font-regular text-center">Your password has been successfully changed. <br />Would you like to stay logged in or log in with your new password?</p></div>
                                <div className="w-[100%] flex justify-between">
                                    <div className="w-[47%]"><button type="button" className="w-full h-[7vh] rounded-[10px] bg-[#FF0000] hover:bg-red-800 font-Poppins text-white text-[1.06rem] py-[1.3vh]" onClick={handleLogout}>Log out</button></div>
                                    <div className="w-[47%]"><Link to="/dashboard"><button type="button" className="w-full h-[7vh] rounded-[10px] bg-[#0F5FC2] font-Poppins text-white text-[1.06rem] py-[1.3vh]">Stay logged in</button></Link></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}