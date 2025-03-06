import {TestTubeDiagonal} from 'lucide-react';
import {TestcaseElement} from "@/pages/testcases/create/component/TestcaseElement.jsx";
import {useState} from "react";


export default function CreatePage() {
    const [testcases, setTestcases] = useState([1]);

    return <main className="w-full p-5 flex flex-col gap-3">
        {/*Title*/}
        <div className="border shadow p-4 bg-white rounded-md">
            <h1 className="text-xl mb-4">Title</h1>
            <input
                className="w-full p-3 flex-1 border bg-white border-gray-300 rounded-md px-4 py-2 focus:border-[#009be5] focus:outline-none mb-[8px]"
                placeholder="Enter Title"/>
        </div>

        {/*Description*/}
        <div className="border shadow p-4 bg-white rounded-md">
            <h1 className="text-xl mb-4">Description</h1>
            <textarea
                className="w-full p-3 min-h-10 flex-1 border bg-white border-gray-300 rounded-md px-4 py-2 focus:border-[#009be5] focus:outline-none"
                placeholder="Enter Description"/>
        </div>

        {/*Testcase Section*/}
        {testcases.map((_, index) => (
            <TestcaseElement index={index} key={index}/>
        ))}

        {/*Add New Testcase Button*/}
        <button className="ml-2 max-w-fit">
            <div onClick={() => {
                    setTestcases(p=>[...p,1])
            }}
                 className="flex items-center bg-gradient-to-b from-[#009be5] to-[#0088cc] text-white px-4 py-2 rounded-md hover:from-[#0088cc] hover:to-[#0077b3] shadow-sm border border-[#0077b3] transition duration-150 ease-in-out cursor-pointer gap-2">
                <TestTubeDiagonal size={18}/>
                Add New Testcase
            </div>
        </button>
    </main>
}