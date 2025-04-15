import { Dropdown, DropdownItem, Progress } from "flowbite-react"
import { ArrowUpRight, ArrowDownLeft, Menu } from "lucide-react"
import { useState } from "react"

import Chart from "./Dashboard_Components/BarChart"
import Header from "./Dashboard_Components/Header"

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

                <div className="h-[10%]">
                    <Header pageName={"Dashboard"}/>
                </div>

                <div className="h-[90%] flex items-center justify-center">
                    <div className="h-[96%] w-[96%]">
                        <div className="grid grid-cols-2 grid-rows-2 h-[100%] w-[100%] gap-2">

                            <div className="col-span-2 row-span-1 h-[100%] w-[100%] flex flex-col items-center justify-center bg-white rounded-[15px] shadow-sm shadow-gray-200">
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

                            <div className=" h-[100%] w-[100%] bg-white rounded-[15px] flex justify-center items-center shadow-sm shadow-gray-200">
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

                            <div className=" h-[100%] w-[100%] flex items-end justify-center bg-white rounded-[10px] shadow-sm shadow-gray-200">
                                <Chart />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}