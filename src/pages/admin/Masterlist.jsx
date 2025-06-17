import { useState, useEffect, useCallback } from 'react';
import { Button, Dropdown, DropdownItem, Modal, ModalBody } from "flowbite-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "./Dashboard_Components/Header";
import { RiPencilFill, RiArrowDropDownLine } from "react-icons/ri";
import { BiSolidTrash } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { IoIosWarning } from "react-icons/io";
import { adminApi } from '../../utils/api';

const programYearLevels = ["1", "2", "3", "4"];

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => { setDebouncedValue(value); }, delay);
    return () => { clearTimeout(handler); };
  }, [value, delay]);
  return debouncedValue;
};

export default function Masterlist() {
  // --- Data & API State ---
  const [students, setStudents] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [apiParams, setApiParams] = useState({
    page: 1,
    limit: 8,
    program: '',
    sortBy: 'name',
    order: 'asc',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Modal & Form State ---
  const [modalAction, setModalAction] = useState("add");
  const [openAddStudentModal, setOpenAddStudentModal] = useState(false);
  const [openDeleteStudentModal, setOpenDeleteStudentModal] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const [studentFirstName, setStudentFirstName] = useState("");
  const [studentLastName, setStudentLastName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [displayCourse, setDisplayCourse] = useState("Choose Course");
  const [selectedProgramYear, setSelectedProgramYear] = useState("");
  const [displayProgramYear, setDisplayProgramYear] = useState("Choose year");

  // --- Data Fetching ---
  // const fetchStudents = useCallback(async (searchQuery) => {
  //     setIsLoading(true);
  //     setError(null);
  //     try {
  //         const { page, limit, program, sortBy, order } = apiParams;
  //         const query = `?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}&search=${searchQuery}&program=${program}`;
  //         const res = await adminApi.get(`/students${query}`);

  //         const formattedStudents = res.data.map(s => {
  //             const nameParts = s.name.split(' ');
  //             return {
  //                 ...s,
  //                 firstName: nameParts[0] || '',
  //                 lastName: nameParts.slice(1).join(' ') || '',
  //                 course: `${s.program} ${s.yearLevel}`,
  //                 student_id: s.studentIdNumber
  //             };
  //         });

  //         setStudents(formattedStudents);
  //         setPagination(res.pagination);
  //     } catch (err) {
  //         setError(err.message);
  //         setStudents([]);
  //     } finally {
  //         setIsLoading(false);
  //     }
  // }, [apiParams]);

  const fetchStudents = useCallback(async (searchQuery) => {
    setIsLoading(true);
    setError(null);
    try {
      const { page, limit, program, sortBy, order } = apiParams;
      const query = `?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}&search=${searchQuery}&program=${program}`;
      const res = await adminApi.get(`/students${query}`);

      const formattedStudents = res.data.map(s => {
        const nameParts = s.name.split(' ');
        return {
          ...s,
          firstName: nameParts[0] || '',
          lastName: nameParts.slice(1).join(' ') || '',
          course: `${s.program} ${s.yearLevel}`,
          student_id: s.studentIdNumber
        };
      });

      // Add custom sorting here
      const sortedByYearAndOther = formattedStudents.sort((a, b) => {
        // First, sort by yearLevel
        if (a.yearLevel < b.yearLevel) {
          return -1;
        }
        if (a.yearLevel > b.yearLevel) {
          return 1;
        }

        // If yearLevels are the same, apply existing sortBy and order
        if (sortBy && a[sortBy] && b[sortBy]) { // Check if sortBy property exists
          if (order === 'asc') {
            return a[sortBy] > b[sortBy] ? 1 : -1;
          } else { // desc
            return a[sortBy] < b[sortBy] ? 1 : -1;
          }
        }
        return 0; // If no sortBy or properties don't exist, maintain original order
      });

      setStudents(sortedByYearAndOther); // Set the sorted students
      setPagination(res.pagination);
    } catch (err) {
      setError(err.message);
      setStudents([]);
    } finally {
      setIsLoading(false);
    }
  }, [apiParams]);

  const fetchPrograms = useCallback(async () => {
    try {
      const res = await adminApi.get('/programs');
      setPrograms(res.data);
    } catch (err) { console.error("Failed to fetch programs:", err); }
  }, []);

  useEffect(() => {
    fetchStudents(debouncedSearchTerm);
  }, [fetchStudents, debouncedSearchTerm]);

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  // --- Event Handlers ---
  const handleSortByProgram = (program) => {
    setApiParams(prev => ({ ...prev, program: program === 'ALL COURSES' ? '' : program, page: 1 }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setApiParams(prev => ({ ...prev, page: 1 }));
  };

  const goToPreviousPage = () => {
    if (apiParams.page > 1) {
      setApiParams(prev => ({ ...prev, page: prev.page - 1 }));
    }
  };

  const goToNextPage = () => {
    if (apiParams.page < pagination.totalPages) {
      setApiParams(prev => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const resetModalForm = () => {
    setStudentToEdit(null);
    setStudentFirstName("");
    setStudentLastName("");
    setStudentID("");
    setSelectedCourse("");
    setDisplayCourse("Choose Course");
    setSelectedProgramYear("");
    setDisplayProgramYear("Choose year");
  };

  const handleOpenModalForAdd = () => {
    setModalAction("add");
    resetModalForm();
    setOpenAddStudentModal(true);
  };

  const handleOpenModalForEdit = (student) => {
    setModalAction("edit");
    setStudentToEdit(student);
    setStudentFirstName(student.firstName || "");
    setStudentLastName(student.lastName || "");
    setStudentID(student.studentIdNumber || "");
    setSelectedCourse(student.program);
    setDisplayCourse(student.program);
    setSelectedProgramYear(student.yearLevel.toString());
    setDisplayProgramYear(student.yearLevel.toString());
    setOpenAddStudentModal(true);
  };

  const handleSaveStudent = async () => {
    if (!studentFirstName.trim() || !studentLastName.trim() || !studentID.trim() || !selectedCourse || !selectedProgramYear) {
      alert("Please fill in all required fields.");
      return;
    }
    const studentData = {
      name: `${studentFirstName.trim()} ${studentLastName.trim()}`,
      studentIdNumber: studentID.trim(),
      program: selectedCourse,
      yearLevel: selectedProgramYear,
    };
    try {
      if (modalAction === "add") {
        await adminApi.post('/students', studentData);
      } else {
        await adminApi.patch(`/students/${studentToEdit._id}`, studentData);
      }
      setOpenAddStudentModal(false);
      fetchStudents(debouncedSearchTerm);
    } catch (err) { alert(`Error: ${err.message}`); }
  };

  const handleConfirmDeleteStudent = (student) => {
    setStudentToDelete(student);
    setOpenDeleteStudentModal(true);
  };

  const handleDeleteStudent = async () => {
    if (!studentToDelete) return;
    try {
      await adminApi.delete(`/students/${studentToDelete._id}`);
      setOpenDeleteStudentModal(false);
      setStudentToDelete(null);
      fetchStudents(debouncedSearchTerm);
    } catch (err) { alert(`Error: ${err.message}`); }
  };

  return (
    <>
      <div className="h-[100%] w-[100%]">
        <div className="h-[10%]">
          <Header
            pageName={"Masterlist"}
            showSearch={true}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />
        </div>
        <div className="h-[90%] w-[100%] items-center justify-center flex">
          <div className="h-[95%] w-[95%] border-[1px] bg-white rounded-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.10)] flex flex-col">
            <div className="w-[100%] h-[10%] flex">
              <div className="w-[60%] h-[100%] flex items-center justify-start">
                <p className="font-Poppins text-[1.375rem] font-semibold text-[#232323] overflow white-space text-overflow pl-[30px] h-[100%] flex items-end">
                  All Students
                </p>
              </div>
              <div className="w-[40%] h-[100%] flex items-end justify-evenly">
                <Dropdown
                  label={<><span className="text-[#1A2B88] font-light font-Poppins text-[0.75rem]">Sort By:  </span><span className="font-semibold text-[#1A2B88]">{apiParams.program || "All Courses"}</span></>}
                  dismissOnClick={true}
                  className="text-[#1F3463] font-bold"
                  style={{ backgroundColor: "#F6F6F6", height: "30px" }}
                >
                  <DropdownItem onClick={() => handleSortByProgram('ALL COURSES')}><span className='text-[#1A2B88]'>ALL COURSES</span></DropdownItem>
                  {programs.map((prog) => (
                    <DropdownItem key={prog._id} onClick={() => handleSortByProgram(prog.name)}><span className='text-[#1A2B88]'>{prog.name}</span></DropdownItem>
                  ))}
                </Dropdown>
                <button className="w-[7.60vw] h-[30px] bg-[#05305D] rounded-[10px] font-Poppins text-white font-bold text-[0.75rem] flex items-center justify-center hover:bg-blue-800" onClick={handleOpenModalForAdd}>
                  Add Student
                </button>
              </div>
            </div>
            <div className="w-[100%] h-[75%] ">
              <div className="w-[100%] h-[100%] grid grid-rows-9 flex">
                <div className="flex mx-[30px] border-b-[1px] border-[#D9D9D9]">
                  <div className="w-[100%] h-[100%] flex justify-start items-end"><p className="font-Poppins text-[#1F3463] text-[0.9rem] font-bold">Student Name</p></div>
                  <div className="w-[100%] h-[100%] flex justify-center items-end"><p className="font-Poppins text-[#1F3463] text-[0.9rem] font-bold">Course/Year</p></div>
                  <div className="w-[100%] h-[100%] flex justify-center items-end"><p className="font-Poppins text-[#1F3463] text-[0.9rem] font-bold">Student ID no.</p></div>
                  <div className="w-[100%] h-[100%] flex justify-center items-end"><p className="font-Poppins text-[#1F3463] text-[0.9rem] font-bold text-center">Action</p></div>
                </div>
                {isLoading ? (<div className="col-span-4 text-center py-4 flex justify-center items-center h-full">Loading students...</div>) : error ? (<div className="col-span-4 text-center py-4 flex justify-center items-center h-full text-red-500">Error: {error}</div>) : students.length > 0 ? (
                  students.map((student) => (
                    <div key={student._id} className="flex mx-[30px] border-b-[1px] border-[#D9D9D9] hover:bg-gray-100">
                      <div className="h-[100%] w-[100%] flex items-end py-2"><p className="font-Poppins text-black text-[0.9rem]">{student.name}</p></div>
                      <div className="w-[100%] h-[100%] flex justify-center items-end py-2"><p className="font-Poppins text-black text-[0.9rem]">{student.course}</p></div>
                      <div className="h-[100%] w-[100%] flex items-end justify-center py-2"><p className="font-Poppins text-black text-[0.9rem]">{student.student_id}</p></div>
                      <div className="h-[100%] w-[100%] font-Poppins text-[#1F3463] text-[0.9rem] font-bold text-center flex items-end justify-center gap-3 py-2">
                        <RiPencilFill className="cursor-pointer" color="#5594E2" size="1.70vw" onClick={() => handleOpenModalForEdit(student)} />
                        <BiSolidTrash className="cursor-pointer" color="#FF0000" size="1.70vw" onClick={() => handleConfirmDeleteStudent(student)} />
                      </div>
                    </div>
                  ))
                ) : (<div className="col-span-4 text-center py-4 flex justify-center items-center h-full">No students found matching your criteria.</div>)}
              </div>
            </div>
            <div className="w-[100%] h-[15%] flex items-center justify-between">
              <div className="bg-[#D9D9D9] rounded-[10px] py-1 px-2 w-auto flex items-center justify-center ml-[40px] cursor-pointer hover:bg-gray-300" onClick={goToPreviousPage}><ChevronLeft size="1.1vw" /><span className="text-[0.9rem] font-Poppins text-[#292D32] font-Regular ml-1">Previous</span></div>
              <span className="text-[0.9rem] font-Poppins text-gray-500">Page {pagination.currentPage} of {pagination.totalPages || 1}</span>
              <div className="bg-[#D9D9D9] rounded-[10px] py-1 px-2 w-auto flex items-center justify-center mr-[50px] cursor-pointer hover:bg-gray-300" onClick={goToNextPage}><span className="text-[0.9rem] font-Poppins text-[#292D32] font-regular mr-1">Next</span><ChevronRight size="1.1vw" /></div>
            </div>
          </div>
        </div>
      </div >
      <Modal show={openAddStudentModal} dismissible onClose={() => setOpenAddStudentModal(false)} size={"md"}>
        <ModalBody>
          <div className="flex flex-col gap-5">
            <p className="text-[1.5rem] font-Poppins font-regular text-[#1F3463] font-bold">{modalAction === "add" ? "Add Student" : "Edit Student Details"}</p>
            <div className="w-[100%] flex gap-1">
              {modalAction === "edit" ? (
                <>
                  <input type="text" placeholder="First Name" value={studentFirstName} onChange={(e) => setStudentFirstName(e.target.value)} className="flex w-[50%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-black rounded-[10px] text-[0.9rem]" disabled />
                  <input type="text" placeholder="Last Name" value={studentLastName} onChange={(e) => setStudentLastName(e.target.value)} className="flex w-[50%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-black rounded-[10px] text-[0.9rem]" disabled />
                </>
              ) : (
                <>
                  <input type="text" placeholder="First Name" value={studentFirstName} onChange={(e) => setStudentFirstName(e.target.value)} className="flex w-[50%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-black rounded-[10px] text-[0.9rem]" />
                  <input type="text" placeholder="Last Name" value={studentLastName} onChange={(e) => setStudentLastName(e.target.value)} className="flex w-[50%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-black rounded-[10px] text-[0.9rem]" />
                  
                </>
              )}
            </div>
            {modalAction === "edit" ? (
              <>
                <div className="w-[100%] flex gap-1"><input type="text" placeholder="Enter ID Number" value={studentID} onChange={(e) => setStudentID(e.target.value)} className="flex w-[100%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-black rounded-[10px] text-[0.9rem]" disabled /></div>
              </>
            ) : (
              <>
                <div className="w-[100%] flex gap-1"><input type="text" placeholder="Enter ID Number" value={studentID} onChange={(e) => setStudentID(e.target.value)} className="flex w-[100%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-black rounded-[10px] text-[0.9rem]" /></div>
              </>
            )}
            <div className="w-[100%] flex gap-1">
              <Dropdown renderTrigger={() => (<div className="relative flex w-[50%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[#949494] rounded-[10px] items-center justify-between cursor-pointer"><span className={selectedCourse ? "text-black text-[0.87rem]" : "text-[#949494] text-[0.87rem]"}>{displayCourse}</span><RiArrowDropDownLine size="2em" color="#000000" /></div>)} placement="bottom-start">
                {programs.map((program) => (<DropdownItem key={program._id} onClick={() => { setSelectedCourse(program.name); setDisplayCourse(program.name); }}><p className="px-[2px] font-Inter text-[0.87rem] text-black">{program.name}</p></DropdownItem>))}
              </Dropdown>
              <Dropdown renderTrigger={() => (<div className="relative flex w-[50%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[#949494] rounded-[10px] items-center justify-between cursor-pointer"><span className={selectedProgramYear ? "text-black text-[0.87rem]" : "text-[#949494] text-[0.87rem]"}>{displayProgramYear}</span><RiArrowDropDownLine size="2em" color="#000000" /></div>)} placement="bottom-start">
                {programYearLevels.map((item) => (<DropdownItem key={item} onClick={() => { setSelectedProgramYear(item); setDisplayProgramYear(item); }}><p className="font-Inter text-[0.87rem] text-black">{item}</p></DropdownItem>))}
              </Dropdown>
            </div>
            <div className="w-[100%] flex gap-1"><button type="button" className="h-[6vh] w-[50%] bg-[#DADADA] rounded-[5px] hover:bg-gray-400" onClick={() => setOpenAddStudentModal(false)}><p className="font-Poppins text-[0.87rem] text-black">Cancel</p></button><button type="button" className="h-[6vh] w-[50%] bg-[#1F3463] rounded-[5px] hover:bg-blue-800" onClick={handleSaveStudent}><p className="font-Poppins text-[0.87rem] text-white">Save</p></button></div>
          </div>
        </ModalBody>
      </Modal>
      <Modal show={openDeleteStudentModal} size={"md"} dismissible onClose={() => setOpenDeleteStudentModal(false)}>
        <ModalBody>
          <div>
            <div className='w-[100%] flex justify-end mr-20px'><RxCross2 className="cursor-pointer" onClick={() => setOpenDeleteStudentModal(false)} /></div>
            <div className='w-[100%] flex flex-col items-center'><IoIosWarning fill="#FF0000" size="2.62rem" /><p className="text-[0.94rem] text-black font-Poppins font-semibold text-center mt-2">Are you sure you want to delete <br />the selected list ?</p></div>
            <div className="w-[100%] flex gap-1 mt-4"><button type="button" className="h-[6vh] w-[50%] bg-[#DADADA] rounded-[5px] hover:bg-gray-400 focus:outline-none" onClick={() => setOpenDeleteStudentModal(false)}><p className="font-Poppins text-[0.87rem] text-black">Cancel</p></button><button type="button" className="h-[6vh] w-[50%] bg-[#FF0000] rounded-[5px] hover:bg-red-800" onClick={handleDeleteStudent}><p className="font-Poppins text-[0.87rem] text-white">Delete</p></button></div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}