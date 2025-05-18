import { TextInput, Label } from "flowbite-react";
import { useState } from "react"
import { MoveLeft, CircleAlert } from "lucide-react"
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom"

export default function AdminLogin() {

  const navigate = useNavigate()

  const sampleEmail = "sample@email.com";
  const samplePassword = "12345678";
  const [isCredentialMatch, setIsCredentialMatch] = useState(true)

  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const HandleCredentialCheck = () => {
    if (sampleEmail !== email || samplePassword !== password) {
      setIsCredentialMatch(false)
    } else {
      setIsCredentialMatch(true)
      navigate("/dashboard")
    }
  }

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
              <img src="/Login_Illustration_2.svg" alt="login illustration" className="overflow-y-hidden" />
            </div>
          </div>
          <div className="w-full h-full">
            <div className="flex justify-center items-center h-full">

              <div className="bg-[#ffffff] w-[44vw] max-w-[70%] h-[90vh] overflow-y-hidden shadow-[0_4px_6px_rgba(0,0,0,0.25)] rounded-[10px]">
                <div className="h-[100%]">
                  <div className="h-[100%] mx-[2vw]">
                    <div className="h-[20%]">
                      <div className="flex justify-center items-start flex-col h-[100%]">
                        <span className="font-Poppins text-[2.5rem]">Hello there! <br /></span>
                        <span className="font-Poppins text-[1rem] mt-[-5px]">Please enter your credentials to log-in your account. </span>
                      </div>
                    </div>
                    <div className="h-[40%]">
                      <div className="h-[100%] flex flex-col items-start justify-evenly">
                        <div className="w-[100%]">
                          <span className="font-Poppins text-[1rem]">username</span>
                          <input 
                            type="email" 
                            placeholder="enter email"
                            value={email} 
                            onChange={(e) => {setEmail(e.target.value)}}
                            className={`flex w-[100%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[rem] text-black rounded-[10px] ${isCredentialMatch === false ? `border-red-500` : `border-gray-300`}`}
                            />
                          {isCredentialMatch === false ? (
                            <>
                              <div className="flex items-center gap-1">
                                <CircleAlert fill="#ee2b2b" color="#ffffff" className="size-[1rem]" />
                                <span className="text-red-700 text-[0.9rem] font-Poppins font-light"> Incorrect username</span>
                              </div>
                            </>
                          ) : ""}
                        </div>
                        <div className="w-[100%] flex flex-col items-start justify-evenly">
                          <span className="font-Poppins text-[1rem]">password</span>
                          <input 
                            type="password" 
                            placeholder="enter password" 
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                            className={`flex w-[100%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[rem] text-black rounded-[10px] ${isCredentialMatch === false ? `border-red-500` : `border-gray-300`}`}
                            />
                          {isCredentialMatch === false ? (
                            <>
                              <div className="flex items-center gap-1">
                                <CircleAlert fill="#ee2b2b" color="#ffffff" className="size-[1rem]" />
                                <span className="text-red-700 text-[0.9rem] font-Poppins font-light"> Incorrect password</span>
                              </div>
                            </>
                          ) : ""}
                        </div>
                        <div className="w-[100%] flex justify-center items-center">
                          <p className="font-Poppings text-[1.1vw]">
                            <Link to="/changepassword">
                              <p className="font-Poppins text-[1rem] cursor-pointer text-[#0F5FC2] underline"> <span className="text-black"> Forgot </span> password? </p>
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="h-[30%]">
                      <div className="h-[100%] flex flex-col justify-evenly ">
                        <div>

                          <button className="w-[100%] bg-[#0F5FC2] h-[5.5vh] rounded-[5px]" onClick={() => { HandleCredentialCheck() }}>
                            <span className="font-Poppins text-[1.25rem] text-white font-light">
                              Log in
                            </span>
                          </button>

                        </div>
                        <div>
                          <div className="flex w-[100%] justify-center items-center">
                            <hr className="border-[1px] border-[#7E7E7E] w-[50%]" />
                            <span className="px-[30px] font-Poppins text-[1rem]"> or </span>
                            <hr className="border-[1px] border-[#7E7E7E] w-[50%]" />
                          </div>
                        </div>

                        <div>
                          <button className="w-[100%] bg-[#1F3463] h-[5.5vh] rounded-[5px]">
                            <div class="flex justify-center items-center gap-[8px]">
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
  )
}