import { MoveLeft } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { TextInput } from "flowbite-react"
export default function ChangePassword() {
    return (
        <>
            <div className="w-full h-screen relative">
                <img
                    src="/change_password_page_background.jpg"
                    alt="Background for change password page"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="absolute inset-0 z-20 flex flex-col items-start justify-start m-4">
                <div className="cursor-pointer mb-4 overflow-y-hidden">
                    {/* Use a div or button for back navigation */}
                    <div className="flex items-center">
                        <Link to="/dashboard">
                            <MoveLeft />
                        </Link>
                    </div>
                </div>
                <div className="flex items-center justify-center w-full h-full">
                    {/* {pageStepShow()} */}
                    <div className="w-[37.57vw] h-[64.44vh] bg-white rounded-[15px] flex items-center justify-center">
                        <div className="h-[92%] w-[90%]">
                            <div>
                                <p className="text-[1.56rem] text-black font-Poppins font-semibold">
                                    Change Your Password
                                </p>
                                <p className="text-[0.87rem] text-black font-Poppins font-regular pt-[5px]">
                                    Your password must be at least 6 characters and should include a combination of numbers.
                                </p>
                            </div>
                            <div className="w-full h-[82%] flex flex-col items-center justify-evenly">
                                <div className="w-full">
                                    <p className="text-[0.93rem] text-black font-Poppins font-regular pt-[5px]">
                                        Enter Old Passowrd
                                    </p>
                                    <TextInput type="password" color="grey" placeholder="Enter old password" className="font-Poppins text-[1.125rem]" />
                                </div>
                                <div className="w-full">
                                    <p className="text-[0.93rem] text-black font-Poppins font-regular pt-[5px]">
                                        Enter New Passowrd
                                    </p>
                                    <TextInput type="password" color="grey" placeholder="Enter new password" className="font-Poppins text-[1.125rem]" />
                                </div>
                                <div className="w-full">
                                    <p className="text-[0.93rem] text-black font-Poppins font-regular pt-[5px]">
                                        Confirm password
                                    </p>
                                    <TextInput type="password" color="grey" placeholder="Confirm password" className="font-Poppins text-[1.125rem]" />
                                </div>
                                <div className="w-full">
                                    <button type="button" className="w-full h-full rounded-[10px] bg-[#1F3463] font-Poppins text-white text-[1.06rem] py-[1.3vh]">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}