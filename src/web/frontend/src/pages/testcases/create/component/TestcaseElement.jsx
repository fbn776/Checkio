import {useState} from "react";
import {InputSelectorButton} from "@/pages/testcases/create/component/InputSelectorButton.jsx";
import {File, FileInputIcon as Input, Plus, Terminal} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.jsx";
import {DeleteButton} from "@/pages/testcases/create/component/DeleteButton.jsx";
import {Switch} from "@/components/ui/switch.jsx";
import {MinusButton} from "@/pages/testcases/create/component/MinusButton.jsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


const InputSection = ({
                          title, onDelete, children, isCLISec = false, onMinus = () => {
    }
                      }) => (
    <div className="relative mt-4 mb-8 bg-gray-50 p-5 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between gap-5 pr-5">
            <h2>{title}</h2>
            <DeleteButton onClick={onDelete}/>
            {isCLISec &&
                <MinusButton onClick={onMinus}/>
            }
        </div>
        <div className="relative mt-3">{children}</div>
    </div>
);

export function TestcaseElement({index}) {
    const [cli, setCli] = useState([]);
    const [isCliVisible, setIsCliVisible] = useState(false);
    const [isFilesUploadVisible, setIsFilesUploadVisible] = useState(false);
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [fileName, setFileName] = useState("No file chosen");
    const [isTestcaseHidden, setIsTestcaseHidden] = useState(false);

    const handleFileChange = (e) => {
        const files = e.target.files
        if (files && files.length > 0) {
            setFileName(files.length === 1 ? files[0].name : `${files.length} files selected`)
        } else {
            setFileName("No file chosen")
        }
    }
    return (
        <div className="shadow p-4 bg-white rounded-md w-full">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl">Testcase Unit #{index + 1}</h1>
                {/*Testcase Visible/Hidden Toggle Button*/}
                <div
                    className={`flex items-center justify-between text-sm gap-2 ${isTestcaseHidden ? "text-gray-400" : "text-black"}`}>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Switch className={`${isTestcaseHidden ? "bg-[#e5e5e5]" : "bg-[#009be5]"}`}
                                        checked={!isTestcaseHidden}
                                        onCheckedChange={(checked) => setIsTestcaseHidden(!checked)}
                                />
                            </TooltipTrigger>
                            <TooltipContent
                                className="bg-white border-gray-200 border-[1px] text-black text-[12px] px-2 py-2 rounded-[5px] shadow-lg mb-2"
                                side={'top'}>
                                <p>Make testcase {isTestcaseHidden ? 'Visible' : 'Hidden'}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <span>{isTestcaseHidden ? 'Hidden' : 'Visible'}</span>
                </div>
            </div>
            <div className="w-full my-2 flex gap-3 flex-wrap">
                <InputSelectorButton onClick={() => {
                    setIsCliVisible(true)
                }} Icon={Terminal} text={'CLI Args'}/>
                <InputSelectorButton onClick={() => {
                    setIsFilesUploadVisible(true)
                }} Icon={File} text={'Files'}/>
                <InputSelectorButton onClick={() => {
                    setIsInputVisible(true)
                }} Icon={Input} text={'Input'}/>
            </div>
            {isCliVisible && (
                <InputSection title="Command Line Argument" isCLISec={true} onDelete={() => {
                    setIsCliVisible(false);
                    setCli([]);
                }}
                              onMinus={() => {
                                  setCli((prevCli) => prevCli.slice(0, -1));

                              }}>
                    <div className="flex gap-2 flex-wrap items-center">
                        {cli.map((_, index) => (
                            <input key={index}
                                   className="flex-1 border bg-white border-gray-300 rounded-md px-4 py-2 focus:border-[#009be5] focus:outline-none"
                                   placeholder="Input"/>
                        ))}
                        <button onClick={() => setCli(p => [...p, 1])}>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div
                                            className='flex items-center bg-gradient-to-b from-[#009be5] to-[#0088cc] text-white px-2 py-2 rounded-md hover:from-[#0088cc] hover:to-[#0077b3] shadow-sm border border-[#0077b3] transition duration-150 ease-in-out hover:cursor-pointer'>
                                            <Plus height={18} width={18} color={'white'}/>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent
                                        className="bg-white border-gray-200 border-[1px] text-black text-[12px] px-2 py-2 rounded-[5px] shadow-lg mt-1"
                                        side={'bottom'}>
                                        <p>Add New</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </button>
                    </div>
                </InputSection>
            )}

            {isFilesUploadVisible && (
                <InputSection title="Files Upload" onDelete={() => setIsFilesUploadVisible(false)} isCLISec={false}>

                    <Dialog>
                        <DialogTrigger>
                            <button onClick={() => {

                            }}>
                                <div
                                    className='flex items-center gap-1 bg-gradient-to-b from-[#009be5] to-[#0088cc] text-white px-2 py-2 rounded-md hover:from-[#0088cc] hover:to-[#0077b3] shadow-sm border border-[#0077b3] transition duration-150 ease-in-out hover:cursor-pointer'>
                                    <Plus height={18} width={18} color={'white'}/> Create File
                                </div>
                            </button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create an Input File</DialogTitle>
                                <form className="flex flex-col justify-start gap-4 py-4">
                                    <div className="flex items-center gap-4">
                                        <label htmlFor="name" className="text-gray-500">
                                            File Name:
                                        </label>
                                        <input key={index}
                                               className="flex-1 border bg-white border-gray-300 rounded-md px-4 py-2 focus:border-[#009be5] focus:outline-none"
                                               placeholder="Enter filename" required={true}/>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <label htmlFor="username" className="text-gray-500 w-full">
                                            Content:
                                        </label>
                                        <textarea
                                            className="w-full p-3 min-h-40 flex-1 border bg-white border-gray-300 rounded-md px-4 py-2 focus:border-[#009be5] focus:outline-none"
                                            placeholder="Type content ..." required={true}/>
                                    </div>
                                    <button onClick={() => {

                                    }} type={"submit"}>
                                        <div
                                            className='flex items-center justify-center gap-1 bg-gradient-to-b from-[#009be5] to-[#0088cc] text-white px-2 py-2 rounded-md hover:from-[#0088cc] hover:to-[#0077b3] shadow-sm border border-[#0077b3] transition duration-150 ease-in-out hover:cursor-pointer'>
                                            Create File
                                        </div>
                                    </button>
                                </form>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                </InputSection>
            )}

            {isInputVisible && (
                <InputSection title="Input" onDelete={() => setIsInputVisible(false)}>
                            <textarea
                                className="w-full p-3 min-h-10 flex-1 border bg-white border-gray-300 rounded-md px-4 py-2 focus:border-[#009be5] focus:outline-none"
                                placeholder="Input"/>
                </InputSection>
            )}

            <textarea
                className="w-full p-3 min-h-10 flex-1 border bg-white border-gray-300 rounded-md px-4 py-2 focus:border-[#009be5] focus:outline-none"
                placeholder="Output"/>

        </div>
    )
}