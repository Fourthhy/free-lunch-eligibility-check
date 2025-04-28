import { TextInput } from "flowbite-react"
import { MoveLeft } from "lucide-react"
import { Link } from "react-router-dom"

export default function ChangePassword() {
    return (
        <>
            <div className="w-[100vw] h-[100vh] relative">
                <img
                    src="./change_password_page_background.jpg"
                    alt="background image"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="absolute inset-0 z-10 flex items-start justify-start m-[1vw] ">
                <div className="cursor-pointer">
                    <Link to="/admin_login">
                        <MoveLeft />
                    </Link>
                </div>
            </div>
            <div className="absolute z-1 inset-0 flex items-center justify-center">
                <div className="border bg-white rounded-[10px] w-[35vw] h-[45vh] flex items-center justify-center">
                    <div className="w-[90%] h-[90%] flex items-start justify-evenly flex-col">
                        <div className="font-Poppins text-black text-[1.7vw] font-semibold">Forgotten your password?</div>
                        <div className="font-Poppins text-black text-[1.3vw] font-light">Don't worry, we'll send you a message to help you reset your password.</div>
                        <div className="font-Poppins text-black text-[1.3vw] font-light">Enter your email</div>
                        <div className="w-[100%]"><TextInput type="email" color="grey" placeholder="e.g. email@email.com" className="font-Poppins" /></div>
                        <div className="w-[100%]"><button type="submit" className="w-[100%] h-[100%] rounded-[10px] bg-[#05305D] font-Poppins text-white text-[1.8vh] py-[1.6vh]">Continue</button></div>
                    </div>
                </div>
            </div>
        </>
    );
}