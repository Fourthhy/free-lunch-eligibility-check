import { Modal, ModalBody } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CircleAlert, ChevronLeft } from "lucide-react";

export default function EnterEmail({ onContinue, isLoading, apiError, setApiError }) {
    const [userEmailInput, setUserEmailInput] = useState("");
    const [userEmailErrorMessage, setUserEmailErrorMessage] = useState("");

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    const handleInternalContinue = () => {
        setUserEmailErrorMessage("");
        if (setApiError) setApiError("");

        if (userEmailInput.trim() === "") {
            setUserEmailErrorMessage("Please enter an email address");
            return;
        }
        if (!isValidEmail(userEmailInput)) {
            setUserEmailErrorMessage("Please enter a valid email address");
            return;
        }
        if (userEmailInput.split('@')[1] === "laverdad.edu.ph" || userEmailInput.split('@')[1] === "student.laverdad.edu.ph") {
          onContinue(userEmailInput);
          return;
        }
        setUserEmailErrorMessage("email must be from laverdad.edu.ph");
        return;
    };

  return (
    <>
      <Modal show={true} size={"lg"}>
        <ModalBody>
          <div className="flex items-start justify-evenly flex-col gap-4">
            <div className="flex items-start">
              <div className="mt-[5px] cursor-pointer">
                <Link to="/admin_login">
                  <ChevronLeft />
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <div className="font-Poppins text-black text-[1.5rem] font-medium">Forgotten your password?</div>
                <div className="font-Poppins text-black text-[1.125rem] font-light">Don't worry, we'll send you a message to help you reset your password.</div>
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-[20px] w-full">
              <div className="font-Poppins text-black text-[1.125rem] font-light">
                Enter your email
              </div>
              <div className="w-full">
                <input
                  type="email"
                  color="grey"
                  placeholder="e.g. admin@lvcc.edu.ph" // Updated placeholder
                  className={`flex w-[100%] h-[7vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[1.125rem] text-black rounded-[10px] ${userEmailErrorMessage || apiError
                      ? `border-red-500`
                      : `border-gray-300`
                    }`}
                  value={userEmailInput}
                  onChange={(e) => {
                    setUserEmailInput(e.target.value);
                    setUserEmailErrorMessage(""); // Clear local error on change
                    if (setApiError) setApiError(""); // Clear API error on change
                  }}
                  disabled={isLoading} // Disable input when loading
                />
                {/* Display local validation error */}
                {userEmailErrorMessage && !apiError && (
                  <div className="flex h-full w-auto items-center pt-[10px]">
                    <CircleAlert
                      fill="#ee2b2b"
                      color="#ffffff"
                      className="size-[1.4vw]"
                    />
                    <p className="font-Poppins text-red-500 text-[0.9rem] font-light">
                      {userEmailErrorMessage}
                    </p>
                  </div>
                )}
                {/* Display API error */}
                {apiError && (
                  <div className="flex h-full w-auto items-center pt-[10px]">
                    <CircleAlert
                      fill="#ee2b2b"
                      color="#ffffff"
                      className="size-[1.4vw]"
                    />
                    <p className="font-Poppins text-red-500 text-[0.9rem] font-light">
                      {apiError}
                    </p>
                  </div>
                )}
              </div>
              <div className="w-full">
                <button
                  onClick={handleInternalContinue}
                  type="button"
                  className="w-full h-full rounded-lg bg-[#05305D] font-Poppins text-white text-[1.8vh] py-[1.6vh]"
                  disabled={isLoading} // Disable button when loading
                >
                  {isLoading ? "Sending..." : "Continue"}
                </button>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}