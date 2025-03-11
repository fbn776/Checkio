import {Search, Clock} from 'lucide-react'
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {cn} from "@/lib/utils.js";
import axios from "axios";
import {formatDistanceToNow} from "date-fns";

export default function ViewPage() {
    const navigate = useNavigate();
    const [selectedGroup, setSelectedGroup] = useState('');
    const [groups, setGroups] = useState([]);
    const [testcases, setTestcases] = useState([]);


    useEffect(() => {
        axios.get("/api/group/").then(res => {
            setGroups(res.data);
        }).catch(e => {
            console.error(e)
        })
    }, []);

    useEffect(() => {
        axios.get("/api/testcases/", {
            params: {
                group: selectedGroup
            }
        }).then(res => {
            setTestcases(res.data);
        }).catch(e => {
            console.error(e)
        })
    }, [selectedGroup]);

    return (
        <div className="w-full flex flex-col gap-3">
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
                    <button
                        onClick={() => setSelectedGroup('')}
                        className={cn(`mt-1 rounded-[10px] bg-white py-1 px-4 text-sm text-nowrap`, !selectedGroup && "bg-secondary text-white")}
                    >
                        All
                    </button>
                    {groups.map((item, i) =>
                        <button
                            key={i}
                            onClick={() => setSelectedGroup(item.id)}
                            className={cn(`mt-1 rounded-[10px] bg-white py-1 px-4 text-sm text-nowrap`, selectedGroup.toLowerCase() === item.id.toLowerCase() && "bg-secondary text-white")}
                        >
                            {item.id}
                        </button>
                    )}
                </div>

                {testcases.map((testcase, index) => (
                    <div key={index}
                         className="w-full flex flex-col items-start bg-white border shadow p-4 rounded-md gap-2 cursor-pointer hover:scale-[1.01] transition-transform duration-200"
                         onClick={() => {
                             navigate(`/testcase/view/${testcase._id}`)
                         }}>
                        <div className="flex items-center justify-between w-full">
                            <div
                                className="text-[17px]"
                            >
                                <span className="text-sm text-gray-500"></span> {testcase.title}
                            </div>
                            <div
                                className="flex items-center text-sm justify-center px-2 py-1 rounded-[5px] bg-gray-100 text-[#007ab7] mr-2">
                                ID: {testcase.id}
                            </div>
                        </div>
                        <div>
                            <span className="text-[15px] text-gray-500 ml-1">{testcase.description}</span>
                        </div>

                        <div
                            className="flex items-center text-xs text-[#0088cc]">
                            <Clock className="mr-1 h-3.5 w-3.5"/>
                            {formatDistanceToNow(testcase.created_at, {addSuffix: true})}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}