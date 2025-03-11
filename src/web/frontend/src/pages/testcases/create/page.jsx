import {Pencil, Plus} from 'lucide-react';
import {TestcaseElement} from "@/pages/testcases/create/component/TestcaseElement.jsx";
import {useState} from "react";


export default function CreatePage() {

    const [title, setTitle] = useState("")
    const [groupId, setGroupId] = useState("")
    const [testcaseId, setTestcaseId] = useState("")
    const [description, setDescription] = useState("")

    // Main state to track all testcases data
    const [testcases, setTestcases] = useState([
        {
            isHidden: false,
            cliArgs: [],
            files: [],
            input: "",
            output: "",
        },
    ])

    // Update testcase data at specific index
    const updateTestcaseData = (index, data) => {
        setTestcases((prev) => {
            const updated = [...prev]
            updated[index] = { ...updated[index], ...data }
            return updated
        })
    }

    // Add a new testcase
    const addTestcase = () => {
        setTestcases((prev) => [
            ...prev,
            {
                isHidden: false,
                cliArgs: [],
                files: [],
                input: "",
                output: "",
            },
        ])
    }

    // Handle form submission
    const handleSubmit = async () => {
        const formData = {
            title,
            groupId,
            testcaseId,
            description,
            testcases: testcases.map((testcase) => ({
                isHidden: testcase.isHidden,
                cliArgs: testcase.cliArgs,
                files: testcase.files,
                input: testcase.input,
                output: testcase.output,
            })),
        }
        console.log("Submission data", formData)
    }

    return (
        <div className="w-full p-5 flex flex-col gap-3 items-center">
            {/*Title*/}
            <div className="border shadow p-4 bg-white rounded-md w-full">
                <h1 className="text-xl mb-4">Title</h1>
                <input value={title} onChange={(e)=>setTitle(e.target.value)}
                    className="w-full p-3 flex-1 border bg-white border-gray-300 rounded-md px-4 py-2 focus:border-[#009be5] focus:outline-none mb-[8px]"
                    placeholder="Enter Title"/>
            </div>

            {/*Testcase Id*/}
            <div className="border shadow p-4 bg-white rounded-md w-full">
                <h1 className="text-xl mb-4">Testcase Id</h1>
                <div className="flex items-center gap-5">
                    <input
                        value={groupId}
                        onChange={(e) => setGroupId(e.target.value)}
                        className="w-full p-3 flex-1 border bg-white border-gray-300 rounded-md px-4 py-2 focus:border-[#009be5] focus:outline-none mb-[8px]"
                        placeholder="Enter Group Id"/>
                    <input
                        value={testcaseId}
                        onChange={(e) => setTestcaseId(e.target.value)}
                        className="w-full p-3 flex-1 border bg-white border-gray-300 rounded-md px-4 py-2 focus:border-[#009be5] focus:outline-none mb-[8px]"
                        placeholder="Enter Testcase Id"/>
                </div>
            </div>

            {/*Description*/}
            <div className="border shadow p-4 bg-white rounded-md w-full">
                <h1 className="text-xl mb-4">Description</h1>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 min-h-10 flex-1 border bg-white border-gray-300 rounded-md px-4 py-2 focus:border-[#009be5] focus:outline-none"
                    placeholder="Enter Description"/>
            </div>

            {/*Testcase Section*/}
            {testcases.map((testcase, index) => (
                <TestcaseElement key={index}
                                 index={index}
                                 testcaseData={testcase}
                                 updateTestcaseData={(data) => updateTestcaseData(index, data)}/>
            ))}

            {/*Add New Testcase Button*/}
            <div className="flex items-center justify-end w-full">
                <button className="ml-2 max-w-fit" onClick={addTestcase}>
                    <div
                         className="flex items-center bg-gradient-to-b from-[#009be5] to-[#0088cc] text-white px-4 py-2 rounded-md hover:from-[#0088cc] hover:to-[#0077b3] shadow-sm border border-[#0077b3] transition duration-150 ease-in-out cursor-pointer gap-2">
                        <Plus size={18}/>
                        Add New Testcase
                    </div>
                </button>
            </div>

            {/*Add New Testcase Button*/}
            <button className="mt-1 min-w-[40%]" onClick={handleSubmit}>
                <div
                    className="flex items-center justify-center bg-gradient-to-b from-[#009be5] to-[#0088cc] text-white px-4 py-2 rounded-md hover:from-[#0088cc] hover:to-[#0077b3] shadow-sm border border-[#0077b3] transition duration-150 ease-in-out cursor-pointer gap-2">
                    <Pencil size={18}/>
                    Create Testcase
                </div>
            </button>
        </div>
    )
}