import { TextInput } from "flowbite-react";
import { useState, useEffect } from "react";

export default function EnterCode() {
    const sampleEmail = "sampleEmail1@gmail.com";

    const [count, setCount] = useState(60);
    const [isCounting, setIsCounting] = useState(false); 

    const startCountdown = () => {
        if (isCounting) return; // Prevent starting a new countdown if one is already running
        setIsCounting(true); // Set counting state to true

        // Set up the interval
        const countdown = setInterval(() => {
            setCount(prevCount => {
                if (prevCount <= 0) {
                    clearInterval(countdown);
                    console.log("Countdown finished!");
                    setIsCounting(false); // Reset counting state
                    return 0; // Ensure count doesn't go below 0
                }
                console.log(prevCount);
                return prevCount - 1;
            });
        }, 1000); // 1000 milliseconds = 1 second

        // Cleanup the interval on component unmount
        return () => clearInterval(countdown);
    };

    // Cleanup effect to clear the interval when the component unmounts
    useEffect(() => {
        return () => {
            clearInterval();
        };
    }, []);

    return (
        <>
            <div className="border bg-white rounded-[10px] w-[35vw] h-[45vh] flex items-center justify-center">
                <div className="w-[90%] h-[90%] flex items-start justify-evenly flex-col">
                    <div className="font-Poppins text-black text-[1.7vw] font-semibold">Let us know it's you</div>
                    <div className="font-Poppins text-black text-[1.3vw] font-light">Last step! To secure your account, enter the code we just sent to {sampleEmail} </div>
                    <div className="font-Poppins text-black text-[1.3vw] font-light">Code</div>
                    <div className="w-[100%]">
                        <TextInput type="text" color="grey" placeholder="Enter Code" className="font-Poppins" />
                    </div>
                    <div className="w-[100%]">
                        <button type="button" className="w-[100%] h-[100%] rounded-[10px] bg-[#05305D] font-Poppins text-white text-[1.8vh] py-[1.6vh]">Continue</button>
                    </div>
                    <div className="text-[1.2vw] font-Poppins font-light">
                        Didn't get the code? 
                        {isCounting === false ? (
                            <span onClick={startCountdown} className="text-[#0F5FC2] hover:underline cursor-pointer"> Resend code</span>
                        ) : (
                            <span> Resend the code in {count} seconds </span>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}