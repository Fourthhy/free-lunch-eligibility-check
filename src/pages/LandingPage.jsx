export default function LandingPage() {
    return (
        <>
            <div className="w-1440 h-1024"> {/*MAIN CONTAINER SIZE*/}

                <div>
                    <div className="w-full h-[11vh] bg-[#05305D]"> {/*HEADER*/}
                        <div className="grid grid-cols-2">
                            <div className="h-[11vh] flex items-center ml-[3vw]">
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        <img className="h-[9vh]" src='./Logo.svg' alt='LV_logo'/>
                                    </div>
                                    <div>
                                        <img className="h-[3vh]" src='./Header Text.svg' alt='LV_logo'/>
                                        <img className="h-[1.5vh]" src='./Sub Header Text.svg' alt='LV_logo'/>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[11vh] flex items-center justify-end">
                                    <div className="w-[25vw] h-[3vh] mr-[3vw]">
                                        <div className="flex justify-between text-white font-SourceSerif text-[15px]">
                                            <p>About</p>
                                            <p>Academics</p>
                                            <p>Programs</p>
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