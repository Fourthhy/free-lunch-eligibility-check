import { Link } from "react-router-dom"

export default function LandingPage() {
    return (
        <>
            <div>
                <div className="relative">
                    <img className="w-screen h-screen object-fit" src="./LandingPageBackground.png" alt="LV landing page background" />
                </div>
                <div className="top-0 absolute h-[100%] w-[100%] bg-bg-overlay bg-opacity-70"></div>
                <div class="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white to-transparent opacity-40"></div>
                <div className="absolute top-0 w-[100%]"> {/*CONTENTS*/}
                    <div className="w-full h-[11vh] bg-[#05305D] z-2"> {/*HEADER BAR*/}
                        <div className="grid grid-cols-2">
                            <div className="h-[11vh] flex items-center ml-[3vw]">
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        <img className="h-[9vh]" src='./Logo.svg' alt='LV_logo' />
                                    </div>
                                    <div>
                                        <img className="h-[3vh]" src='./Header Text.svg' alt='LV_logo' />
                                        <img className="h-[1.5vh]" src='./Sub Header Text.svg' alt='LV_logo' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-[88vh]">
                        <div className="flex items-center flex-col justify-evenly h-[100%]">

                            <div className="font-Poppins text-white text-[7.3vw] font-bold text-center ">
                                Free <span className="text-[#E9E62E]">Lunch</span> Eligibility <br />System
                            </div>

                            <div className="flex justfiy-center w-[82vw] text-center text-white font-Poppins text-[1.5vw] ">
                                Designed to streamline the delivery of nutritious meals to students during their term in La Verdad Christian College. The system aims to improve student health and engagement by providing a reliable and user-friendly platform for meal access within the school environment.
                            </div>

                            <div className="flex justfiy-center text-center text-white font-Poppins text-[1.4vw] font-bold ">
                                you can now proceed as:
                            </div>

                            <div className="flex gap-[4vw] ">
                                <Link to="admin_login">
                                    <button className="w-[150px] h-[40px] bg-[#05305D] rounded-[8px] font-Inter text-white font-bold text-[1.1vw]">
                                        ADMIN
                                    </button>
                                </Link>
                                <Link to="/queryinput"> 
                                    <button className="w-[150px] h-[40px] bg-[#0F5FC2] rounded-[8px] font-Inter text-white font-bold text-[1.1vw]">
                                        KITCHEN STAFF
                                    </button>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}