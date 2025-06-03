import { Modal, ModalBody } from "flowbite-react"; // Removed TextInput, Label as not directly used
import { useState } from "react";
import { CircleAlert } from "lucide-react";

export default function EnterNewPassword({ 
    onContinue, 
    isLoading, 
    apiError, 
    setApiError 
}) {
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [localError, setLocalError] = useState(""); // For local validation errors

    const handleSubmit = () => {
        setLocalError(""); // Clear previous local errors
        if (setApiError) setApiError(""); // Clear previous API errors

        if (!newPassword || !confirmNewPassword) {
            setLocalError("Please fill in both password fields.");
            return;
        }
        if (newPassword.length < 6) { // Consistent with backend validation
            setLocalError("Password must be at least 6 characters long.");
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setLocalError("Passwords do not match.");
            return;
        }

        // If all local validations pass, call onContinue from parent
        // which is handleResetPassword(newPassword)
        onContinue(newPassword);
    };

    return (
        <Modal show={true} size={"lg"}>
            <ModalBody>
                <div className="flex flex-col gap-3 w-full">
                    <div className="font-Poppins text-black text-[1.7vw] font-semibold">Create New Password</div>
                    <div className="font-Poppins text-black text-[1.2vw] font-light">
                        Make a new password for your security. Provide a minimum of 6 characters.
                        {/* Display API error if present and no local error */}
                        {apiError && !localError && (
                             <span className="text-red-500 text-sm block mt-1">{apiError}</span>
                        )}
                    </div>
                </div>
                <div className="flex flex-col w-full gap-3 mt-[30px]">
                    <div className="flex flex-col w-full gap-2">
                        <div className="font-Poppins text-black text-[1.125rem] font-semibold">New Password</div>
                        <div className="w-full">
                            <input
                                type="password"
                                placeholder="Enter new password" // Changed placeholder
                                value={newPassword}
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
                                    setLocalError("");
                                    if (setApiError) setApiError("");
                                }}
                                className={`flex w-[100%] h-[7vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[1.125rem] text-black rounded-[10px] ${(localError || apiError) ? `border-red-500` : `border-gray-300`}`}
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <div className="font-Poppins text-black text-[1.125rem] font-semibold">Confirm New Password</div>
                        <div className="w-full">
                            <input
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmNewPassword}
                                onChange={(e) => {
                                    setConfirmNewPassword(e.target.value);
                                    setLocalError("");
                                    if (setApiError) setApiError("");
                                }}
                                className={`flex w-[100%] h-[7vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[1.125rem] text-black rounded-[10px] ${(localError || apiError) ? `border-red-500` : `border-gray-300`}`}
                                disabled={isLoading}
                            />
                            {/* Display local validation error specifically for mismatch or empty fields */}
                            {localError && (
                                <div className="flex w-auto h-auto items-center mt-[10px]">
                                    <CircleAlert fill="#FF6B75" color="#ffffff" className="size-[1.4vw]" />
                                    <span className="text-[#FF6B75] text-[0.875rem] font-Poppins font-light"> {localError}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-full mt-[20px]">
                    <button
                        type="button"
                        className="w-full h-full rounded-lg bg-[#05305D] font-Poppins text-white text-[1.8vh] py-[1.6vh]"
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? "Resetting..." : "Reset Password"} 
                    </button>
                </div>
            </ModalBody>
        </Modal>
    );
}