import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button, Dropdown, DropdownItem, Modal, ModalBody } from "flowbite-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { RiPencilFill, RiArrowDropDownLine } from "react-icons/ri";
import { BiSolidTrash } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { IoIosWarning } from "react-icons/io";
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"; // Ensure this path is correct
import { useOutletContext } from "react-router-dom";

// --- Data Transformation Helper ---
const transformStudentData = (backendStudent) => {
  const nameParts = backendStudent.name ? backendStudent.name.split(" ") : ["", ""];
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";
  return {
    _id: backendStudent._id,
    firstName: firstName,
    lastName: lastName,
    course: `${backendStudent.program || ""} ${backendStudent.yearLevel || ""}`.trim(),
    student_id: backendStudent.studentIdNumber,
    program: backendStudent.program,
    yearLevel: backendStudent.yearLevel,
    section: backendStudent.section,
    profilePictureUrl: backendStudent.profilePictureUrl,
  };
};

// --- Sorting Constants & Helpers ---
const courseOrder = ["BSIS", "BSSW", "BAB", "BSAIS", "BSA", "ACT"];
const programYearValues = ["1", "2", "3", "4"];

const parseCourseStringForSort = (courseStr) => {
  const parts = (courseStr || "").split(" ");
  let courseName = courseStr || "";
  let year = "";
  if (parts.length > 1) {
    const lastPart = parts[parts.length - 1];
    if (!isNaN(parseInt(lastPart, 10)) && programYearValues.includes(lastPart)) {
      year = lastPart;
      courseName = parts.slice(0, -1).join(" ");
    }
  }
  return { courseName, year };
};

function sortStudentsByCourseAndYear(list) {
  return [...list].sort((a, b) => {
    const { courseName: courseA, year: yearStrA } = parseCourseStringForSort(a.course);
    const { courseName: courseB, year: yearStrB } = parseCourseStringForSort(b.course);
    const yearA = parseInt(yearStrA, 10) || 0;
    const yearB = parseInt(yearStrB, 10) || 0;
    const courseComparison = courseOrder.indexOf(courseA) - courseOrder.indexOf(courseB);
    return courseComparison !== 0 ? courseComparison : yearA - yearB;
  });
}

function sortStudentsByName(studentList) {
  return [...studentList].sort((a, b) => (a.firstName || "").localeCompare(b.firstName || ""));
}

function sortStudentsById(list) {
  return [...list].sort((a, b) => (a.student_id || "").localeCompare(b.student_id || ""));
}

export default function Masterlist() {
  const { token } = useAuth();
  const outletContext = useOutletContext();
  const pageSearchTerm = outletContext?.pageSearchTerm !== undefined ? outletContext.pageSearchTerm : "";
  const studentsPerPage = 8;

  const [currentPageStudents, setCurrentPageStudents] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const [modalAction, setModalAction] = useState("add");
  const [editingStudent, setEditingStudent] = useState(null);
  const [studentFirstName, setStudentFirstName] = useState("");
  const [studentLastName, setStudentLastName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [openAddStudentModal, setOpenAddStudentModal] = useState(false);
  const [openDeleteStudentModal, setOpenDeleteStudentModal] = useState(false);
  const [pendingDeleteStudent, setPendingDeleteStudent] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [displayCourse, setDisplayCourse] = useState("Choose Course");
  const [selectedProgramYear, setSelectedProgramYear] = useState("");
  const [displayProgramYear, setDisplayProgramYear] = useState("Choose year");
  
  const prevSearchTermRef = useRef(pageSearchTerm);

  const fetchStudentsPage = useCallback(async (page, limit, currentSearchTerm = "") => {
    setIsLoading(true);
    setApiError(null);
    if (!token) {
      setApiError("Authentication required."); setIsLoading(false); return;
    }
    try {
      const params = { page: page + 1, limit: limit };
      if (currentSearchTerm) params.search = currentSearchTerm;
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/students`, {
        headers: { Authorization: `Bearer ${token}` }, params: params,
      });
      if (response.data?.success) {
        const transformed = response.data.data.map(transformStudentData);
        setCurrentPageStudents(transformed);
        if (response.data.pagination) {
          setTotalPages(response.data.pagination.totalPages || 0);
          const backendCurrentPageZeroIndexed = response.data.pagination.currentPage ? response.data.pagination.currentPage - 1 : 0;
          if (page === backendCurrentPageZeroIndexed ) { // Sync if fetch was for this page
             // No need to setCurrentPageIndex if it was the initiator of the fetch for this page number
          } else if (currentSearchTerm && page === 0) { 
             setCurrentPageIndex(0);
          }
        }
      } else {
        setApiError(response.data?.message || "Failed to fetch students.");
        setCurrentPageStudents([]); setTotalPages(0);
      }
    } catch (err) {
      console.error("Fetch students error:", err);
      setApiError(err.response?.data?.error?.message || err.message || "Error fetching students.");
      setCurrentPageStudents([]); setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  }, [token, currentPageIndex]); // Added currentPageIndex because it's used inside for comparison

  useEffect(() => {
    if (prevSearchTermRef.current !== pageSearchTerm) {
      setCurrentPageIndex(0); 
      fetchStudentsPage(0, studentsPerPage, pageSearchTerm);
    } else {
      fetchStudentsPage(currentPageIndex, studentsPerPage, pageSearchTerm);
    }
    prevSearchTermRef.current = pageSearchTerm;
  }, [pageSearchTerm, currentPageIndex, studentsPerPage, fetchStudentsPage]);

  const handleSortByCourse = () => setCurrentPageStudents(prev => sortStudentsByCourseAndYear([...prev]));
  const handleSortByName = () => setCurrentPageStudents(prev => sortStudentsByName([...prev]));
  const handleSortById = () => setCurrentPageStudents(prev => sortStudentsById([...prev]));
  
  const goToPreviousPage = () => { if (currentPageIndex > 0) setCurrentPageIndex(prev => prev - 1); };
  const goToNextPage = () => { if (currentPageIndex < totalPages - 1) setCurrentPageIndex(prev => prev + 1); };

  // --- MODAL AND FORM FUNCTIONS (NOW WITH BODIES) ---
  const resetModalForm = () => {
    setStudentFirstName(""); 
    setStudentLastName(""); 
    setStudentID("");
    setSelectedCourse(""); 
    setDisplayCourse("Choose Course");
    setSelectedProgramYear(""); 
    setDisplayProgramYear("Choose year");
    setEditingStudent(null); 
    setApiError(null); // Clear API errors related to modal actions
  };

  const handleOpenModalForAdd = () => {
    console.log("handleOpenModalForAdd called"); // For debugging
    setModalAction("add"); 
    resetModalForm(); 
    setOpenAddStudentModal(true);
  };

  const handleOpenModalForEdit = (studentToEdit) => {
    console.log("handleOpenModalForEdit called with:", studentToEdit); // For debugging
    setModalAction("edit");
    setEditingStudent(studentToEdit);
    setStudentFirstName(studentToEdit.firstName);
    setStudentLastName(studentToEdit.lastName);
    setStudentID(studentToEdit.student_id); // This is studentIdNumber from backend
    setSelectedCourse(studentToEdit.program);
    setDisplayCourse(studentToEdit.program || "Choose Course");
    setSelectedProgramYear(String(studentToEdit.yearLevel || ""));
    setDisplayProgramYear(String(studentToEdit.yearLevel || "") || "Choose year");
    setApiError(null); // Clear previous API errors
    setOpenAddStudentModal(true);
  };

  const handleSaveStudent = async () => {
    if (!studentFirstName.trim() || !studentLastName.trim() || !studentID.trim() || !selectedCourse || !selectedProgramYear) {
      alert("Please fill all required fields: First Name, Last Name, Student ID, Program, and Year.");
      return;
    }
    const studentPayload = {
      name: `${studentFirstName.trim()} ${studentLastName.trim()}`,
      studentIdNumber: studentID.trim(),
      program: selectedCourse,
      yearLevel: parseInt(selectedProgramYear, 10),
    };
    const currentModalAction = modalAction;
    setIsLoading(true); setApiError(null);
    try {
      let response;
      if (currentModalAction === "add") {
        response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/students`, studentPayload, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        if (!editingStudent?._id) { alert("Error: Editing student ID missing."); setIsLoading(false); return; }
        response = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/students/${editingStudent._id}`, studentPayload, { headers: { Authorization: `Bearer ${token}` } });
      }
      if (response.data.success) {
        setOpenAddStudentModal(false);
        fetchStudentsPage(currentModalAction === 'add' ? 0 : currentPageIndex, studentsPerPage, pageSearchTerm);
        resetModalForm();
      } else { setApiError(response.data.message || `Failed to ${currentModalAction} student.`); }
    } catch (err) {
      console.error(`Save student error (${currentModalAction}):`, err);
      setApiError(err.response?.data?.error?.message || err.message || "Error saving student.");
    } finally { setIsLoading(false); }
  };

  const handleConfirmDeleteStudent = (student) => {
    console.log("handleConfirmDeleteStudent called with:", student); // For debugging
    setPendingDeleteStudent(student); 
    setApiError(null); 
    setModalAction("delete"); 
    setOpenDeleteStudentModal(true);
  };

  const handleDeleteStudent = async () => {
    if (!pendingDeleteStudent?._id) { alert("Error: Student ID missing for deletion."); setOpenDeleteStudentModal(false); return; }
    setIsLoading(true); setApiError(null);
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/students/${pendingDeleteStudent._id}`, { headers: { Authorization: `Bearer ${token}` } });
      if (response.data.success) {
        setOpenDeleteStudentModal(false);
        if (currentPageStudents.length === 1 && currentPageIndex > 0) {
            setCurrentPageIndex(prev => prev - 1); 
        } else {
            fetchStudentsPage(currentPageIndex, studentsPerPage, pageSearchTerm);
        }
        setPendingDeleteStudent(null);
      } else { setApiError(response.data.message || "Failed to delete student."); }
    } catch (err) {
      console.error("Delete student error:", err);
      setApiError(err.response?.data?.error?.message || err.message || "Error deleting student.");
    } finally { setIsLoading(false); }
  };
  
  const handleCourseSelect = (course) => { setSelectedCourse(course); setDisplayCourse(course); };
  const handleProgramYearSelect = (year) => { setSelectedProgramYear(year); setDisplayProgramYear(year); };
  const handleModalClose = () => { setOpenAddStudentModal(false); resetModalForm(); };
  const handleDeleteModalClose = () => { setOpenDeleteStudentModal(false); setPendingDeleteStudent(null); setApiError(null); };

  // --- JSX Return Statement (Using your last confirmed UI structure) ---
  if (isLoading && currentPageStudents.length === 0 && !apiError) {
    return (<div className="h-[90%] w-[100%] flex justify-center items-center"><p>Loading students...</p></div>);
  }
  if (!isLoading && apiError && currentPageStudents.length === 0) {
     return (<div className="h-[90%] w-[100%] flex justify-center items-center text-red-500"><p>Error: {apiError}</p></div>);
  }

  return (
    <>
      <div className="h-[100%] w-[100%] items-center justify-center flex">
          <div className="h-[95%] w-[95%] border-[1px] bg-white rounded-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.10)] flex flex-col">
            <div className="w-[100%] h-[10%] flex">
              <div className="w-[60%] h-[100%] flex items-center justify-start">
                <p className="font-Poppins text-[1.375rem] font-semibold text-[#232323] overflow white-space text-overflow pl-[30px] h-[100%] flex items-end">
                  All Students
                </p>
              </div>
              <div className="w-[40%] h-[100%] flex items-end justify-evenly">
                <Dropdown
                  label={<><span className="text-gray-500">Sort By:  </span><span className="font-semibold text-black">Course</span></>}
                  dismissOnClick={true} className="text-gray-500"
                  style={{ backgroundColor: "#e5e7eb", height: "30px" }}
                >
                  <DropdownItem onClick={handleSortByName}>Name</DropdownItem>
                  <DropdownItem onClick={handleSortByCourse}>Course</DropdownItem>
                  <DropdownItem onClick={handleSortById}>Student ID</DropdownItem>
                </Dropdown>
                <Button style={{ backgroundColor: "#1F3463", height: "30px" }} onClick={handleOpenModalForAdd} disabled={isLoading}>
                  Add Student
                </Button>
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
                {isLoading && currentPageStudents.length === 0 && (<div className="col-span-4 row-span-8 text-center py-4 flex justify-center items-center h-full">Loading students...</div>)}
                {!isLoading && apiError && currentPageStudents.length === 0 && (<div className="col-span-4 row-span-8 text-center py-4 text-red-500 flex justify-center items-center h-full">Error: {apiError}</div>)}
                {!isLoading && !apiError && currentPageStudents.length === 0 && (<div className="col-span-4 row-span-8 text-center py-4 flex justify-center items-center h-full">No students to display.</div>)}
                {!isLoading && !apiError && currentPageStudents.length > 0 && (
                  currentPageStudents.map((student) => (
                    <div key={student._id || student.student_id} className="flex mx-[30px] border-b-[1px] border-[#D9D9D9]">
                      <div className="h-[100%] w-[100%] flex items-end py-2"><p className="font-Poppins text-black text-[0.9rem]">{`${student.firstName || ''} ${student.lastName || ''}`}</p></div>
                      <div className="w-[100%] h-[100%] flex justify-center items-end py-2"><p className="font-Poppins text-black text-[0.9rem]">{student.course}</p></div>
                      <div className="h-[100%] w-[100%] flex items-end justify-center py-2"><p className="font-Poppins text-black text-[0.9rem]">{student.student_id}</p></div>
                      <div className="h-[100%] w-[100%] font-Poppins text-[#1F3463] text-[0.9rem] font-bold text-center flex items-end justify-center gap-3 py-2">
                        <RiPencilFill className="cursor-pointer" color="#5594E2" size="1.70vw" onClick={() => handleOpenModalForEdit(student)} />
                        <BiSolidTrash className="cursor-pointer" color="#E46565" size="1.70vw" onClick={() => handleConfirmDeleteStudent(student)} />
                      </div>
                    </div>
                  ))
                )}
                {!isLoading && !apiError && currentPageStudents.length > 0 && currentPageStudents.length < studentsPerPage &&
                  Array.from({ length: (studentsPerPage - currentPageStudents.length) }).map((_, index) => (
                    (currentPageStudents.length + index < studentsPerPage && index < (8 - currentPageStudents.length) ) ? 
                    <div key={`empty-${index}`} className="flex mx-[30px] border-b-[1px] border-transparent h-[calc(100%/9)]">
                      <div className="w-[100%]"></div> <div className="w-[100%]"></div> <div className="w-[100%]"></div> <div className="w-[100%]"></div>
                    </div> 
                    : null
                  ))
                }
              </div>
            </div>
            <div className="w-[100%] h-[15%] flex items-center justify-between">
              <div className={`bg-gray-300 rounded-[10px] py-1 px-2 w-auto flex items-center justify-center ml-[40px] hover:bg-gray-400 ${currentPageIndex === 0 || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={!isLoading && currentPageIndex > 0 ? goToPreviousPage : undefined}>
                <ChevronLeft size="1.1vw" /><span className="text-[0.9rem] font-Poppins text-[#292D32] font-Regular ml-1">Previous</span>
              </div>
              <span className="text-[0.9rem] font-Poppins text-gray-500">Page {totalPages > 0 ? currentPageIndex + 1 : 0} of {totalPages}</span>
              <div className={`bg-gray-300 rounded-[10px] py-1 px-2 w-auto flex items-center justify-center mr-[50px] hover:bg-gray-400 ${currentPageIndex >= totalPages - 1 || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={!isLoading && currentPageIndex < totalPages - 1 ? goToNextPage : undefined}>
                <span className="text-[0.9rem] font-Poppins text-[#292D32] font-regular mr-1">Next</span><ChevronRight size="1.1vw" />
              </div>
            </div>
          </div>
        </div>
      <Modal show={openAddStudentModal} dismissible onClose={handleModalClose} size={"md"}>
        <ModalBody>
          <div className="flex flex-col gap-5">
            <p className="text-[1.5rem] font-Poppins font-regular text-[#1F3463] font-bold">{modalAction === "add" ? "Add Student" : "Edit Student Details"}</p>
            {apiError && (modalAction === "add" || modalAction === "edit") && <p className="text-red-500 text-sm text-center py-2">{apiError}</p>}
            <div className="w-[100%] flex gap-1">
              <input type="text" placeholder="First Name" value={studentFirstName} onChange={(e) => setStudentFirstName(e.target.value)} className="flex w-[50%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-black rounded-[10px] text-[0.9rem]" />
              <input type="text" placeholder="Last Name" value={studentLastName} onChange={(e) => setStudentLastName(e.target.value)} className="flex w-[50%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-black rounded-[10px] text-[0.9rem]" />
            </div>
            <div className="w-[100%] flex gap-1">
              <input type="text" placeholder="Enter ID Number" value={studentID} onChange={(e) => setStudentID(e.target.value)} className="flex w-[100%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-black rounded-[10px] text-[0.9rem]" disabled={modalAction === "edit"} />
            </div>
            <div className="w-[100%] flex gap-1">
              <Dropdown renderTrigger={() => (<div className="relative flex w-[50%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[#949494] rounded-[10px] items-center justify-between cursor-pointer"><span className={selectedCourse ? "text-black text-[0.87rem]" : "text-[#949494] text-[0.87rem]"}>{displayCourse}</span><RiArrowDropDownLine size="2em" color="#000000" /></div>)} placement="bottom-start">
                {courseOrder.map((course) => (<DropdownItem key={course} onClick={() => handleCourseSelect(course)} className={selectedCourse === course ? "bg-gray-100 text-black w-full" : "text-gray-700 hover:bg-gray-100 hover:text-black w-full"}><p className="px-[2px] font-Inter text-[0.87rem] text-black">{course}</p></DropdownItem>))}
              </Dropdown>
              <Dropdown renderTrigger={() => (<div className="relative flex w-[50%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[#949494] rounded-[10px] items-center justify-between cursor-pointer"><span className={selectedProgramYear ? "text-black text-[0.87rem]" : "text-[#949494] text-[0.87rem]"}>{displayProgramYear}</span><RiArrowDropDownLine size="2em" color="#000000" /></div>)} placement="bottom-start">
                {programYearValues.map((item) => (<DropdownItem key={item} onClick={() => handleProgramYearSelect(item)} className={selectedProgramYear === item ? "bg-gray-100 text-black w-full" : "text-gray-700 hover:bg-gray-100 hover:text-black w-full"}><p className="font-Inter text-[0.87rem] text-black">{item}</p></DropdownItem>))}
              </Dropdown>
            </div>
            <div className="w-[100%] flex gap-1">
              <button type="button" className="h-[6vh] w-[50%] bg-[#DADADA] rounded-[5px] hover:bg-gray-400" onClick={handleModalClose} disabled={isLoading}><p className="font-Poppins text-[0.87rem] text-black">Cancel</p></button>
              <button type="button" className="h-[6vh] w-[50%] bg-[#1F3463] rounded-[5px] hover:bg-blue-800" onClick={handleSaveStudent} disabled={isLoading}>
                <p className="font-Poppins text-[0.87rem] text-white">{isLoading ? (modalAction === 'add' ? 'Adding...' : 'Saving...') : 'Save'}</p>
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
      <Modal show={openDeleteStudentModal} size={"md"} dismissible onClose={handleDeleteModalClose}>
        <ModalBody>
          <div>
            <div className='w-[100%] flex justify-end'><RxCross2 className="cursor-pointer" onClick={handleDeleteModalClose} /></div>
            {apiError && modalAction === "delete" && <p className="text-red-500 text-sm text-center py-2">{apiError}</p>}
            <div className='w-[100%] flex flex-col items-center'>
              <IoIosWarning fill="#E46565" size="2.62rem" />
              <p className="text-[0.94rem] text-black font-Poppins font-semibold text-center mt-2">
                Are you sure you want to delete <br />{pendingDeleteStudent?.firstName} {pendingDeleteStudent?.lastName} ({pendingDeleteStudent?.student_id})?
              </p>
            </div>
            <div className="w-[100%] flex gap-1 mt-4">
              <button type="button" className="h-[6vh] w-[50%] bg-[#DADADA] rounded-[5px] hover:bg-gray-400" onClick={handleDeleteModalClose} disabled={isLoading}><p className="font-Poppins text-[0.87rem] text-black">Cancel</p></button>
              <button type="button" className="h-[6vh] w-[50%] bg-[#E46565] rounded-[5px] hover:bg-red-800" onClick={handleDeleteStudent} disabled={isLoading}>
                <p className="font-Poppins text-[0.87rem] text-white">{isLoading ? 'Deleting...' : 'Delete'}</p>
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}