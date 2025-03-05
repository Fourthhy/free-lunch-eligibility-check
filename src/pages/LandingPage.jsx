export default function LandingPage() {
    return (
        <>
            <div className="w-1440 h-1024"> {/*MAIN CONTAINER SIZE*/}
                <div className="relative">
                    <img className="w-screen" src="./LandingPageBackground.png" alt="LV landing page background" />
                </div>
                <div className="absolute top-0 left-0 w-full">
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
                            <div className="h-[11vh] flex items-center justify-end">
                                <div className="w-[25vw] h-[4vh] mr-[3vw]">
                                    <div className="flex justify-between text-white font-SourceSerif text-[15px]">
                                        <p>About</p>
                                        <p>Academics</p>
                                        <p>Programs</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-[897px] mt-[-11vh] w-screen bg-bg-overlay bg-opacity-70">
                        <div className="flex items-center mt-[21vh] flex-col">
                            <div className="font-Poppins text-white text-[85px] font-bold text-center">
                                Free <span className="text-[#E9E62E]">Lunch</span> Eligibility <br />System
                            </div>
                            <div className="flex justfiy-center mt-[4vh] w-[82vw] text-center text-white font-Poppins text-[20px]">
                                Designed to streamline the delivery of nutritious meals to students during their term in La Verdad Christian College. The system aims to improve student health and engagement by providing a reliable and user-friendly platform for meal access within the school environment.
                            </div>
                            <div className="flex justfiy-center mt-[5vh] text-center text-white font-Poppins text-[20px] font-bold">
                                you can now proceed as:
                            </div>
                            <div className="mt-[4vh] flex gap-[4vw]">
                                <button className="w-[150px] h-[40px] bg-[#05305D] rounded-[8px] font-Inter text-white font-bold text-[15]">
                                    ADMIN
                                </button>
                                <button className="w-[150px] h-[40px] bg-[#0F5FC2] rounded-[8px] font-Inter text-white font-bold text-[15]">
                                    KITCHEN STAFF
                                </button>
                            </div>
                        </div>
                        <div className="w-full h-[30vh] flex justify-center items-end font-Poppins font-bold text-white">
                            <i>STUDY <span className="text-[#05305D]">NOW</span>, PAY <span className="text-[#E9E62E]">NEVER</span></i>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}