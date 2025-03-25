export default function QueryResponse() {
    return (
        <>
            <div className="relative">
                <img src="/KStaff-bg-image-2.svg" alt="background image" className="h-screen w-screen object-cover"/>
            </div>
            <div className="absolute h-screen w-screen top-0">
                <div className="h-screen ml-[25%]">
                    <div className="w-[100%] h-[100%] flex items-center p-[5px] gap-5">   
                        <div className="h-[60vh] w-[27vw] bg-[#1F3463] bg-opacity-70 flex flex-col items-center justify-evenly rounded-[10px]">
                            <img src="/person-placeholder.jpg" alt="placeholder image" className="h-[80%] w-[95%] rounded-t-[10px]"/>
                            <div className="w-[95%] border-[2px] border-[#00AC4F] rounded-[10px] bg-white bg-opacity-10">
                                <p className="text-[#00AC4F] font-Poppins font-bold text-[2vw] py-[2%] text-center">
                                    You are Eligible!
                                </p>
                            </div>
                        </div>
                        <div className="h-[60vh] w-[35vw] bg-white bg-opacity-10 rounded-[10px] border-[1px] flex flex-col items-center justify-evenly" style={{borderColor: "rgba(255, 255, 255, 0.3)"}}>
                            <p className="font-Poppins text-[2vw] font-bold text-white underline text-center" style={{textShadow: "0px 3px 2px rgba(0, 0, 0, 0.4)"}}>BACHELOR OF SCIENCE IN <br /> <span className="text-[#46050A]">INFORMATION SYSTEMS</span></p>
                            <div className="h-[68%] w-[95%] flex">
                                <div className="h-[100%] w-[40%] grid grid-cols-1 grid-rows-3">
                                    <div className="flex items-center">
                                        <p className="font-Poppins text-[1.5vw] font-bold text-white pl-[5%]" style={{textShadow: "0px 3px 2px rgba(0, 0, 0, 0.4)"}}>Name</p>
                                    </div>
                                    <div className="flex items-center">
                                        <p className="font-Poppins text-[1.5vw] font-bold text-white pl-[5%]" style={{textShadow: "0px 3px 2px rgba(0, 0, 0, 0.4)"}}>Section/Year</p>
                                    </div>
                                    <div className="flex items-center">
                                        <p className="font-Poppins text-[1.5vw] font-bold text-white pl-[5%]" style={{textShadow: "0px 3px 2px rgba(0, 0, 0, 0.4)"}}>Student ID no.</p>
                                    </div>
                                </div>
                                <div className="h-[100%] w-[60%] grid grid-cols-1 grid-rows-3">
                                    <div className="flex items-center">
                                        <p className="font-Poppins text-[1.5vw] font-bold text-white pl-[5%]" style={{textShadow: "0px 3px 2px rgba(0, 0, 0, 0.4)"}}>Marco, Justine Jynne Patrice</p>
                                    </div>
                                    <div className="flex items-center">
                                        <p className="font-Poppins text-[1.5vw] font-bold text-white pl-[5%]" style={{textShadow: "0px 3px 2px rgba(0, 0, 0, 0.4)"}}>4th Year College</p>
                                    </div>
                                    <div className="flex items-center">
                                        <p className="font-Poppins text-[1.5vw] font-bold text-white pl-[5%]" style={{textShadow: "0px 3px 2px rgba(0, 0, 0, 0.4)"}}>22-00111JJP</p>
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