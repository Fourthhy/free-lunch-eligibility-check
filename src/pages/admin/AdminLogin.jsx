import { MoveLeft } from "lucide-react"
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom"

export default function AdminLogin() {
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
              <img src="/Login_Illustration_1.svg" alt="login illustration" className="overflow-y-hidden" />
            </div>
          </div>
          <div className="w-full h-full">
            <div className="flex justify-center items-center h-full">

              <div className="bg-[#ffffff] w-[44vw] max-w-[70%] h-[90vh] overflow-y-hidden">
                <div className="h-[100%]">
                  <div className="h-[100%] mx-[2vw]">
                    <div className="h-[20%]">
                      <div className="flex justify-center items-start flex-col h-[100%]">
                        <span className="font-Poppins text-[2.7vw]">Hello there! <br /></span>
                        <span className="font-Poppins text-[1.1vw] mt-[-5px]">Please enter your credentials to log-in your account. </span>
                      </div>
                    </div>
                    <div className="h-[40%]">
                      <div className="h-[100%] flex flex-col items-start justify-evenly">
                        <div className="w-[100%]">
                          <span className="font-Poppins text-[1.1vw]">username</span>
                          <input type="text" className="pl-[5px] rounded-[s] w-[100%] h-[6vh] border-[1px]" />
                        </div>
                        <div className="w-[100%]">
                          <span className="font-Poppins text-[1.1vw]">password</span>
                          <input type="password" className="pl-[5px] rounded-[s] w-[100%] h-[6vh] border-[1px]" />
                        </div>
                        <div className="w-[100%] flex justify-center items-center">
                          <p className="font-Poppings text-[1.1vw]">
                            Forgot <span className="text-[#0F5FC2]"> &nbsp;password?</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="h-[30%]">
                      <div className="h-[100%] flex flex-col justify-evenly ">
                        <div>
                          <Link to="/dashboard">
                            <button className="w-[100%] bg-[#0F5FC2] h-[5.5vh] rounded-[5px]">
                              <span className="font-Poppins text-[1.3vw] text-white">
                                Log in
                              </span>
                            </button>
                          </Link>
                        </div>
                        <div>
                          <div className="flex w-[100%] justify-center items-center">
                            <hr className="border-[1px] border-gray w-[50%]" />
                            <span className="px-[30px] font-Poppins text-[14px]"> or </span>
                            <hr className="border-[1px] border-gray w-[50%]" />
                          </div>
                        </div>

                        <div>
                          <button className="w-[100%] bg-[#1F3463] h-[5.5vh] rounded-[5px]">
                            <div class="flex justify-center items-center gap-[8px]">
                              <FcGoogle className="size-[1.5vw]" />
                              <span className="font-Poppins text-[1.3vw] text-white">
                                Log in with google
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