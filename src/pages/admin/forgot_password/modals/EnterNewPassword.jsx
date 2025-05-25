import { TextInput, Modal, ModalBody, Label } from "flowbite-react";
import { useState } from "react"
import { CircleAlert } from "lucide-react"

export default function EnterNewPassword({ onContinue }) {

    const [isPasswordMatch, setIsPasswordMatch] = useState(true);
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")

    const handleSubmit = () => {
        if (newPassword !== confirmNewPassword) {
            alert("Clicked")
            setIsPasswordMatch(false)
            return;
        }
        onContinue();
    }

    return (
        <Modal show={true} size={"lg"}>
            <ModalBody>
                <div className="flex flex-col gap-3 w-full">
                    <div className="font-Poppins text-black text-[1.7vw] font-semibold">Create New Password</div>
                    <div className="font-Poppins text-black text-[1.2vw] font-light"> Make a new password for your security. Provide a minimum of 8 characters, special characters, and numbers</div>
                </div>
                <div className="flex flex-col w-full gap-3 mt-[30px]">
                    <div className="flex flex-col w-full gap-2">
                        <div className="font-Poppins text-black text-[1.125rem] font-semibold">New Password</div>
                        <div className="w-full">
                            <input
                                type="password"
                                placeholder="Confirm new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className={`flex w-[100%] h-[7vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[1.125rem] text-black rounded-[10px] ${isPasswordMatch === false ? `border-red-500` : `border-gray-300`}`}
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
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                className={`flex w-[100%] h-[7vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[1.125rem] text-black rounded-[10px] ${isPasswordMatch === false ? `border-red-500` : `border-gray-300`}`}
                            />
                            {isPasswordMatch === false ? (
                                <>
                                    <div className="flex w-auto h-auto items-center mt-[10px]">
                                        <CircleAlert fill="#FF6B75" color="#ffffff" className="size-[1.4vw]" />
                                        <span className="text-[#FF6B75] text-[0.875rem] font-Poppins font-light"> Password don't match</span>
                                    </div>
                                </>
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
                        Continue
                    </button>
                </div>
            </ModalBody>
        </Modal>
    );
}