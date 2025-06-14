import { Modal, ModalBody } from "flowbite-react";
import { useState } from "react"
import { CircleAlert, ChevronLeft, Eye, EyeOff } from "lucide-react"

export default function EnterNewPassword({ onContinue, onPrevious }) {

    const [isPasswordMatch, setIsPasswordMatch] = useState(true);

    const [newPasswordInputError, setNewPasswordInputError] = useState("");
    const [confirmPasswordInputError, setConfirmPasswordInputError] = useState("");

    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const handleSubmit = () => {
        if (newPassword == "") {
            setNewPasswordInputError("Please enter a new password");
            return;
        }
        if (newPassword.length < 8) {
            setNewPasswordInputError("Password is at least 8 characters");
            return;
        }
        if (newPassword.length > 32) {
            setNewPasswordInputError("Limit is 32 characters");
            return;
        }
        if (confirmNewPassword == "") {
            setConfirmPasswordInputError("Please confirm your new password");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setIsPasswordMatch(false)
            return;
        }
        onContinue();
    }

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmNewPasswordVisibility = () => {
        setShowConfirmNewPassword(!showConfirmNewPassword);
    };

    return (
        <Modal show={true} size={"lg"}>
            <ModalBody>
                <div className="flex">
                    <div className="mt-[5px] cursor-pointer" onClick={() => onPrevious()}>
                        <ChevronLeft />
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                        <div className="font-Poppins text-black text-[1.7vw] font-semibold">Create New Password</div>
                        <div className="font-Poppins text-black text-[1.2vw] font-light"> Make a new password for your security. Provide a minimum of 8 characters, special characters, and numbers</div>
                    </div>
                </div>
                <div className="flex flex-col w-full gap-3 mt-[30px]">
                    <div className="flex flex-col w-full gap-2">
                        <div className="font-Poppins text-black text-[1.125rem] font-semibold">New Password</div>
                        <div className="w-full relative"> {/* Add relative positioning here */}
                            <input
                                type={showNewPassword ? 'text' : 'password'} // Dynamically set type
                                placeholder="Enter New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className={`flex w-[100%] h-[7vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[1.125rem] text-black rounded-[10px] ${newPasswordInputError !== ""? `border-red-500` : `border-gray-300`}`}
                            />
                            <span
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer h-[7vh]"
                                onClick={toggleNewPasswordVisibility}
                            >
                                {showNewPassword ? (
                                    <Eye className="h-5 w-5 text-black" /> // Icon for "hide password"
                                ) : (
                                    <EyeOff className="h-5 w-5 text-black" /> // Icon for "show password"
                                )}
                            </span>
                            {newPasswordInputError !== "" ? ( // Simplified conditional rendering
                                <div className="flex w-auto h-auto items-center mt-[10px]">
                                    <CircleAlert fill="#FF6B75" color="#ffffff" className="size-[1.4vw]" />
                                    <span className="text-[#FF0000] text-[0.875rem] font-Poppins font-light pl-[7px]">{newPasswordInputError !== "" && newPasswordInputError}</span>
                                </div>
                            ) : ""}
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <div className="font-Poppins text-black text-[1.125rem] font-semibold">Confirm Password</div>
                        <div className="w-full relative"> {/* Add relative positioning here */}
                            <input
                                type={showConfirmNewPassword ? 'text' : 'password'} // Dynamically set type
                                placeholder="Confirm Password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                className={`flex w-[100%] h-[7vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[1.125rem] text-black rounded-[10px] ${isPasswordMatch === false || confirmPasswordInputError !== "" ? `border-red-500` : `border-gray-300`}`}
                            />
                            <span
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer h-[7vh]"
                                onClick={toggleConfirmNewPasswordVisibility}
                            >
                                {showConfirmNewPassword ? (
                                    <Eye className="h-5 w-5 text-black" /> // Icon for "hide password"
                                ) : (
                                    <EyeOff className="h-5 w-5 text-black" /> // Icon for "show password"
                                )}
                            </span>
                            {isPasswordMatch === false || confirmPasswordInputError !== "" ? ( // Simplified conditional rendering
                                <div className="flex w-auto h-auto items-center mt-[10px]">
                                    <CircleAlert fill="#FF6B75" color="#ffffff" className="size-[1.4vw]" />
                                    <span className="text-[#FF0000] text-[0.875rem] font-Poppins font-light pl-[7px]">{confirmPasswordInputError !== "" ? confirmPasswordInputError : "Password don't match"}</span>
                                </div>
                            ) : ""}
                        </div>
                    </div>
                </div>
                <div className="w-full mt-[20px]">
                    <button
                        type="button"
                        className="w-full h-full rounded-lg bg-[#05305D] font-Poppins text-white text-[1.8vh] py-[1.6vh]"
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                </div>
            </ModalBody>
        </Modal>
    );
}