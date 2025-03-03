import {useState} from "react";
import {Command, Plus, File, ExternalLink, Trash2, X} from 'lucide-react';
import {Input} from "@/components/ui/input.jsx";


export default function CreatePage() {
    const [cli, setCli] = useState([]);
    const [isCliVisible, setIsCliVisible] = useState(false);
    const [isFilesUploadVisible, setIsFilesUploadVisible] = useState(false);

    return <main className="w-full p-5">
        <div className="border shadow p-4 bg-white rounded-md">
            <h1 className="text-xl mb-4">Testcase #1</h1>
            <div className="w-full my-2 flex gap-3 flex-wrap">
                <div onClick={() => {
                    setIsCliVisible(true)
                }}
                     className="bg-primary w-fit h-fit text-sm rounded-full p-1 pl-4 text-white flex flex-row gap-1 items-center hover:cursor-pointer">
                    <Command className="size-4"/>
                    CLI Args
                    <div className='bg-green-400 p-1 rounded-full ml-2'>
                        <Plus className="size-4"/>
                    </div>
                </div>
                <div
                    onClick={() => {
                        setIsFilesUploadVisible(true)
                    }}
                    className="bg-primary w-fit h-fit text-sm rounded-full p-1 pl-4 text-white flex flex-row gap-1 items-center hover:cursor-pointer"
                >
                    <File className="size-4"/>
                    Files
                    <div className='bg-green-400 p-1 rounded-full ml-2'>
                        <Plus className="size-4"/>
                    </div>
                </div>
                <div
                    className="bg-primary w-fit h-fit text-sm rounded-full p-1 pl-4 text-white flex flex-row gap-1 items-center hover:cursor-pointer">
                    <ExternalLink className="size-4"/>
                    Input
                    <div className='bg-green-400 p-1 rounded-full ml-2'>
                        <Plus className="size-4"/>
                    </div>
                </div>
            </div>
            {isCliVisible &&
                <div className="mb-5 mt-4">
                    <hr className="mb-2" />
                    <div className="flex items-center justify-between gap-5 pr-5">
                        <h2>Command Line Argument</h2>
                        <Trash2 className="size-4 text-red-600 hover:cursor-pointer" onClick={() => {
                            setIsCliVisible(false);
                            setCli([]);
                        }}/>
                    </div>
                    <div className="flex gap-2 flex-wrap items-center mt-3">
                        {cli.map(item =>
                            <input className="w-[200px] p-3 border border-gray-300 rounded-lg" placeholder="Output"/>
                        )}
                        <button className=""
                                onClick={() => setCli(p => [...p, 1])}>
                            <div className='bg-primary p-2 rounded-lg ml-2 hover:cursor-pointer'>
                                <Plus height={18} width={18} color={'white'}/>
                            </div>
                        </button>
                    </div>
                </div>
            }
            {isFilesUploadVisible &&
                <div className="mb-5">
                    <hr className="mb-2"/>
                    <div className="flex items-center justify-between gap-5 pr-5">
                        <h2>Files Upload</h2>
                        <Trash2 className="size-4 text-red-600 hover:cursor-pointer" onClick={() => {
                            setIsFilesUploadVisible(false);
                        }}/>
                    </div>
                    <Input className="w-fit p-3 border border-gray-300 rounded-lg min-h-10 mt-2" type="file"
                           placeholder="Files"
                           multiple>

                    </Input>
                </div>
            }

            <textarea className="w-full p-3 border border-gray-300 rounded-lg min-h-10" placeholder="Output"/>
        </div>
    </main>
}