import { TextInput } from "flowbite-react";

export default function EnterEmail({ onContinue }) {
    const handleContinue = () => {
        // Perform any necessary actions (e.g., validation)
        onContinue(); // Call the function to update the pageStep
    };
    return (
        <div className="border bg-white rounded-lg w-[37.55vw] h-[46.70vh] flex items-center justify-center">
            <div className="w-[90%] h-[90%] flex items-start justify-evenly flex-col">
                <div className="font-Poppins text-black text-[1.5rem] font-medium">Forgotten your password?</div>
                <div className="font-Poppins text-black text-[1.125rem] font-light">Don't worry, we'll send you a message to help you reset your password.</div>
                <div className="font-Poppins text-black text-[1.125rem] font-light">Enter your email</div>
                <div className="w-full">
                    <TextInput type="email" color="grey" placeholder="e.g. email@email.com" className="font-Poppins text-[1.125rem]" />
                </div>
                <div className="w-full">
                    <button onClick={handleContinue} type="button" className="w-full h-full rounded-lg bg-[#05305D] font-Poppins text-white text-[1.8vh] py-[1.6vh]">Continue</button>
                </div>
            </div>
        </div>
    );
}