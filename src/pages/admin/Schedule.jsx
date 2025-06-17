import { useState, useEffect, useCallback } from "react";
import { Button, Dropdown, DropdownItem, Modal, ModalBody } from "flowbite-react";
import { X, TriangleAlert } from "lucide-react";
import { RiPencilFill, RiArrowDropDownLine } from "react-icons/ri";
import { BiSolidTrash } from "react-icons/bi";
import Header from "./Dashboard_Components/Header";
import { adminApi } from "../../utils/api";

const programYearLevels = ["1", "2", "3", "4"];
const weekDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const capitalizedWeekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function Schedule() {
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isConfirmDelete, setIsConfirmDelete] = useState(false);
    const [isAddSchedule, setIsAddSchedule] = useState(false);

    const [programs, setPrograms] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [originalSchedule, setOriginalSchedule] = useState([]);
    const [courseDisplayData, setCourseDisplayData] = useState([]);
    
    const [selectedCoursesToDelete, setSelectedCoursesToDelete] = useState([]);
    const [addFormProgram, setAddFormProgram] = useState(null);
    const [addFormYear, setAddFormYear] = useState('');
    const [addFormEligibleDays, setAddFormEligibleDays] = useState([]);
    const [addFormError, setAddFormError] = useState('');

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const transformApiData = useCallback((apiData) => {
        const transformed = apiData.reduce((acc, item) => {
            const courseName = `${item.program} - ${item.yearLevel}`; // Changed to use a dash
            if (!acc[courseName]) {
                acc[courseName] = { id: courseName, courseName: courseName };
                weekDays.forEach(day => acc[courseName][day] = false);
            }
            const dayKey = item.dayOfWeek.toLowerCase();
            if (weekDays.includes(dayKey)) { acc[courseName][dayKey] = item.isEligible; }
            return acc;
        }, {});
        return Object.values(transformed);
    }, []);

    const fetchPrograms = useCallback(async () => {
        try {
            setError(null);
            const res = await adminApi.get('/programs');
            setPrograms(res.data);
            if (res.data.length > 0) {
                if (!selectedProgram) {
                    setSelectedProgram(res.data[0]);
                }
            }
        } catch (err) { setError(err.message); }
    }, [selectedProgram]);

    const fetchScheduleForProgram = useCallback(async (programName) => {
        if (!programName) return;
        setIsLoading(true);
        setError(null);
        try {
            const res = await adminApi.get(`/schedules?program=${programName}`);
            setOriginalSchedule(res.data);
            setCourseDisplayData(transformApiData(res.data));
        } catch (err) {
            setError(err.message);
            setOriginalSchedule([]);
            setCourseDisplayData([]);
        } finally { setIsLoading(false); }
    }, [transformApiData]);

    useEffect(() => { fetchPrograms(); }, [fetchPrograms]);
    useEffect(() => { if (selectedProgram) { fetchScheduleForProgram(selectedProgram.name); } }, [selectedProgram, fetchScheduleForProgram]);

    const handleEligibilityChange = (currentValue, day, courseName) => {
        setCourseDisplayData(prevData =>
            prevData.map(courseItem =>
                courseItem.courseName === courseName ? { ...courseItem, [day]: !currentValue } : courseItem
            )
        );
    };
    
    const handleSaveChanges = async () => {
        setIsLoading(true);
        setError(null);
        const updatePromises = [];
        courseDisplayData.forEach(editedCourse => {
            const [program, yearLevel] = editedCourse.courseName.split(' - ');
            weekDays.forEach(day => {
                const originalEntry = originalSchedule.find(entry => entry.program === program && entry.yearLevel.toString() === yearLevel && entry.dayOfWeek.toLowerCase() === day);
                const originalStatus = originalEntry ? originalEntry.isEligible : false;
                const editedStatus = editedCourse[day];
                if (originalStatus !== editedStatus && originalEntry) {
                    updatePromises.push(adminApi.put(`/schedules/${originalEntry._id}`, { isEligible: editedStatus }));
                }
            });
        });
        try {
            await Promise.all(updatePromises);
            if(selectedProgram) { fetchScheduleForProgram(selectedProgram.name); }
        } catch (err) { setError(err.message);
        } finally { setIsLoading(false); setIsEdit(false); }
    };
    
    const handleCancelEdit = () => {
        setCourseDisplayData(transformApiData(originalSchedule));
        setIsEdit(false);
    };

    const handleOptionChangeToDelete = (event) => {
        const { value, checked } = event.target;
        setSelectedCoursesToDelete(prev => checked ? [...prev, value] : prev.filter(course => course !== value));
    };

    const handleDeleteSubmit = async () => {
        setIsLoading(true);
        setError(null);
        const deletePromises = [];
        selectedCoursesToDelete.forEach(courseNameToDelete => {
            const [program, yearLevel] = courseNameToDelete.split(' - ');
            const entriesToDelete = originalSchedule.filter(
                entry => entry.program === program && entry.yearLevel.toString() === yearLevel
            );
            entriesToDelete.forEach(entry => deletePromises.push(adminApi.delete(`/schedules/${entry._id}`)));
        });
        try {
            await Promise.all(deletePromises);
            if (selectedProgram) { fetchScheduleForProgram(selectedProgram.name); }
        } catch(err) { setError(err.message);
        } finally {
            setIsLoading(false);
            setIsConfirmDelete(false);
            setIsDelete(false);
            setSelectedCoursesToDelete([]);
        }
    };

    const resetAddForm = () => {
        setAddFormYear('');
        setAddFormEligibleDays([]);
        setAddFormError('');
        // This pre-selects the currently viewed program when Add is clicked
        if (selectedProgram) {
            setAddFormProgram(selectedProgram);
        } else if (programs.length > 0) {
            setAddFormProgram(programs[0]);
        }
    };

    const handleAddSchedule = async () => {
        setAddFormError('');
        if (!addFormProgram || !addFormYear) {
            setAddFormError('Program and Year Level are required.');
            return;
        }
        const scheduleDaysPayload = capitalizedWeekDays.map(day => ({
            dayOfWeek: day,
            isEligible: addFormEligibleDays.includes(day.toLowerCase())
        }));
        const body = { program: addFormProgram.name, yearLevel: addFormYear, scheduleDays: scheduleDaysPayload };
        try {
            await adminApi.post('/schedules', body);
            setIsAddSchedule(false);
            resetAddForm();
            if(selectedProgram.name === addFormProgram.name) {
                fetchScheduleForProgram(addFormProgram.name);
            } else {
                setSelectedProgram(addFormProgram);
            }
        } catch (err) { setAddFormError(err.message); }
    };

    const handleAddFormEligibleDays = (event) => {
        const { value, checked } = event.target;
        setAddFormEligibleDays(prev => checked ? [...prev, value] : prev.filter(day => day !== value));
    };

    const handleEnableEdit = () => { setIsEdit(true); setIsDelete(false); };
    const handleEnableDelete = () => { setIsDelete(true); setIsEdit(false); setSelectedCoursesToDelete([]); };
    const handleEnableAdd = () => { resetAddForm(); setIsAddSchedule(true); setIsDelete(false); setIsEdit(false); };
    
    return (
        <div className="h-[100%] w-[100%]">
            <div className="h-[10%]"><Header pageName={"Schedule"} /></div>
            <div className="h-[90%] w-[100%] flex items-center justify-center">
                <div className="h-[85%] w-[85%] shadow-sm shadow-gray-200 border-gray rounded-[15px] flex flex-col items-center justify-center">
                    <div className="h-[15%] w-[90%] flex items-center justify-between">
                        <Dropdown label={selectedProgram ? selectedProgram.name : "Select Program"} dismissOnClick={true} className="text-[#1A2B88] font-bold" style={{ backgroundColor: '#e5e7eb', height: '30px' }}>
                            {programs.map(program => (<DropdownItem key={program._id} onClick={() => setSelectedProgram(program)}><span className="text-[0.87rem] font-bold font-Poppins text-[#1A2B88]">{program.name}</span></DropdownItem>))}
                        </Dropdown>
                        <div className="flex justify-center items-center gap-5">
                            <RiPencilFill className="cursor-pointer" size="24px" color={isEdit ? `#5594E2` : `#000000`} onClick={handleEnableEdit} />
                            <BiSolidTrash className="cursor-pointer" size="24px" color={isDelete ? `red` : `#000000`} onClick={handleEnableDelete} />
                            <Button style={{ backgroundColor: "#1F3463", height: '35px' }} onClick={handleEnableAdd}>Add Schedule</Button>
                        </div>
                    </div>
                    <div className="relative h-[70%] w-[100%] shadow-sm shadow-gray-200 flex justify-center">
                        <div className={`${courseDisplayData.length === 4 ? `h-[100%]` : `h-[70%]`} w-[90%] grid grid-cols-[repeat(1, 1fr)]`}>
                            <div className={`h-full w-full grid ${isDelete ? `grid-cols-[40px_repeat(7,_1fr)]` : `grid grid-cols-7`}`}>
                                {isDelete ? (<span></span>) : ""}
                                <div className="border-gray-400 border-[1px] w-[100%] h-[100%] bg-[#1F3463] flex items-center justify-center"><p className="font-Poppins font-semibold text-white text-[1.1vw]">Course / Year</p></div>
                                {weekDays.map(day => <div key={day} className="border-gray-400 border-t-[1px] border-r-[1px] border-b-[1px] w-[100%] h-[100%] bg-[#1F3463] flex items-center justify-center"><p className="font-Poppins font-semibold text-white text-[1.1vw] capitalize">{day}</p></div>)}
                            </div>
                            {isLoading ? (<p className="text-center p-4">Loading schedule...</p>) : error ? (<p className="text-center p-4 text-red-500">Error: {error}</p>) : (
                                courseDisplayData.map((item) => (
                                    <div key={item.id} className={`h-full w-full grid flex items-center row-span-1 ${isDelete ? `grid-cols-[40px_repeat(7,_1fr)]` : `grid grid-cols-7`}`}>
                                        {isDelete && (<input type="checkbox" value={item.id} onChange={handleOptionChangeToDelete} className="h-5 w-5 rounded-full border-2 border-gray-400 bg-white checked:border-red-500 checked:bg-[radial-gradient(circle_at_center,_#EF4444_60%,_transparent_60%)] checked:bg-no-repeat checked:bg-center checked:bg-cover focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50 appearance-none cursor-pointer transition-colors duration-200" />)}
                                        <div className="border-gray-400 border-l-[1px] border-r-[1px] border-b-[1px] w-[100%] h-[100%] bg-white flex items-center justify-center"><p className="font-Poppins font-bold text-[#1F3463] text-[1.1vw]">{item.courseName}</p></div>
                                        {weekDays.map(day => (
                                            <div key={`${item.id}-${day}`} className={`border-gray-400 border-r-[1px] border-b-[1px] w-[100%] h-[100%] bg-opacity-30 flex items-center justify-center ${item[day] ? `bg-[#16C098]` : `bg-[#EA4343]`}`}>
                                                {isEdit ? (
                                                    <Dropdown label={item[day] ? "Eligible" : "Ineligible"} inline>
                                                        <DropdownItem onClick={() => handleEligibilityChange(item[day], day, item.courseName)}>
                                                            <span className="text-[#16C098] font-Poppins text-[0.87rem] font-semibold text-center w-[100%]">
                                                                Eligible
                                                            </span>
                                                        </DropdownItem>
                                                        <DropdownItem onClick={() => handleEligibilityChange(item[day], day, item.courseName)}>
                                                            <span className="text-[#EA4343] font-Poppins text-[0.87rem] font-semibold text-center w-[100%]">
                                                                Ineligible
                                                            </span>
                                                        </DropdownItem>
                                                    </Dropdown>) : (
                                                        <p className={`font-Poppins font-semibold text-[1.1vw] ${item[day] ? `text-[#16C098]` : `text-[#EA4343]`}`}>
                                                            {item[day] ? "Eligible" : "Ineligible"}</p>)}
                                            </div>
                                        ))}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    <div className="h-[15%] w-[90%] flex items-center justify-end">
                        {isEdit && (<div className="gap-2 flex"><Button style={{ height: '35px', border: '1px solid gray', backgroundColor: "#ffffff" }} onClick={handleCancelEdit}><p className="text-black text-[0.875rem] font-Inter">Cancel</p></Button><Button style={{ backgroundColor: "#1F3463", height: '35px', boxShadow: '0 4px 6px rgba(0,0,0,0.25)' }} onClick={handleSaveChanges}>Save Changes</Button></div>)}
                        {isDelete && (<div className="gap-2 flex"><Button style={{ height: '35px', border: '1px solid gray', backgroundColor: "#ffffff" }} onClick={() => setIsDelete(false)}><p className="text-black text-[0.875rem] font-Inter">Cancel</p></Button><Button disabled={selectedCoursesToDelete.length === 0} style={{ backgroundColor: "#FF0000", height: '35px' }} onClick={() => setIsConfirmDelete(true)}>Delete</Button></div>)}
                    </div>
                </div>
            </div>
            <Modal show={isAddSchedule} size={"md"} onClose={() => setIsAddSchedule(false)}>
                <ModalBody>
                    <div className="flex flex-col gap-3">
                        <p className="text-[1.5rem] font-Poppins font-regular text-[#1F3463] font-bold">Add Schedule</p>
                        {addFormError && <p className="text-red-500 text-sm">{addFormError}</p>}
                        <div className="w-[100%] flex flex-col gap-2">
                             <Dropdown label={addFormProgram ? addFormProgram.name : "Choose Program"} placement="bottom" dismissOnClick={true} style={{width: '100%', border: '1px solid #D1D5DB', borderRadius: '10px'}} renderTrigger={() => (<div className="relative flex w-[100%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[#949494] rounded-[10px] items-center justify-between cursor-pointer"><span className="text-black text-[0.87rem]">{addFormProgram ? addFormProgram.name : "Choose Program"}</span><RiArrowDropDownLine size="2em" color="#000000" /></div>)}>{programs.map((p) => (<DropdownItem key={p._id} onClick={() => setAddFormProgram(p)}><p className="font-Inter text-[0.87rem] text-black">{p.name}</p></DropdownItem>))}</Dropdown>
                            <Dropdown label={addFormYear || "Choose Year"} placement="bottom" dismissOnClick={true} style={{width: '100%', border: '1px solid #D1D5DB', borderRadius: '10px'}} renderTrigger={() => (<div className="relative flex w-[100%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[#949494] rounded-[10px] items-center justify-between cursor-pointer"><span className="text-black text-[0.87rem]">{addFormYear || "Choose Year"}</span><RiArrowDropDownLine size="2em" color="#000000" /></div>)}>{programYearLevels.map((year) => (<DropdownItem key={year} onClick={() => setAddFormYear(year)}><p className="font-Inter text-[0.87rem] text-black">{year}</p></DropdownItem>))}</Dropdown>
                        </div>
                        <div className="w-[100%] border-[#D9D9D9] rounded-[12px] border-[1px] h-[20vh]"><div className="h-[20%] w-[100%]"><p className="font-Inter text-[0.80rem] font-extralight pl-[15px] pt-[5px]">Select eligible days</p></div><div className="h-[80%] w-[100%] flex"><div className="h-[100%] w-[50%]">{weekDays.slice(0, 3).map((day) => (<div key={`add-${day}`} className="flex items-center w-[100%] pl-[15px] mt-[10px]"><div className="w-[100%] h-[100%] flex items-center gap-3"><input type="checkbox" id={`add-${day}`} value={day} onChange={handleAddFormEligibleDays} className="h-5 w-5 rounded-full border-2 border-[#1f3562] bg-white checked:border-blue-500 checked:bg-[radial-gradient(circle_at_center,_#1f3562_60%,_transparent_60%)] checked:bg-no-repeat checked:bg-center checked:bg-cover focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 appearance-none cursor-pointer transition-colors duration-200" /><label htmlFor={`add-${day}`} className="font-Inter text-[0.87rem] text-black capitalize">{day}</label></div></div>))}</div><div className="h-[100%] w-[50%]">{weekDays.slice(3, 6).map((day) => (<div key={`add-${day}`} className="flex items-center w-[100%] pl-[15px] mt-[10px]"><div className="w-[100%] h-[100%] flex items-center gap-3"><input type="checkbox" id={`add-${day}`} value={day} onChange={handleAddFormEligibleDays} className="h-5 w-5 rounded-full border-2 border-[#1f3562] bg-white checked:border-blue-500 checked:bg-[radial-gradient(circle_at_center,_#1f3562_60%,_transparent_60%)] checked:bg-no-repeat checked:bg-center checked:bg-cover focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 appearance-none cursor-pointer transition-colors duration-200" /><label htmlFor={`add-${day}`} className="font-Inter text-[0.87rem] text-black capitalize">{day}</label></div></div>))}</div></div></div>
                        <div className="w-[100%] flex gap-1"><button type="button" className="h-[6vh] w-[50%] bg-[#DADADA] rounded-[5px] hover:bg-gray-400" onClick={() => setIsAddSchedule(false)}><p className="font-Poppins text-[0.87rem] text-black">Cancel</p></button><button type="button" className="h-[6vh] w-[50%] bg-[#1F3463] rounded-[5px] hover:bg-blue-800" onClick={handleAddSchedule}><p className="font-Poppins text-[0.87rem] text-white">Save</p></button></div>
                    </div>
                </ModalBody>
            </Modal>
            <Modal show={isConfirmDelete} dismissible={false} size={"md"}>
                <ModalBody>
                    <div className="w-full flex justify-end">
                        <X className="cursor-pointer" onClick={() => setIsConfirmDelete(false)} />
                    </div>
                <div className="h-full flex flex-col items-center gap-3">
                    <div className="w-full flex justify-center">
                        <TriangleAlert color="#ffffff" fill="#FF0000" size="4.02vw" /></div>
                        <div className="w-full flex justify-center">
                            <p className="font-poppins text-[0.94rem] text-[#292D32] font-regular">
                                Are you sure you want to delete this Schedule?
                            </p>
                        </div>
                    <div className="w-full flex justify-center gap-2">
                        <Button style={{ height: '50px', border: '1px solid gray', backgroundColor: "#ffffff", width: "50%" }} onClick={() => setIsConfirmDelete(false)}>
                            <p className="text-black text-[0.875rem] font-Inter">
                                Cancel
                            </p>
                        </Button>
                        <Button style={{ backgroundColor: "#FF0000", height: '50px', width: "50%" }} onClick={handleDeleteSubmit} >Delete</Button></div></div></ModalBody></Modal>
        </div>
    );
}