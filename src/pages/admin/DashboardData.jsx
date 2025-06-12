import { Dropdown, DropdownItem, Progress } from "flowbite-react"
import { ArrowUpRight, ArrowDownLeft, Menu } from "lucide-react"
import { useState, useEffect } from "react"
import Chart from "./Dashboard_Components/BarChart"
import Header from "./Dashboard_Components/Header"

import daily from "../../sample-data/daily.json"
import weekly from "../../sample-data/weekly.json"
import monthly from "../../sample-data/monthly.json"
import semestral from "../../sample-data/semestral.json"

import monday from "../../sample-data/barData_Daily/monday.json"
import tuesday from "../../sample-data/barData_Daily/tuesday.json"
import wednesday from "../../sample-data/barData_Daily/wednesday.json"
import thursday from "../../sample-data/barData_Daily/thursday.json"
import friday from "../../sample-data/barData_Daily/friday.json"

import week1 from "../../sample-data/barData_Weekly/week1.json"
import week2 from "../../sample-data/barData_Weekly/week2.json"
import week3 from "../../sample-data/barData_Weekly/week3.json"
import week4 from "../../sample-data/barData_Weekly/week4.json"

import january from "../../sample-data/barData_Monthly/january.json"
import february from "../../sample-data/barData_Monthly/february.json"
import march from "../../sample-data/barData_Monthly/march.json"
import april from "../../sample-data/barData_Monthly/april.json"
import may from "../../sample-data/barData_Monthly/may.json"
import june from "../../sample-data/barData_Monthly/june.json"
import july from "../../sample-data/barData_Monthly/july.json"
import august from "../../sample-data/barData_Monthly/august.json"
import september from "../../sample-data/barData_Monthly/september.json"
import october from "../../sample-data/barData_Monthly/october.json"
import november from "../../sample-data/barData_Monthly/november.json"
import december from "../../sample-data/barData_Monthly/december.json"

import semester1 from "../../sample-data/barData_Semestral/semester1.json"
import semester2 from "../../sample-data/barData_Semestral/semester2.json"

import bsisDataBreakdown from "../../sample-data/dataBreakdown/bsis.json"
import bsswDataBreakdown from "../../sample-data/dataBreakdown/bssw.json"
import babDataBreakdown from "../../sample-data/dataBreakdown/bab.json"
import bsaisDataBreakdown from "../../sample-data/dataBreakdown/bsais.json"
import bsaDataBreakdown from "../../sample-data/dataBreakdown/bsa.json"
import actDataBreakdown from "../../sample-data/dataBreakdown/act.json"

export default function DashboardData() {
    const filterOptionsDaily = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const filterOptionsWeekly = ["week 1", "week 2", "week 3", "week 4"];
    const filterOptionsMonthly = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const filterOptionsSemestral = ["1st Sem", "2nd Sem"];

    const [filter, setFilter] = useState("Daily");
    const [dataFilter, setDataFilter] = useState(daily);
    const [barGroup, setBarGroup] = useState("Monday");
    const [barData, setBarData] = useState(monday)
    const [weeklyBarFilter, setWeeklyBarFilter] = useState(filterOptionsDaily);
    const [programFilter, setProgramFilter] = useState("BSIS");
    const [chartData, setChartData] = useState(bsisDataBreakdown);
    const [isLoading, setIsLoading] = useState(false);



    const handleSelectFilterChange = (filter) => {
        setFilter(filter);
        switch (filter) {
            case "Daily":
                setDataFilter(daily);
                setWeeklyBarFilter(filterOptionsDaily);
                setBarGroup(filterOptionsDaily[0]);
                break;
            case "Weekly":
                setDataFilter(weekly);
                setWeeklyBarFilter(filterOptionsWeekly);
                setBarGroup(filterOptionsWeekly[0]);
                break;
            case "Monthly":
                setDataFilter(monthly);
                setWeeklyBarFilter(filterOptionsMonthly);
                setBarGroup(filterOptionsMonthly[0]);
                break;
            case "Semestral":
                setDataFilter(semestral);
                setWeeklyBarFilter(filterOptionsSemestral);
                setBarGroup(filterOptionsSemestral[0]);
                break;
            default:
                setDataFilter([]);
        }
        console.log(filter);
    };

    const updateChartData = async (selectedProgram) => {
        try {
            setIsLoading(true);
            let data;
            switch (selectedProgram) {
                case "BSIS":
                    data = bsisDataBreakdown;
                    break;
                case "BSSW":
                    data = bsswDataBreakdown;
                    break;
                case "BSAIS":
                    data = bsaisDataBreakdown;
                    break;
                case "BSA":
                    data = bsaDataBreakdown;
                    break;
                case "BAB":
                    data = babDataBreakdown;
                    break;
                case "ACT":
                    data = actDataBreakdown;
                    break;
                default:
                    data = null;
            }
            setChartData(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error loading chart data:", error);
            setChartData(null);
        }
    };

    useEffect(() => {
        updateChartData(programFilter);
    }, [programFilter]);

    useEffect(() => {
        updateBarData(barGroup)
    }, [barGroup])

    const updateBarData = (selectedWeek) => {
        let data;
        switch (selectedWeek) {
            case "Monday":
                data = monday;
                break;
            case "Tuesday":
                data = tuesday;
                break;
            case "Wednesday":
                data = wednesday;
                break;
            case "Thursday":
                data = thursday;
                break;
            case "Friday":
                data = friday;
                break;
            case "week 1":
                data = week1;
                break;
            case "week 2":
                data = week2;
                break;
            case "week 3":
                data = week3;
                break;
            case "week 4":
                data = week4;
                break;
            case "January":
                data = january;
                break;
            case "February":
                data = february;
                break;
            case "March":
                data = march;
                break;
            case "April":
                data = april;
                break;
            case "May":
                data = may;
                break;
            case "June":
                data = june;
                break;
            case "July":
                data = july;
                break;
            case "August":
                data = august;
                break;
            case "September":
                data = september;
                break;
            case "October":
                data = october;
                break;
            case "November":
                data = november;
                break;
            case "December":
                data = december;
                break;
            case "1st semester":
                data = semester1;
                break;
            case "2nd semester":
                data = semester2;
                break;
            default:
                data = null;
        }
        setBarData(data);
    }


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

                {/* <div className="h-[10%] w-[100%]">
                    <Header pageName={"Dashboard"} />
                </div> */}

                <div className="h-[100%] w-[100%]">
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
                                                            <span className="text-[1rem] font-medium font-Poppins text-[#A4A4A4]">
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
                                            <Dropdown label={barGroup} placement="bottom" dismissOnClick={true} className="text-[#1F3463] font-bold" style={{ backgroundColor: '#e5e7eb', height: '30px' }} >
                                                {/* Change h-[30vh] to max-h-[30vh] */}
                                                <div className="max-h-[30vh] overflow-y-auto custom-scrollbar">
                                                    {weeklyBarFilter.map((item) => (
                                                        <div key={item}>
                                                            <DropdownItem onClick={() => { setBarGroup(item) }}>{item}</DropdownItem>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Dropdown>
                                        </div>
                                    </div>

                                    <div className="h-[80%] w-[100%] grid grid-rows-[repeat(6, 1fr)]">
                                        {barData.map((item) => (
                                            <CourseClaimed
                                                programName={item.name}
                                                claimed={item.claimed}
                                                unClaimed={item.unclaimed}
                                                totalMeals={item.allotted}
                                            />
                                        ))}
                                    </div>
                                    <div className="h-[8%] w-[100%] flex items-center">
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
                                            <DropdownItem onClick={() => { setProgramFilter("BAB") }}>BAB</DropdownItem>
                                            <DropdownItem onClick={() => { setProgramFilter("BSAIS") }}>BSAIS</DropdownItem>
                                            <DropdownItem onClick={() => { setProgramFilter("BSSW") }}>BSSW</DropdownItem>
                                            <DropdownItem onClick={() => { setProgramFilter("ACT") }}>ACT</DropdownItem>
                                            <DropdownItem onClick={() => { setProgramFilter("BSA") }}>BSA</DropdownItem>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="h-[75%] w-[100%] flex items-end justify-center">
                                    {chartData && !isLoading && <Chart data={chartData} />}
                                    {isLoading === true && <p>Loading chart data...</p>}
                                </div>
                                <div className="h-[10%] w-[100%] flex items-end justify-center">
                                    <div className="flex w-[100%] h-[100%] flex justify-center">
                                        <div className="rounded-sm bg-[#5594E2] h-4 w-4"></div>
                                        <p className="font-Poppins text-[0.8rem] font-semibold text-black-500 ml-1 mr-8">
                                            Claimed
                                        </p>
                                        <div className="rounded-sm bg-[#1F3463] h-4 w-4">
                                        </div>
                                        <p className="font-Poppins text-[0.8rem] font-semibold text-black-500 ml-1">
                                            Unclaimed
                                        </p>
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