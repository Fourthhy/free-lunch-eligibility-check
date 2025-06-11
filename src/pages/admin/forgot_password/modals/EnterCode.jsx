import { TextInput } from "flowbite-react";
import { Modal, ModalBody } from "flowbite-react";
import { useState, useEffect } from "react";
import { CircleAlert, ChevronLeft } from "lucide-react"

export default function EnterCode({ onContinue, userEmail, onPrevious }) {
    const [count, setCount] = useState(60);
    const [isCounting, setIsCounting] = useState(false);
    const [codeInputError, setCodeInputError] = useState("");
    const [emailCodeInput, setEmailCodeInput] = useState("")

    const sampleCode = 123456;
    let countdownInterval; // Declare a variable to hold the interval ID

    const handleContinue = () => {
        setCodeInputError("")
        const parsedInput = parseInt(emailCodeInput)
        if (parsedInput !== sampleCode) {
            setCodeInputError("Code is incorrect");
            return;
        }
        onContinue();
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

    // Effect to start the countdown when the modal renders
    // and to clean up the interval when the component unmounts.
    useEffect(() => {
        startCountdown(); // Call startCountdown when the component mounts

        return () => {
            // This cleanup function runs when the component unmounts
            // or before the effect re-runs (if dependencies change).
            // It's crucial to clear the interval here.
            clearInterval(countdownInterval);
        };
    }, []); // Empty dependency array ensures this effect runs once on mount and cleans up on unmount

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
                            <div className="font-Poppins text-black text-[1.125rem] font-light">Last step! To secure your account, enter the code we just sent to {userEmail} </div>
                        </div>
                    </div>

                    <div className="w-full mt-[20px] flex flex-col gap-3">
                        <div className="font-Poppins text-black text-[1.125rem] font-light">Code</div>
                        <div className="w-[100%]">
                            <input
                                type="text"
                                placeholder="Enter Code"
                                className={`flex w-[100%] h-[7vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[1.125rem] text-black rounded-[10px] ${codeInputError !==  "" ? `border-red-500` : `border-gray-300`}`}
                                value={emailCodeInput}
                                onChange={(e) => setEmailCodeInput(e.target.value)}
                            />
                        </div>
                        {codeInputError !== "" ? (
                            <>
                                <div className="flex items-center gap-1">
                                    <CircleAlert fill="#ee2b2b" color="#ffffff" className="size-[1.4vw]" />
                                    <span className="text-[#ff0000] text-[1vw] font-Poppins font-light"> That code may be expired or incorrect, try again</span>
                                </div>
                            </>
                        ) : ""}

                        <div className="w-[100%]">
                            <button onClick={handleContinue} type="button" className="w-[100%] h-[100%] rounded-[10px] bg-[#05305D] font-Poppins text-white text-[1.8vh] py-[1.6vh]">Continue</button>
                        </div>
                    </div>
                    <div className="text-[1.2vw] font-Poppins font-light mt-[20px]">
                        Didn't get the code?
                        {isCounting === false ? (
                            <span onClick={startCountdown} className="text-[#0F5FC2] hover:underline cursor-pointer"> Resend code</span>
                        ) : (
                            <span> Resend the code in {count} seconds </span>
                        )}
                    </div>
                </ModalBody>
            </Modal>

        </>
    );
}