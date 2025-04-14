import { Search } from "lucide-react"


export default function Header({ pageName }) {
    return (
        <>
            <div className="h-[100%] flex items-end justify-between overflow-y-visible">

                <div className="ml-[2%] flex items-center h-[100%]">
                    <p className="font-Poppins text-[#1F3463] text-[2.5vw] font-bold overflow white-space text-overflow">
                        {pageName}
                    </p>
                </div>

                {pageName === "Masterlist" ? (
                    <div className="h-[100%] flex items-center relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" color="#303030" />
                        <input
                            type="text"
                            className="w-[42vw] h-[55%] pl-10 flex items-center rounded-[10px] bg-white shadow-sm shadow-gray-500 font-Poppins"
                            placeholder="Search"
                        />
                    </div>
                ) : ""}


                <div className="mr-[5%] h-[100%] flex items-center">
                    <div className="flex items-center gap-2">
                        <div className="flex flex-col justify-center">
                            <p className="font-Poppins text-[1.4vw] font-semibold text-black">Gavano</p>
                            <p className="font-Poppins text-[1.2vw] text-gray-500 mt-[-4px]">Administrator</p>
                        </div>
                        <img src="/user_profile.png" alt="user profile" />
                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 18H9V20H2V18ZM2 11H11V13H2V11ZM2 4H22V6H2V4ZM20.674 13.025L21.83 12.634L22.83 14.366L21.914 15.171C22.0298 15.7176 22.0298 16.2824 21.914 16.829L22.83 17.634L21.83 19.366L20.674 18.975C20.2589 19.3488 19.77 19.6316 19.239 19.805L19 21H17L16.76 19.804C16.2293 19.6305 15.7408 19.3477 15.326 18.974L14.17 19.366L13.17 17.634L14.086 16.829C13.9702 16.2824 13.9702 15.7176 14.086 15.171L13.17 14.366L14.17 12.634L15.326 13.025C15.736 12.655 16.224 12.37 16.761 12.195L17 11H19L19.24 12.196C19.7707 12.3696 20.2592 12.6523 20.674 13.026M18 17C18.2652 17 18.5196 16.8946 18.7071 16.7071C18.8946 16.5196 19 16.2652 19 16C19 15.7348 18.8946 15.4804 18.7071 15.2929C18.5196 15.1054 18.2652 15 18 15C17.7348 15 17.4804 15.1054 17.2929 15.2929C17.1054 15.4804 17 15.7348 17 16C17 16.2652 17.1054 16.5196 17.2929 16.7071C17.4804 16.8946 17.7348 17 18 17Z" fill="black" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}