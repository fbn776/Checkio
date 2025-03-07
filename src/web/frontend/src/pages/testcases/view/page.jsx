import {Search} from 'lucide-react'
import {useState} from "react";
import ViewedTestcase from "@/pages/testcases/view/component/ViewedTestcase.jsx";
import {useNavigate, useParams} from "react-router";
import {cn} from "@/lib/utils.js";

export default function ViewPage() {

    const matchedTestcases = [
        {
            id: 'ABCD1234',
            title: "Add 2 Numbers",
            desc: "Given 2 numbers x,y , return its sum"
        },
        {
            id: 'UVXYZ78910',
            title: "Add 2 Numbers",
            desc: "Given 2 numbers x,y , return its sum"
        }
    ]
    const param = useParams();
    const navigate = useNavigate();
    const selectedTestcase = param.testcaseId || null;
    const [selectedGroup, setSelectedGroup] = useState('all');
    const [filters, setFilters] = useState(["All", "CN", "OS", "Test"])

    return (
        <div className="w-full flex flex-col gap-3">
            {selectedTestcase ?
                <ViewedTestcase/> :
                <div className="w-full p-5 flex flex-col gap-3">
                    <form className="flex gap-3 w-full mb-2">
                            <input type="text" placeholder="Enter keyword"
                                   className="w-full h-[45px] border bg-white border-gray-300 rounded-md px-4 py-2 pr-30 focus:border-[#009be5] focus:outline-none"/>
                        <button
                            className="flex items-center bg-gradient-to-b from-[#009be5] to-[#0088cc] text-white px-4 py-1 rounded-md hover:from-[#0088cc] hover:to-[#0077b3] shadow-sm border border-[#0077b3] transition duration-150 ease-in-out cursor-pointer gap-2">
                            <Search className="h-5 w-5 mr-1"/>
                            <span>Search</span>
                        </button>
                    </form>

                    <div className="flex flex-wrap gap-3">
                        {filters.map((item, i) => <button
                            key={i}
                            onClick={() => setSelectedGroup(item)}
                            className={cn(`mt-1 rounded-[10px] bg-white py-1 px-4 text-sm text-nowrap`, selectedGroup.toLowerCase() === item.toLowerCase() && "bg-secondary text-white")}>{item}</button>)}
                    </div>

                    {matchedTestcases.map((testcase, index) => (
                        <div key={index}
                             className="w-full flex flex-col items-start bg-white border shadow p-4 rounded-md gap-2 cursor-pointer hover:scale-[1.01] transition-transform duration-200"
                             onClick={() => {
                                 navigate(`/testcase/view/${testcase.id}`)
                             }}>
                            <div
                                className="text-[17px]"
                            >
                                <span className="text-sm text-gray-500"></span> {testcase.title}
                            </div>
                            <div
                                className="flex items-center text-sm justify-center px-2 py-1 rounded-[5px] bg-gray-200 text-[#007ab7]">
                                ID: {testcase.id}
                            </div>
                            <div>
                                <span className="text-[15px] text-gray-500 ml-1">{testcase.desc}</span>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}