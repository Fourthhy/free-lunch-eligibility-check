import { TextInput, Label } from "flowbite-react";
import { useState } from "react"

export default function EnterNewPassword() {

    const [isPasswordMatch, setIsPasswordMatch] = useState(false)

    return (
        <div className="border bg-white rounded-lg w-[35vw] h-[55vh] flex items-center justify-center">
            <div className="w-[90%] h-[90%] flex items-start justify-evenly flex-col">
                <div className="font-Poppins text-black text-[1.7vw] font-semibold">Create New Password</div>
                <div className="font-Poppins text-black text-[1.2vw] font-light"> Make a new password for your security. Provide a minimum of 8 characters, special characters, and numbers</div>
                <div className="font-Poppins text-black text-[1.1vw] font-semibold">New Password</div>
                <div className="w-full">
                    <TextInput type="password" color="grey" placeholder="Enter new password" className="font-Poppins" />
                </div>
                <div className="font-Poppins text-black text-[1.1vw] font-semibold">Confirm New Password</div>
                <div className="w-full">
                    <TextInput type="password" color={isPasswordMatch === false ? `failure` : `grey`} placeholder="Confirm new password" className="font-Poppins" />
                    {isPasswordMatch  === false ? (
                        <>
                            <span className="text-red-700 text-[1vw] font-Poppins font-light"> Password don't match</span>
                        </>
                    ) : ""}
                </div>
                <div className="w-full">
                    <button type="button" className="w-full h-full rounded-lg bg-[#05305D] font-Poppins text-white text-[1.8vh] py-[1.6vh]">Continue</button>
                </div>
            </div>
        </div>
    );
}