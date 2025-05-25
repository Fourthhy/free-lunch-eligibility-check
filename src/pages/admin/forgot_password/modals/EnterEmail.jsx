import { TextInput, Modal, ModalBody } from "flowbite-react";
import { useState } from "react";

export default function EnterEmail({ onContinue }) {
    const [userEmailInput, setUserEmailInput] = useState("")
    const [userEmailErrorMessage, setUserEmailErrorMessage] = useState("");

    const isValidEmail = (email) => {
        // This is a simple regex for basic email format validation.
        // It checks for:
        // 1. At least one character before @
        // 2. An "@" symbol
        // 3. At least one character after @
        // 4. A dot "."
        // 5. Ends with "com" or "net" (case-insensitive)
        const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net)$/i;
        return emailRegex.test(email);
    };

    const handleContinue = () => {
        setUserEmailErrorMessage(""); //Clear Previous Error

        if (userEmailInput.trim() === "") {
            setUserEmailErrorMessage("Please enter an email address");
            return;
        }

        if (!isValidEmail(userEmailInput)) {
            setUserEmailErrorMessage("Please enter a valid email address");
            return;
        }

        onContinue(userEmailInput);

    };
    return (
        <>
            <Modal show={true} size={"lg"}>
                <ModalBody>
                    <div className="flex items-start justify-evenly flex-col gap-4">
                        <div className="flex flex-col gap-3">
                            <div className="font-Poppins text-black text-[1.5rem] font-medium">Forgotten your password?</div>
                            <div className="font-Poppins text-black text-[1.125rem] font-light">Don't worry, we'll send you a message to help you reset your password.</div>
                        </div>
                        <div className="flex flex-col gap-3 mt-[20px] w-full">
                            <div className="font-Poppins text-black text-[1.125rem] font-light">Enter your email</div>
                            <div className="w-full">
                                <input
                                    type="email"
                                    color="grey"
                                    placeholder="e.g. email@email.com"
                                    className={`flex w-[100%] h-[7vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[1.125rem] text-black rounded-[10px] ${userEmailErrorMessage !== "" ? `border-red-500` : `border-gray-300`}`}
                                    value={userEmailInput}
                                    onChange={(e) => setUserEmailInput(e.target.value)}
                                />
                                {userEmailErrorMessage !== "" ? (
                                    <div className="font-Poppins text-red-500 text-[0.9rem] font-light">
                                        {userEmailErrorMessage}
                                    </div>
                                ) : ""}
                            </div>
                            <div className="w-full">
                                <button onClick={handleContinue} type="button" className="w-full h-full rounded-lg bg-[#05305D] font-Poppins text-white text-[1.8vh] py-[1.6vh]">Continue</button>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}