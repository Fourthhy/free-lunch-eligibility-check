import { MoveLeft } from "lucide-react"

export default function AdminLogin() {
    return (
        <>
            <div className="bg-[#F8FAFB] w-screen h-screen border-black border-[1px]">
                <div className="grid grid-cols-2 grid-rows-1 h-[100vh]">
                    <div>
                        <div className="h-[60px]">
                            <MoveLeft className="m-[15px]" />
                        </div>
                        <div className="flex justify-center items-center h-[90vh]">
                            <img src="/Login_Illustration_1.svg" alt="login illustration" />
                        </div>
                    </div>
                    <div className="border-[1px] border-black w-full h-full">
                        <div className="flex justify-center items-center h-full">
                            <div className="bg-[#ffffff] w-[44vw] h-[96vh]">
                                <div className="h-[100%]">
                                    <div className="h-[100%] mx-[2vw]">
                                        <div className="border-[1px] border-black h-[20%]">
                                            <div className="flex justify-center items-start flex-col h-[100%]">
                                                <span className="font-Poppins text-[40px]">Hello there! <br /></span>
                                                <span className="font-Poppins text-[12px] mt-[-5px]">Please enter your credentials to log-in your account. </span>
                                            </div>
                                        </div>
                                        <div className="border-[1px] border-black h-[40%]">
                                            <div className="h-[100%]">
                                                <span className="font-Poppins text-[14px]">username</span>
                                                <input type="text" className="w-[100%] h-[6vh] border-[1px]" />
                                                <span className="font-Poppins text-[14px]">password</span>
                                                <input type="password" className="w-[100%] h-[6vh] border-[1px]" />
                                            </div>
                                        </div>
                                        <div className="border-[1px] border-black h-[40%]">content</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}