import {useEffect, useState} from "react";
import {InputSelectorButton} from "@/pages/testcases/create/component/InputSelectorButton.jsx";
import {X, File, FileInputIcon as Input, Plus, Terminal, Pencil} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.jsx";
import {DeleteButton} from "@/pages/testcases/create/component/DeleteButton.jsx";
import {Switch} from "@/components/ui/switch.jsx";
import {MinusButton} from "@/pages/testcases/create/component/MinusButton.jsx";
import {
    Dialog,
    DialogContent,
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

export function TestcaseElement({index, testcaseData, updateTestcaseData}) {
    //const [cli, setCli] = useState([]);
    const [isCliVisible, setIsCliVisible] = useState(false);
    const [isFilesUploadVisible, setIsFilesUploadVisible] = useState(false);
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [isFileDialogBoxOpen, setIsFileDialogBoxOpen] = useState(false);
    //const [isTestcaseHidden, setIsTestcaseHidden] = useState(false);
    //const [createdFiles, setCreatedFiles] = useState([]);

    // Local state for file creation
    const [fileName, setFileName] = useState("")
    const [fileContent, setFileContent] = useState("")

    // Local state for CLI args (to manage the UI)
    const [cliValues, setCliValues] = useState([])

    // Initialize local state from props
    useEffect(() => {
        if (testcaseData) {
            setCliValues(testcaseData.cliArgs.length ? testcaseData.cliArgs : [])
            setIsCliVisible(testcaseData.cliArgs.length > 0)
            setIsFilesUploadVisible(testcaseData.files.length > 0)
            setIsInputVisible(!!testcaseData.input)
        }
    }, [testcaseData])

    // Update parent state when CLI args change
    const updateCliArgs = (newCliArgs) => {
        updateTestcaseData({cliArgs: newCliArgs})
        setCliValues(newCliArgs)
    }

    // Handle CLI input change
    const handleCliInputChange = (index, value) => {
        const newCliValues = [...cliValues]
        newCliValues[index] = value
        updateCliArgs(newCliValues)
    }

    // Add new CLI arg
    const addCliArg = () => {
        const newCliValues = [...cliValues, ""]
        updateCliArgs(newCliValues)
    }

    // Remove last CLI arg
    const removeLastCliArg = () => {
        if (cliValues.length > 0) {
            const newCliValues = cliValues.slice(0, -1)
            updateCliArgs(newCliValues)
        }
    }

    // Clear all CLI args
    const clearCliArgs = () => {
        updateCliArgs([])
        setIsCliVisible(false)
    }

    // Add a new file
    const addFile = () => {
        if (fileName.trim()) {
            const newFile = {
                name: fileName,
                content: fileContent,
            }

            const updatedFiles = [...(testcaseData.files || []), newFile]
            updateTestcaseData({files: updatedFiles})

            // Reset form
            setFileName("")
            setFileContent("")
            setIsFileDialogBoxOpen(false)
        }
    }

    // Delete a file
    const deleteFile = (index) => {
        const updatedFiles = [...testcaseData.files]
        updatedFiles.splice(index, 1)
        updateTestcaseData({files: updatedFiles})

        if (updatedFiles.length === 0) {
            setIsFilesUploadVisible(false)
        }
    }

    // Handle input text change
    const handleInputChange = (value) => {
        updateTestcaseData({input: value})
    }

    // Handle output text change
    const handleOutputChange = (value) => {
        updateTestcaseData({output: value})
    }

    // Toggle testcase visibility
    const toggleTestcaseVisibility = () => {
        updateTestcaseData({isHidden: !testcaseData.isHidden})
    }


    return (
        <div className="shadow p-4 bg-white rounded-md w-full">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl">Testcase Unit #{index + 1}</h1>
                {/*Testcase Visible/Hidden Toggle Button*/}
                <div
                    className={`flex items-center justify-between text-sm gap-2 ${testcaseData.isHidden ? "text-gray-400" : "text-black"}`}>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Switch className={`${testcaseData.isHidden ? "bg-[#e5e5e5]" : "bg-[#009be5]"}`}
                                        checked={!testcaseData.isHidden}
                                        onCheckedChange={toggleTestcaseVisibility}
                                />
                            </TooltipTrigger>
                            <TooltipContent
                                className="bg-white border-gray-200 border-[1px] text-black text-[12px] px-2 py-2 rounded-[5px] shadow-lg mb-2"
                                side={'top'}>
                                <p>Make testcase {testcaseData.isHidden ? 'Visible' : 'Hidden'}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <span>{testcaseData.isHidden ? 'Hidden' : 'Visible'}</span>
                </div>
            </div>
            <div className="w-full my-2 flex gap-3 flex-wrap">
                <InputSelectorButton onClick={() => {
                    setIsCliVisible(true)
                    if (cliValues.length === 0) {
                        updateCliArgs([""])
                    }
                }} Icon={Terminal} text={'CLI Args'}
                />
                <InputSelectorButton onClick={() => {
                    setIsFilesUploadVisible(true)
                }} Icon={File} text={'Files'}/>
                <InputSelectorButton onClick={() => {
                    setIsInputVisible(true)
                }} Icon={Input} text={'Input'}/>
            </div>
            {isCliVisible && (
                <InputSection title="Command Line Argument" isCLISec={true} onDelete={clearCliArgs}
                              onMinus={removeLastCliArg}>
                    <div className="flex gap-2 flex-wrap items-center">
                        {cliValues.map((value, idx) => (
                            <input key={idx}
                                   value={value}
                                   onChange={(e) => handleCliInputChange(idx, e.target.value)}
                                   className="flex-1 border bg-white border-gray-300 rounded-md px-4 py-2 focus:border-[#009be5] focus:outline-none"
                                   placeholder="Input"/>
                        ))}
                        <button onClick={addCliArg}>
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
                <InputSection title="Files Upload" onDelete={() => {
                    updateTestcaseData({files: []})
                    setIsFilesUploadVisible(false)
                }} isCLISec={false}
                >
                    {testcaseData.files &&
                        testcaseData.files.map((file, idx) => (
                            <div key={idx}
                                 className="flex mb-2 items-center justify-between w-full border bg-white border-gray-200  px-5 py-1 rounded-md">
                                <span className="text-gray-900 text-lg">{file.name}</span>
                                <div className="flex gap-2 justify-center items-center">
                                    <button
                                        className="p-2 hover:bg-gray-50 rounded-full transition-colors duration-200"
                                        onClick={() => {
                                            setFileName(file.name)
                                            setFileContent(file.content)
                                            setIsFileDialogBoxOpen(true)
                                        }}
                                    >
                                        <Pencil className="h-4 w-4 text-gray-500 hover:text-blue-700"/>
                                    </button>
                                    <button
                                        className="p-2 hover:bg-gray-50 rounded-full transition-colors duration-200"
                                        onClick={() => deleteFile(idx)}
                                    >
                                        <X className="h-4 w-4 text-gray-500 hover:text-red-700"/>
                                    </button>
                                </div>
                            </div>))}
                    <Dialog
                        open={isFileDialogBoxOpen}
                        onOpenChange={() => {
                            setIsFileDialogBoxOpen(!isFileDialogBoxOpen)
                        }}>
                        <DialogTrigger>
                            <button
                                onClick={() => {
                                setFileName("")
                                setFileContent("")
                                setIsFileDialogBoxOpen(true)
                            }}>
                                <div
                                    className='flex items-center gap-1 mt-1 ml-1 bg-gradient-to-b from-[#009be5] to-[#0088cc] text-white px-2 py-2 rounded-md hover:from-[#0088cc] hover:to-[#0077b3] shadow-sm border border-[#0077b3] transition duration-150 ease-in-out hover:cursor-pointer'>
                                    <Plus height={18} width={18} color={'white'}/> Create File
                                </div>
                            </button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create an Input File</DialogTitle>
                                <form className="flex flex-col justify-start gap-4 py-4" onSubmit={(e) => {
                                    e.preventDefault()
                                    addFile()
                                }}>
                                    <div className="flex items-center gap-4">
                                        <label htmlFor="name" className="text-gray-500">
                                            File Name:
                                        </label>
                                        <input value={fileName}
                                               onChange={(e) => setFileName(e.target.value)}
                                               className="flex-1 border bg-white border-gray-300 rounded-md px-4 py-2 focus:border-[#009be5] focus:outline-none"
                                               placeholder="Enter filename" required={true}/>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <label htmlFor="username" className="text-gray-500 w-full">
                                            Content:
                                        </label>
                                        <textarea
                                            value={fileContent}
                                            onChange={(e) => setFileContent(e.target.value)}
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
                <InputSection title="Input"
                              onDelete={() => {
                                  updateTestcaseData({ input: "" })
                                  setIsInputVisible(false)
                              }}>
                            <textarea
                                value={testcaseData.input || ""}
                                onChange={(e) => handleInputChange(e.target.value)}
                                className="w-full p-3 min-h-10 flex-1 border bg-white border-gray-300 rounded-md px-4 py-2 focus:border-[#009be5] focus:outline-none"
                                placeholder="Input"/>
                </InputSection>
            )}

            <textarea
                value={testcaseData.output || ""}
                onChange={(e) => handleOutputChange(e.target.value)}
                className="w-full p-3 min-h-10 flex-1 border bg-white border-gray-300 rounded-md px-4 py-2 focus:border-[#009be5] focus:outline-none"
                placeholder="Output"/>

        </div>
    )
}