import React, { useState, useEffect, useCallback } from 'react';
import { Button, Dropdown, DropdownItem, Modal, ModalBody } from "flowbite-react";
import { ChevronLeft, ChevronRight } from "lucide-react"
import Header from "./Dashboard_Components/Header"
import { RiPencilFill, RiArrowDropDownLine } from "react-icons/ri";
import { BiSolidTrash } from "react-icons/bi";

import studentList from "../../sample-data/studentNames.json"; // Assuming this is your data

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

function sortStudentsByCourseAndYear(studentList) {
  const courseOrder = ["BSIS", "BSSW", "BAB", "BSAIS", "BSA", "ACT"];

  const sortedList = [...studentList].sort((a, b) => {
    const courseA = a.course.split(" ")[0];
    const courseB = b.course.split(" ")[0];
    const yearA = parseInt(a.course.split(" ")[1], 10);
    const yearB = parseInt(b.course.split(" ")[1], 10);

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
    return a.name.localeCompare(b.name);
  });
}

function sortStudentsById(studentList) {
  return [...studentList].sort((a, b) => {
    const idA = parseInt(a.student_id.replace(/\D/g, ''), 10);
    const idB = parseInt(b.student_id.replace(/\D/g, ''), 10);
    return idA - idB;
  });
}

export default function Masterlist() {
  const studentsPerPage = 8;
  const [students, setStudents] = useState(studentList);
  const [studentPages, setStudentPages] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState([]);

  const [modalAction, setModalAction] = useState("add");
  const [studentName, setStudentName] = useState("")
  const [studentProgram, setStudentProgram] = useState("")
  const [studentID, setStudentID] = useState("")

  const [openAddStudentModal, setOpenAddStudentModal] = useState(false);

  // Function to update and paginate the student list
  const updateStudentList = useCallback((newList) => {
    setStudents(newList);
    const newPages = paginateList(newList, studentsPerPage);
    setStudentPages(newPages);
    setCurrentPageIndex(0);
    setCurrentPage(newPages[0] || []);
  }, [studentsPerPage]);

  // Initial effect to set up the first page
  useEffect(() => {
    const initialPages = paginateList(students, studentsPerPage);
    setStudentPages(initialPages);
    setCurrentPage(initialPages[0] || []);
  }, [students, studentsPerPage]); //Removed updateStudentList from dependency array

  useEffect(() => {
    if (studentPages.length > 0 && currentPageIndex < studentPages.length) {
      setCurrentPage(studentPages[currentPageIndex]);
    }
  }, [studentPages, currentPageIndex]);


  const displayPage = (pageIndex) => {
    if (pageIndex >= 0 && pageIndex < studentPages.length) {
      setCurrentPageIndex(pageIndex);
    } else {
      alert(`Page index ${pageIndex + 1} is out of bounds.`);
    }
  };

  const goToPreviousPage = () => {
    if (currentPageIndex > 0) {
      displayPage(currentPageIndex - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPageIndex < studentPages.length - 1) {
      displayPage(currentPageIndex + 1);
    }
  };

  const handleSortByCourse = () => {
    const sortedList = sortStudentsByCourseAndYear(students);
    updateStudentList(sortedList);
  };

  const handleSortByName = () => {
    const sortedList = sortStudentsByName(students);
    updateStudentList(sortedList);
  };

  const handleSortById = () => {
    const sortedList = sortStudentsById(students);
    updateStudentList(sortedList);
  };

  const handleAddStudent = () => {
    const newStudent = {
      name: `New Student ${students.length + 1}`,
      course: "BSIS 1",
      student_id: `24-${Math.floor(Math.random() * 1000000)}`,
    };
    setStudents(prevStudents => [...prevStudents, newStudent]);
  };

  // const handleDeleteStudent = (studentId) => {
  //   setStudents(prevStudents => prevStudents.filter(student => student.student_id !== studentId));
  // };

  const handleEditStudent = (studentId, studentName, studentProgram) => {
    setStudentID(studentId);
    setStudentName(studentName);
    setStudentProgram(studentProgram);
    setOpenAddStudentModal(true);
    setModalAction("edit")
  };

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
                      <span className="font-semibold text-black">Course</span>
                    </>
                  }
                  dismissOnClick={true}
                  className="text-gray-500"
                  style={{ backgroundColor: "#e5e7eb", height: "30px" }}
                >
                  <DropdownItem onClick={handleSortByName}>Name</DropdownItem>
                  <DropdownItem onClick={handleSortByCourse}>Course</DropdownItem>
                  <DropdownItem onClick={handleSortById}>Student ID</DropdownItem>
                </Dropdown>
                <Button
                  style={{ backgroundColor: "#1F3463", height: "30px" }}
                  onClick={() => {
                    setOpenAddStudentModal(true)
                    setModalAction("add")
                  }}
                >
                  Add Student
                </Button>
              </div>
            </div>
            <div className="w-[100%] h-[75%] ">
              <div className="w-[100%] h-[100%] grid grid-rows-9 flex">
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

                {/* Render the current page of students */}
                {currentPage && currentPage.length > 0 ? (
                  currentPage.map((student) => (
                    <div key={student.student_id} className="flex mx-[30px] border-b-[1px] border-[#D9D9D9]">
                      <div className="h-[100%] w-[100%] flex items-end">
                        <p className="font-Poppins text-black text-[0.9rem]">
                          {student.name}
                        </p>
                      </div>
                      <div className="w-[100%] h-[100%] flex justify-center items-end">
                        <p className="font-Poppins text-black text-[0.9rem]">
                          {student.course}
                        </p>
                      </div>
                      <div className="h-[100%] w-[100%] flex items-end justify-center">
                        <p className="font-Poppins text-black text-[0.9rem]">
                          {student.student_id}
                        </p>
                      </div>
                      <div className="h-[100%] w-[100%] font-Poppins text-[#1F3463] text-[0.9rem] font-bold text-center flex items-end justify-center gap-3">
                        <RiPencilFill color="#5594E2" size="1.70vw" onClick={handleEditStudent}/>
                        <BiSolidTrash color="#E46565" size="1.70vw" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-4 text-center py-4">No students to display.</div>
                )}
              </div>
            </div>

            <div className="w-[100%] h-[15%] flex items-center justify-between">
              <div
                className="bg-gray-300 rounded-[10px] py-1 px-2 w-[10%] flex items-center justify-center ml-[40px]"
                onClick={goToPreviousPage}
              >
                <ChevronLeft size="1.1vw" />
                <span className="text-[0.9rem] font-Poppins text-[#292D32] font-Regular">
                  Previous
                </span>
              </div>
              <span className="text-[0.9rem] font-Poppins text-gray-500 cursor-pointer">
                Page {currentPageIndex + 1} of {studentPages.length}
              </span>
              <div
                className="bg-gray-300 rounded-[10px] py-1 px-2 w-[10%] flex items-center justify-center mr-[50px]"
                onClick={goToNextPage}
              >
                <span className="text-[0.9rem] font-Poppins text-[#292D32] font-regular cursor-pointer">
                  Next
                </span>
                <ChevronRight size="1.1vw" />
              </div>
            </div>
          </div>
        </div>
      </div >

      <Modal show={openAddStudentModal} dismissible onClose={() => { setOpenAddStudentModal(false) }} size={"md"}>
        <ModalBody>
          <div className="flex flex-col gap-5">
            <p className="text-[1.5rem] font-Poppins font-regular text-[#1F3463] font-bold">
              {modalAction === "add" ? "Add Student" : "Edit Form"}

            </p>
            <div className="w-[100%] flex gap-1">
              <input
                type="text"
                placeholder="First Name"
                value={modalAction === "edit" ? studentName : ""}
                className="flex w-[50%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-black rounded-[10px] text-[0.9rem]"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="flex w-[50%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-black rounded-[10px] text-[0.9rem]"
              />
            </div>
            <div className="w-[100%] flex gap-1">
              <input
                type="text"
                placeholder="Enter ID Number"
                value={modalAction === "edit" ? studentID : ""}
                className="flex w-[100%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-black rounded-[10px] text-[0.9rem]"
              />
            </div>
            <div className="w-[100%] flex gap-1">
              <Dropdown
                label=""
                renderTrigger={() =>
                  <div className="relative flex w-[50%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[#949494] rounded-[10px] items-center justify-center">
                    <p className="text-[0.87rem]">Choose Courses</p> <div><RiArrowDropDownLine size="2em" color="#000000" /></div>
                  </div>}
                placement="right"
              >
                <DropdownItem><p className="px-[2px] font-Inter text-[0.87rem] text-black">BSIS</p></DropdownItem>
                <DropdownItem><p className="px-[2px] font-Inter text-[0.87rem] text-black">BSSW</p></DropdownItem>
                <DropdownItem><p className="px-[2px] font-Inter text-[0.87rem] text-black">BAB</p></DropdownItem>
                <DropdownItem><p className="px-[2px] font-Inter text-[0.87rem] text-black">BSAIS</p></DropdownItem>
                <DropdownItem><p className="px-[2px] font-Inter text-[0.87rem] text-black">BSA</p></DropdownItem>
                <DropdownItem><p className="px-[2px] font-Inter text-[0.87rem] text-black">ACT</p></DropdownItem>
              </Dropdown>
              <Dropdown
                label=""
                renderTrigger={() =>
                  <div className="flex w-[50%] h-[6vh] focus:outline-gray-100 focus:border-gray-500 border-[1px] px-[10px] font-Poppins font-light text-[#949494] rounded-[10px] items-center justify-center">
                    <p className="text-[0.87rem]">Choose Year</p> <div><RiArrowDropDownLine size="2em" color="#000000" /></div>
                  </div>}
                placement='top'
              >
                <DropdownItem><p className="font-Inter text-[0.87rem] text-black">1</p></DropdownItem>
                <DropdownItem><p className="font-Inter text-[0.87rem] text-black">2</p></DropdownItem>
                <DropdownItem><p className="font-Inter text-[0.87rem] text-black">3</p></DropdownItem>
                <DropdownItem><p className="font-Inter text-[0.87rem] text-black">4</p></DropdownItem>
              </Dropdown>
            </div>
            <div className="w-[100%] flex gap-1">
              <button className="h-[6vh] w-[50%] bg-[#DADADA] rounded-[5px]" onClick={() => setOpenAddStudentModal(false)}>
                <p className="font-Poppins text-[0.87rem] text-black">
                  Cancel
                </p>
              </button>
              <button className="h-[6vh] w-[50%] bg-[#1F3463] rounded-[5px]">
                <p className="font-Poppins text-[0.87rem] text-white">
                  Save
                </p>
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

