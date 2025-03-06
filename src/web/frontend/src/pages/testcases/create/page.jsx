import {useState} from "react";
import {Terminal, Plus, File, FileInputIcon as Input, Trash2, X} from 'lucide-react';


export default function CreatePage() {
    const [cli, setCli] = useState([]);
    const [isCliVisible, setIsCliVisible] = useState(false);
    const [isFilesUploadVisible, setIsFilesUploadVisible] = useState(false);
    const [fileName, setFileName] = useState("No file chosen")

    const handleFileChange = (e) => {
        const files = e.target.files
        if (files && files.length > 0) {
            setFileName(files.length === 1 ? files[0].name : `${files.length} files selected`)
        } else {
            setFileName("No file chosen")
        }
    }

    return <main className="w-full p-5">
        <div className="border shadow p-4 bg-white rounded-md">
            <h1 className="text-xl mb-4">Testcase #1</h1>
            <div className="w-full my-2 flex gap-3 flex-wrap">
                <div onClick={() => {
                    setIsCliVisible(true)
                }}
                     className="flex items-center bg-gradient-to-b from-[#009be5] to-[#0088cc] text-white px-4 py-2 rounded-md hover:from-[#0088cc] hover:to-[#0077b3] shadow-sm border border-[#0077b3] transition duration-150 ease-in-out cursor-pointer gap-2">
                    <Terminal size={18}/>
                    CLI Args
                    <div className='bg-[#40b0e9] p-1 rounded-full ml-2'>
                        <Plus size={16}/>
                    </div>
                </div>
                <div
                    onClick={() => {
                        setIsFilesUploadVisible(true)
                    }}
                    className="flex items-center bg-gradient-to-b from-[#009be5] to-[#0088cc] text-white px-4 py-2 rounded-md hover:from-[#0088cc] hover:to-[#0077b3] shadow-sm border border-[#0077b3] transition duration-150 ease-in-out cursor-pointer gap-2"
                >
                    <File size={18}/>
                    Files
                    <div className='bg-[#40b0e9] p-1 rounded-full ml-2'>
                        <Plus size={16}/>
                    </div>
                </div>
                <div
                    className="flex items-center bg-gradient-to-b from-[#009be5] to-[#0088cc] text-white px-4 py-2 rounded-md hover:from-[#0088cc] hover:to-[#0077b3] shadow-sm border border-[#0077b3] transition duration-150 ease-in-out cursor-pointer gap-2">
                    <Input size={18}/>
                    Input
                    <div className='bg-[#40b0e9] p-1 rounded-full ml-2'>
                        <Plus size={16}/>
                    </div>
                </div>
            </div>
            {isCliVisible &&
                <div className="relative mt-4 mb-8 bg-gray-50 p-5 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between gap-5 pr-5">
                        <h2>Command Line Argument</h2>
                        <Trash2 className="absolute right-4 top-4 size-4 text-red-600 hover:cursor-pointer" onClick={() => {
                            setIsCliVisible(false);
                            setCli([]);
                        }}/>
                    </div>
                    <div className="flex gap-2 flex-wrap items-center mt-3">
                        {cli.map(item =>
                            <input className="flex-1 border bg-white border-gray-300 rounded-md px-4 py-2 focus:border-[#009be5] focus:outline-none" placeholder="Input"/>
                        )}
                        <button className=""
                                onClick={() => setCli(p => [...p, 1])}>
                            <div className='flex items-center bg-gradient-to-b from-[#009be5] to-[#0088cc] text-white px-2 py-2 rounded-md hover:from-[#0088cc] hover:to-[#0077b3] shadow-sm border border-[#0077b3] transition duration-150 ease-in-out hover:cursor-pointer'>
                                <Plus height={18} width={18} color={'white'}/>
                            </div>
                        </button>
                    </div>
                </div>
            }
            {isFilesUploadVisible &&
                <div className="relative mt-4 mb-8 bg-gray-50 p-5 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between gap-5 pr-5">
                        <h2>Files Upload</h2>
                        <Trash2 className="absolute right-4 top-4 size-4 text-red-600 hover:cursor-pointer" onClick={() => {
                            setIsFilesUploadVisible(false);
                        }}/>
                    </div>
                    <div className="relative mt-2 bg-white">
                        <div className="flex items-center border border-gray-300 hover:border-[#009be5] rounded-lg overflow-hidden">
                            <label
                                className="flex items-center bg-white px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-50 peer">
                                Choose files
                                <input type="file" className="hidden" multiple onChange={handleFileChange}/>
                            </label>
                            <span className="px-3 py-2 text-gray-400 flex-1 truncate">{fileName}</span>
                        </div>
                    </div>
                </div>
            }

            <textarea className="w-full p-3 border border-gray-300 rounded-lg min-h-10" placeholder="Output"/>
        </div>
    </main>
}