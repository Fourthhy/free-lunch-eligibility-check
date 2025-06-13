import { Modal, ModalBody } from "flowbite-react";
import { useState, useEffect } from "react";
import { CircleAlert, ChevronLeft } from "lucide-react";

export default function EnterCode({ 
    onContinue, 
    userEmail, 
    onPrevious,
    onRequestNewCode,
    isLoading,
    apiError,
    setApiError
}) {
    const [count, setCount] = useState(60);
    const [isCounting, setIsCounting] = useState(true); // Start counting immediately
    const [codeInputError, setCodeInputError] = useState("");
    const [emailCodeInput, setEmailCodeInput] = useState("");

    const handleContinue = () => {
        setCodeInputError("");
        if (setApiError) setApiError("");

        if (!/^\d{6}$/.test(emailCodeInput.trim())) {
            setCodeInputError("Code must be 6 digits.");
            return;
        }
        onContinue(emailCodeInput.trim());
    };

    const handleResendCode = async () => {
        if (isCounting) return;
        
        setCodeInputError("");
        if (setApiError) setApiError("");

        await onRequestNewCode();
        setCount(60);
        setIsCounting(true);
    };

    useEffect(() => {
        let countdownInterval;
        if (isCounting) {
            countdownInterval = setInterval(() => {
                setCount(prevCount => {
                    if (prevCount <= 1) {
                        clearInterval(countdownInterval);
                        setIsCounting(false);
                        return 0;
                    }
                    return prevCount - 1;
                });
            }, 1000);
        }
        return () => clearInterval(countdownInterval);
    }, [isCounting]);

    return (
        <Modal show={true} size={"lg"} onClose={() => {}}>
            <ModalBody>
                <div className="flex">
                    <div className="mt-[5px] cursor-pointer" onClick={onPrevious}>
                        <ChevronLeft />                            
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <div className="font-Poppins text-black text-[1.5rem] font-semibold">Let us know it’s you</div>
                        <div className="font-Poppins text-black text-[1.125rem] font-light">Last step! To secure your account, enter the code we just sent to {userEmail}</div>
                    </div>
                </div>
                <div className="w-full mt-[20px] flex flex-col gap-3">
                    <div className="font-Poppins text-black text-[1.125rem] font-light">Code</div>
                    <div className="w-[100%]">
                        <input
                            type="text"
                            placeholder="Enter Code"
                            maxLength={6}
                            className={`flex w-[100%] h-[7vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[1.125rem] text-black rounded-[10px] ${codeInputError || apiError ? `border-red-500` : `border-gray-300`}`}
                            value={emailCodeInput}
                            onChange={(e) => {
                                setEmailCodeInput(e.target.value.replace(/\D/g, ''));
                                setCodeInputError("");
                                if (setApiError) setApiError("");
                            }}
                            disabled={isLoading}
                        />
                    </div>
                    {(codeInputError || apiError) && (
                        <div className="flex items-center gap-1">
                            <CircleAlert fill="#ee2b2b" color="#ffffff" className="size-[1.4vw]" />
                            <span className="text-[#ff0000] text-[1vw] font-Poppins font-light">{apiError || codeInputError}</span>
                        </div>
                    )}
                    <div className="w-[100%]">
                        <button onClick={handleContinue} type="button" className="w-[100%] h-[100%] rounded-[10px] bg-[#05305D] font-Poppins text-white text-[1.8vh] py-[1.6vh]" disabled={isLoading}>
                            Continue
                        </button>
                    </div>
                </div>
                <div className="text-[1.2vw] font-Poppins font-light mt-[20px]">
                    Didn't get the code?
                    {!isCounting ? (
                        <span onClick={isLoading ? undefined : handleResendCode} className={`text-[#0F5FC2] hover:underline ${isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}> Resend code</span>
                    ) : (
                        <span> Resend the code in {count} seconds </span>
                    )}
                </div>
            </ModalBody>
        </Modal>
    );
}