import React, { useState, useEffect, useCallback } from 'react';
import { Button, Dropdown, DropdownItem, Modal, ModalBody } from "flowbite-react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react"; // Search is used by Header
import Header from "./Dashboard_Components/Header";
import { RiPencilFill, RiArrowDropDownLine } from "react-icons/ri";
import { BiSolidTrash } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { IoIosWarning } from "react-icons/io";
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"; // Adjust path as per your structure

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
    student_id: backendStudent.studentIdNumber, // This is studentIdNumber
    program: backendStudent.program,
    yearLevel: backendStudent.yearLevel,
    section: backendStudent.section,
    profilePictureUrl: backendStudent.profilePictureUrl,
  };
};

// --- Pagination Helper ---
const paginateList = (list, pageSize) => {
  if (!list || pageSize <= 0) return [];
  const pages = [];
  for (let i = 0; i < list.length; i += pageSize) {
    pages.push(list.slice(i, i + pageSize));
  }
  return pages;
};

// --- Sorting Constants & Helpers (Client-Side for now) ---
const courseOrder = ["BSIS", "BSSW", "BAB", "BSAIS", "BSA", "ACT"];
const programYearValues = ["1", "2", "3", "4"];

const parseCourseStringForSort = (courseStr) => { // Renamed to avoid conflict if used elsewhere
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
  return [...studentList].sort((a, b) => a.firstName.localeCompare(b.firstName));
}

function sortStudentsById(list) {
  return [...list].sort((a, b) => (a.student_id || "").localeCompare(b.student_id || ""));
}

export default function Masterlist() {
  const { token } = useAuth();
  const studentsPerPage = 8;

  const [allStudents, setAllStudents] = useState([]); // Transformed students from API
  const [studentPages, setStudentPages] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [currentPageData, setCurrentPageData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // For API errors primarily

  const [modalAction, setModalAction] = useState("add");
  const [editingStudent, setEditingStudent] = useState(null); // Stores full transformed student for edit

  const [studentFirstName, setStudentFirstName] = useState("");
  const [studentLastName, setStudentLastName] = useState("");
  const [studentID, setStudentID] = useState(""); // Corresponds to studentIdNumber

  const [openAddStudentModal, setOpenAddStudentModal] = useState(false);
  const [openDeleteStudentModal, setOpenDeleteStudentModal] = useState(false);
  const [pendingDeleteStudent, setPendingDeleteStudent] = useState(null);

  const [selectedCourse, setSelectedCourse] = useState(""); // Corresponds to 'program'
  const [displayCourse, setDisplayCourse] = useState("Choose Course");
  const [selectedProgramYear, setSelectedProgramYear] = useState(""); // Corresponds to 'yearLevel'
  const [displayProgramYear, setDisplayProgramYear] = useState("Choose year");

  // State for search term - will be connected to Header later
  const [searchTerm, setSearchTerm] = useState("");

  const fetchStudents = useCallback(async (currentSearchTerm = "") => {
    setIsLoading(true);
    setError(null);
    if (!token) {
      setError("Authentication required.");
      setIsLoading(false);
      return;
    }
    try {
      const params = {
        limit: 100 // <<<< TEMPORARILY REQUEST UP TO 100 STUDENTS
      };
      if (currentSearchTerm) {
        params.search = currentSearchTerm;
      }
      // params.page = currentPageIndex + 1; // We'll add this for proper pagination later

      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/students`, {
        headers: { Authorization: `Bearer ${token}` },
        params: params,
      });

      if (response.data?.success) {
        const transformed = response.data.data.map(transformStudentData);
        setAllStudents(transformed); // This will now contain up to 100 students
        // Note: Your client-side pagination will then work on these 100 students.
        // The `response.data.pagination` object from backend is not yet used here.
      } else {
        setError(response.data?.message || "Failed to fetch students.");
      }
    } catch (err) {
      console.error("Fetch students error:", err);
      setError(err.response?.data?.error?.message || err.message || "Error fetching students.");
    } finally {
      setIsLoading(false);
    }
  }, [token]); // Removed studentsPerPage from dependencies for now if not used in API call directly

  useEffect(() => {
    fetchStudents(searchTerm); // Fetch based on current search term
  }, [fetchStudents, searchTerm]); // Re-fetch if searchTerm changes

  const updateStudentListAndResetView = useCallback((newList) => {
    setAllStudents(newList); // This assumes client-side sorting is done on 'allStudents'
    // Pagination will be re-derived from the new 'allStudents'
  }, []);

  useEffect(() => {
    const newPages = paginateList(allStudents, studentsPerPage);
    setStudentPages(newPages);
    setCurrentPageIndex(0); // Reset to first page when allStudents changes (e.g., after sort/filter)
  }, [allStudents, studentsPerPage]);

  useEffect(() => {
    if (studentPages.length === 0) {
      setCurrentPageData([]);
      // No need to setCurrentPageIndex(0) here if already done in previous useEffect
      return;
    }
    let validIndex = currentPageIndex;
    if (validIndex >= studentPages.length && studentPages.length > 0) {
      validIndex = studentPages.length - 1;
    } else if (validIndex < 0 && studentPages.length > 0) {
      validIndex = 0;
    }
    
    if (currentPageIndex !== validIndex) {
        setCurrentPageIndex(validIndex);
    } else {
        setCurrentPageData(studentPages[validIndex] || []);
    }
  }, [studentPages, currentPageIndex]);

  const goToPreviousPage = () => {
    if (currentPageIndex > 0) setCurrentPageIndex(prev => prev - 1);
  };
  const goToNextPage = () => {
    if (currentPageIndex < studentPages.length - 1) setCurrentPageIndex(prev => prev + 1);
  };

  const handleSortByCourse = () => updateStudentListAndResetView(sortStudentsByCourseAndYear(allStudents));
  const handleSortByName = () => updateStudentListAndResetView(sortStudentsByName(allStudents));
  const handleSortById = () => updateStudentListAndResetView(sortStudentsById(allStudents));

  const resetModalForm = () => {
    setStudentFirstName(""); setStudentLastName(""); setStudentID("");
    setSelectedCourse(""); setDisplayCourse("Choose Course");
    setSelectedProgramYear(""); setDisplayProgramYear("Choose year");
    setEditingStudent(null); setError(null); // Clear API error in modal
  };

  const handleOpenModalForAdd = () => {
    setModalAction("add"); resetModalForm(); setOpenAddStudentModal(true);
  };

  const handleOpenModalForEdit = (studentToEdit) => {
    setModalAction("edit");
    setEditingStudent(studentToEdit);
    setStudentFirstName(studentToEdit.firstName);
    setStudentLastName(studentToEdit.lastName);
    setStudentID(studentToEdit.student_id); // studentIdNumber
    setSelectedCourse(studentToEdit.program);
    setDisplayCourse(studentToEdit.program || "Choose Course");
    setSelectedProgramYear(String(studentToEdit.yearLevel || ""));
    setDisplayProgramYear(String(studentToEdit.yearLevel || "") || "Choose year");
    setError(null); // Clear previous API errors
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
      // section: "A", // TODO: Add section input if needed
      // profilePictureUrl: "/images/default-avatar.png", // TODO: Add profile pic input if needed
    };

    setIsLoading(true); setError(null); // Use main isLoading for modal operations too or a separate one
    try {
      let response;
      if (modalAction === "add") {
        response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/students`, studentPayload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        if (!editingStudent?._id) {
          alert("Error: Editing student ID missing."); setIsLoading(false); return;
        }
        response = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/students/${editingStudent._id}`, studentPayload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      if (response.data.success) {
        setOpenAddStudentModal(false);
        fetchStudents(searchTerm); // Refetch
        resetModalForm();
      } else {
        setError(response.data.message || `Failed to ${modalAction} student.`);
      }
    } catch (err) {
      console.error(`Save student error (${modalAction}):`, err);
      setError(err.response?.data?.error?.message || err.message || "Error saving student.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmDeleteStudent = (student) => {
    setPendingDeleteStudent(student); setError(null); setOpenDeleteStudentModal(true);
  };

  const handleDeleteStudent = async () => {
    if (!pendingDeleteStudent?._id) {
      alert("Error: Student ID missing for deletion."); setOpenDeleteStudentModal(false); return;
    }
    setIsLoading(true); setError(null);
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/students/${pendingDeleteStudent._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setOpenDeleteStudentModal(false);
        setPendingDeleteStudent(null);
        fetchStudents(searchTerm); // Refetch
      } else {
        setError(response.data.message || "Failed to delete student.");
        // Keep modal open if delete fails to show error
      }
    } catch (err) {
      console.error("Delete student error:", err);
      setError(err.response?.data?.error?.message || err.message || "Error deleting student.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCourseSelect = (course) => { setSelectedCourse(course); setDisplayCourse(course); };
  const handleProgramYearSelect = (year) => { setSelectedProgramYear(year); setDisplayProgramYear(year); };
  const handleModalClose = () => { setOpenAddStudentModal(false); resetModalForm(); };
  const handleDeleteModalClose = () => { setOpenDeleteStudentModal(false); setPendingDeleteStudent(null); setError(null); };

  // This is the onChange for the search input that will eventually be in Header.jsx
  // For now, we'll keep a local search input for testing, then remove it.
  const handleLocalSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading && allStudents.length === 0) {
    return <div className="flex justify-center items-center h-screen">Loading students...</div>;
  }

  // Note: The main error display for fetchStudents is now handled inside the table area.
  // This top-level error is only if initial load completely fails with no data.
  if (!isLoading && error && allStudents.length === 0) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
  }

   return (
    <>
      <div className="h-[100%] w-[100%]">
        <div className="h-[10%]">
          <Header pageName={"Masterlist"} />
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
                  label={
                    <>
                      <span className="text-gray-500">Sort By:  </span>
                      <span className="font-semibold text-black">Course</span> {/* This will need to be dynamic if you want it to update */}
                    </>
                  }
                  dismissOnClick={true}
                  className="text-gray-500" // This class is on the Dropdown wrapper
                  style={{ backgroundColor: "#e5e7eb", height: "30px" }} // Style for the button trigger
                >
                  <DropdownItem onClick={handleSortByName}>Name</DropdownItem>
                  <DropdownItem onClick={handleSortByCourse}>Course</DropdownItem>
                  <DropdownItem onClick={handleSortById}>Student ID</DropdownItem>
                </Dropdown>
                <Button
                  style={{ backgroundColor: "#1F3463", height: "30px" }}
                  onClick={handleOpenModalForAdd}
                >
                  Add Student
                </Button>
              </div>
            </div>
            <div className="w-[100%] h-[75%] "> {/* This container might need overflow-y-auto if table content exceeds it */}
              <div className="w-[100%] h-[100%] grid grid-rows-9 flex"> {/* Your original: `flex` here seems redundant with `grid` */}
                {/* Table Headers */}
                <div className="flex mx-[30px] border-b-[1px] border-[#D9D9D9]"> {/* Header Row */}
                  <div className="w-[100%] h-[100%] flex justify-start items-end">
                    <p className="font-Poppins text-[#1F3463] text-[0.9rem] font-bold">Student Name</p>
                  </div>
                  <div className="w-[100%] h-[100%] flex justify-center items-end">
                    <p className="font-Poppins text-[#1F3463] text-[0.9rem] font-bold">Course/Year</p>
                  </div>
                  <div className="w-[100%] h-[100%] flex justify-center items-end">
                    <p className="font-Poppins text-[#1F3463] text-[0.9rem] font-bold">Student ID no.</p>
                  </div>
                  <div className="w-[100%] h-[100%] flex justify-center items-end">
                    <p className="font-Poppins text-[#1F3463] text-[0.9rem] font-bold text-center">Action</p>
                  </div>
                </div>

                {/* Table Body - Conditional Rendering for Data Rows */}
                {/* Display loading state for the table body area specifically */}
                {isLoading && <div className="col-span-4 row-span-8 text-center py-4 flex justify-center items-center">Loading students...</div>}
                {/* Display error state for the table body area */}
                {!isLoading && error && <div className="col-span-4 row-span-8 text-center py-4 text-red-500 flex justify-center items-center">Error: {error}</div>}
                {/* Display data rows */}
                {!isLoading && !error && currentPageData && currentPageData.length > 0 ? (
                  currentPageData.map((student) => (
                    <div key={student._id || student.student_id} className="flex mx-[30px] border-b-[1px] border-[#D9D9D9]"> {/* Data Row */}
                      <div className="h-[100%] w-[100%] flex items-end py-2">
                        <p className="font-Poppins text-black text-[0.9rem]">
                          {`${student.firstName || ''} ${student.lastName || ''}`}
                        </p>
                      </div>
                      <div className="w-[100%] h-[100%] flex justify-center items-end py-2">
                        <p className="font-Poppins text-black text-[0.9rem]">
                          {student.course} {/* Transformed: Program + Year */}
                        </p>
                      </div>
                      <div className="h-[100%] w-[100%] flex items-end justify-center py-2">
                        <p className="font-Poppins text-black text-[0.9rem]">
                          {student.student_id} {/* Transformed: studentIdNumber */}
                        </p>
                      </div>
                      <div className="h-[100%] w-[100%] font-Poppins text-[#1F3463] text-[0.9rem] font-bold text-center flex items-end justify-center gap-3 py-2">
                        <RiPencilFill className="cursor-pointer" color="#5594E2" size="1.70vw" onClick={() => handleOpenModalForEdit(student)} />
                        <BiSolidTrash className="cursor-pointer" color="#E46565" size="1.70vw" onClick={() => handleConfirmDeleteStudent(student)} /> {/* Pass student object */}
                      </div>
                    </div>
                  ))
                ) : null /* End of data rows mapping - null if no data and not loading/error */}
                
                {/* Message for no students if not loading and no error and no data */}
                {!isLoading && !error && currentPageData.length === 0 && (
                  <div className="col-span-4 row-span-8 text-center py-4 flex justify-center items-center h-full">No students to display.</div>
                )}
                
                {/* Filler for empty rows to maintain layout - this logic might need refinement based on actual row heights */}
                {/* This is only useful if grid-rows-9 is meant to create a fixed-height table regardless of data */}
                {/* You might remove this if dynamic height based on content is preferred */}
                {!isLoading && !error && currentPageData.length > 0 && currentPageData.length < studentsPerPage &&
                  Array.from({ length: studentsPerPage - currentPageData.length }).map((_, index) => (
                    <div key={`empty-${index}`} className="flex mx-[30px] border-b-[1px] border-transparent h-[calc(100%/9)]"> {/* Invisible border for spacing */}
                      <div className="w-[100%] h-[100%]"></div>
                      <div className="w-[100%] h-[100%]"></div>
                      <div className="w-[100%] h-[100%]"></div>
                      <div className="w-[100%] h-[100%]"></div>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="w-[100%] h-[15%] flex items-center justify-between">
              <button /* Using button for better accessibility and explicit disable */
                className={`bg-gray-200 hover:bg-gray-300 text-gray-700 font-Poppins py-1 px-3 rounded-[10px] w-auto flex items-center justify-center ml-[40px] text-sm ${currentPageIndex === 0 || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={goToPreviousPage}
                disabled={currentPageIndex === 0 || isLoading}
              >
                <ChevronLeft size="18" className="mr-1"/> Previous
              </button>
              <span className="text-[0.9rem] font-Poppins text-gray-500">
                Page {studentPages.length > 0 ? currentPageIndex + 1 : 0} of {studentPages.length}
              </span>
              <button
                className={`bg-gray-200 hover:bg-gray-300 text-gray-700 font-Poppins py-1 px-3 rounded-[10px] w-auto flex items-center justify-center mr-[50px] text-sm ${currentPageIndex >= studentPages.length - 1 || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={goToNextPage}
                disabled={currentPageIndex >= studentPages.length - 1 || isLoading}
              >
                Next <ChevronRight size="18" className="ml-1"/>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Modals --- */}
      {/* Ensure the modal structures and props are copied from the previous complete logic version */}
      {/* Add Student / Edit Student Modal */}
      <Modal show={openAddStudentModal} dismissible onClose={handleModalClose} size={"md"}>
        <ModalBody>
          <div className="flex flex-col gap-5">
            <p className="text-[1.5rem] font-Poppins font-regular text-[#1F3463] font-bold">
              {modalAction === "add" ? "Add Student" : "Edit Student Details"}
            </p>
            {/* Display API error specific to modal operations here */}
            {error && (modalAction === "add" || modalAction === "edit") && <p className="text-red-500 text-sm text-center py-2">{error}</p>}
            <div className="w-[100%] flex gap-1">
              <input type="text" placeholder="First Name" value={studentFirstName} onChange={(e) => setStudentFirstName(e.target.value)} className="flex w-[50%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-black rounded-[10px] text-[0.9rem]" />
              <input type="text" placeholder="Last Name" value={studentLastName} onChange={(e) => setStudentLastName(e.target.value)} className="flex w-[50%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-black rounded-[10px] text-[0.9rem]" />
            </div>
            <div className="w-[100%] flex gap-1">
              <input type="text" placeholder="Enter ID Number" value={studentID} onChange={(e) => setStudentID(e.target.value)} className="flex w-[100%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-black rounded-[10px] text-[0.9rem]" disabled={modalAction === "edit"} />
            </div>
            <div className="w-[100%] flex gap-1">
              <Dropdown
                renderTrigger={() => (<div className="relative flex w-[50%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[#949494] rounded-[10px] items-center justify-between cursor-pointer"> <span className={selectedCourse ? "text-black text-[0.87rem]" : "text-[#949494] text-[0.87rem]"}>{displayCourse}</span><RiArrowDropDownLine size="2em" color="#000000" /></div>)}
                placement="bottom-start"
              >
                {courseOrder.map((course) => (<DropdownItem key={course} onClick={() => handleCourseSelect(course)} className={selectedCourse === course ? "bg-gray-100 text-black w-full" : "text-gray-700 hover:bg-gray-100 hover:text-black w-full"}><p className="px-[2px] font-Inter text-[0.87rem] text-black">{course}</p></DropdownItem>))}
              </Dropdown>
              <Dropdown
                renderTrigger={() => (<div className="relative flex w-[50%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[#949494] rounded-[10px] items-center justify-between cursor-pointer"><span className={selectedProgramYear ? "text-black text-[0.87rem]" : "text-[#949494] text-[0.87rem]"}>{displayProgramYear}</span><RiArrowDropDownLine size="2em" color="#000000" /></div>)}
                placement="bottom-start"
              >
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

      {/* Delete Confirmation Modal */}
      <Modal show={openDeleteStudentModal} size={"md"} dismissible onClose={handleDeleteModalClose}>
        <ModalBody>
          <div>
            <div className='w-[100%] flex justify-end'>
              <RxCross2 className="cursor-pointer" onClick={handleDeleteModalClose} />
            </div>
             {/* Display API error specific to delete operations here */}
            {error && modalAction === "delete" && <p className="text-red-500 text-sm text-center py-2">{error}</p>}
            <div className='w-[100%] flex flex-col items-center'>
              <IoIosWarning fill="#E46565" size="2.62rem" />
              <p className="text-[0.94rem] text-black font-Poppins font-semibold text-center mt-2">
                Are you sure you want to delete <br /> 
                {pendingDeleteStudent?.firstName} {pendingDeleteStudent?.lastName} ({pendingDeleteStudent?.student_id})?
              </p>
            </div>
            <div className="w-[100%] flex gap-1 mt-4">
              <button type="button" className="h-[6vh] w-[50%] bg-[#DADADA] rounded-[5px] hover:bg-gray-400" onClick={handleDeleteModalClose} disabled={isLoading}>
                <p className="font-Poppins text-[0.87rem] text-black">Cancel</p>
              </button>
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