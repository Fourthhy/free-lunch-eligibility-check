import { Dropdown, DropdownItem } from "flowbite-react"
import { ArrowUpRight, ArrowDownLeft, Menu, ChevronDown, ChevronUp } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import Chart from "./Dashboard_Components/BarChart"
import Header from "./Dashboard_Components/Header"
import { adminApi } from "../../utils/api"

export default function DashboardData() {
    // State for main filter and dropdown lists
    const [filter, setFilter] = useState("Daily");
    const [programList, setProgramList] = useState([]);
    const [performanceItemsForDropdown, setPerformanceItemsForDropdown] = useState([]);

    // State for the three data sections
    const [performanceData, setPerformanceData] = useState([]); // For the main table
    const [programBreakdown, setProgramBreakdown] = useState([]); // For the horizontal course bars
    const [programAnalytics, setProgramAnalytics] = useState([]); // For the vertical year-level chart

    // State for user selections in dropdowns
    const [selectedPerformanceItem, setSelectedPerformanceItem] = useState(null);
    const [selectedProgram, setSelectedProgram] = useState("BSIS");

    // State for UI feedback
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch programs only once when the component mounts
    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const programsRes = await adminApi.get('/programs');
                setProgramList(programsRes.data);
                if (programsRes.data.length > 0) {
                    // Set the default selected program once the list is available
                    setSelectedProgram(programsRes.data[0].name);
                }
            } catch (err) {
                console.error("Failed to fetch programs:", err);
                setError("Could not load program list.");
            }
        };
        fetchPrograms();
    }, []); // Empty dependency array ensures this runs only once

    const fetchPerformanceData = useCallback(async (period) => {
        setIsLoading(true);
        setError(null);
        try {
            const performanceRes = await adminApi.get(`/dashboard/summary?filterPeriod=${period}`);
            const formattedPerformanceData = performanceRes.data.map(item => ({ ...item, dayName: item.name }));
            setPerformanceData(formattedPerformanceData);
            setPerformanceItemsForDropdown(formattedPerformanceData);
            if (formattedPerformanceData.length > 0) {
                setSelectedPerformanceItem(formattedPerformanceData[0]);
            } else {
                setSelectedPerformanceItem(null);
            }
        } catch (err) {
            setError(err.message);
            setPerformanceData([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchBreakdownAndAnalytics = useCallback(async () => {
        // Ensure all required data is available before fetching
        if (!selectedPerformanceItem || !filter || !selectedProgram) return;

        let apiPeriod;
        switch (filter) {
            case 'Daily': apiPeriod = 'daily'; break;
            case 'Weekly': apiPeriod = 'weekly'; break;
            case 'Monthly': apiPeriod = 'monthly'; break;
            case 'Semestral': apiPeriod = 'semestral'; break;
            default: apiPeriod = 'daily';
        }

        const apiValue = selectedPerformanceItem.id;
        setIsLoading(true);
        setError(null);
        try {
            const breakdownEndpoint = `/dashboard/program-breakdown?filterPeriod=${apiPeriod}&value=${apiValue}`;
            const breakdownRes = await adminApi.get(breakdownEndpoint);
            setProgramBreakdown(breakdownRes.data.map(p => ({ ...p, name: p.program })));

            const analyticsEndpoint = `/dashboard/program-breakdown?filterPeriod=${apiPeriod}&value=${apiValue}&program=${selectedProgram}&groupBy=yearLevel`;
            const analyticsRes = await adminApi.get(analyticsEndpoint);
            setProgramAnalytics(analyticsRes.data);
        } catch (err) {
            setError(err.message);
            setProgramBreakdown([]);
            setProgramAnalytics([]);
        } finally {
            setIsLoading(false);
        }
    }, [selectedPerformanceItem, selectedProgram, filter]);

    useEffect(() => {
        fetchPerformanceData(filter);
    }, [filter, fetchPerformanceData]);

    useEffect(() => {
        fetchBreakdownAndAnalytics();
    }, [selectedPerformanceItem, selectedProgram, fetchBreakdownAndAnalytics]);


    const CourseClaimed = ({ programName, claimed, unClaimed, totalMeals }) => {
        const claimedBarWidth = totalMeals > 0 ? (claimed / totalMeals) * 100 : 0;
        const unclaimedBarWidth = totalMeals > 0 ? (unClaimed / totalMeals) * 100 : 0;

        return (
            <div className="w-[100%] h-[100%] flex justify-center">
                <div className="w-[18%] h-[100%] flex items-center justify-start"><p className="font-Poppins text-[1rem] font-semibold text-[#3D3C42]">{programName}</p></div>
                <div className="w-[82%] h-[100%] items-center flex justify-center flex-col">
                    <div className="w-full h-3 flex items-center overflow-y-hidden"><div className="bg-[#16C098] h-[1.11vh]" style={{ width: `${claimedBarWidth}%` }}></div><div className="font-Poppins text-[0.68rem] font-semibold text-black-500 ml-2">{claimedBarWidth.toFixed(2)}%</div></div>
                    <div className="w-full h-3 flex items-center overflow-y-hidden"><div className="bg-[#D9D9D9] h-[1.11vh]" style={{ width: `${unclaimedBarWidth}%` }}></div><div className="font-Poppins text-[0.68rem] font-semibold text-black-500 ml-2">{unclaimedBarWidth.toFixed(2)}%</div></div>
                </div>
            </div>
        )
    };



    return (
        <div className="w-[100%] h-[100%]">
            <div className="h-[10%] w-[100%]"><Header pageName={"Dashboard"} /></div>
            <div className="h-[90%] w-[100%]">
                <div className="h-[98%] w-[100%] flex items-center justify-center">
                    <div className="grid grid-cols-2 grid-rows-2 h-[100%] w-[95%] gap-2">
                        <div className="col-span-2 row-span-1 h-[100%] w-[100%] flex flex-col items-center justify-center bg-white rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.10)]">
                            <div className="w-[97%] h-[97%] flex flex-col">
                                <div className="flex justify-between w-[100%] h-[15%]">
                                    <div className="flex items-center"><p className="font-Poppins text-black text-[0.9rem] font-light overflow white-space text-overflow pl-[15px]">This table shows the {filter} insights</p></div>
                                    <div>
                                        <Dropdown
                                            renderTrigger={() => (
                                                <div
                                                    className="bg-[#e5e7eb] h-[30px] min-w-[15vh] max-w-auto rounded-[10px] flex items-center justify-between text-[#1A2B88] font-bold gap-2 cursor-pointer hover:bg-gray-300">
                                                    <span className="pl-[10px]">
                                                        {filter}
                                                    </span>
                                                    <ChevronDown color="#1A2B88" size={25} className="pr-[10px]" />
                                                </div>)}
                                            label=""
                                            dismissOnClick={true}
                                            className="text-[#1A2B88] font-bold">
                                            <DropdownItem onClick={() => setFilter("Daily")}><span className="text-[#1A2B88]">Daily</span></DropdownItem>
                                            <DropdownItem onClick={() => setFilter("Weekly")}><span className="text-[#1A2B88]">Weekly</span></DropdownItem>
                                            <DropdownItem onClick={() => setFilter("Monthly")}><span className="text-[#1A2B88]">Monthly</span></DropdownItem>
                                            <DropdownItem onClick={() => setFilter("Semestral")}><span className="text-[#1A2B88]">Semestral</span></DropdownItem>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="border-[1px] h-[28.55vh] border-[#D9D9D9] flex-1 rounded-[15px] overflow-y-auto">
                                    {isLoading && !performanceData.length ? (
                                        <p className="text-center p-4">Loading data...</p>
                                    ) : error ? (
                                        <p className="text-center p-4 text-red-500">Error: {error}</p>
                                    ) : (
                                        <div className="w-[100%] flex flex-col">
                                            <div className="w-[100%] h-[5.71vh] flex items-center justify-center sticky top-0 bg-white z-0"><div className="w-[20%] h-[100%] flex items-center justify-center"><span className="text-[1rem] font-semibold font-Poppins text-[#1F3463]">Total Of</span></div><div className="w-[80%] h-[100%] grid grid-cols-5 grid-rows-1 "><div className="flex items-center justify-center"><span className="text-[1rem] font-semibold font-Poppins text-[#1F3463]">Claimed</span></div><div className="flex items-center justify-center "><span className="text-[1rem] font-semibold font-Poppins text-[#1F3463]">Percentage</span></div><div className="flex items-center justify-center "><span className="text-[1rem] font-semibold font-Poppins text-[#1F3463]">Unclaimed</span></div><div className="flex items-center justify-center "><span className="text-[1rem] font-semibold font-Poppins text-[#1F3463]">Percentage</span></div><div className="flex items-center justify-center "><span className="text-[1rem] font-semibold font-Poppins text-[#1F3463]">Allotted Meal</span></div></div></div>
                                            {performanceData.map((item, index) => {
                                                const previousDay = index > 0 ? performanceData[index - 1] : null;
                                                return (
                                                    <div className="w-[100%] h-[5.71vh] flex items-center justify-center" key={item.id}>
                                                        <div className="w-[20%] h-[100%] flex items-center justify-center">
                                                            <div className="w-[45%] flex justify-start overflow-visible">
                                                                <span className="text-[1rem] font-medium font-Poppins text-[#3D3C42] whitespace-nowrap">
                                                                    {item.dayName}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="w-[80%] h-[100%] grid grid-cols-5 grid-rows-1">
                                                            <div className="flex items-center justify-center w-[100%]"><div className="w-[30%] h-[100%] flex items-center justify-center"><span className="text-[1rem] font-semibold font-Poppins text-black">{item.claimed}</span></div><div>{previousDay && item.claimed > previousDay.claimed ? <ArrowUpRight color="#16c098" /> : <ArrowDownLeft color="#ea4242" />}</div></div>
                                                            <div className="flex items-center justify-center"><span className="text-[1rem] font-semibold font-Poppins text-black">{(item.allotted > 0 ? (item.claimed / item.allotted * 100) : 0).toFixed(2)}%</span></div>
                                                            <div className="flex items-center justify-center w-[100%]"><div className="w-[30%] h-[100%] flex items-center justify-center"><span className="text-[1rem] font-semibold font-Poppins text-black">{item.unclaimed}</span></div>{previousDay && item.unclaimed > previousDay.unclaimed ? <ArrowUpRight color="#16c098" /> : <ArrowDownLeft color="#ea4242" />}</div>
                                                            <div className="flex items-center justify-center"><span className="text-[1rem] font-semibold font-Poppins text-black">{(item.allotted > 0 ? (item.unclaimed / item.allotted * 100) : 0).toFixed(2)}%</span></div>
                                                            <div className="flex items-center justify-center w-[100%]"><div className="w-[30%] h-[100%] flex items-center justify-center"><span className="text-[1rem] font-semibold font-Poppins text-black">{item.allotted}</span></div>{previousDay && item.allotted > previousDay.allotted ? <ArrowUpRight color="#16c098" /> : <ArrowDownLeft color="#ea4242" />}</div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="p-2 h-[100%] w-[100%] bg-white rounded-[15px] flex justify-center items-center shadow-[0_4px_4px_rgba(0,0,0,0.10)]">
                            <div className="w-[93%] h-[96%]">
                                <div className="h-[12%] w-[100%] flex items-center justify-between">
                                    <div className="flex items-center justify-center"><Menu color="#16C098" /><p className="font-Poppins text-[1rem] font-medium text-[#1F3463] pl-[10px]">Claimed - Unclaimed per Course</p></div>
                                    <div>
                                        <Dropdown label={selectedPerformanceItem?.dayName || 'Select...'} placement="bottom" dismissOnClick={true} className="text-[#1A2B88] font-bold" style={{ backgroundColor: '#e5e7eb', height: '30px' }} >
                                            <div className="max-h-[30vh] overflow-y-auto custom-scrollbar">{performanceItemsForDropdown.map((item) => (<DropdownItem key={item.id} onClick={() => setSelectedPerformanceItem(item)}><span className="text-[#1A2B88]">{item.dayName}</span></DropdownItem>))}</div>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="h-[80%] w-[100%] grid grid-rows-[repeat(6, 1fr)]">{programBreakdown.map((item, index) => (<CourseClaimed key={index} programName={item.name} claimed={item.claimed} unClaimed={item.unclaimed} totalMeals={item.allotted} />))}</div>
                                <div className="h-[8%] w-[100%] flex items-center"><div className="flex w-[100%] h-[100%] flex justify-center"><div className="rounded-sm bg-[#16C098] h-4 w-4"></div><p className="font-Poppins text-[0.8rem] font-semibold text-black-500 ml-1 mr-8">Claimed</p><div className="rounded-sm bg-[#D9D9D9] h-4 w-4"></div><p className="font-Poppins text-[0.8rem] font-semibold text-black-500 ml-1">Unclaimed</p></div></div>
                            </div>
                        </div>
                        <div className="h-full w-full flex flex-col items-center justify-end bg-white rounded-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.10)]">
                            <div className="h-[15%] w-[95%] flex items-center justify-between">
                                <div className="flex items-center justify-center"><img src="/Financial Growth Analysis.svg" alt="" /><p className="font-Poppins text-[1rem] font-medium text-[#1F3463] pl-[10px]">Analytics and Difference</p></div>
                                <div>
                                    <Dropdown label={selectedProgram} dismissOnClick={true} className="text-[#1A2B88] font-bold" style={{ backgroundColor: '#e5e7eb', height: '30px' }} >
                                        {programList.map(p => (<DropdownItem key={p._id} onClick={() => setSelectedProgram(p.name)}><span className="text-[#1A2B88]">{p.name}</span></DropdownItem>))}
                                    </Dropdown>
                                </div>
                            </div>
                            <div className="h-[75%] w-[100%] flex items-end justify-center">
                                <Chart data={programAnalytics} />
                            </div>
                            <div className="h-[10%] w-[100%] flex items-end justify-center"><div className="flex w-[100%] h-[100%] flex justify-center"><div className="rounded-sm bg-[#5594E2] h-4 w-4"></div><p className="font-Poppins text-[0.8rem] font-semibold text-black-500 ml-1 mr-8">Claimed</p><div className="rounded-sm bg-[#1F3463] h-4 w-4"></div><p className="font-Poppins text-[0.8rem] font-semibold text-black-500 ml-1">Unclaimed</p></div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}