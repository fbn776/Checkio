import {ArrowLeft, EllipsisVertical, Download} from 'lucide-react'
import {useNavigate, useParams} from "react-router";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const ThreeDotsButton = () =>{
    return(
        <DropdownMenu>
            <DropdownMenuTrigger>
                <EllipsisVertical size={22} className="cursor-pointer border-none"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[50px] mr-5">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default function ViewedTestcase() {

    const navigate = useNavigate();
    const { testcaseId } = useParams();

    const testcase = {
        title: "Add 2 Numbers",
        desc: "Given 2 numbers x,y , return its sum",
        testcase_unit: [
            {
                id: '#1',
                input: '2 5',
                output: '7',
                cli: ['add'],
                files: [],
            },
            {
                id: '#2',
                input: '2 5',
                output: '7',
                cli: ['add'],
                files: [],
            }
        ]
    }

    return (
        <div className="w-full p-5 flex flex-col gap-3">
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
                        <ThreeDotsButton className="cursor-pointer border-none"/>
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
                        <p>{testcase.desc}</p>
                    </div>
                </div>
            </div>

            {testcase.testcase_unit.map((item, key) =>
                <div className="w-full" key={key}>
                    <div
                        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                        <div className="border-b border-gray-100">
                            <div className="px-6 py-4">
                                <h2 className="text-xl font-semibold text-gray-900">Testcase Unit - #1</h2>
                            </div>
                        </div>

                        <div className="divide-y divide-gray-50">
                            {/* CLI Args Section */}
                            <div className="px-6 py-4">
                                <div className="flex flex-col space-y-1.5">
                                    <label className="text-sm text-gray-500">CLI Args</label>
                                    <div className="text-gray-900 text-lg">5, 8, 9</div>
                                </div>
                            </div>

                            {/* Files Section */}
                            <div className="px-6 py-4">
                                <div className="flex flex-col gap-y-1.5">
                                    <label className="text-sm text-gray-500">Files</label>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-900 text-lg">doc1</span>
                                        <button
                                            className="p-2 hover:bg-gray-50 rounded-full transition-colors duration-200"
                                            aria-label="Download doc1"
                                        >
                                            <Download className="h-4 w-4 text-gray-500 hover:text-gray-900"/>
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-900 text-lg">doc1</span>
                                        <button
                                            className="p-2 hover:bg-gray-50 rounded-full transition-colors duration-200"
                                            aria-label="Download doc1"
                                        >
                                            <Download className="h-4 w-4 text-gray-500 hover:text-gray-900"/>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Input Section */}
                            <div className="px-6 py-4">
                                <div className="flex flex-col space-y-1.5">
                                    <label className="text-sm text-gray-500">Input</label>
                                    <div className="text-gray-900 text-lg">5, 8, 9</div>
                                </div>
                            </div>

                            {/* Output Section */}
                            <div className="px-6 py-4 bg-gray-50">
                                <div className="flex flex-col space-y-1.5">
                                    <label className="text-sm text-gray-500">Output</label>
                                    <div className="text-gray-900 text-lg">110</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}