import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { adminApi } from "../../utils/api";

export default function QueryResponse() {
    const navigate = useNavigate();
    const location = useLocation();
    const { studentData } = location.state || {};
    
    const [studentInfo, setStudentInfo] = useState(null);
    const [isEligible, setIsEligible] = useState(false);
    const [programs, setPrograms] = useState([]);

    useEffect(() => {
        adminApi.get('/programs')
            .then(res => setPrograms(res.data))
            .catch(err => console.error("Failed to fetch programs:", err));
    }, []);

    useEffect(() => {
        if (!studentData || !studentData.studentInfo) {
            navigate('/queryInputErrorResponse/Invalid student data received.');
            return;
        }
        setStudentInfo(studentData.studentInfo);
        setIsEligible(studentData.eligibilityStatus);
        const timer = setTimeout(() => { navigate('/queryinput'); }, 5000);
        const handleKeyDown = (event) => {
            if (event.code === "Space") {
                clearTimeout(timer);
                navigate('/queryinput');
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [studentData, navigate]);
    
    const getProgramColor = (programAcronym) => {
        const program = programs.find(p => p.name === programAcronym);
        return program ? program.color : '#FFFFFF';
    };

    const yearIntoCardinalText = (year) => {
        switch (year?.toString()) {
            case "1": return "1st";
            case "2": return "2nd";
            case "3": return "3rd";
            case "4": return "4th";
            default: return "nth";
        }
    };

    const Response_Eligible = () => ( <div className="w-[95%] border-[2px] border-[#00AC4F] rounded-[10px] bg-white bg-opacity-10"><p className="text-[#00AC4F] font-Poppins font-bold text-[2rem] py-[2%] text-center">You are Eligible!</p></div> );
    const Response_Ineligible = () => ( <div className="w-[95%] border-[2px] border-[#FF6B75] rounded-[10px] bg-white bg-opacity-10"><p className="text-[#FF6B75] font-Poppins font-bold text-[2rem] py-[2%] text-center">You're not Eligible</p></div> );

    if (!studentInfo || programs.length === 0) {
        return ( <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"><p className="font-Poppins text-[2rem] font-bold text-white text-center" style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.25)" }}>Loading...</p></div> );
    }
    
    const { program: courseAcronym, year: courseYear, name, section, studentIdNumber, profilePictureUrl } = studentInfo;
    const programDetails = programs.find(p => p.name === courseAcronym);
    const fullProgramName = programDetails ? programDetails.description : courseAcronym;
    const words = fullProgramName.split(' ');
    const firstThreeWords = words.slice(0, 4).join(' ');
    const specializationName = fullProgramName.replace(firstThreeWords, '').trim();
    const dynamicProgramColor = getProgramColor(courseAcronym);

    return (
        <div className="relative">
            <img src="/KStaff-bg-image-2.svg" alt="background image" className="h-screen w-screen object-cover" />
            <div className="absolute h-screen w-screen top-0">
                <div className="h-screen ml-[25%]">
                    <div className="w-[100%] h-[100%] flex items-center p-[5px] gap-5 relative">
                        <div className="h-[61.33vh] w-[31.11vw] bg-[#1F3463] bg-opacity-70 flex flex-col items-center justify-evenly rounded-[10px]">
                            <div className="w-[28.40vw] h-[46.55vh] rounded-t-[10px]">
                                <img src={profilePictureUrl || "/person-placeholder.jpg"} alt="student profile" className="w-full h-full object-cover" />
                            </div>
                            {isEligible ? <Response_Eligible /> : <Response_Ineligible />}
                        </div>
                        <div className="h-[61.33vh] w-[36.66vw] bg-white bg-opacity-10 rounded-[10px] border-[1px] flex flex-col items-center justify-evenly" style={{ borderColor: "rgba(190, 123, 123, 0.3)" }}>
                            <p className="font-Poppins text-[2rem] font-bold text-white underline text-center" style={{ textShadow: "0px 3px 2px rgba(0, 0, 0, 0.4)" }}>
                                {firstThreeWords}
                                <br />
                                {/* THIS IS THE FIX: Using an inline style attribute for the dynamic color */}
                                <span style={{ color: dynamicProgramColor }}>{specializationName}</span>
                            </p>
                            <div className="h-[68%] w-[95%] flex">
                                <div className="h-[100%] w-[40%] grid grid-cols-1 grid-rows-3">
                                    <div className="flex items-center"><p className="font-Poppins text-[1.5rem] font-bold text-white pl-[5%]" style={{ textShadow: "0px 3px 2px rgba(0, 0, 0, 0.4)" }}>Name:</p></div>
                                    <div className="flex items-center"><p className="font-Poppins text-[1.5rem] font-bold text-white pl-[5%]" style={{ textShadow: "0px 3px 2px rgba(0, 0, 0, 0.4)" }}>Section/Year:</p></div>
                                    <div className="flex items-center"><p className="font-Poppins text-[1.5rem] font-bold text-white pl-[5%]" style={{ textShadow: "0px 3px 2px rgba(0, 0, 0, 0.4)" }}>Student ID no.</p></div>
                                </div>
                                <div className="h-[100%] w-[60%] grid grid-cols-1 grid-rows-3">
                                    <div className="flex items-center"><p className="font-Poppins text-[1.5rem] font-bold text-white pl-[5%]" style={{ textShadow: "0px 3px 2px rgba(0, 0, 0, 0.4)" }}>{name}</p></div>
                                    <div className="flex items-center"><p className="font-Poppins text-[1.5rem] font-bold text-white pl-[5%]" style={{ textShadow: "0px 3px 2px rgba(0, 0, 0, 0.4)" }}>{section} {yearIntoCardinalText(courseYear)} year</p></div>
                                    <div className="flex items-center"><p className="font-Poppins text-[1.5rem] font-bold text-white pl-[5%]" style={{ textShadow: "0px 3px 2px rgba(0, 0, 0, 0.4)" }}>{studentIdNumber}</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                        <p className="font-Poppins text-[2.25rem] font-bold text-white flex pl-[30px] pt-[2rem]" style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.25)" }}> FREE  <span className="text-[#E9E62E]"> LUNCH  </span> ELIGIBILITY  <span className="text-[#E9E62E]"> CHECK  </span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}