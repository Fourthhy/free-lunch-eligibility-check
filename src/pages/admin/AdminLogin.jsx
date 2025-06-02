import /* TextInput, Label -- No longer directly used, can remove if not needed elsewhere in this file */ "flowbite-react";
import { useState, useEffect } from "react";
import { MoveLeft, CircleAlert } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios

export default function AdminLogin() {
  const navigate = useNavigate();

  // Remove sample credentials
  // const sampleEmail = "sample@email.com";
  // const samplePassword = "12345678";

  // State for API call status
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // To store API error messages

  // State for form inputs remains the same
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // const [isCredentialMatch, setIsCredentialMatch] = useState(true) // We'll use the 'error' state instead

  // NEW: useEffect to check for existing token and redirect
  useEffect(() => {
    const token = localStorage.getItem("adminAuthToken");
    if (token) {
      // If token exists, user is already logged in, redirect to dashboard
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]); // Dependency array includes navigate

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        {
          email: email,
          password: password,
        }
      );

      setIsLoading(false);

      if (response.data && response.data.success && response.data.token) {
        localStorage.setItem("adminAuthToken", response.data.token);
        navigate("/dashboard"); // Redirect to dashboard on successful login
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setIsLoading(false);
      if (
        err.response &&
        err.response.data &&
        err.response.data.error &&
        err.response.data.error.message
      ) {
        setError(err.response.data.error.message);
      } else if (err.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Login API error:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <>
      <div className="bg-[#F8FAFB] w-screen h-screen border-black border-[1px] overflow-y-hidden">
        <div className="grid grid-cols-2 grid-rows-1 h-[100vh]">
          <div className="overflow-y-hidden">
            <div className="h-[60px]">
              <Link to="/">
                <MoveLeft className="m-[15px]" />
              </Link>
            </div>
            <div className="flex justify-center items-center h-[90vh] overflow-y-hidden">
              <img
                src="/Login_Illustration_2.svg"
                alt="login illustration"
                className="overflow-y-hidden"
              />
            </div>
          </div>
          <div className="w-full h-full">
            <div className="flex justify-center items-center h-full">
              <div className="bg-[#ffffff] w-[44vw] max-w-[70%] h-[90vh] overflow-y-hidden shadow-[0_4px_6px_rgba(0,0,0,0.25)] rounded-[10px]">
                <div className="h-[100%]">
                  <div className="h-[100%] mx-[2vw]">
                    <div className="h-[20%]">
                      <div className="flex justify-center items-start flex-col h-[100%]">
                        <span className="font-Poppins text-[2.5rem]">
                          Hello there! <br />
                        </span>
                        <span className="font-Poppins text-[1rem] mt-[-5px]">
                          Please enter your credentials to log-in your account.{" "}
                        </span>
                      </div>
                    </div>
                    {/* Wrap inputs in a form element for better semantics and accessibility, even if we handle submit via button click */}
                    <form onSubmit={handleSubmit} className="h-[40%]">
                      <div className="h-[100%] flex flex-col items-start justify-evenly">
                        <div className="w-[100%]">
                          <label
                            htmlFor="emailInput"
                            className="font-Poppins text-[1rem]"
                          >
                            username
                          </label>{" "}
                          {/* Added label with htmlFor */}
                          <input
                            id="emailInput" // Added id
                            type="email"
                            placeholder="enter email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setError("");
                            }} // Clear error on change
                            className={`flex w-[100%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[1.125rem] text-black rounded-[10px] ${
                              error ? `border-red-500` : `border-gray-300`
                            }`} // Use 'error' state for border
                            required // Added basic HTML5 validation
                          />
                          {/* Display general error message */}
                          {error && (
                            <div className="flex items-center gap-1 mt-1">
                              <CircleAlert
                                fill="#ee2b2b"
                                color="#ffffff"
                                className="size-[1rem]"
                              />
                              <span className="text-red-700 text-[0.9rem] font-Poppins font-light">
                                {error}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="w-[100%] flex flex-col items-start justify-evenly">
                          <label
                            htmlFor="passwordInput"
                            className="font-Poppins text-[1rem]"
                          >
                            password
                          </label>{" "}
                          {/* Added label with htmlFor */}
                          <input
                            id="passwordInput" // Added id
                            type="password"
                            placeholder="enter password"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              setError("");
                            }} // Clear error on change
                            className={`flex w-[100%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[1rem] text-black rounded-[10px] ${
                              error ? `border-red-500` : `border-gray-300`
                            }`} // Use 'error' state for border
                            required // Added basic HTML5 validation
                          />
                          {/* Error message is now displayed once below the email field or as a general login error */}
                        </div>
                        <div className="w-[100%] flex justify-center items-center">
                          <p className="font-Poppings text-[1.1vw]">
                            <Link to="/forgotpassword">
                              <p className="font-Poppins text-[1rem] cursor-pointer text-[#0F5FC2] underline">
                                {" "}
                                <span className="text-black">
                                  {" "}
                                  Forgot{" "}
                                </span>{" "}
                                password?{" "}
                              </p>
                            </Link>
                          </p>
                        </div>
                      </div>
                    </form>
                    <div className="h-[30%]">
                      <div className="h-[100%] flex flex-col justify-evenly ">
                        <div>
                          {/* Changed onClick to call handleSubmit, which internally calls handleLogin */}
                          <button
                            type="button" // Changed to type="button" if not inside a <form type="submit"> or handle submit via onClick
                            onClick={handleSubmit} // Or directly handleLogin if not using a form submit handler
                            className="w-[100%] bg-[#0F5FC2] h-[5.5vh] rounded-[5px]"
                            disabled={isLoading} // Disable button when loading
                          >
                            <span className="font-Poppins text-[1.25rem] text-white font-light">
                              {isLoading ? "Logging in..." : "Log in"}
                            </span>
                          </button>
                        </div>
                        <div>
                          <div className="flex w-[100%] justify-center items-center">
                            <hr className="border-[1px] border-[#7E7E7E] w-[50%]" />
                            <span className="px-[30px] font-Poppins text-[1rem]">
                              {" "}
                              or{" "}
                            </span>
                            <hr className="border-[1px] border-[#7E7E7E] w-[50%]" />
                          </div>
                        </div>
                        <div>
                          <button className="w-[100%] bg-[#1F3463] h-[5.5vh] rounded-[5px]">
                            <div className="flex justify-center items-center gap-[8px]">
                              <FcGoogle className="size-[1.5vw]" />
                              <span className="font-Poppins text-[1.25rem] text-white font-light">
                                Continue with Google
                              </span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
