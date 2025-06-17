import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IoIosCheckbox } from "react-icons/io";
import { AiFillCloseSquare } from "react-icons/ai";
import { Dropdown, DropdownItem } from "flowbite-react";
import Header from "./Dashboard_Components/Header";
import { adminApi } from '../../utils/api';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => { setDebouncedValue(value); }, delay);
        return () => { clearTimeout(handler); };
    }, [value, delay]);
    return debouncedValue;
};

export default function MealRecordHistory() {
    const [programs, setPrograms] = useState([]);
    const [displayData, setDisplayData] = useState({ dates: [], studentRecords: [] });
    
    const [filters, setFilters] = useState({
        program: '',
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        page: 1,
        limit: 8,
    });
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPrograms = useCallback(async () => {
        try {
            const res = await adminApi.get('/programs');
            setPrograms(res.data);
            if (res.data.length > 0 && !filters.program) {
                setFilters(prev => ({ ...prev, program: res.data[0].name }));
            }
        } catch (err) { console.error("Failed to fetch programs", err); }
    }, [filters.program]);

    const fetchMealRecords = useCallback(async () => {
        if (!filters.program) return;
        setIsLoading(true);
        setError(null);
        
        try {
            const monthQuery = `${filters.year}-${String(filters.month + 1).padStart(2, '0')}`;
            const query = `?month=${monthQuery}&program=${filters.program}&searchStudentName=${debouncedSearchTerm}&page=${filters.page}&limit=${filters.limit}`;
            
            const res = await adminApi.get(`/meal-records${query}`);
            
            const daysInMonth = new Date(filters.year, filters.month + 1, 0).getDate();
            const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

            const studentRecords = res.data.reduce((acc, record) => {
                const studentId = record.student?._id;
                if (!studentId) return acc;
                if (!acc[studentId]) {
                    acc[studentId] = { id: studentId, name: record.student.name, claims: {} };
                }
                const date = new Date(record.dateChecked).getUTCDate();
                acc[studentId].claims[date] = record.status === 'CLAIMED';
                return acc;
            }, {});

            setDisplayData({ dates, studentRecords: Object.values(studentRecords) });
            setPagination(res.pagination);

        } catch (err) {
            setError(err.message);
            setDisplayData({ dates: [], studentRecords: [] });
        } finally {
            setIsLoading(false);
        }
    }, [filters.program, filters.month, filters.year, filters.page, filters.limit, debouncedSearchTerm]);

    useEffect(() => { fetchPrograms(); }, [fetchPrograms]);
    useEffect(() => { fetchMealRecords(); }, [fetchMealRecords]);

    const handleFilterChange = (key, value) => setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const goToPage = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= pagination.totalPages) {
            setFilters(prev => ({ ...prev, page: pageNumber }));
        }
    };

    return (
        <div className="h-[100%] w-[100%]">
            <div className="h-[10%]">
                <Header pageName={"Meal History"} showSearch={true} searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            </div>
            <div className="h-[90%] w-[100%] flex items-center justify-center">
                <div className="w-[74.80vw] h-[84.77vh] border-[1px] border-gray-200 rounded-[10px] bg-white flex items-center justify-center">
                    <div className="h-[93%] w-[95%]">
                        <div className="w-[100%] h-[8%] flex justify-between items-start">
                            <p className="text-[0.875rem] font-Poppins text-[#292D32] font-medium">This table shows the claimed and unclaimed meal record of LVCC students.</p>
                            <div className="flex">
                                <Dropdown label={<span className="text-[#1A2B88] font-Poppins font-semibold text-[0.875rem]">{filters.program || 'Program'}</span>} dismissOnClick={true} style={{ backgroundColor: '#F6F6F6', height: '30px' }}>
                                    {programs.map((program) => (
                                        <DropdownItem key={program._id} onClick={() => handleFilterChange('program', program.name)}><span className="text-[0.95rem] font-semibold font-Poppins text-[#1A2B88]">{program.name}</span></DropdownItem>))}
                                </Dropdown>
                                <Dropdown label={<span className="text-[#1A2B88] font-Poppins font-semibold text-[0.875rem]">{monthNames[filters.month]}</span>} dismissOnClick={true} className="ml-[15px]" style={{ backgroundColor: '#F6F6F6', height: '30px' }}>
                                    {monthNames.map((month, index) => (<DropdownItem key={month} onClick={() => handleFilterChange('month', index)}><span className="text-[0.95rem] font-semibold font-Poppins text-[#1A2B88]">{month}</span></DropdownItem>))}
                                </Dropdown>
                            </div>
                        </div>
                        <div className="h-[88%] w-[100%] overflow-x-auto">
                            <div className="h-[12%] w-max min-w-full border-gray-400 border-1 flex flex-nowrap">
                                <div className="border-r border-b border-t border-gray-200 flex-shrink-0 w-[190px] h-[100%] flex items-center pl-[25px] justify-start"><p className="text-[#1F3463] text-[1rem] font-bold font-Poppins">Students name</p></div>
                                {displayData.dates.map((date) => (<div key={date} className="h-[100%] w-[55px] border-r border-b border-t border-gray-200 flex items-center justify-center"><p className="text-[1rem] text-[#1F3463] font-semibold font-Poppins">{date}</p></div>))}
                            </div>
                            <div className="h-[88%] w-max min-w-full flex flex-col justify-evenly">
                                {isLoading ? (<div className="flex justify-center items-center h-full"><p>Loading records...</p></div>) : error ? (<div className="flex justify-center items-center h-full text-red-500"><p>{error}</p></div>) : displayData.studentRecords.length > 0 ? (
                                    displayData.studentRecords.map((student, index) => (
                                        <div key={student.id} className="flex flex-nowrap w-[100%] h-[100%] border-b border-gray-200">
                                            <div className="flex-shrink-0 w-[190px] h-[100%] border-r border-gray-200 flex items-center justify-start pl-[25px]"><p className="text-[0.90rem] font-Poppins font-medium text-black">{index + 1 + (filters.page - 1) * filters.limit}. {student.name}</p></div>
                                            {displayData.dates.map(date => (
                                                <div key={`${student.id}-${date}`} className="flex-shrink-0 w-[55px] h-[100%] border-r border-gray-200 flex items-center justify-center">
                                                    {student.claims[date] ? (<IoIosCheckbox color="#16c098" size="1.875rem" />) : (<AiFillCloseSquare color="#ed5b5a" size="1.875rem" />)}
                                                </div>
                                            ))}
                                        </div>
                                    ))
                                ) : (<div className="flex justify-center items-center h-full"><p>No records found for the selected criteria.</p></div>)}
                            </div>
                        </div>
                        <div className="h-[6%] w-[100%] flex justify-between mt-1">
                            <div className="bg-[#F6F6F6] rounded-[10px] h-[30px] px-3 w-auto flex items-center justify-center ml-[40px] cursor-pointer hover:bg-gray-200" onClick={() => goToPage(filters.page - 1)}><ChevronLeft size="1.1vw" /><span className="text-[0.9rem] font-Poppins text-[#292D32] font-Regular ml-2">Previous</span></div>
                            <span className="self-center text-sm">Page {pagination.currentPage} of {pagination.totalPages || 1}</span>
                            <div className="bg-[#F6F6F6] rounded-[10px] h-[30px] px-3 w-auto flex items-center justify-center mr-[50px] cursor-pointer hover:bg-gray-200" onClick={() => goToPage(filters.page + 1)}><span className="text-[0.9rem] font-Poppins text-[#292D32] font-regular mr-2">Next</span><ChevronRight size="1.1vw" /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}