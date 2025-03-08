import { Save, Pencil } from 'lucide-react';
import { useState } from "react";

export default function SettingsPage() {
    let tempdir = "home/fbn776/my-files/coding-and-other-related-stuffs/python/Checkio/temp";
    const [isEditing, setIsEditing] = useState(false);

    return <div>
        <div className={'bg-[#009BE5] '}>
            <div className=" ml-[15px] border-b-3">
                <h1 className='p-[10px] mb-[5px] w-[120px]  text-center font-medium text-white h-[40px] rounded-[8px] hover:bg-[#0088cc]'>SETTINGS</h1>
            </div>
        </div>
        <div className="m-[30px] flex flex-col items-start justify-center bg-white rounded-md">
            <div className="w-full flex items-center justify-end p-[30px]">
                {
                    !isEditing &&
                    <button
                        className="w-[120px] flex items-center justify-center bg-gradient-to-b from-[#009be5] to-[#0088cc] text-white px-4 py-2 rounded-md hover:from-[#0088cc] hover:to-[#0077b3] shadow-sm border border-[#0077b3] transition duration-150 ease-in-out cursor-pointer gap-2"
                        onClick={() => setIsEditing(true)}>
                        <Pencil size={18} />
                        Edit
                    </button>
                }

                {
                    isEditing &&
                    <button
                        className="w-[120px] flex items-center justify-center bg-gradient-to-b from-[#009be5] to-[#0088cc] text-white px-4 py-2 rounded-md hover:from-[#0088cc] hover:to-[#0077b3] shadow-sm border border-[#0077b3] transition duration-150 ease-in-out cursor-pointer gap-2"
                        onClick={() => setIsEditing(false)}>
                        <Save size={18} />
                        Save
                    </button>
                }

            </div>
            <div className="flex flex-col gap-[10px] w-full p-[30px] pt-0">
                {/* Temp dir */}
                <div className="flex flex-wrap items-center gap-[10px] w-full">
                    <label htmlFor="temp_dir" className="w-[200px] h-[40px] flex items-center justify-start rounded p-[10px]">
                        Temporary Directory:
                    </label>
                    <input
                        id="temp_dir"
                        type="text"
                        className="flex-1 min-w-[200px] h-auto p-2 rounded ${isEditing ? 'border border-gray-300' : border-0 }"
                        placeholder={tempdir}
                        disabled={!isEditing}
                    />
                </div>
                {/* port */}
                <div className="flex flex-wrap items-center gap-[10px] w-full">
                    <label htmlFor="port" className="w-[200px] h-[40px] flex items-center justify-start rounded p-[10px]">
                        Port:
                    </label>
                    <input
                        id="port"
                        type="number"
                        className="flex-1 min-w-[200px] h-auto p-2 border-0 rounded text-black ${isEditing ? 'border border-gray-300' : border-0"
                        placeholder="Port number"
                        disabled={!isEditing}
                    />
                </div>
                {/* c */}
                <div className="flex flex-wrap items-center gap-[10px] w-full">
                    <label htmlFor="c_compiler_path" className="w-[200px] h-[40px] flex items-center justify-start rounded p-[10px]">
                        C Compiler Path:
                    </label>
                    <input
                        id="c_compiler_path"
                        type="text"
                        className="flex-1 min-w-[200px] h-auto p-2 border-0 rounded ${isEditing ? 'border border-gray-300' : border-0"
                        placeholder="cc"
                        disabled={!isEditing}
                    />
                </div>
                {/* javac */}
                <div className="flex flex-wrap items-center gap-[10px] w-full">
                    <label htmlFor="javac_path" className="w-[200px] h-[40px] flex items-center justify-start rounded p-[10px]">
                        Javac Path:
                    </label>
                    <input
                        id="javac_path"
                        type="text"
                        className="flex-1 min-w-[200px] h-auto p-2 border-0 rounded ${isEditing ? 'border border-gray-300' : border-0" 
                        placeholder="javac"
                        disabled={!isEditing}
                    />
                </div>
                {/* jvm */}
                <div className="flex flex-wrap items-center gap-[10px] w-full">
                    <label htmlFor="jvm_path" className="w-[200px] h-[40px] flex items-center justify-start rounded p-[10px]">
                        JVM Path:
                    </label>
                    <input
                        id="jvm_path"
                        type="text"
                        className="flex-1 min-w-[200px] h-auto p-2 border-0 rounded text-black ${isEditing ? 'border border-gray-300' : border-0"
                        placeholder="java"
                        disabled={!isEditing}
                    />
                </div>
                {/* python */}
                <div className="flex flex-wrap items-center gap-[10px] w-full">
                    <label htmlFor="python_path" className="w-[200px] h-[40px] flex items-center justify-start rounded p-[10px]">
                        Python Path:
                    </label>
                    <input
                        id="python_path"
                        type="text"
                        className="flex-1 min-w-[200px] h-auto p-2 border-0 rounded ${isEditing ? 'border border-gray-300' : border-0"
                        placeholder="python3"
                        disabled={!isEditing}
                    />
                </div>
                {/* session file */}
                <div className="flex flex-wrap items-center gap-[10px] w-full">
                    <label htmlFor="session_file" className="w-[200px] h-[40px] flex items-center justify-start rounded p-[10px]">
                        Session File:
                    </label>
                    <input
                        id="session_file"
                        type="text"
                        className="flex-1 min-w-[200px] h-auto p-2 border-0 rounded ${isEditing ? 'border border-gray-300' : border-0"
                        placeholder=".checkio_session"
                        disabled={!isEditing}
                    />
                </div>
                {/* token secret */}
                <div className="flex flex-wrap items-center gap-[10px] w-full">
                    <label htmlFor="token_string" className="w-[200px] h-[40px] flex items-center justify-start rounded p-[10px]">
                        Token String:
                    </label>
                    <input
                        id="token_string"
                        type="text"
                        className="flex-1 min-w-[200px] h-auto p-2 border-0 rounded text-black ${isEditing ? 'border border-gray-300' : border-0"
                        placeholder="Some Random String"
                        disabled={!isEditing}
                    />
                </div>

            </div>

        </div>
    </div>
}