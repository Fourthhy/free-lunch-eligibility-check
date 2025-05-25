import { MoveLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import EnterEmail from "./modals/EnterEmail";
import EnterCode from "./modals/EnterCode";
import EnterNewPassword from "./modals/EnterNewPassword";

export default function ForgotPassword() {
    const [pageStep, setPageStep] = useState(1);
    const [userEmail, setUserEmail] = useState("");
    const navigate = useNavigate()

    const pageStepShow = () => {
        switch (pageStep) {
            case 1:
                return <EnterEmail onContinue={(email) => {
                    setUserEmail(email)
                    setPageStep(2)
                }} />;
            case 2:
                return <EnterCode onContinue={() => setPageStep(3)} userEmail={userEmail} />;
            case 3:
                return <EnterNewPassword onContinue={() => console.log("Finished")} />;
            default:
                return navigate("/admin_login") // Handle default case if needed
        }
    };

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
                    <div onClick={() => setPageStep(pageStep - 1)} className="flex items-center cursor-porinter">
                        <MoveLeft />
                    </div>
                </div>
                <div className="flex items-center justify-center w-full h-full">
                    {pageStepShow()}
                </div>
            </div>
        </>
    );
}