import { MoveLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'; // Import axios
import EnterEmail from "./modals/EnterEmail";
import EnterCode from "./modals/EnterCode";
import EnterNewPassword from "./modals/EnterNewPassword";
import NewPasswordSuccess from "./modals/NewPasswordSuccess";

export default function ForgotPassword() {
    const [pageStep, setPageStep] = useState(1);
    const [userEmail, setUserEmail] = useState("");
    const [resetCode, setResetCode] = useState(""); // To store the code entered by the user

    // API related state
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState(""); // For errors from API calls

    const navigate = useNavigate();

    // Function to handle the "request password reset" API call
    const handleRequestPasswordReset = async (email) => {
        setIsLoading(true);
        setApiError("");
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/auth/request-password-reset`,
                { email }
            );
            setIsLoading(false);
            if (response.data.success) {
                setUserEmail(email); // Store email for the next steps
                setPageStep(2); // Move to EnterCode modal
            } else {
                // This case might not be hit if backend always returns 200 for enumeration protection
                // but good to have for other potential non-success responses.
                setApiError(response.data.message || "Failed to request password reset.");
            }
        } catch (err) {
            setIsLoading(false);
            if (err.response && err.response.data && err.response.data.error && err.response.data.error.message) {
                setApiError(err.response.data.error.message);
            } else if (err.response && err.response.data && err.response.data.message) {
                 setApiError(err.response.data.message); // Handle cases where backend sends message directly
            } else {
                setApiError("An unexpected error occurred. Please try again.");
            }
            console.error("Request Password Reset API error:", err);
        }
    };

    // Function to handle the actual password reset API call (we'll implement this fully later)
    const handleResetPassword = async (newPassword) => {
        setIsLoading(true);
        setApiError("");
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/auth/reset-password`,
                {
                    email: userEmail,
                    resetCode: resetCode, // The code entered by the user
                    newPassword: newPassword
                }
            );
            setIsLoading(false);
            if (response.data.success) {
                setPageStep(4); // Move to NewPasswordSuccess modal
            } else {
                setApiError(response.data.message || "Failed to reset password.");
            }
        } catch (err) {
            setIsLoading(false);
             if (err.response && err.response.data && err.response.data.error && err.response.data.error.message) {
                setApiError(err.response.data.error.message);
            } else if (err.response && err.response.data && err.response.data.message) {
                 setApiError(err.response.data.message);
            } else {
                setApiError("An unexpected error occurred while resetting password.");
            }
            console.error("Reset Password API error:", err);
        }
    };


    const pageStepShow = () => {
        switch (pageStep) {
            case 1:
                return (
                    <EnterEmail
                        onContinue={handleRequestPasswordReset} // Pass the API handler
                        isLoading={isLoading}
                        apiError={apiError}
                        setApiError={setApiError} // Allow modal to clear errors
                    />
                );
            case 2:
                return (
                    <EnterCode
                        userEmail={userEmail}
                        onContinue={(enteredCode) => {
                            setResetCode(enteredCode); // Store the entered code
                            setApiError(""); // Clear previous errors before moving to next step
                            setPageStep(3);
                        }}
                        onPrevious={() => setPageStep(1)} // Go back to EnterEmail modal
                        // For "Resend Code" functionality (can call handleRequestPasswordReset again)
                        onRequestNewCode={() => handleRequestPasswordReset(userEmail)}
                        isLoading={isLoading} // If resend code has loading state
                        apiError={apiError}   // If resend code has API error
                        setApiError={setApiError}
                    />
                );
            case 3:
                return (
                    <EnterNewPassword
                        onContinue={handleResetPassword} // Pass the API handler
                        onPrevious={() => setPageStep(2)} //Go back to enter code
                        isLoading={isLoading}
                        apiError={apiError}
                        setApiError={setApiError}
                    />
                );
            case 4:
                return <NewPasswordSuccess />;
            default:
                // Ensure this navigation happens if pageStep is somehow invalid
                // This might need to be more robust if pageStep can be manipulated unexpectedly
                navigate("/admin_login");
                return null; // Return null or a loading indicator while navigating
        }
    };
    
    // Handle back navigation
    const handleBack = () => {
        if (pageStep > 1 && pageStep < 4) { // Don't go back from success page or first page
            setPageStep(pageStep - 1);
            setApiError(""); // Clear API errors when going back
            setIsLoading(false); // Reset loading state
        } else if (pageStep === 1) {
            navigate("/admin_login"); // Go to login if on first step
        }
        // If on pageStep 4 (success), back button could go to login or do nothing
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
                    {/* Modified back button logic */}
                    {/* {pageStep < 4 && (
                        <div onClick={handleBack} className="flex items-center cursor-pointer">
                            <MoveLeft />
                        </div>
                    )} */}
                </div>
                <div className="flex items-center justify-center w-full h-full">
                    {pageStepShow()}
                </div>
            </div>
        </>
    );
}