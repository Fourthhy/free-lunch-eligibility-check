import { Modal, ModalBody } from "flowbite-react";
import { useState , useEffect } from "react";
import { CircleAlert, ChevronLeft} from "lucide-react";

export default function EnterCode({
    onContinue,
    onPrevious,
    userEmail,
    onRequestNewCode,
    isLoading,
    apiError,
    setApiError
}) {
    const [count, setCount] = useState(60);
    const [isCounting, setIsCounting] = useState(true); // Start counting immediately
    const [codeInputError, setCodeInputError] = useState("");
    const [emailCodeInput, setEmailCodeInput] = useState("");
    let countdownInterval;
    const [countdownIntervalId, setCountdownIntervalId] = useState(null);

    const handleInternalContinue = () => {
        setCodeInputError("");
        if (setApiError) setApiError("");

        if (!/^\d{6}$/.test(emailCodeInput.trim())) {
            setCodeInputError("Code must be 6 digits.");
            return;
        }
        onContinue(emailCodeInput.trim());
    };

    const startCountdown = () => {
        if (isCounting) {
            console.log("Already counting!");
            return;
        }

        setCount(60); // Reset count to 60 when starting
        setIsCounting(true);

        // Clear any existing interval before setting a new one
        // This is important because `setCountdownIntervalId` is asynchronous
        if (countdownIntervalId) {
            clearInterval(countdownIntervalId);
        }

        const newIntervalId = setInterval(() => {
            setCount(prevCount => {
                if (prevCount <= 1) { // Change to prevCount <= 1 to show 0
                    clearInterval(newIntervalId); // Use the local variable for clearing
                    console.log("Countdown finished!");
                    setIsCounting(false);
                    setCountdownIntervalId(null); // Clear the state
                    return 0;
                }
                console.log(prevCount - 1); // Log the decremented value
                return prevCount - 1;
            });
        }, 1000);

        setCountdownIntervalId(newIntervalId); // Store the new ID in state
    };

    // Effect to clean up the interval when the component unmounts
    useEffect(() => {
        startCountdown();
        // The cleanup function will capture the 'countdownIntervalId' from its scope
        return () => {
            if (countdownIntervalId) {
                clearInterval(countdownIntervalId);
                // No need to set state here as the component is unmounting
            }
        };
    }, []);

    const handleResendCode = async () => {
        if (isCounting) return;
        
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

    // useEffect for countdown is not strictly needed if started by click,
    // but good for managing the interval lifecycle if it were to start on mount.
    // The current startCountdown has its own interval management.

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