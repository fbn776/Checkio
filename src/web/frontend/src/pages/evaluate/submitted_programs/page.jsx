import { Eye, EllipsisVertical, Trash } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from "react-router";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const ThreeDotsButton = ({ onView, onDelete }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <EllipsisVertical size={22} className="cursor-pointer border-none" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[100px]">
                <DropdownMenuItem onClick={onView}>
                    View
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete}>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
export default function SubmittedPrograms() {
    let groupID = ["OS", "DB", "CN", "SS", "CP"];
    let testCaseID = ["01", "02", "03", "04", "05"];
    const navigate = useNavigate();
    const [studentRecords, setStudentRecords] = useState([
        { studentid: "22BR10496", date: "20/03/2025-11:15:36", groupID: "OS", testCaseID: "05" },
        { studentid: "22BR10497", date: "20/03/2025-11:20:15", groupID: "DB", testCaseID: "02" },
        { studentid: "22BR10498", date: "20/03/2025-11:25:50", groupID: "CN", testCaseID: "07" },
        { studentid: "22BR10499", date: "20/03/2025-11:30:22", groupID: "SS", testCaseID: "03" },
        { studentid: "22BR10500", date: "20/03/2025-11:35:10", groupID: "CP", testCaseID: "01" },
        { studentid: "22BR10501", date: "20/03/2025-11:40:05", groupID: "OS", testCaseID: "02" },
        { studentid: "22BR10502", date: "20/03/2025-11:45:30", groupID: "DB", testCaseID: "04" },
        { studentid: "22BR10503", date: "20/03/2025-11:50:18", groupID: "CN", testCaseID: "06" },
        { studentid: "22BR10504", date: "20/03/2025-11:55:42", groupID: "SS", testCaseID: "08" },
        { studentid: "22BR10505", date: "20/03/2025-12:00:00", groupID: "CP", testCaseID: "05" }
    ]);

    const handleDelete = (index) => {
        setStudentRecords(prevRecords => prevRecords.filter((_, i) => i !== index));
    };

    return (
        <div>
            <div className="m-[20px] bg-white flex flex-col p-[20px] py-[30px] rounded-md shadow-md gap-[30px]">
                {/* filters */}
                <fieldset className='border-2 '>
                    <legend className='text-xl text-[#009BE5] m-[20px] p-[10px]'>Choose a Testcase: </legend>
                    <div className="m-[20px] mt-0 flex gap-[20px] w-full px-2">
                        <div className='px-[15px] bg-gray-200 rounded-md'>
                            <select className="px-[5px] py-[5px] text-sm bg-gray-200 active: border-none">
                                <option value="group_id">Group ID</option>
                                {groupID.map((item, index) => (
                                    <option key={index} value={item} className="hover:bg-[#009be5]">{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className='px-[15px] bg-gray-200 rounded-md'>
                            <select className="px-[5px] py-[5px] text-sm bg-gray-200 rounded-md active:border-none">
                                <option value="testcase_id">Testcase ID</option>
                                {testCaseID.map((item, index) => (
                                    <option key={index} value={item} className="hover:bg-[#009be5]">{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <label htmlFor="from_date" className="text-sm">From:</label>
                            <input
                                type="date"
                                id="from_date"
                                name="from_date"
                                className="px-[15px] py-[5px] text-sm bg-gray-200 rounded-md border-none"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label htmlFor="to_date" className="text-sm">To:</label>
                            <input
                                type="date"
                                id="to_date"
                                name="to_date"
                                className="px-[15px] py-[5px] text-sm bg-gray-200 rounded-md border-none"
                            />
                        </div>
                    </div>
                </fieldset>
                {/* table */}
                <div className="flex flex-col gap-[10px]">
                    <div className="pb-0.2 border-b border-[#009be5] w-[115px]"> 
                        <h1 className='text-lg text-[#009BE5]'>Submissions</h1>
                    </div>
                    <div className="px-[20px] py-[15px]">
                        <table className="w-full border border-gray-300 rounded-[10px]">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="p-2 border border-gray-300 text-center text-sm">Student ID</th>
                                    <th className="p-2 border border-gray-300 text-sm w-1/5">Group ID</th>
                                    <th className="p-2 border border-gray-300 text-sm w-1/5">Testcase ID</th>
                                    <th className="p-2 border border-gray-300 text-sm w-1/5">Date</th>
                                    <th className="p-2 border border-gray-300 text-sm w-1/5">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentRecords.map((student, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="p-2 border border-gray-300 text-center italic text-sm">{student.studentid}</td>
                                        <td className="p-2 border border-gray-300 text-center italic text-sm">{student.groupID}</td>
                                        <td className="p-2 border border-gray-300 text-center italic text-sm">{student.testCaseID}</td>
                                        <td className="p-2 border border-gray-300 text-center italic text-sm">{student.date}</td>
                                        <td className="p-2 border border-gray-300 flex justify-center">
                                            <ThreeDotsButton
                                                onView={() => navigate('/evaluate/submittedPrograms/')}
                                                onDelete={() => handleDelete(index)}
                                            />
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

        </div>
    );
}