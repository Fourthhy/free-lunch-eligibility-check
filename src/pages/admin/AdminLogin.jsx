import { useState, useEffect } from "react";
import { MoveLeft, CircleAlert } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { useAuth } from "../../context/AuthContext"; // Import useAuth

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, isAuthenticated, admin } = useAuth(); // Get login function and isAuthenticated from context

  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Now use isAuthenticated from context, which also checks localStorage initially
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]); // Depend on isAuthenticated

  const handleEmailPasswordLogin = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        { email, password }
      );
      setIsLoading(false);
      if (response.data && response.data.success && response.data.token && response.data.admin) {
        // Use the login function from context
        login(response.data.admin, response.data.token);
        navigate("/dashboard");
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setIsLoading(false);
      // ... (existing error handling for email/password login)
      if (err.response?.data?.error?.message) {
        setError(err.response.data.error.message);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError("An unexpected error occurred during login.");
      }
      console.error("Email/Password Login API error:", err);
    }
  };

  const handleSubmitEmailPassword = (e) => {
    e.preventDefault();
    handleEmailPasswordLogin();
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const firebaseIdToken = await user.getIdToken();

      const backendResponse = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/google-login`,
        { token: firebaseIdToken }
      );
      setIsGoogleLoading(false);
      if (backendResponse.data && backendResponse.data.success && backendResponse.data.token && backendResponse.data.admin) {
        // Use the login function from context
        login(backendResponse.data.admin, backendResponse.data.token);
        navigate("/dashboard");
      } else {
        setError(backendResponse.data.message || "Google Sign-In failed on backend.");
      }
    } catch (err) {
      setIsGoogleLoading(false);
      // ... (existing Google Sign-In error handling) ...
      if (err.code) {
        console.error("Firebase Google Sign-In Error:", err.code, err.message);
        if (err.code === 'auth/popup-closed-by-user') {
          setError("Google Sign-In was cancelled.");
        } else if (err.code === 'auth/account-exists-with-different-credential') {
          setError("An account with this email already exists using a different sign-in method.");
        } else {
          setError(err.message || "Google Sign-In failed. Please try again.");
        }
      } 
      else if (err.response?.data?.error?.message) {
        setError(err.response.data.error.message);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.request) {
        setError("Network error during Google Sign-In. Please check your connection.");
      } else {
        setError("An unexpected error occurred during Google Sign-In.");
      }
      console.error("Google Sign-In Process Error:", err);
    }
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
                    
                    <form onSubmit={handleSubmitEmailPassword} className="h-[calc(40%-2rem)]"> {/* Adjusted height to make space for error */}
                      <div className="h-[100%] flex flex-col items-start justify-evenly">
                        <div className="w-[100%]">
                          <label
                            htmlFor="emailInput"
                            className="font-Poppins text-[1rem]"
                          >
                            username
                          </label>
                          <input
                            id="emailInput"
                            type="email"
                            placeholder="enter email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setError(""); 
                            }}
                            className={`flex w-[100%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[1.125rem] text-black rounded-[10px] ${
                              error ? `border-red-500` : `border-gray-300`
                            }`}
                            required
                            disabled={isLoading || isGoogleLoading}
                          />
                        </div>
                        <div className="w-[100%]"> {/* Removed flex-col for password to align with username error handling */}
                          <label
                            htmlFor="passwordInput"
                            className="font-Poppins text-[1rem]"
                          >
                            password
                          </label>
                          <input
                            id="passwordInput"
                            type="password"
                            placeholder="enter password"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              setError("");
                            }}
                            className={`flex w-[100%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[1rem] text-black rounded-[10px] ${
                              error ? `border-red-500` : `border-gray-300`
                            }`}
                            required
                            disabled={isLoading || isGoogleLoading}
                          />
                        </div>
                        <div className="w-[100%] flex justify-center items-center">
                          <p className="font-Poppings text-[1.1vw]">
                            <Link to="/forgotpassword">
                              <p className="font-Poppins text-[1rem] cursor-pointer text-[#0F5FC2] underline">
                                <span className="text-black"> Forgot </span> password?
                              </p>
                            </Link>
                          </p>
                        </div>
                      </div>
                    </form>
                    
                    {/* Display general error message centrally */}
                    {error && (
                      <div className="flex items-center justify-center gap-1 my-2 h-[2rem]"> {/* Error message area */}
                        <CircleAlert
                          fill="#ee2b2b"
                          color="#ffffff"
                          className="size-[1rem] flex-shrink-0"
                        />
                        <span className="text-red-700 text-[0.9rem] font-Poppins font-light">
                          {error}
                        </span>
                      </div>
                    )}

                    <div className="h-[30%]">
                      <div className="h-[100%] flex flex-col justify-evenly ">
                        <div>
                          <button
                            type="button"
                            onClick={handleSubmitEmailPassword}
                            className="w-[100%] bg-[#0F5FC2] h-[5.5vh] rounded-[5px]"
                            disabled={isLoading || isGoogleLoading}
                          >
                            <span className="font-Poppins text-[1.25rem] text-white font-light">
                              {isLoading ? "Logging in..." : "Log in"}
                            </span>
                          </button>
                        </div>
                        <div>
                          <div className="flex w-[100%] justify-center items-center">
                            <hr className="border-[1px] border-[#7E7E7E] w-[50%]" />
                            <span className="px-[30px] font-Poppins text-[1rem]">or</span>
                            <hr className="border-[1px] border-[#7E7E7E] w-[50%]" />
                          </div>
                        </div>
                        <div>
                          <button 
                            onClick={handleGoogleSignIn}
                            className="w-[100%] bg-[#1F3463] h-[5.5vh] rounded-[5px]"
                            disabled={isLoading || isGoogleLoading}
                          >
                            <div className="flex justify-center items-center gap-[8px]">
                              <FcGoogle className="size-[1.5vw]" />
                              <span className="font-Poppins text-[1.25rem] text-white font-light">
                                {isGoogleLoading ? "Signing in..." : "Continue with Google"}
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