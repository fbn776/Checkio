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
    const {testcaseId} = useParams();
    const [loading, setLoading] = useState(true);
    const [testcase, setTestcase] = useState({
        _id: null,
        created_at: "",
        data: [],
        description: "",
        group_id: "",
        id: "",
        title: ""
    });

    useEffect(() => {
        axios.get(`/api/testcases/${testcaseId}`)
            .then((res) => {
                if (res.data && typeof res.data.data === "string") {
                    res.data.data = JSON.parse(res.data.data)
                }
                setTestcase(res.data)
            })
            .catch((e) => {
                console.error(e);
            })
            .finally(() => {
            });
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, []);

    const handleDelete = () => {
        axios.delete(`/api/testcases/${testcaseId}`).then(() => {
            toast.success("Testcase deleted successfully.")
            navigate('/testcase/view')
        }).catch((e) => {
            toast.error("Testcase unable to delete.")
            console.error(e);
        }).finally(() => {
        });
    }

    return (
        <div className="relative w-full p-5 flex flex-col gap-3">
            {!loading &&
                <Fragment>
                    <div className="border shadow p-4 bg-white rounded-md w-full">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center justify-center gap-5">
                                <ArrowLeft size={22} className="text-[#007ab7] cursor-pointer" onClick={() => {
                                    navigate('/testcase/view/')
                                }}/>
                                <h1 className="text-xl text-left">Testcase Details</h1>
                                <div
                                    className="flex items-center text-sm justify-center px-2 py-1 rounded-[5px] bg-gray-200 text-[#007ab7] ml-2">
                                    ID: {testcaseId}
                                </div>
                            </div>
                            <ThreeDotsButton className="cursor-pointer border-none" handleDelete={handleDelete}/>
                        </div>
                        <div className="space-y-4 divide-y">
                            {/*Title*/}
                            <div className="pb-4">
                                <h1 className="text-sm text-gray-400">Title</h1>
                                <p>{testcase.title}</p>
                            </div>
                            {/*Description*/}
                            <div>
                                <h1 className="text-sm text-gray-400">Description</h1>
                                <p>{testcase.description}</p>
                            </div>
                        </div>
                    </div>

                    {testcase?.data.map((item, key) =>
                        <div className="w-full" key={key}>
                            <div
                                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                                <div className=" border-gray-100">
                                    <div className="px-4 pt-4">
                                        <h2 className="text-xl font-semibold text-gray-900">Testcase Unit - #1</h2>
                                    </div>
                                </div>

                                <div className="divide-y divide-gray-50 px-4">
                                    {/* CLI Args Section */}
                                    {item.cli_args && item.cli_args.length > 0 && (
                                        <div
                                            className="flex flex-col gap-2 mt-4 mb-8 bg-gray-50 px-5 pt-5 pb-3 border border-gray-200 rounded-md">
                                            <div className="flex items-center gap-1">
                                                <Terminal size={20} className="text-[#007ab7]"/>
                                                <h2>CLI Args</h2>
                                            </div>

                                            <div className="flex flex-wrap justify-start gap-2 overflow-clip">
                                                {item.cli_args.map((arg, argIndex) => (
                                                    <div key={argIndex}
                                                         className="border bg-white border-gray-300 rounded-md px-4 py-2 w-fit">
                                                        {arg}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Files Section */}
                                    {item.files && item.files.length > 0 && (
                                        <div
                                            className="flex flex-col gap-2 mt-4 mb-8 bg-gray-50 px-5 pt-5 pb-3 border border-gray-200 rounded-md">
                                            <div className="flex items-center gap-1">
                                                <Files size={20} className="text-[#007ab7]"/>
                                                <h2>Files</h2>
                                            </div>

                                            <div className="flex flex-col justify-start gap-2 mt-2">
                                                {item.files.map((file, fileIndex) => (
                                                    <div
                                                        key={fileIndex}
                                                        className="flex items-center justify-between w-full border bg-white border-gray-200 px-5 py-1 rounded-md"
                                                    >
                                                        <span className="text-gray-900 text-lg">{file.name}</span>
                                                        <button
                                                            className="p-2 hover:bg-gray-50 rounded-full transition-colors duration-200"
                                                            aria-label={`Download ${file.name}`}
                                                        >
                                                            <Download
                                                                className="h-4 w-4 text-gray-500 hover:text-gray-900"/>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Input Section */}
                                    {item.input !== undefined && (
                                        <div
                                            className="flex flex-col gap-2 mt-4 mb-8 bg-gray-50 px-5 pt-5 pb-3 border border-gray-200 rounded-md">
                                            <div className="flex items-center gap-1">
                                                <FileInput size={20} className="text-[#007ab7]"/>
                                                <h2>Input</h2>
                                            </div>

                                            <div className="flex justify-start gap-2 mt-1">
                                                <div
                                                    className="border bg-white border-gray-300 rounded-md px-4 py-2 w-full">
                                                    {item.input ||
                                                        <span className="text-gray-400">No input provided</span>}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Output Section */}
                                    {item.output !== undefined && (
                                        <div
                                            className="flex flex-col gap-2 mt-4 mb-8 bg-green-50 px-5 pt-5 pb-3 border border-gray-200 rounded-md">
                                            <div className="flex items-center gap-1">
                                                <FileOutput size={20} className="text-[#007ab7]"/>
                                                <h2>Output</h2>
                                            </div>

                                            <div className="flex justify-start gap-2 mt-1">
                                                <div
                                                    className="border bg-white border-gray-300 rounded-md px-4 py-2 w-full">{item.output}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </Fragment>}
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