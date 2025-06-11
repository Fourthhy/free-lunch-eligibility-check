import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import studentRecords from "../../sample-data/studentRecords.json";
import { useState, useEffect } from "react";
import courses from "../../context/constants.courses"

export default function QueryResponse() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [matchedRecords, setMatchedRecords] = useState([]); //this is where the matching records are stored
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true); // Set loading to true when the id changes

        const findingMatchRecords = (studentId) => {
            // 1. Validate the studentId format first
            const alphaNumericAndDash = /^[a-zA-Z0-9-]+$/;
            if (!alphaNumericAndDash.test(studentId) == false) {
                const error = "Accepts only alphanumeric characters and dash (-)";
                navigate(`/queryInputErrorResponse/${error}`);
                return; // Exit the function if the studentId is invalid
            }
        
            // 2. If the studentId is valid, then try to find matches
            const match = studentRecords.filter(item => item.student_id == studentId);
        
            // 3. Check if any matches were found
            if (match.length === 0) {
                navigate('/queryInputErrorResponse/no-match');
                return; // Exit the function if no match is found
            }
        
            // 4. Return the matching records if everything is valid and matches are found
            return match;
        };
        

        const records = findingMatchRecords(id);
        setMatchedRecords(records);
        setLoading(false);

        // const timer = setTimeout(() => {
        //     navigate('/queryinput')
        // }, 5000)
        // return () => clearTimeout(timer);

        //change to keybinds, spacebar to manually go back to queryinput
    }, [id]);

    window.addEventListener('keydown', (event) => {
        if (event.code === "Space") {
            navigate('/queryinput');
        }
    })

    const programColor = (initials) => {
        switch (initials) {
            case "BSIS":
                return `text-[#46050A]`
                break;
            case "BSAIS":
                return `text-[#BC9E17]`
                break;
            case "BSSW":
                return `text-[#680C6D]`
                break;
            case "BSA":
                return `text-[#BC9E17]`
                break;
            case "BAB":
                return `text-[#050451]`
                break;
            case "ACT":
                return `text-[#46050A]`
                break;
            default:
                return `text-white`
                break;
        }
    }

    const yearIntoCardinalText = (year) => {
        switch (year) {
            case "1":
                return "1st"
                break;
            case "2":
                return "2nd"
                break;
            case "3":
                return "3rd"
                break;
            case "4":
                return "4th"
                break;
            default:
                return "nth"
                break;
        }
    }

    const Response_Eligible = () => (
        <div className="w-[95%] border-[2px] border-[#00AC4F] rounded-[10px] bg-white bg-opacity-10">
            <p className="text-[#00AC4F] font-Poppins font-bold text-[2rem] py-[2%] text-center">
                You are Eligible!
            </p>
        </div>
    );

    const Response_Ineligible = () => (
        <div className="w-[95%] border-[2px] border-[#FF6B75] rounded-[10px] bg-white bg-opacity-10">
            <p className="text-[#FF6B75] font-Poppins font-bold text-[2rem] py-[2%] text-center">
                You're not Eligible
            </p>
        </div>
    );

    const Response_Claimed = () => (
        <div className="w-[95%] border-[2px] border-[#5594E2] rounded-[10px] bg-white bg-opacity-10">
            <p className="text-[#5594E2] font-Poppins font-bold text-[2rem] py-[2%] text-center">
                Already Claimed
            </p>
        </div>
    );

    if (loading) {
        return (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <p className="font-Poppins text-[2rem] font-bold text-white text-center" style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.25)" }}>
                    Loading Student Data...
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="relative">
                <img src="/KStaff-bg-image-2.svg" alt="background image" className="h-screen w-screen object-cover" />
            </div>
            <div className="absolute h-screen w-screen top-0">
                <div className="h-screen ml-[25%]">
                    <div className="w-[100%] h-[100%] flex items-center p-[5px] gap-5 relative">
                        <div className="h-[61.33vh] w-[31.11vw] bg-[#1F3463] bg-opacity-70 flex flex-col items-center justify-evenly rounded-[10px]">
                            <div className="w-[28.40vw] h-[46.55vh] rounded-t-[10px]">
                                <img src="/person-placeholder.jpg" alt="placeholder image" className="w-full h-full object-cover" />
                            </div>
                            {matchedRecords.map((item) => (
                                <>
                                    {item.meal_status === "claimed" && <Response_Claimed />}
                                    {item.meal_status === "eligible" && <Response_Eligible />}
                                    {item.meal_status === "ineligible" && <Response_Ineligible />}
                                </>
                            ))}
                        </div>

                        <div className="h-[61.33vh] w-[36.66vw] bg-white bg-opacity-10 rounded-[10px] border-[1px] flex flex-col items-center justify-evenly" style={{ borderColor: "rgba(190, 123, 123, 0.3)" }}>
                            {matchedRecords.map((item) => {
                                const courseAcronym = item.course.split(' ')[0];
                                const courseYear = item.course.split(' ')[1];
                                const fullProgramName = courses[courseAcronym];
                                let firstThreeWords = '';
                                let specializationName = '';
                                if (fullProgramName) {
                                    const words = fullProgramName.split(' '); // Splits the string into an array of words
                                    firstThreeWords = words.slice(0, 4).join(' '); // Takes the first 3 words and joins them back with spaces
                                    specializationName = fullProgramName.replace(firstThreeWords, '').trim();
                                }
                                return (
                                    <>
                                        <p className="font-Poppins text-[2rem] font-bold text-white underline text-center" style={{ textShadow: "0px 3px 2px rgba(0, 0, 0, 0.4)" }}>
                                            {firstThreeWords}
                                            <br />
                                            <span className={programColor(courseAcronym)}>
                                                {specializationName}
                                            </span>
                                        </p>
                                        <div className="h-[68%] w-[95%] flex">
                                            <div className="h-[100%] w-[40%] grid grid-cols-1 grid-rows-3">
                                                <div className="flex items-center">
                                                    <p className="font-Poppins text-[1.5rem] font-bold text-white pl-[5%]" style={{ textShadow: "0px 3px 2px rgba(0, 0, 0, 0.4)" }}>Name:</p>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="font-Poppins text-[1.5rem] font-bold text-white pl-[5%]" style={{ textShadow: "0px 3px 2px rgba(0, 0, 0, 0.4)" }}>Section/Year:</p>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="font-Poppins text-[1.5rem] font-bold text-white pl-[5%]" style={{ textShadow: "0px 3px 2px rgba(0, 0, 0, 0.4)" }}>Student ID no.</p>
                                                </div>
                                            </div>
                                            <div className="h-[100%] w-[60%] grid grid-cols-1 grid-rows-3">
                                                <div className="flex items-center">
                                                    <p className="font-Poppins text-[1.5rem] font-bold text-white pl-[5%]" style={{ textShadow: "0px 3px 2px rgba(0, 0, 0, 0.4)" }}>{item.name}</p>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="font-Poppins text-[1.5rem] font-bold text-white pl-[5%]" style={{ textShadow: "0px 3px 2px rgba(0, 0, 0, 0.4)" }}>{yearIntoCardinalText(courseYear)} year college</p>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="font-Poppins text-[1.5rem] font-bold text-white pl-[5%]" style={{ textShadow: "0px 3px 2px rgba(0, 0, 0, 0.4)" }}>{id}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                            )}
                        </div>
                    </div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                        <p className="font-Poppins text-[2.25rem] font-bold text-white flex pl-[30px] pt-[2rem]" style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.25)" }}> FREE&nbsp; <span className="text-[#E9E62E]"> LUNCH&nbsp; </span> ELIGIBILITY&nbsp; <span className="text-[#E9E62E]"> CHECK&nbsp; </span></p>
                    </div>
                </div>
            </div>
        </>
    );
}