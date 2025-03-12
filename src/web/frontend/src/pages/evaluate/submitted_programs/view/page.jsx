import {ArrowLeft, EllipsisVertical, Download, Terminal, Files, FileInput, FileOutput, Loader} from 'lucide-react'
import {useNavigate, useParams} from "react-router";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Fragment, useEffect, useState} from "react";
import axios from "axios";
import {toast} from "sonner";


const ThreeDotsButton = ({handleDelete}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <EllipsisVertical size={22} className="cursor-pointer border-none"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[50px] mr-5">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete}>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default function ViewedSubmittedProgram() {

    const navigate = useNavigate();
    const {submissionId} = useParams();
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        console.log(submissionId);
    },[])
    return (
        <div className="relative w-full p-5 flex flex-col gap-3">
            {!loading &&
                <div className="border shadow p-4 bg-white rounded-md w-full">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center justify-center gap-5">
                            <ArrowLeft size={22} className="text-[#007ab7] cursor-pointer" onClick={() => {
                                navigate('/evaluate/submittedPrograms')
                            }}/>
                            <h1 className="text-xl text-left">Submission Details</h1>
                            <div
                                className="flex items-center text-sm justify-center px-2 py-1 rounded-[5px] bg-gray-200 text-[#007ab7] ml-2">
                                ID: {submissionId}
                            </div>
                        </div>
                        <ThreeDotsButton className="cursor-pointer border-none"/>
                    </div>
                    <div className="space-y-4 divide-y">
                        {/*Title*/}
                        <div className="pb-4">
                            <h1 className="text-sm text-gray-400">Title</h1>
                            {/*<p>{testcase.title}</p>*/}
                        </div>
                        {/*Description*/}
                        <div>
                            <h1 className="text-sm text-gray-400">Description</h1>
                            {/*<p>{testcase.description}</p>*/}
                        </div>
                    </div>
                </div>
            }
            {loading &&
                <div
                    className="absolute top-0 left-0 w-full h-[calc(100vh-120px)] flex items-center justify-center gap-2 bg-black/60">
                    <Loader className="h-6 w-6 animate-spin text-primary "/>
                    <span className="text-white text-lg">Loading</span>
                </div>
            }
        </div>
    )
}