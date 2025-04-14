import { Dropdown, DropdownItem, Progress } from "flowbite-react"
import { ArrowUpRight, ArrowDownLeft, Menu } from "lucide-react"
import { useState } from "react"

import Chart from "./Dashboard_Components/BarChart"

export default function DashboardData() {

    const [filter, setFilter] = useState("Daily")
    const [weeklyFilter, setWeeklyFilter] = useState("week 1")

    const CourseClaimed = ({ programName, claimed, unClaimed, totalMeals }) => {
        const claimedBarWidth = (claimed / totalMeals) * 100;
        const unclaimedBarWidth = (unClaimed / totalMeals) * 100;

        return (
            <>
                <div className="w-[100%] h-[100%] flex items-center justify-center">
                    <div className="w-[18%] h-[100%] flex items-center justify-center">
                        <p className="font-Poppins text-[1.3vw] font-bold text-gray-500">
                            {programName}
                        </p>
                    </div>
                    <div className="w-[82%] h-[100%] items-center flex justify-center flex-col">

                        <div className="w-full h-3 flex items-center overflow-y-hidden">
                            <div className="bg-[#29d646] h-2" style={{ width: `${claimedBarWidth}%` }}></div>
                            <p className="font-Poppins text-[0.8vw] font-semibold text-black-500 ml-2">
                                {claimedBarWidth.toFixed(2)}%
                            </p>
                        </div>

                        <div className="w-full h-3 flex items-center overflow-y-hidden">
                            <div className="bg-gray-400 h-2" style={{ width: `${unclaimedBarWidth}%` }}></div>
                            <p className="font-Poppins text-[0.8vw] font-semibold text-black-500 ml-2">
                                {unclaimedBarWidth.toFixed(2)}%
                            </p>
                        </div>

                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="w-[100%] h-[100%]">
                <div className="h-[10%] flex items-end justify-between">
                    <div className="ml-[2%]">
                        <p className="font-Poppins text-[#1F3463] text-[2.5vw] font-bold overflow white-space text-overflow">
                            Dashboard
                        </p>
                    </div>
                    <div className="mr-[2%]">
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
                <div className="h-[90%] flex items-center justify-center">
                    <div className="h-[96%] w-[96%]">
                        <div className="grid grid-cols-2 grid-rows-2 h-[100%] w-[100%]">
                            <div className="col-span-2 row-span-1 h-[100%] w-[100%] flex flex-col items-center justify-center bg-white rounded-[15px]">

                                <div className="w-[97%] h-[97%] flex flex-col">
                                    <div className="flex justify-between w-[100%] h-[15%]">
                                        <div className="flex items-center">
                                            <p className="font-Poppins text-[#1F3463] text-[1.5vw] font-bold overflow white-space text-overflow pl-[15px]">
                                                {filter} Insights
                                            </p>
                                        </div>
                                        <div>
                                            <Dropdown label={filter} dismissOnClick={true} className="text-[#1F3463] font-bold" style={{ backgroundColor: '#e5e7eb', height: '30px' }} >
                                                <DropdownItem onClick={() => { setFilter("Daily") }}>Daily</DropdownItem>
                                                <DropdownItem onClick={() => { setFilter("Weekly") }}>Weekly</DropdownItem>
                                                <DropdownItem onClick={() => { setFilter("Monthly") }}>Monthly</DropdownItem>
                                                <DropdownItem onClick={() => { setFilter("Semestral") }}>Semestral</DropdownItem>
                                            </Dropdown>
                                        </div>
                                    </div>
                                    <div className="border-[1px] border-gray-300 flex-1 rounded-[15px]">
                                        <div className="w-[100%] h-[100%] grid grid-cols-5">
                                            <div className="h-[100%] w-[100%] grid grid-rows-5">
                                                &nbsp;
                                                <div className="h-[100%] w-[100%] flex items-center">
                                                    <p className="font-Poppins text-[1.3vw] font-bold text-gray-500 pl-[15px]">
                                                        1st week
                                                    </p>
                                                </div>
                                                <div className="h-[100%] w-[100%] flex items-center">
                                                    <p className="font-Poppins text-[1.3vw] font-bold text-gray-500 pl-[15px]">
                                                        2nd week
                                                    </p>
                                                </div>
                                                <div className="h-[100%] w-[100%] flex items-center">
                                                    <p className="font-Poppins text-[1.3vw] font-bold text-gray-500 pl-[15px]">
                                                        3rd week
                                                    </p>
                                                </div>
                                                <div className="h-[100%] w-[100%] flex items-center">
                                                    <p className="font-Poppins text-[1.3vw] font-bold text-gray-500 pl-[15px]">
                                                        4th week
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="h-[100%] w-[100%] grid grid-rows-5">
                                                <div className="w-[100%] flex justify-center items-center font-Poppins text-[#1F3463] text-[1.3vw] font-bold">
                                                    Total of claimed
                                                </div>

                                                <div className="h-[100%] w-[100%] flex">
                                                    <div className="w-[60%] h-[100%] flex justify-end items-center">
                                                        <p className="font-Poppins text-[1.3vw] font-bold pl-[15px] text-black-700">
                                                            2,891
                                                        </p>
                                                    </div>
                                                    <div className="w-[30%] h-[100%] flex items-center justify-center">
                                                        <ArrowUpRight color="#29d646" />
                                                    </div>
                                                </div>

                                                <div className="h-[100%] w-[100%] flex">
                                                    <div className="w-[60%] h-[100%] flex justify-end items-center">
                                                        <p className="font-Poppins text-[1.3vw] font-bold pl-[15px] text-black-700">
                                                            1,782
                                                        </p>
                                                    </div>
                                                    <div className="w-[30%] h-[100%] flex items-center justify-center">
                                                        <ArrowUpRight color="#29d646" />
                                                    </div>
                                                </div>

                                                <div className="h-[100%] w-[100%] flex">
                                                    <div className="w-[60%] h-[100%] flex justify-end items-center">
                                                        <p className="font-Poppins text-[1.3vw] font-bold pl-[15px] text-black-700">
                                                            1,092
                                                        </p>
                                                    </div>
                                                    <div className="w-[30%] h-[100%] flex items-center justify-center">
                                                        <ArrowUpRight color="#29d646" />
                                                    </div>
                                                </div>

                                                <div className="h-[100%] w-[100%] flex">
                                                    <div className="w-[60%] h-[100%] flex justify-end items-center">
                                                        <p className="font-Poppins text-[1.3vw] font-bold pl-[15px] text-black-700">
                                                            956
                                                        </p>
                                                    </div>
                                                    <div className="w-[30%] h-[100%] flex items-center justify-center">
                                                        <ArrowDownLeft color="#d62929" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="h-[100%] w-[100%] grid grid-rows-5">
                                                <div className="w-[100%] flex justify-center items-center font-Poppins text-[#1F3463] text-[1.3vw] font-bold">
                                                    Total of unclaimed
                                                </div>

                                                <div className="h-[100%] w-[100%] flex">
                                                    <div className="w-[60%] h-[100%] flex justify-end items-center">
                                                        <p className="font-Poppins text-[1.3vw] font-bold pl-[15px] text-black-700">
                                                            2,891
                                                        </p>
                                                    </div>
                                                    <div className="w-[30%] h-[100%] flex items-center justify-center">
                                                        <ArrowUpRight color="#29d646" />
                                                    </div>
                                                </div>

                                                <div className="h-[100%] w-[100%] flex">
                                                    <div className="w-[60%] h-[100%] flex justify-end items-center">
                                                        <p className="font-Poppins text-[1.3vw] font-bold pl-[15px] text-black-700">
                                                            1,782
                                                        </p>
                                                    </div>
                                                    <div className="w-[30%] h-[100%] flex items-center justify-center">
                                                        <ArrowUpRight color="#29d646" />
                                                    </div>
                                                </div>

                                                <div className="h-[100%] w-[100%] flex">
                                                    <div className="w-[60%] h-[100%] flex justify-end items-center">
                                                        <p className="font-Poppins text-[1.3vw] font-bold pl-[15px] text-black-700">
                                                            1,092
                                                        </p>
                                                    </div>
                                                    <div className="w-[30%] h-[100%] flex items-center justify-center">
                                                        <ArrowUpRight color="#29d646" />
                                                    </div>
                                                </div>

                                                <div className="h-[100%] w-[100%] flex">
                                                    <div className="w-[60%] h-[100%] flex justify-end items-center">
                                                        <p className="font-Poppins text-[1.3vw] font-bold pl-[15px] text-black-700">
                                                            956
                                                        </p>
                                                    </div>
                                                    <div className="w-[30%] h-[100%] flex items-center justify-center">
                                                        <ArrowDownLeft color="#d62929" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="h-[100%] w-[100%] grid grid-rows-5">
                                                <div className="w-[100%] flex justify-center items-center font-Poppins text-[#1F3463] text-[1.3vw] font-bold">
                                                    Total of alotted meal
                                                </div>

                                                <div className="h-[100%] w-[100%] flex">
                                                    <div className="w-[60%] h-[100%] flex justify-end items-center">
                                                        <p className="font-Poppins text-[1.3vw] font-bold pl-[15px] text-black-700">
                                                            2,891
                                                        </p>
                                                    </div>
                                                    <div className="w-[30%] h-[100%] flex items-center justify-center">
                                                        <ArrowUpRight color="#29d646" />
                                                    </div>
                                                </div>

                                                <div className="h-[100%] w-[100%] flex">
                                                    <div className="w-[60%] h-[100%] flex justify-end items-center">
                                                        <p className="font-Poppins text-[1.3vw] font-bold pl-[15px] text-black-700">
                                                            1,782
                                                        </p>
                                                    </div>
                                                    <div className="w-[30%] h-[100%] flex items-center justify-center">
                                                        <ArrowUpRight color="#29d646" />
                                                    </div>
                                                </div>

                                                <div className="h-[100%] w-[100%] flex">
                                                    <div className="w-[60%] h-[100%] flex justify-end items-center">
                                                        <p className="font-Poppins text-[1.3vw] font-bold pl-[15px] text-black-700">
                                                            1,092
                                                        </p>
                                                    </div>
                                                    <div className="w-[30%] h-[100%] flex items-center justify-center">
                                                        <ArrowUpRight color="#29d646" />
                                                    </div>
                                                </div>

                                                <div className="h-[100%] w-[100%] flex">
                                                    <div className="w-[60%] h-[100%] flex justify-end items-center">
                                                        <p className="font-Poppins text-[1.3vw] font-bold pl-[15px] text-black-700">
                                                            956
                                                        </p>
                                                    </div>
                                                    <div className="w-[30%] h-[100%] flex items-center justify-center">
                                                        <ArrowDownLeft color="#d62929" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="h-[100%] w-[100%] grid grid-rows-5">
                                                <div className="w-[100%] flex justify-center items-center font-Poppins text-[#1F3463] text-[1.3vw] font-bold">
                                                    Total percentage
                                                </div>

                                                <div className="h-[100%] w-[100%] flex">
                                                    <div className="w-[60%] h-[100%] flex justify-end items-center">
                                                        <p className="font-Poppins text-[1.3vw] font-bold pl-[15px] text-black-700">
                                                            92%
                                                        </p>
                                                    </div>
                                                    <div className="w-[30%] h-[100%] flex items-center justify-center">
                                                        <ArrowUpRight color="#29d646" />
                                                    </div>
                                                </div>

                                                <div className="h-[100%] w-[100%] flex">
                                                    <div className="w-[60%] h-[100%] flex justify-end items-center">
                                                        <p className="font-Poppins text-[1.3vw] font-bold pl-[15px] text-black-700">
                                                            89%
                                                        </p>
                                                    </div>
                                                    <div className="w-[30%] h-[100%] flex items-center justify-center">
                                                        <ArrowUpRight color="#29d646" />
                                                    </div>
                                                </div>

                                                <div className="h-[100%] w-[100%] flex">
                                                    <div className="w-[60%] h-[100%] flex justify-end items-center">
                                                        <p className="font-Poppins text-[1.3vw] font-bold pl-[15px] text-black-700">
                                                            95%
                                                        </p>
                                                    </div>
                                                    <div className="w-[30%] h-[100%] flex items-center justify-center">
                                                        <ArrowUpRight color="#29d646" />
                                                    </div>
                                                </div>

                                                <div className="h-[100%] w-[100%] flex">
                                                    <div className="w-[60%] h-[100%] flex justify-end items-center">
                                                        <p className="font-Poppins text-[1.3vw] font-bold pl-[15px] text-black-700">
                                                            92%
                                                        </p>
                                                    </div>
                                                    <div className="w-[30%] h-[100%] flex items-center justify-center">
                                                        <ArrowDownLeft color="#d62929" />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className=" h-[100%] w-[100%] bg-white rounded-[15px] flex justify-center items-center">
                                <div className="w-[93%] h-[96%]">
                                    <div className="h-[12%] w-[100%] flex items-center justify-between">
                                        <div className="flex items-center justify-center">
                                            <Menu color="#29d646" />
                                            <p className="font-Poppins text-[1.3vw] text-black-700 text-[#1F3463] pl-[10px]">
                                                Claimed - Unclaimed per Course
                                            </p>

                                        </div>
                                        <div>
                                            <Dropdown label={weeklyFilter} dismissOnClick={true} className="text-[#1F3463] font-bold" style={{ backgroundColor: '#e5e7eb', height: '30px' }} >
                                                <DropdownItem onClick={() => { setWeeklyFilter("week 1") }}>week 1</DropdownItem>
                                                <DropdownItem onClick={() => { setWeeklyFilter("week 2") }}>week 2</DropdownItem>
                                                <DropdownItem onClick={() => { setWeeklyFilter("week 3") }}>week 3</DropdownItem>
                                                <DropdownItem onClick={() => { setWeeklyFilter("week 4") }}>week 4</DropdownItem>
                                            </Dropdown>
                                        </div>
                                    </div>

                                    <div className="h-[80%] w-[100%] grid grid-rows-[repeat(6, 1fr)]">
                                        <CourseClaimed programName="BSA" claimed={10} unClaimed={20} totalMeals={30} />
                                        <CourseClaimed programName="BSA" claimed={10} unClaimed={20} totalMeals={30} />
                                        <CourseClaimed programName="BSA" claimed={10} unClaimed={20} totalMeals={30} />
                                        <CourseClaimed programName="BSA" claimed={10} unClaimed={20} totalMeals={30} />
                                        <CourseClaimed programName="BSA" claimed={10} unClaimed={20} totalMeals={30} />
                                        <CourseClaimed programName="BSA" claimed={10} unClaimed={20} totalMeals={30} />
                                    </div>
                                    <div className="h-[8%] w-[100%] flex">
                                        <div className="flex w-[100%] h-[100%] flex justify-center">
                                            <div className="rounded-sm bg-[#29d646] h-5 w-5">
                                            </div>
                                            <p className="font-Poppins text-[1vw] font-semibold text-black-500 ml-1 mr-8">
                                                Claimed
                                            </p>
                                            <div className="rounded-sm bg-gray-400 h-5 w-5">
                                            </div>
                                            <p className="font-Poppins text-[1vw] font-semibold text-black-500 ml-1">
                                                Unclaimed
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" h-[100%] w-[100%] flex items-end justify-center">
                                <Chart />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}