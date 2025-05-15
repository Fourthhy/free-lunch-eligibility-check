import { Dropdown, DropdownItem, Progress } from "flowbite-react"
import { ArrowUpRight, ArrowDownLeft, Menu } from "lucide-react"
import { useState, useEffect } from "react"
import Chart from "./Dashboard_Components/BarChart"
import Header from "./Dashboard_Components/Header"

import daily from "../../sample-data/daily.json"
import weekly from "../../sample-data/weekly.json"
import monthly from "../../sample-data/monthly.json"
import semestral from "../../sample-data/semestral.json"
import programsReport from "../../sample-data/programsReport.json"

export default function DashboardData() {

    const [filter, setFilter] = useState("Daily");
    const [dataFilter, setDataFilter] = useState(daily);
    const [weeklyFilter, setWeeklyFilter] = useState("week 1");
    const [programFilter, setProgramFilter] = useState("BSIS");
    const [chartData, setChartData] = useState();

    const handleSelectFilterChange = (filter) => {
        setFilter(filter);
        switch (filter) {
            case "Daily":
                setDataFilter(daily); break;
            case "Weekly":
                setDataFilter(weekly); break;
            case "Monthly":
                setDataFilter(monthly); break;
            case "Semestral":
                setDataFilter(semestral); break;
            default:
                setDataFilter([]);
        }
    };

    const updateChartData = async (selectedProgram) => {
        const dataModule = await import(`../../sample-data/dataBreakdown/${selectedProgram.toLowerCase()}.json`);
        setChartData(dataModule.default); // dataModule.default will now be the array
    };

    useEffect(() => {
        updateChartData(programFilter);
    }, [programFilter]);


    const CourseClaimed = ({ programName, claimed, unClaimed, totalMeals }) => {
        const claimedBarWidth = (claimed / totalMeals) * 100;
        const unclaimedBarWidth = (unClaimed / totalMeals) * 100;

        return (
            <>
                <div className="w-[100%] h-[100%] flex justify-center">
                    <div className="w-[18%] h-[100%] flex items-center justify-center">
                        <p className="font-Poppins text-[1rem] font-semibold text-[#A4A4A4]">
                            {programName}
                        </p>
                    </div>
                    <div className="w-[82%] h-[100%] items-center flex justify-center flex-col">

                        <div className="w-full h-3 flex items-center overflow-y-hidden">
                            <div className="bg-[#16C098] h-[1.11vh]" style={{ width: `${claimedBarWidth}%` }}></div>
                            <div className="font-Poppins text-[0.68rem] font-semibold text-black-500 ml-2">
                                {claimedBarWidth.toFixed(2)}%
                            </div>
                        </div>

                        <div className="w-full h-3 flex items-center overflow-y-hidden">
                            <div className="bg-[#D9D9D9] h-[1.11vh]" style={{ width: `${unclaimedBarWidth}%` }}></div>
                            <div className="font-Poppins text-[0.68rem] font-semibold text-black-500 ml-2">
                                {unclaimedBarWidth.toFixed(2)}%
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="w-[100%] h-[100%]">

                <div className="h-[10%] w-[100%]">
                    <Header pageName={"Dashboard"} />
                </div>

                <div className="h-[90%] w-[100%]">
                    <div className="h-[98%] w-[100%] flex items-center justify-center">
                        <div className="grid grid-cols-2 grid-rows-2 h-[100%] w-[95%] gap-2">

                            <div className="col-span-2 row-span-1 h-[100%] w-[100%] flex flex-col items-center justify-center bg-white rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.10)]">
                                <div className="w-[97%] h-[97%] flex flex-col">
                                    <div className="flex justify-between w-[100%] h-[15%]">
                                        <div className="flex items-center">
                                            <p className="font-Poppins text-black text-[0.9rem] font-light overflow white-space text-overflow pl-[15px]">
                                                This table shows the {filter} insights
                                            </p>
                                        </div>
                                        <div>
                                            <Dropdown label={filter} dismissOnClick={true} className="text-[#1F3463] font-bold" style={{ backgroundColor: '#e5e7eb', height: '30px' }} >
                                                <DropdownItem onClick={() => { handleSelectFilterChange("Daily") }}>Daily</DropdownItem>
                                                <DropdownItem onClick={() => { handleSelectFilterChange("Weekly") }}>Weekly</DropdownItem>
                                                <DropdownItem onClick={() => { handleSelectFilterChange("Monthly") }}>Monthly</DropdownItem>
                                                <DropdownItem onClick={() => { handleSelectFilterChange("Semestral") }}>Semestral</DropdownItem>
                                            </Dropdown>
                                        </div>
                                    </div>
                                    <div className="border-[1px] h-[28.55vh] border-[#D9D9D9] flex-1 rounded-[15px] overflow-y-auto">
                                        <div className="w-[100%] flex flex-col">

                                            <div className="w-[100%] h-[5.71vh] flex items-center justify-center ">
                                                <div className="w-[20%] h-[100%] flex items-center justify-center">
                                                    <span className="text-[1rem] font-semibold font-Poppins text-[#1F3463]">
                                                        Total Of
                                                    </span>
                                                </div>
                                                <div className="w-[80%] h-[100%] grid grid-cols-6 grid-rows-1 "> {/*border-b-[1px] border-[#D9D9D9] bottom border stlye*/}
                                                    <div className="flex items-center justify-center">
                                                        <span className="text-[1rem] font-semibold font-Poppins text-[#1F3463]">
                                                            Claimed
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-center ">
                                                        <span className="text-[1rem] font-semibold font-Poppins text-[#1F3463]">
                                                            Percentage
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-center ">
                                                        <span className="text-[1rem] font-semibold font-Poppins text-[#1F3463]">
                                                            Unclaimed
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-center ">
                                                        <span className="text-[1rem] font-semibold font-Poppins text-[#1F3463]">
                                                            Percentage
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-center ">
                                                        <span className="text-[1rem] font-semibold font-Poppins text-[#1F3463]">
                                                            Allotted Meal
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-center ">
                                                        <span className="text-[1rem] font-semibold font-Poppins text-[#1F3463]">
                                                            Percentage
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/*Daily is subject to change*/}
                                            {dataFilter.map((item, index) => {
                                                // Get the previous day's data if it exists
                                                const previousDay = index > 0 ? dataFilter[index - 1] : null;

                                                return (
                                                    <div className="w-[100%] h-[5.71vh] flex items-center justify-center" key={item.id}>

                                                        <div className="w-[20%] h-[100%] flex items-center justify-center">
                                                            <span className="text-[1rem] font-semibold font-Poppins text-[#A4A4A4]">
                                                                {item.dayName}
                                                            </span>
                                                        </div>

                                                        <div className="w-[80%] h-[100%] grid grid-cols-6 grid-rows-1">

                                                            <div className="flex items-center justify-center w-[100%]">
                                                                <div className="w-[30%] h-[100%] flex items-center justify-center">
                                                                    <span className="text-[1rem] font-semibold font-Poppins text-black">
                                                                        {item.claimed}
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    {previousDay && item.claimed > previousDay.claimed ? (
                                                                        <ArrowUpRight color="#16c098" />
                                                                    ) : (
                                                                        <ArrowDownLeft color="#ea4242" />
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center justify-center">
                                                                <span className="text-[1rem] font-semibold font-Poppins text-black">
                                                                    {(item.claimed / item.allotted * 100).toFixed(2)}%
                                                                </span>
                                                            </div>

                                                            <div className="flex items-center justify-center w-[100%]">
                                                                <div className="w-[30%] h-[100%] flex items-center justify-center">
                                                                    <span className="text-[1rem] font-semibold font-Poppins text-black">
                                                                        {item.unclaimed}
                                                                    </span>
                                                                </div>
                                                                {previousDay && item.unclaimed > previousDay.unclaimed ? (
                                                                    <ArrowUpRight color="#16c098" />
                                                                ) : (
                                                                    <ArrowDownLeft color="#ea4242" />
                                                                )}
                                                            </div>

                                                            <div className="flex items-center justify-center">
                                                                <span className="text-[1rem] font-semibold font-Poppins text-black">
                                                                    {(item.unclaimed / item.allotted * 100).toFixed(2)}%
                                                                </span>
                                                            </div>

                                                            <div className="flex items-center justify-center w-[100%]">
                                                                <div className="w-[30%] h-[100%] flex items-center justify-center">
                                                                    <span className="text-[1rem] font-semibold font-Poppins text-black">
                                                                        {item.allotted}
                                                                    </span>
                                                                </div>
                                                                {previousDay && item.allotted > previousDay.allotted ? (
                                                                    <ArrowUpRight color="#16c098" />
                                                                ) : (
                                                                    <ArrowDownLeft color="#ea4242" />
                                                                )}
                                                            </div>

                                                            <div className="flex items-center justify-center">
                                                                <span className="text-[1rem] font-semibold font-Poppins text-black">
                                                                    100%
                                                                </span>
                                                            </div>
                                                        </div>

                                                    </div>
                                                );
                                            })}

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-2 h-[100%] w-[100%] bg-white rounded-[15px] flex justify-center items-center shadow-[0_4px_4px_rgba(0,0,0,0.10)]">
                                <div className="w-[93%] h-[96%]">
                                    <div className="h-[12%] w-[100%] flex items-center justify-between">
                                        <div className="flex items-center justify-center">
                                            <Menu color="#16C098" />
                                            <p className="font-Poppins text-[1rem] font-medium text-[#1F3463] pl-[10px]">
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
                                        {programsReport.map((prog) => (
                                            <CourseClaimed programName={prog.name} claimed={prog.claimed} unClaimed={prog.unclaimed} totalMeals={prog.allotted} />
                                        ))}
                                    </div>
                                    <div className="h-[8%] w-[100%] flex">
                                        <div className="flex w-[100%] h-[100%] flex justify-center">
                                            <div className="rounded-sm bg-[#16C098] h-4 w-4"></div>
                                            <p className="font-Poppins text-[0.8rem] font-semibold text-black-500 ml-1 mr-8">
                                                Claimed
                                            </p>
                                            <div className="rounded-sm bg-[#D9D9D9] h-4 w-4">
                                            </div>
                                            <p className="font-Poppins text-[0.8rem] font-semibold text-black-500 ml-1">
                                                Unclaimed
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="h-full w-full flex flex-col items-center justify-end bg-white rounded-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.10)]">
                                <div className="h-[15%] w-[95%] flex items-center justify-between">
                                    <div className="flex items-center justify-center">
                                        <img src="/Financial Growth Analysis.svg" alt="" />
                                        <p className="font-Poppins text-[1rem] font-medium text-[#1F3463] pl-[10px]">
                                            Analytics and Difference
                                        </p>
                                    </div>
                                    <div>
                                        <Dropdown label={programFilter} dismissOnClick={true} className="text-[#1F3463] font-bold" style={{ backgroundColor: '#e5e7eb', height: '30px' }} >
                                            <DropdownItem onClick={() => { setProgramFilter("BSIS") }}>BSIS</DropdownItem>
                                            <DropdownItem onClick={() => { setProgramFilter("BSSW") }}>BSSW</DropdownItem>
                                            <DropdownItem onClick={() => { setProgramFilter("BAB") }}>BAB</DropdownItem>
                                            <DropdownItem onClick={() => { setProgramFilter("BSAIS") }}>BSAIS</DropdownItem>
                                            <DropdownItem onClick={() => { setProgramFilter("BSA") }}>BSA</DropdownItem>
                                            <DropdownItem onClick={() => { setProgramFilter("ACT") }}>ACT</DropdownItem>
                                        </Dropdown>
                                    </div>
                                </div>
                                {chartData && <Chart data={chartData} />}
                                {!chartData && <p>Loading chart data...</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}