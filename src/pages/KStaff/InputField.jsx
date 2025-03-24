export default function InputField() {
    return (
        <>
            <div className="relative">
                <img src="/KStaff-bg-image.svg" alt="background image" className="w-full h-screen object-cover" />
            </div>
            <div className="absolute top-0 left-0 w-[39vw] h-[60vh] flex flex-col justify-evenly">
                <div className="flex items-center h-[40%] w-[100%] justify-start pl-[1vw]">
                    <img src="Logo.svg" alt="la verdad logo" />
                    <div>
                        <p className="font-Tolkiens text-center]">LA VERDAD <br />CHRISTIAN COLLEGE</p>
                    </div>
                </div>
                <div className="h-[15%] w-[100%] flex justify-start items-center pl-[5vw]">
                    <p className="font-Poppins text-[2vw] font-bold text-white" style={{textShadow: "0px 3px 2px rgba(0, 0, 0, 0.4)"}}>FREE <span className="text-[#E9E62E]">LUNCH</span> SYSTEM</p>
                </div>
                <div className="h-[27vh] w-[100%] flex justify-end items-center mb-[10px] pr-[1%]">
                    <div className="w-[95%] h-[95%] border-[1px] rounded-[10px] flex flex-col justify-evenly pl-[5%]  overflow-visible" style={{boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3)"}}>
                        <span className="font-weight-500 font-Poppins text-[1.5vw]">Student ID no.</span>
                        <input type="text" className="h-[28%] w-[95%] text-gray-300 font-Poppins text-[1vw] text-center" placeholder="Scan ID/Type number"/>
                    </div>
                </div>
            </div>
        </>
    )
}