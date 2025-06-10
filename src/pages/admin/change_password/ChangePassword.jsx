import { MoveLeft } from "lucide-react"
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom"
import { TextInput } from "flowbite-react"
import { useState } from "react";

export default function ChangePassword() {
    const defaultPassword = "12345678";

    const [isDefaultPasswordMatch, setIsDefaultPasswordMatch] = useState(false);
    const [isConfirmPasswordMatch, setIsConfirmPasswordMatch] = useState(false);

    const [isChangePasswordSuccessful, setIsChangePasswordSuccessful] = useState(false);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleOldPasswordVisibility = () => {
        setShowOldPassword(!showOldPassword)
    }

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmNewPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleCheckPasswordMatch = () => {
        if (defaultPassword !== oldPassword) {
            setIsDefaultPasswordMatch(!isDefaultPasswordMatch)
            return;
        }
        if (newPassword !== confirmPassword) {
            setIsConfirmPasswordMatch(!isConfirmPasswordMatch)
            return;
        }
        setIsChangePasswordSuccessful(isChangePasswordSuccessful);
    };

    return (
        <>
            <div className="w-full h-screen relative">
                <img
                    src="/change_password_page_background.jpg"
                    alt="Background for change password page"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="absolute inset-0 z-20 flex flex-col items-start justify-start m-4">
                <div className="cursor-pointer mb-4 overflow-y-hidden">
                    {/* Use a div or button for back navigation */}
                    <div className="flex items-center">
                        <Link to="/dashboard">
                            <MoveLeft color="#ffffff" />
                        </Link>
                    </div>
                </div>
                <div className="flex items-center justify-center w-full h-full">
                    <div className="w-[37.57vw] h-[64.44vh] bg-white rounded-[15px] flex items-center justify-center">
                        {!changePasswordSuccessful ? (
                            <>
                                <div className="h-[92%] w-[90%]">
                                    <div>
                                        <p className="text-[1.56rem] text-black font-Poppins font-semibold">
                                            Change Your Password
                                        </p>
                                        <p className="text-[0.87rem] text-black font-Poppins font-regular pt-[5px]">
                                            Your password must be at least 6 characters and should include a combination of numbers.
                                        </p>
                                    </div>
                                    <div className="w-full h-[82%] flex flex-col items-center justify-evenly">
                                        <div className="w-full">
                                            <p className="text-[0.93rem] text-black font-Poppins font-regular pt-[5px]">
                                                Enter Old Passowrd
                                            </p>
                                            <div className="w-full relative"> {/* Add relative positioning here */}
                                                <input
                                                    type={showOldPassword ? 'text' : 'password'} // Dynamically set type
                                                    placeholder="Enter New Password"
                                                    value={oldPassword}
                                                    onChange={(e) => setOldPassword(e.target.value)}
                                                    className={`flex w-[100%] h-[7vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[1.125rem] text-black rounded-[10px] ${isDefaultPasswordMatch === false ? `border-red-500` : `border-gray-300`}`}
                                                />
                                                <span
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                                    onClick={toggleOldPasswordVisibility}
                                                >
                                                    {showNewPassword ? (
                                                        <EyeOff className="h-5 w-5 text-black" /> // Icon for "hide password"
                                                    ) : (
                                                        <Eye className="h-5 w-5 text-black" /> // Icon for "show password"
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <p className="text-[0.93rem] text-black font-Poppins font-regular pt-[5px]">
                                                Enter New Passowrd
                                            </p>
                                            <div className="w-full relative"> {/* Add relative positioning here */}
                                                <input
                                                    type={showNewPassword ? 'text' : 'password'} // Dynamically set type
                                                    placeholder="Enter New Password"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    className={`flex w-[100%] h-[7vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[1.125rem] text-black rounded-[10px] ${isConfirmPassowordMatch === false ? `border-red-500` : `border-gray-300`}`}
                                                />
                                                <span
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                                    onClick={toggleNewPasswordVisibility}
                                                >
                                                    {showNewPassword ? (
                                                        <EyeOff className="h-5 w-5 text-black" /> // Icon for "hide password"
                                                    ) : (
                                                        <Eye className="h-5 w-5 text-black" /> // Icon for "show password"
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <p className="text-[0.93rem] text-black font-Poppins font-regular pt-[5px]">
                                                Confirm password
                                            </p>
                                            <div className="w-full relative"> {/* Add relative positioning here */}
                                                <input
                                                    type={showConfirmPassword ? 'text' : 'password'} // Dynamically set type
                                                    placeholder="Enter New Password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className={`flex w-[100%] h-[7vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[1.125rem] text-black rounded-[10px] ${isConfirmPassowordMatch === false ? `border-red-500` : `border-gray-300`}`}
                                                />
                                                <span
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                                    onClick={toggleConfirmNewPasswordVisibility}
                                                >
                                                    {showNewPassword ? (
                                                        <EyeOff className="h-5 w-5 text-black" /> // Icon for "hide password"
                                                    ) : (
                                                        <Eye className="h-5 w-5 text-black" /> // Icon for "show password"
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <button
                                                type="button"
                                                className="w-full h-full rounded-[10px] bg-[#1F3463] font-Poppins text-white text-[1.06rem] py-[1.3vh]"
                                                onClick={() => { setChangePasswordSuccessful(true) }}
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="h-[90%] w-[90%] flex flex-col justify-evenly">
                                    <div className="w-full flex justify-center">
                                        <IoCheckmarkCircleSharp color="#35a953" size="6.18vw" />
                                    </div>
                                    <div className="w-full flex justify-center">
                                        <p className="text-[2rem] text-black font-Poppins font-semibold">
                                            Password Changed !
                                        </p>
                                    </div>
                                    <div className="w-full flex justify-center mb-[20px]">
                                        <p className="text-[1.125rem] text-[#7a7a7a] font-Poppins font-regular text-center">
                                            Your password has been successfully changed. <br />Would you like to stay log in or log in with your new password ?
                                        </p>
                                    </div>
                                    <div className="w-[100%] flex justify-between">
                                        <div className="w-[47%]">
                                            <Link to="/admin_login">
                                                <button type="button" className="w-full h-[7vh] rounded-[10px] bg-[#1F3463] font-Poppins text-white text-[1.06rem] py-[1.3vh]">
                                                    Log in
                                                </button>
                                            </Link>
                                        </div>
                                        <div className="w-[47%]">
                                            <Link to="/dashboard">
                                                <button type="button" className="w-full h-[7vh] rounded-[10px] bg-[#0F5FC2] font-Poppins text-white text-[1.06rem] py-[1.3vh]">
                                                    Stay log in
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}