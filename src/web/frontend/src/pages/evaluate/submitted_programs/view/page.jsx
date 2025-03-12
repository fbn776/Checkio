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
export default function ViewedTestcase() {

    const navigate = useNavigate();
    const {submissionId} = useParams();
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        console.log(submissionId);
    },[])
    return (
        <div className="relative w-full p-5 flex flex-col gap-3">
            {!loading &&
                <div>Hellooo</div>
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