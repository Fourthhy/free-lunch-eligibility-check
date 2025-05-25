import { Modal, ModalBody } from "flowbite-react"
import { Link } from "react-router-dom"
import { IoCheckmarkCircleSharp } from "react-icons/io5";

export default function NewPasswordSuccess() {
    return (
        <>
            <Modal show={true} size={"lg"}>
                <ModalBody>
                    <div className="flex flex-col justify-evenly gap-7 my-[50px]">
                        <div className="w-full flex justify-center">
                            <IoCheckmarkCircleSharp color="#35a953" size="6.18vw" />
                        </div>
                        <div className="w-full flex justify-center">
                            <p className="text-[2rem] text-black font-Poppins font-semibold">
                                Password Changed !
                            </p>
                        </div>
                        <div className="w-full flex justify-center mb-[20px]">
                            <p className="text-[1.125rem] text-[#7a7a7a] font-Poppins font-regular text-center">
                                Your password has been successfully changed. <br /> Please log in with your new password.
                            </p>
                        </div>
                        <div className="w-[100%] flex justify-between">
                            <div className="w-[100%]">
                                <Link to="/admin_login">
                                    <button type="button" className="w-full h-[7vh] rounded-[10px] bg-[#1F3463] font-Poppins text-white text-[1.06rem] py-[1.3vh]">
                                        Log in
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}