import { Modal, ModalBody } from "flowbite-react";
import { useState, useEffect } from "react";
import { CircleAlert, ChevronLeft } from "lucide-react";

export default function EnterCode({
    onContinue,
    onPrevious,
    userEmail,
    onRequestNewCode, // For resending code
    isLoading,        // To show loading for resend action
    apiError,         // To show API errors for resend action
    setApiError       // To clear API errors
}) {
    const [count, setCount] = useState(60);
    const [isCounting, setIsCounting] = useState(false);
    const [codeInputError, setCodeInputError] = useState(""); // Local validation for code input
    const [emailCodeInput, setEmailCodeInput] = useState("");
    let countdownInterval; // Store interval ID for cleanup

    // Remove sampleCode as it's no longer used for validation here
    const sampleCode = "123456"; 

    const handleInternalContinue = () => {
        setCodeInputError(""); // Clear local validation error
        if (setApiError) setApiError(""); // Clear API error from parent

        if (emailCodeInput.trim() === "") {
            setCodeInputError("Please enter the code.");
            return;
        }
        if (!/^\d{6}$/.test(emailCodeInput.trim())) { // Basic check for 6 digits
            setCodeInputError("Code must be 6 digits.");
            return;
        }

        if (emailCodeInput !== sampleCode) { //function for static sampleCode
            setCodeInputError("That code may be expired or incorrect, try again.");
            return;
        }

        onContinue();
        // Call onContinue from parent, passing the entered code
        // onContinue(emailCodeInput.trim());
    };

    const handleResendCode = async () => {
        if (isCounting) return; // Don't resend if already counting down

        // Clear previous errors before resending
        setCodeInputError("");
        if (setApiError) setApiError("");

        await onRequestNewCode(); // This is the handleRequestPasswordReset(userEmail) from parent
        // It will set isLoading and apiError in the parent component

        // Restart countdown only if the API call for resending doesn't immediately show an error
        // The parent's isLoading and apiError will reflect the API call state.
        // If there's no immediate API error from onRequestNewCode, start the countdown.
        // Note: `apiError` prop might not update immediately in this scope after `onRequestNewCode` resolves.
        // A more robust way might involve `onRequestNewCode` returning a promise that resolves to success/failure.
        // For now, we'll assume parent handles API error display, and we just restart countdown.
        setCount(60); // Reset countdown
        startCountdown();
    };

    const startCountdown = () => {
        setCount(60)
        if (isCounting) return;
        setIsCounting(true);
        
        countdownInterval = setInterval(() => { // Assign the interval ID
            setCount(prevCount => {
                if (prevCount <= 0) {
                    clearInterval(countdownInterval); // Use the correct interval ID for clearInterval
                    console.log("Countdown finished!");
                    setIsCounting(false);
                    return 0;
                }
                console.log(prevCount);
                return prevCount - 1;
            });
        }, 1000);
    };
    // Store interval ID to clear it properly
    // This assumes component unmount cleanup is handled by parent or not strictly needed if modal is always present
    // It's better to return the clearInterval function from useEffect if countdown starts on mount.
    // Here, it starts on click, so direct cleanup might be complex without useEffect.
    // For simplicity, this interval will stop itself.

    // useEffect for countdown is not strictly needed if started by click,
    // but good for managing the interval lifecycle if it were to start on mount.
    // The current startCountdown has its own interval management.

    useEffect(() => {
        startCountdown();
        return () => {
            clearInterval(countdownInterval);
        }
    }, []);

    return (
        <>
            <Modal show={true} size={"lg"}>
                <ModalBody>
                    <div className="flex">
                        <div className="mt-[5px] cursor-pointer" onClick={() => (onPrevious())}>
                            <ChevronLeft />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <div className="font-Poppins text-black text-[1.5rem] font-semibold">Let us know it’s you</div>
                            <div className="font-Poppins text-black text-[1.125rem] font-light">Last step! To secure your account, enter the code we just sent to {userEmail} {" "}</div>
                            {apiError && !codeInputError && (
                                <span className="text-red-500 text-sm block mt-1">{apiError}</span>
                            )}
                        </div>
                    </div>

                    <div className="w-full mt-[20px] flex flex-col gap-3">
                        <div className="font-Poppins text-black text-[1.125rem] font-light">Code</div>
                        <div className="w-[100%]">
                            <input
                                type="text"
                                placeholder="Enter Code"
                                maxLength={6} // Ensure only 6 digits can be typed easily
                                className={`flex w-[100%] h-[7vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[1.125rem] text-black rounded-[10px] ${(codeInputError) ? `border-red-500` : `border-gray-300`}`}
                                value={emailCodeInput}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, ''); // Allow only digits
                                    setEmailCodeInput(val);
                                    setCodeInputError(""); // Clear local error on change
                                    if (setApiError) setApiError(""); // Clear API error from parent on input change
                                }}
                                disabled={isLoading} // Disable if parent is loading (e.g., during resend)
                            />
                        </div>
                        {/* Display local code input error */}
                        {codeInputError && (
                            <div className="flex items-center gap-1">
                                <CircleAlert fill="#ee2b2b" color="#ffffff" className="size-[1.4vw]" />
                                <span className="text-red-700 text-[1vw] font-Poppins font-light"> {codeInputError}</span>
                            </div>
                        )}
                        <div className="w-[100%]">
                            <button
                                onClick={handleInternalContinue}
                                type="button"
                                className="w-[100%] h-[100%] rounded-[10px] bg-[#05305D] font-Poppins text-white text-[1.8vh] py-[1.6vh]"
                                disabled={isLoading} // Disable if parent is loading
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                    <div className="text-[1.2vw] font-Poppins font-light mt-[30px]">
                        Didn't get the code?{" "}
                        {!isCounting ? (
                            <span
                                onClick={!isLoading ? handleResendCode : undefined} // Prevent click if already loading
                                className={`text-[#0F5FC2] hover:underline ${isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                            >
                                Resend code
                            </span>
                        ) : (
                            <span> Resend the code in {count} seconds </span>
                        )}
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}