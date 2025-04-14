import { Button, Dropdown, DropdownItem } from "flowbite-react";
import Header from "./Dashboard_Components/Header"


export default function Masterlist() {
    return (
        <>
            <div className="h-[100%] w-[100%]">
                <div className="h-[10%]">
                    <Header pageName={"Masterlist"} />
                </div>
                <div className="h-[90%] w-[100%] items-center justify-center flex">
                    <div className="h-[95%] w-[95%] border-[1px] bg-white rounded-[10px] shadow-sm shadow-gray-500 flex flex-col">
                        <div className="w-[100%] h-[10%] flex">
                            <div className="w-[60%] h-[100%] flex items-center justify-start">
                                <p className="font-Poppins text-[2vw] text-black overflow white-space text-overflow pl-[15px]">
                                    All Students
                                </p>
                            </div>
                            <div className="w-[40%] h-[100%] flex items-center justify-evenly">
                                <Dropdown
                                    label={
                                        <>
                                            <span className="text-gray-500">Sort By: &nbsp;</span>
                                            <span className="font-semibold text-black">Course</span>
                                        </>
                                    }
                                    dismissOnClick={true}
                                    className="text-gray-500"
                                    style={{ backgroundColor: '#e5e7eb', height: '30px' }}>
                                    <DropdownItem>Name</DropdownItem>
                                    <DropdownItem>Course</DropdownItem>
                                    <DropdownItem>Student ID</DropdownItem>
                                </Dropdown>
                                <Button style={{ backgroundColor: "#1F3463", height: '30px' }}>Add Student</Button>
                            </div>
                        </div>
                        <div className="w-[100%] h-[80%] border-black border-[1px]">
                            <div className="overflow-x-auto">
                                <table className="min-w-full border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="py-3 flex items-center justify-start pl-[12px]">
                                                <p className="font-Poppins font-bold text-[#1F3463]">
                                                    Student Name
                                                </p>
                                            </th>
                                            <th className="border border-gray-300 py-3">
                                                <p className="font-Poppins font-bold text-[#1F3463]">
                                                    Course/Year
                                                </p>
                                            </th>
                                            <th className="border border-gray-300 py-3">
                                                <p className="font-Poppins font-bold text-[#1F3463]">
                                                    Student ID no.
                                                </p>
                                            </th>
                                            <th className="border border-gray-300 py-3">
                                                <p className="font-Poppins font-bold text-[#1F3463]">
                                                    Action
                                                </p>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-3.5">Row 1, Cell 1</td>
                                            <td className="border border-gray-300 px-4 py-3.5">Row 1, Cell 2</td>
                                            <td className="border border-gray-300 px-4 py-3.5">Row 1, Cell 3</td>
                                            <td className="border border-gray-300 px-4 py-3.5">Row 1, Cell 4</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-3.5">Row 2, Cell 1</td>
                                            <td className="border border-gray-300 px-4 py-3.5">Row 2, Cell 2</td>
                                            <td className="border border-gray-300 px-4 py-3.5">Row 2, Cell 3</td>
                                            <td className="border border-gray-300 px-4 py-3.5">Row 2, Cell 4</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-3.5">Row 3, Cell 1</td>
                                            <td className="border border-gray-300 px-4 py-3.5">Row 3, Cell 2</td>
                                            <td className="border border-gray-300 px-4 py-3.5">Row 3, Cell 3</td>
                                            <td className="border border-gray-300 px-4 py-3.5">Row 3, Cell 4</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-3.5">Row 3, Cell 1</td>
                                            <td className="border border-gray-300 px-4 py-3.5">Row 3, Cell 2</td>
                                            <td className="border border-gray-300 px-4 py-3.5">Row 3, Cell 3</td>
                                            <td className="border border-gray-300 px-4 py-3.5">Row 3, Cell 4</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-3.5">Row 3, Cell 1</td>
                                            <td className="border border-gray-300 px-4 py-3.5">Row 3, Cell 2</td>
                                            <td className="border border-gray-300 px-4 py-3.5">Row 3, Cell 3</td>
                                            <td className="border border-gray-300 px-4 py-3.5">Row 3, Cell 4</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-3.5">Row 3, Cell 1</td>
                                            <td className="border border-gray-300 px-4 py-3.5">Row 3, Cell 2</td>
                                            <td className="border border-gray-300 px-4 py-3.5">Row 3, Cell 3</td>
                                            <td className="border border-gray-300 px-4 py-3.5">Row 3, Cell 4</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-3.5">Row 3, Cell 1</td>
                                            <td className="border border-gray-300 px-4 py-3.5">Row 3, Cell 2</td>
                                            <td className="border border-gray-300 px-4 py-3.5">Row 3, Cell 3</td>
                                            <td className="border border-gray-300 px-4 py-3.5">Row 3, Cell 4</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-3.5">Row 3, Cell 1</td>
                                            <td className="border border-gray-300 px-4 py-3.5">Row 3, Cell 2</td>
                                            <td className="border border-gray-300 px-4 py-3.5">Row 3, Cell 3</td>
                                            <td className="border border-gray-300 px-4 py-3.5">Row 3, Cell 4</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="w-[100%] h-[10%] border-black border-[1px]">

                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}