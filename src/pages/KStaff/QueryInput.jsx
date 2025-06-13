import { Link, useNavigate } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import { useState } from "react";
import { CircleAlert } from "lucide-react";
import { checkStudentEligibility } from "../../utils/api";

export default function QueryInput() {
    const [inputID, setInputID] = useState("");
    const navigate = useNavigate();

    const handleApiCheck = async (studentId) => {
        if (!studentId || studentId.length < 3) return;
        const res = await checkStudentEligibility(studentId);
        if (res.ok && res.data.success) {
            navigate('/queryresponse', { state: { studentData: res.data } });
        } else {
            const errorMessage = res.data.reason || res.data.error?.message || "An unknown error occurred.";
            navigate(`/queryInputErrorResponse/${encodeURIComponent(errorMessage)}`);
        }
    };

    const handleInput = (event) => {
        const value = event.target.value;
        setInputID(value);
        if (value.length === 11) {
            handleApiCheck(value);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleApiCheck(inputID);
        }
    };
        
    return (
        <>
            <div className="relative">
                <img src="/KStaff-bg-image.svg" alt="background image" className="w-full h-screen object-cover" />
            </div>
            <div className="absolute top-0 left-0 flex flex-col justify-evenly">
                <div className="w-[100%] flex flex-col justify-center items-start">
                    <div className="relative flex flex-col items-center w-[100%] justify-start pl-[1vw]">
                        <div className="absolute top-0 left-0">
                            <Link to="/">
                                <MoveLeft className="text-[35px] m-[15px]" />
                            </Link>
                        </div>
                        <img src="Logo.svg" alt="la verdad logo" className="h-[104px] w-[104px]" />
                        <div>
                            <p className="font-Tolkiens text-center text-[1.5rem]">LA VERDAD <br />CHRISTIAN COLLEGE</p>
                        </div>
                    </div>
                    <p className="font-Poppins text-[2.25rem] font-bold text-white flex pl-[30px] pt-[3rem]" style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.25)" }}> FREE  <span className="text-[#E9E62E]"> LUNCH  </span> ELIGIBILITY  <span className="text-[#FFE100]"> CHECK  </span></p>
                </div>
                <div className="h-[30vh] w-[35vw] flex justify-center items-center mb-[10px] pr-[1%] pt-[3rem] ml-[30px] shadow-[0_4px_6px_rgba(0,0,0,0.10)]">
                    <div className="w-[100%] h-[100%] border-[1px rounded-[10px] flex flex-col justify-center items-cneter pl-[5%] overflow-visible">
                        <div>
                            <span className="font-medium font-Poppins text-[1.5rem]">Student ID no.</span>
                        </div>
                        <div className="pt-[2rem]">
                            <input
                                type="text"
                                className="flex focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[rem] text-[#949494] rounded-[10px] h-[8.40vh] w-[90%] text-center"
                                placeholder="Scan ID/Type number"
                                onChange={handleInput}
                                onKeyDown={handleKeyDown}
                                value={inputID}
                                autoFocus
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}