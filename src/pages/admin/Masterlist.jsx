import React, { useState, useEffect, useCallback } from 'react';
import { Button, Dropdown, DropdownItem, Modal, ModalBody } from "flowbite-react"; // Removed unused Select
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "./Dashboard_Components/Header";
import { RiPencilFill, RiArrowDropDownLine } from "react-icons/ri";
import { BiSolidTrash } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { IoIosWarning } from "react-icons/io";

import studentListSource from "../../sample-data/studentNames.json"; // Assuming this is your data

const paginateList = (list, pageSize) => {
  if (!list || pageSize <= 0) {
    return [];
  }
  const pages = [];
  for (let i = 0; i < list.length; i += pageSize) {
    pages.push(list.slice(i, i + pageSize));
  }
  return pages;
};

const courseOrder = ["BSIS", "BSSW", "BAB", "BSAIS", "BSA", "ACT"]; // Add more as needed
const programYear = ["1", "2", "3", "4"]; // Added "5" for flexibility

// Robust parsing for course and year string (e.g., "BS Computer Science 1")
const parseCourseString = (courseStr) => {
  const parts = (courseStr || "").split(" ");
  let courseName = courseStr || "";
  let year = "";

  if (parts.length > 1) {
    const lastPart = parts[parts.length - 1];
    // Check if the last part is a number (year) and is a recognized program year
    if (!isNaN(parseInt(lastPart, 10)) && programYear.includes(lastPart)) {
      year = lastPart;
      courseName = parts.slice(0, -1).join(" ");
    }
  }
  return { courseName, year };
};

function sortStudentsByCourseAndYear(list) {
  const sortedList = [...list].sort((a, b) => {
    const { courseName: courseA, year: yearStrA } = parseCourseString(a.course);
    const { courseName: courseB, year: yearStrB } = parseCourseString(b.course);
    const yearA = parseInt(yearStrA, 10) || 0;
    const yearB = parseInt(yearStrB, 10) || 0;

    const courseComparison = courseOrder.indexOf(courseA) - courseOrder.indexOf(courseB);
    if (courseComparison !== 0) {
      return courseComparison;
    } else {
      return yearA - yearB;
    }
  });
  return sortedList;
}

function sortStudentsByName(studentList) {
  return [...studentList].sort((a, b) => {
    return a.firstName.localeCompare(b.firstName);
  });
}

function sortStudentsById(list) {
  return [...list].sort((a, b) => {
    const idA = parseInt(String(a.student_id).replace(/\D/g, ''), 10) || 0;
    const idB = parseInt(String(b.student_id).replace(/\D/g, ''), 10) || 0;
    return idA - idB;
  });
}

export default function Masterlist() {
  const studentsPerPage = 8;
  // Ensure studentListSource is an array, provide fallback if necessary
  const [students, setStudents] = useState(Array.isArray(studentListSource) ? studentListSource : []);
  const [studentPages, setStudentPages] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState([]);

  const [modalAction, setModalAction] = useState("add");
  const [editingStudentOriginalId, setEditingStudentOriginalId] = useState(null);

  const [studentFirstName, setStudentFirstName] = useState("");
  const [studentLastName, setStudentLastName] = useState(""); // Corrected typo
  const [studentID, setStudentID] = useState("");

  const [openAddStudentModal, setOpenAddStudentModal] = useState(false);
  const [openDeleteStudentModal, setOpenDeleteStudentModal] = useState(false);
  const [pendingDelete, setPendingDelete] = useState("")

  const [selectedCourse, setSelectedCourse] = useState("");
  const [displayCourse, setDisplayCourse] = useState("Choose Course");

  const [selectedProgramYear, setSelectedProgramYear] = useState("");
  const [displayProgramYear, setDisplayProgramYear] = useState("Choose year");

  // Used by sorting functions to update list and reset to page 0
  const updateStudentListAndResetView = useCallback((newList) => {
    setStudents(newList);
    const newPages = paginateList(newList, studentsPerPage);
    setStudentPages(newPages); // Set pages directly
    setCurrentPageIndex(0); // Go to first page
    setCurrentPage(newPages[0] || []); // Set current page content directly
  }, [studentsPerPage]);

  // Effect 1: Derive studentPages from students array
  useEffect(() => {
    const newPages = paginateList(students, studentsPerPage);
    setStudentPages(newPages);
  }, [students, studentsPerPage]);

  // Effect 2: Derive currentPage from studentPages and currentPageIndex, handle index bounds
  useEffect(() => {
    if (studentPages.length === 0) {
      setCurrentPage([]);
      if (currentPageIndex !== 0) setCurrentPageIndex(0); // Reset index if no pages
      return;
    }

    let validIndex = currentPageIndex;
    if (validIndex >= studentPages.length) {
      validIndex = studentPages.length - 1;
      setCurrentPageIndex(validIndex); // This will re-trigger this effect
    } else if (validIndex < 0 && studentPages.length > 0) { // Should not happen with current logic but good practice
      validIndex = 0;
      setCurrentPageIndex(validIndex); // This will re-trigger this effect
    }


    // Only update currentPage if the index is now stable and valid
    if (validIndex === currentPageIndex && validIndex >= 0 && validIndex < studentPages.length) {
      setCurrentPage(studentPages[validIndex]);
    } else if (studentPages.length > 0 && currentPageIndex >= 0 && currentPageIndex < studentPages.length) {
      // If index was corrected, this branch will be hit in the next run of the effect
      setCurrentPage(studentPages[currentPageIndex]);
    }


  }, [studentPages, currentPageIndex]);


  const goToPreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prevIndex => prevIndex - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPageIndex < studentPages.length - 1) {
      setCurrentPageIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleSortByCourse = () => {
    const sortedList = sortStudentsByCourseAndYear(students);
    updateStudentListAndResetView(sortedList);
  };

  const handleSortByName = () => {
    const sortedList = sortStudentsByName(students);
    updateStudentListAndResetView(sortedList);
  };

  const handleSortById = () => {
    const sortedList = sortStudentsById(students);
    updateStudentListAndResetView(sortedList);
  };

  const resetModalForm = () => {
    setStudentFirstName("");
    setStudentLastName("");
    setStudentID("");
    setSelectedCourse("");
    setDisplayCourse("Choose Course");
    setSelectedProgramYear("");
    setDisplayProgramYear("Choose year");
    setEditingStudentOriginalId(null);
  };

  const handleOpenModalForAdd = () => {
    setModalAction("add");
    resetModalForm();
    setOpenAddStudentModal(true);
  };

  const handleOpenModalForEdit = (studentToEdit) => {
    setModalAction("edit");
    setEditingStudentOriginalId(studentToEdit.student_id);
    setStudentFirstName(studentToEdit.firstName || "");
    setStudentLastName(studentToEdit.lastName || "");
    setStudentID(studentToEdit.student_id || "");

    const { courseName, year } = parseCourseString(studentToEdit.course);

    setSelectedCourse(courseName);
    setDisplayCourse(courseName || "Choose Course");
    setSelectedProgramYear(year);
    setDisplayProgramYear(year || "Choose year");

    setOpenAddStudentModal(true);
  };

  const handleSaveStudent = () => {
    if (!studentFirstName.trim() || !studentLastName.trim() || !studentID.trim() || !selectedCourse || !selectedProgramYear) {
      alert("Please fill in all required fields: First Name, Last Name, Student ID, Course, and Year.");
      return;
    }

    const studentData = {
      firstName: studentFirstName.trim(),
      lastName: studentLastName.trim(),
      student_id: studentID.trim(),
      course: `${selectedCourse} ${selectedProgramYear}`,
    };

    let updatedStudents;
    if (modalAction === "add") {
      if (students.some(s => s.student_id === studentData.student_id)) {
        alert("Student ID already exists. Please use a unique ID.");
        return;
      }
      updatedStudents = [studentData, ...students];
      setStudents(updatedStudents);
      // Go to the page where the new student is added (usually the last page)
      // const newStudentIndex = updatedStudents.length - 1;
      // setCurrentPageIndex(Math.floor(newStudentIndex / studentsPerPage));

      setCurrentPageIndex(0); //as per testing, they go to the first page also

    } else { // modalAction === "edit"
      if (editingStudentOriginalId !== studentData.student_id && students.some(s => s.student_id === studentData.student_id)) {
        alert("The new Student ID already exists for another student. Please use a unique ID.");
        return;
      }
      updatedStudents = students.map(s =>
        s.student_id === editingStudentOriginalId ? { ...s, ...studentData } : s
      );
      setStudents(updatedStudents);
      // Go to the page of the edited student
      const editedStudentIndex = updatedStudents.findIndex(s => s.student_id === studentData.student_id);
      if (editedStudentIndex !== -1) {
        setCurrentPageIndex(Math.floor(editedStudentIndex / studentsPerPage));
      } else {
        setCurrentPageIndex(0); // Fallback if somehow not found
      }
    }
    setOpenAddStudentModal(false);
    // Form is reset by `onClose` or when opening for `add`
  };

  // Placeholder for delete functionality if you re-enable it
  const handleConfirmDeleteStudent = (studentIdToDelete) => {
    setOpenDeleteStudentModal(true);
    setPendingDelete(studentIdToDelete)
  };

  const handleDeleteStudent = () => {
    const newStudentList = students.filter(student => student.student_id !== pendingDelete);
    setStudents(newStudentList);
    setPendingDelete("");
    setOpenDeleteStudentModal(false)
  }


  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setDisplayCourse(course);
  };

  const handleProgramYearSelect = (year) => {
    setSelectedProgramYear(year);
    setDisplayProgramYear(year);
  };

  const handleModalClose = () => {
    setOpenAddStudentModal(false);
    resetModalForm(); // Reset form on any close action
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
                      <span className="text-gray-500">Sort By: &nbsp;</span>
                      <span className="font-semibold text-black">{selectedCourse}</span>
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
            <div className="w-[100%] h-[75%] ">
              <div className="w-[100%] h-[100%] grid grid-rows-9 flex"> {/* `flex` here seems redundant with `grid` */}
                <div className="flex mx-[30px] border-b-[1px] border-[#D9D9D9]">
                  <div className="w-[100%] h-[100%] flex justify-start items-end">
                    <p className="font-Poppins text-[#1F3463] text-[0.9rem] font-bold">
                      Student Name
                    </p>
                  </div>
                  <div className="w-[100%] h-[100%] flex justify-center items-end">
                    <p className="font-Poppins text-[#1F3463] text-[0.9rem] font-bold">
                      Course/Year
                    </p>
                  </div>
                  <div className="w-[100%] h-[100%] flex justify-center items-end">
                    <p className="font-Poppins text-[#1F3463] text-[0.9rem] font-bold">
                      Student ID no.
                    </p>
                  </div>
                  <div className="w-[100%] h-[100%] flex justify-center items-end">
                    <p className="font-Poppins text-[#1F3463] text-[0.9rem] font-bold text-center">
                      Action
                    </p>
                  </div>
                </div>

                {currentPage && currentPage.length > 0 ? (
                  currentPage.map((student) => (
                    <div key={student.student_id} className="flex mx-[30px] border-b-[1px] border-[#D9D9D9]">
                      <div className="h-[100%] w-[100%] flex items-end py-2"> {/* Changed items-end to items-center for better vertical alignment */}
                        <p className="font-Poppins text-black text-[0.9rem]">
                          {`${student.firstName || ''} ${student.lastName || ''}`}
                        </p>
                      </div>
                      <div className="w-[100%] h-[100%] flex justify-center items-end py-2">
                        <p className="font-Poppins text-black text-[0.9rem]">
                          {student.course}
                        </p>
                      </div>
                      <div className="h-[100%] w-[100%] flex items-end justify-center py-2">
                        <p className="font-Poppins text-black text-[0.9rem]">
                          {student.student_id}
                        </p>
                      </div>
                      <div className="h-[100%] w-[100%] font-Poppins text-[#1F3463] text-[0.9rem] font-bold text-center flex items-end justify-center gap-3 py-2">
                        <RiPencilFill className="cursor-pointer" color="#5594E2" size="1.70vw" onClick={() => handleOpenModalForEdit(student)} />
                        <BiSolidTrash className="cursor-pointer" color="#E46565" size="1.70vw" onClick={() => handleConfirmDeleteStudent(student.student_id)} />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-4 text-center py-4 flex justify-center items-center h-full">No students to display.</div>
                )}
              </div>
            </div>

            <div className="w-[100%] h-[15%] flex items-center justify-between">
              <div
                className="bg-[#D9D9D9] rounded-[10px] py-1 px-2 w-auto flex items-center justify-center ml-[40px] cursor-pointer hover:bg-gray-300" // Made width auto
                onClick={goToPreviousPage}
              >
                <ChevronLeft size="1.1vw" />
                <span className="text-[0.9rem] font-Poppins text-[#292D32] font-Regular ml-1"> {/* Added margin */}
                  Previous
                </span>
              </div>
              <span className="text-[0.9rem] font-Poppins text-gray-500">
                Page {studentPages.length > 0 ? currentPageIndex + 1 : 0} of {studentPages.length}
              </span>
              <div
                className="bg-[#D9D9D9] rounded-[10px] py-1 px-2 w-auto flex items-center justify-center mr-[50px] cursor-pointer hover:bg-gray-300" // Made width auto
                onClick={goToNextPage}
              >
                <span className="text-[0.9rem] font-Poppins text-[#292D32] font-regular mr-1"> {/* Added margin */}
                  Next
                </span>
                <ChevronRight size="1.1vw" />
              </div>
            </div>
          </div>
        </div>
      </div >

      <Modal show={openAddStudentModal} dismissible onClose={handleModalClose} size={"md"}>
        <ModalBody>
          <div className="flex flex-col gap-5">
            <p className="text-[1.5rem] font-Poppins font-regular text-[#1F3463] font-bold">
              {modalAction === "add" ? "Add Student" : "Edit Student Details"}
            </p>
            <div className="w-[100%] flex gap-1">
              <input
                type="text"
                placeholder="First Name"
                value={studentFirstName}
                onChange={(e) => setStudentFirstName(e.target.value)}
                className="flex w-[50%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-black rounded-[10px] text-[0.9rem]"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={studentLastName}
                onChange={(e) => setStudentLastName(e.target.value)} // Corrected typo
                className="flex w-[50%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-black rounded-[10px] text-[0.9rem]"
              />
            </div>
            <div className="w-[100%] flex gap-1">
              <input
                type="text"
                placeholder="Enter ID Number"
                value={studentID}
                onChange={(e) => setStudentID(e.target.value)}
                className="flex w-[100%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-black rounded-[10px] text-[0.9rem]"
                disabled={modalAction === "edit"} // Optionally disable ID editing
              />
            </div>
            <div className="w-[100%] flex gap-1">
              <Dropdown
                renderTrigger={() => (
                  <div className="relative flex w-[50%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[#949494] rounded-[10px] items-center justify-between cursor-pointer"> {/* Changed to justify-between */}
                    <span className={selectedCourse ? "text-black text-[0.87rem]" : "text-[#949494] text-[0.87rem]"}>
                      {displayCourse}
                    </span>
                    <RiArrowDropDownLine size="2em" color="#000000" />
                  </div>
                )}
                placement="bottom-start" // Adjusted placement
              >
                {/* Removed the problematic w-[50%] div wrapper */}
                {courseOrder.map((course) => (
                  <DropdownItem
                    key={course}
                    onClick={() => handleCourseSelect(course)}
                    className={selectedCourse === course ? "bg-gray-100 text-black w-full" : "text-gray-700 hover:bg-gray-100 hover:text-black w-full"} // Ensure items take full width
                  >
                    <p className="px-[2px] font-Inter text-[0.87rem] text-black">{course}</p>
                  </DropdownItem>
                ))}
              </Dropdown>
              
              <Dropdown
                renderTrigger={() => (
                  <div className="relative flex w-[50%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[#949494] rounded-[10px] items-center justify-between cursor-pointer"> {/* Changed to justify-between */}
                    <span className={selectedProgramYear ? "text-black text-[0.87rem]" : "text-[#949494] text-[0.87rem]"}>
                      {displayProgramYear}
                    </span>
                    <RiArrowDropDownLine size="2em" color="#000000" />
                  </div>
                )}
                placement="bottom-start" // Adjusted placement
              >
                {programYear.map((item) => (
                  <DropdownItem key={item} onClick={() => handleProgramYearSelect(item)} className={selectedProgramYear === item ? "bg-gray-100 text-black w-full" : "text-gray-700 hover:bg-gray-100 hover:text-black w-full"}>
                    <p className="font-Inter text-[0.87rem] text-black">{item}</p>
                  </DropdownItem>
                ))}
              </Dropdown>
            </div>
            <div className="w-[100%] flex gap-1">
              <button type="button" className="h-[6vh] w-[50%] bg-[#DADADA] rounded-[5px] hover:bg-gray-400" onClick={handleModalClose}>
                <p className="font-Poppins text-[0.87rem] text-black">
                  Cancel
                </p>
              </button>
              <button type="button" className="h-[6vh] w-[50%] bg-[#1F3463] rounded-[5px] hover:bg-blue-800" onClick={handleSaveStudent}>
                <p className="font-Poppins text-[0.87rem] text-white">
                  Save
                </p>
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      <Modal show={openDeleteStudentModal} size={"md"} dismissible>
        <ModalBody>
          <div>
            <div className='w-[100%] flex justify-end mr-20px'>
              <RxCross2 className="cursor-pointer" onClick={() => { setOpenDeleteStudentModal(false) }} />
            </div>
            <div className='w-[100%] flex flex-col items-center'>
              <IoIosWarning fill="#E46565" size="2.62rem" />
              <p className="text-[0.94rem] text-black font-Poppins font-semibold text-center mt-2">
                Are you sure you want to delete <br />the selected list ?
              </p>
            </div>
            <div className="w-[100%] flex gap-1 mt-4">
              <button type="button" className="h-[6vh] w-[50%] bg-[#DADADA] rounded-[5px] hover:bg-gray-400 focus:outline-none" onClick={handleModalClose}>
                <p className="font-Poppins text-[0.87rem] text-black">
                  Cancel
                </p>
              </button>
              <button type="button" className="h-[6vh] w-[50%] bg-[#E46565] rounded-[5px] hover:bg-red-800" onClick={handleDeleteStudent}>
                <p className="font-Poppins text-[0.87rem] text-white">
                  Delete
                </p>
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}