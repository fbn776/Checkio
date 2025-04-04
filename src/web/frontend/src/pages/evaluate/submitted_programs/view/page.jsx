"use client"

import { ArrowLeft, EllipsisVertical, Files, Loader, ChevronDown, ChevronUp } from "lucide-react"
import { useNavigate, useParams } from "react-router"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "sonner"

const ThreeDotsButton = ({ handleDelete }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <EllipsisVertical size={22} className="cursor-pointer border-none" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[50px] mr-5">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default function ViewedSubmittedProgram() {
    const navigate = useNavigate()
    const { submissionId } = useParams()
    const [loading, setLoading] = useState(true)
    const [submission, setSubmission] = useState(null)
    const [expandedFiles, setExpandedFiles] = useState({})

    const fetchSubmissionDetails = () => {
        setLoading(true); // Ensure loading is set to true before fetching
        axios.get(`/api/submission/${submissionId}`)
            .then((response) => {
                setSubmission(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.error("Error fetching submission:", error);
                toast.error("Failed to load submission details");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        if (submissionId) {
            fetchSubmissionDetails();
        }
    }, [submissionId]);

    const toggleFileExpansion = (fileName) => {
        setExpandedFiles((prev) => ({
            ...prev,
            [fileName]: !prev[fileName],
        }))
    }

    const handleDelete = () => {
        if (!window.confirm("Are you sure you want to delete this submission?")) {
            return
        }
        axios.delete(`/api/submissions/${submissionId}`).then((res)=>{
            toast.success("Submission deleted successfully")
            navigate("/evaluate/submittedPrograms")
        }) .catch ((error)=> {
            console.error("Error deleting submission:", error)
            toast.error("Failed to delete submission")
        })
    }

    return (
        <div className="relative w-full p-5 flex flex-col gap-3">
            {!loading && submission && (
                <div className="border shadow p-4 bg-white rounded-md w-full">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center justify-center gap-5">
                            <ArrowLeft
                                size={22}
                                className="text-[#007ab7] cursor-pointer"
                                onClick={() => navigate("/evaluate/submittedPrograms")}
                            />
                            <h1 className="text-xl text-left">Submission Details</h1>
                            <div className="flex items-center text-sm justify-center px-2 py-1 rounded-[5px] bg-gray-200 text-[#007ab7] ml-2">
                                ID: {submissionId}
                            </div>
                        </div>
                        <ThreeDotsButton handleDelete={handleDelete} />
                    </div>

                    <div className="space-y-4 divide-y">
                        {/* Student Name */}
                        <div className="pb-4">
                            <h1 className="text-sm text-gray-400 mb-2">Student Name</h1>
                            <p className="text-gray-800">{submission?.submitted_by}</p>
                        </div>

                        {/* Files */}
                        <div className="pt-4">
                            <h1 className="text-sm text-gray-400 mb-4">Files ({submission?.submitted_files ? JSON.parse(submission.submitted_files)?.length || 0 : 0})</h1>
                            <div className="space-y-3">
                                {submission?.submitted_files &&
                                    JSON.parse(submission.submitted_files).map((file, index) => (
                                    <div key={index} className="border rounded-lg overflow-hidden">
                                        <div
                                            className="flex items-center justify-between p-3 bg-gray-50 cursor-pointer hover:bg-gray-100"
                                            onClick={() => toggleFileExpansion(file.name)}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Files className="h-4 w-4 text-[#007ab7]" />
                                                <span className="font-medium">{file.name}</span>
                                            </div>
                                            {expandedFiles[file.name] ? (
                                                <ChevronUp className="h-4 w-4" />
                                            ) : (
                                                <ChevronDown className="h-4 w-4" />
                                            )}
                                        </div>
                                        {expandedFiles[file.name] && (
                                            <div className="p-4 bg-[#081627] overflow-x-auto">
                                                <pre className="text-gray-100 text-sm font-mono whitespace-pre-wrap">{file.content}</pre>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {loading && (
                <div className="absolute top-0 left-0 w-full h-[calc(100vh-120px)] flex items-center justify-center gap-2 bg-black/60">
                    <Loader className="h-6 w-6 animate-spin text-primary" />
                    <span className="text-white text-lg">Loading</span>
                </div>
            )}
        </div>
    )
}

