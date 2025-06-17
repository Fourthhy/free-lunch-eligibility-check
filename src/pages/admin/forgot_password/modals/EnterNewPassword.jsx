import { Modal, ModalBody } from "flowbite-react";
import { useState } from "react";
import { CircleAlert, ChevronLeft, Eye, EyeOff } from "lucide-react";

export default function EnterNewPassword({
    onContinue,
    onPrevious,
    isLoading,
    apiError,
    setApiError
}) {

    const [isPasswordMatch, setIsPasswordMatch] = useState(true);
    const [newPasswordInputError, setNewPasswordInputError] = useState("");
    const [confirmPasswordInputError, setConfirmPasswordInputError] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [localError, setLocalError] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const handleSubmit = () => {
        setLocalError("");
        if (setApiError) setApiError("");

        if (!newPassword || !confirmNewPassword) {
            setLocalError("Please fill in both password fields.");
            return;
        }
        if (newPassword.length < 6) {
            setLocalError("Password must be at least 6 characters.");
            return;
        }
        if (newPassword !== confirmNewPassword) {
            // setLocalError("Passwords do not match.");
            setNewPasswordInputError("Passwords do not match.");
            return;
        }
        if (!pattern.test(newPassword)) {
            // setLocalError("Accepts Alphanumeric Characters and Special Characters");
            setNewPasswordInputError("Accepts Alphanumeric Characters and Special Characters");
            return;
        }
        onContinue(newPassword);
    };

    const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);
    const toggleConfirmNewPasswordVisibility = () => setShowConfirmNewPassword(!showConfirmNewPassword);

    return (
        <Modal show={true} size={"lg"} onClose={() => {}}>
            <ModalBody>
                <div className="flex w-full">
                    <div className="mt-[5px] cursor-pointer" onClick={() => onPrevious()}>
                        <ChevronLeft />
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                        <div className="font-Poppins text-black text-[1.7vw] font-semibold">Create New Password</div>
                        <div className="font-Poppins text-black text-[1.2vw] font-light"> Make a new password for your security. Provide a minimum of 6 characters.</div>
                    </div>
                </div>
                <div className="flex flex-col w-full gap-3 mt-[30px]">
                    <div className="flex flex-col w-full gap-2">
                        <div className="font-Poppins text-black text-[1.125rem] font-semibold">New Password</div>
                        <div className="w-full relative">
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                placeholder="Enter New Password"
                                value={newPassword}
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
                                    setLocalError("");
                                    if(setApiError) setApiError("");
                                }}
                                className={`flex w-[100%] h-[7vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[1.125rem] text-black rounded-[10px] ${localError || apiError ? `border-red-500` : `border-gray-300`}`}
                                disabled={isLoading}
                            />
                            <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer h-[7vh]" onClick={toggleNewPasswordVisibility}>
                                {showNewPassword ? <Eye className="h-5 w-5 text-black" /> : <EyeOff className="h-5 w-5 text-black" />}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <div className="font-Poppins text-black text-[1.125rem] font-semibold">Confirm Password</div>
                        <div className="w-full relative">
                            <input
                                type={showConfirmNewPassword ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                value={confirmNewPassword}
                                onChange={(e) => {
                                    setConfirmNewPassword(e.target.value);
                                    setLocalError("");
                                    if(setApiError) setApiError("");
                                }}
                                className={`flex w-[100%] h-[7vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[1.125rem] text-black rounded-[10px] ${localError || apiError ? `border-red-500` : `border-gray-300`}`}
                                disabled={isLoading}
                            />
                            <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer h-[7vh]" onClick={toggleConfirmNewPasswordVisibility}>
                                {showConfirmNewPassword ? <Eye className="h-5 w-5 text-black" /> : <EyeOff className="h-5 w-5 text-black" />}
                            </span>
                        </div>
                    </div>
                    {(localError || apiError) && (
                        <div className="flex w-auto h-auto items-center mt-[10px]">
                            <CircleAlert fill="#FF6B75" color="#ffffff" className="size-[1.4vw]" />
                            <span className="text-[#FF0000] text-[0.875rem] font-Poppins font-light pl-[7px]">{localError || apiError}</span>
                        </div>
                    )}
                </div>
                <div className="w-full mt-[20px]">
                    <button type="button" className="w-full h-full rounded-lg bg-[#05305D] font-Poppins text-white text-[1.8vh] py-[1.6vh]" onClick={handleSubmit} disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save"}
                    </button>
                </div>
            </ModalBody>
        </Modal>
    );
}