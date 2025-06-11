import { FaQuestionCircle } from "react-icons/fa";
import { CircleAlert, MoveLeft, Eye, EyeOff, X, LogOut } from "lucide-react"
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom"
import { Modal, ModalHeader, ModalBody, Button } from "flowbite-react"
import { useState } from "react";

export default function ChangePassword() {
    const defaultPassword = "12345678";

    const [isDefaultPasswordMatch, setIsDefaultPasswordMatch] = useState(true);

    const [isConfirmPasswordMatch, setIsConfirmPasswordMatch] = useState(true);

    const [isChangePasswordSuccessful, setIsChangePasswordSuccessful] = useState(false);

    const [oldPasswordInputError, setOldPasswordInputError] = useState("");
    const [newPasswordInputError, setNewPasswordInputError] = useState("");
    const [confirmPasswordInputError, setConfirmPasswordInputError] = useState("");

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [changePasswordModalState, setChangePasswordModalState] = useState(false);

    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const nav = useNavigate();

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
        setChangePasswordModalState(false);
        if (oldPassword === "") {
            setIsDefaultPasswordMatch(false);
            setOldPasswordInputError("Please Enter Old Password");
            return;
        }
        if (defaultPassword !== oldPassword) {
            setIsDefaultPasswordMatch(false);
            setOldPasswordInputError("Incorrect Passowrd");
            return;
        }
        if (newPassword === "") {
            setNewPasswordInputError("Please Input New Password");
            return;
        }
        if (newPassword.length < 8) {
            setNewPasswordInputError("Password must be at least 8 characters");
            return;
        }
        if (newPassword.length > 32) {
            setNewPasswordInputError("Password must be under 32 characters");
            return;
        }
        const alphaNumericAndDash = /^[a-zA-Z0-9-]+$/;
        if (!alphaNumericAndDash.test(newPassword) == false) {
            setNewPasswordInputError("Accepts only alphanumeric characters and dash (-)");
            return;
        }
        if (confirmPassword === "") {
            setConfirmPasswordInputError("Please Type New Password Again");
            return;
        }
        if (newPassword !== confirmPassword) {
            setIsConfirmPasswordMatch(false);
            return;
        }
        setChangePasswordModalState(true);
    };

    const handleModalAction = (action) => {
        if (action === "open") {
            setChangePasswordModalState(true);
        }
        if (action === "cancel") {
            setChangePasswordModalState(false);
            return;
        }
        if (action === "submit") {
            setChangePasswordModalState(false);
            setIsChangePasswordSuccessful(true);
        }
    }

    return (
        <>
            <Modal show={changePasswordModalState} size={"md"}>
                <ModalBody>
                    <div className="w-[100%]">
                        <div className="flex justify-end">
                            <X className="cursor-pointer" onClick={() => { handleModalAction("cancel") }} />
                        </div>
                        <div className='w-[100%] flex flex-col items-center'>
                            <FaQuestionCircle fill="#FF0000" size="2.62rem" />
                            <p className="text-[0.94rem] text-black font-Poppins font-semibold text-center mt-2">
                                Are you sure you want to change your password ?
                            </p>
                        </div>
                    </div>
                    <div className="w-[100%] flex gap-1 mt-6">
                        <button type="button" className="h-[6vh] w-[50%] bg-[#DADADA] rounded-[5px] hover:bg-gray-400 focus:outline-none" onClick={() => handleModalAction("cancel")}>
                            <p className="font-Poppins text-[0.87rem] text-black">
                                Cancel
                            </p>
                        </button>
                        <button type="button" className="h-[6vh] w-[50%] bg-[#FF0000] rounded-[5px] hover:bg-red-800" onClick={() => handleModalAction("submit")}>
                            <p className="font-Poppins text-[0.87rem] text-white">
                                Delete
                            </p>
                        </button>
                    </div>
                </ModalBody>
            </Modal>
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
                        {isChangePasswordSuccessful ? "" : (
                            <Link to="/dashboard">
                                <MoveLeft color="#ffffff" />
                            </Link>
                        )}
                    </div>
                </div>
                <div className="flex items-center justify-center w-full h-full">
                    <div className="w-[35vw] h-[73vh] bg-white rounded-[15px] flex items-center justify-center">
                        {!isChangePasswordSuccessful ? (
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
                                                Old Password
                                            </p>
                                            <div className="w-full relative"> {/* Add relative positioning here */}
                                                <input
                                                    type={showOldPassword ? 'text' : 'password'} // Dynamically set type
                                                    placeholder="Enter Old Password"
                                                    value={oldPassword}
                                                    onChange={(e) => setOldPassword(e.target.value)}
                                                    className={`flex w-[100%] h-[7vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[1.125rem] text-black rounded-[10px] ${isDefaultPasswordMatch === false ? `border-red-500` : `border-gray-300`}`}
                                                />
                                                <span
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer h-[7vh]"

                                                >
                                                    {showOldPassword ? (
                                                        <Eye className="h-5 w-5 text-black" onClick={() => toggleOldPasswordVisibility()} /> // Icon for "hide password"
                                                    ) : (
                                                        <EyeOff className="h-5 w-5 text-black" onClick={() => toggleOldPasswordVisibility()} /> // Icon for "show password"
                                                    )}
                                                </span>
                                                {isDefaultPasswordMatch === false && ( // Simplified conditional rendering
                                                    <div className="flex w-auto h-auto items-center mt-[2px]">
                                                        <CircleAlert fill="#FF6B75" color="#ffffff" className="size-[1.4vw]" />
                                                        <span className="text-[#FF6B75] text-[0.875rem] font-Poppins font-light pl-[10px]">{oldPasswordInputError}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <p className="text-[0.93rem] text-black font-Poppins font-regular pt-[5px]">
                                                New Password
                                            </p>
                                            <div className="w-full relative"> {/* Add relative positioning here */}
                                                <input
                                                    type={showNewPassword ? 'text' : 'password'} // Dynamically set type
                                                    placeholder="Enter New Password"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    className={`flex w-[100%] h-[7vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[1.125rem] text-black rounded-[10px] ${isConfirmPasswordMatch === false || newPasswordInputError !== "" ? `border-red-500` : `border-gray-300`}`}
                                                />
                                                <span
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer h-[7vh]"

                                                >
                                                    {showNewPassword ? (
                                                        <Eye className="h-5 w-5 text-black" onClick={() => toggleNewPasswordVisibility()} /> // Icon for "hide password"
                                                    ) : (
                                                        <EyeOff className="h-5 w-5 text-black" onClick={() => toggleNewPasswordVisibility()} /> // Icon for "show password"
                                                    )}
                                                </span>
                                                {isConfirmPasswordMatch === false || newPasswordInputError !== "" ? ( // Simplified conditional rendering
                                                    <div className="flex w-auto h-auto items-center mt-[5px]">
                                                        <CircleAlert fill="#FF6B75" color="#ffffff" className="size-[1.4vw]" />
                                                        <span className="text-[#FF6B75] text-[0.875rem] font-Poppins font-light pl-[10px]">{newPasswordInputError === "" ? "Password don't match" : newPasswordInputError}</span>
                                                    </div>
                                                ) : ""}
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <p className="text-[0.93rem] text-black font-Poppins font-regular pt-[5px]">
                                                Confirm Password
                                            </p>
                                            <div className="w-full relative"> {/* Add relative positioning here */}
                                                <input
                                                    type={showConfirmPassword ? 'text' : 'password'} // Dynamically set type
                                                    placeholder="Confirm Password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className={`flex w-[100%] h-[7vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[1.125rem] text-black rounded-[10px] ${isConfirmPasswordMatch === false ? `border-red-500` : `border-gray-300`}`}
                                                />
                                                <span
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer h-[7vh]"
                                                >
                                                    {showConfirmPassword ? (
                                                        <Eye className="h-5 w-5 text-black" onClick={() => toggleConfirmNewPasswordVisibility()} /> // Icon for "hide password"
                                                    ) : (
                                                        <EyeOff className="h-5 w-5 text-black" onClick={() => toggleConfirmNewPasswordVisibility()} /> // Icon for "show password"
                                                    )}
                                                </span>
                                                {confirmPasswordInputError !== "" ? ( // Simplified conditional rendering
                                                    <div className="flex w-auto h-auto items-center mt-[5px]">
                                                        <CircleAlert fill="#FF6B75" color="#ffffff" className="size-[1.4vw]" />
                                                        <span className="text-[#FF6B75] text-[0.875rem] font-Poppins font-light pl-[10px]">{confirmPasswordInputError !== "" ? "Password don't match" : confirmPasswordInputError}</span>
                                                    </div>
                                                ) : ""}
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <button
                                                type="button"
                                                className="w-full h-full rounded-[10px] bg-[#1F3463] font-Poppins text-white text-[1.06rem] py-[1.3vh]"
                                                onClick={() => { handleCheckPasswordMatch() }}
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
                                            <button type="button" className="w-full h-[7vh] rounded-[10px] bg-[#1F3463] font-Poppins text-white text-[1.06rem] py-[1.3vh]" onClick={() => setIsLoggingOut(true)}>
                                                Log in
                                            </button>
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
            <Modal show={isLoggingOut} dismissible={false} size={"md"}>
                <ModalBody>
                    <div className="w-full flex justify-end">
                        <X className="cursor-pointer" onClick={() => { setIsLoggingOut(false) }} />
                    </div>
                    <div className="h-full flex flex-col items-center gap-3">
                        <div className="w-full flex justify-center">
                            <LogOut color="#E46565" size="4.02vw" />
                        </div>
                        <div className="w-full flex justify-center">
                            <p className="font-poppins text-[1.25rem] text-[#292D32] font-bold">
                                Log Out ?
                            </p>
                        </div>
                        <div className="w-full flex justify-center">
                            <p className="font-poppins text-[0.94rem] text-[#292D32] font-regular">
                                Are you sure you want to log out?
                            </p>
                        </div>
                        <div className="w-full flex justify-center gap-2">
                            <Button
                                style={{ height: '50px', border: '1px solid gray', backgroundColor: "#ffffff", width: "50%" }}
                                onClick={() => { setIsLoggingOut(false) }}>
                                <p className="text-black text-[0.875rem] font-Inter">
                                    Cancel
                                </p>
                            </Button>
                            <Button
                                style={{ backgroundColor: "#E46565", height: '50px', width: "50%" }}
                                onClick={() => { nav('/admin_login') }}>
                                Log Out
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}