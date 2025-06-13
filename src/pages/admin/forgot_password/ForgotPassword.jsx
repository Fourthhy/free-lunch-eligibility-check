import { MoveLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import EnterEmail from "./modals/EnterEmail";
import EnterCode from "./modals/EnterCode";
import EnterNewPassword from "./modals/EnterNewPassword";
import NewPasswordSuccess from "./modals/NewPasswordSuccess";
import { authApi } from "../../../utils/api";

export default function ForgotPassword() {
    const [pageStep, setPageStep] = useState(1);
    const [userEmail, setUserEmail] = useState("");
    const [resetCode, setResetCode] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    const navigate = useNavigate();

    const handleRequestPasswordReset = async (email) => {
        setIsLoading(true);
        setApiError("");
        try {
            await authApi.requestPasswordReset(email);
            setUserEmail(email);
            setPageStep(2);
        } catch (err) {
            setApiError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (newPassword) => {
        setIsLoading(true);
        setApiError("");
        try {
            await authApi.resetPassword(userEmail, resetCode, newPassword);
            setPageStep(4);
        } catch (err) {
            setApiError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const pageStepShow = () => {
        switch (pageStep) {
            case 1:
                return (
                    <EnterEmail 
                        onContinue={handleRequestPasswordReset}
                        isLoading={isLoading}
                        apiError={apiError}
                        setApiError={setApiError}
                    />
                );
            case 2:
                return (
                    <EnterCode 
                        onContinue={(enteredCode) => {
                            setResetCode(enteredCode);
                            setApiError("");
                            setPageStep(3);
                        }}
                        onPrevious={() => { setPageStep(1); setApiError(""); }}
                        userEmail={userEmail}
                        onRequestNewCode={() => handleRequestPasswordReset(userEmail)}
                        isLoading={isLoading}
                        apiError={apiError}
                        setApiError={setApiError}
                    />
                );
            case 3:
                return (
                    <EnterNewPassword 
                        onContinue={handleResetPassword}
                        onPrevious={() => { setPageStep(2); setApiError(""); }}
                        isLoading={isLoading}
                        apiError={apiError}
                        setApiError={setApiError}
                    />
                );
            case 4:
                return <NewPasswordSuccess />;
            default:
                navigate("/admin_login");
                return null;
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
                <div className="flex items-center justify-center w-full h-full">
                    {pageStepShow()}
                </div>
            </div>
        </>
    );
}