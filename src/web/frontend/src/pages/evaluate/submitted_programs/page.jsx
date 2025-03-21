"use client"

import {Fragment, useEffect, useState} from "react"
import {Calendar, Search} from "lucide-react"
import {format} from "date-fns"
import {Button} from "@/components/ui/button"
import {CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Calendar as CalendarComponent} from "@/components/ui/calendar"
import {Checkbox} from "@/components/ui/checkbox"
import axios from "axios"
import {toast} from "sonner"
import {useNavigate} from "react-router";

export default function TestcaseSubmission() {
    const [selectedGroup, setSelectedGroup] = useState()
    const [selectedTestcase, setSelectedTestcase] = useState()
    const [fromDate, setFromDate] = useState()
    const [toDate, setToDate] = useState()
    const [selectedSubmissions, setSelectedSubmissions] = useState([])
    const [selectAll, setSelectAll] = useState(false)
    const navigate = useNavigate()

    const [submission, setSubmission] = useState([
        {
            created_at: "",
            group_id: "",
            id: null,
            submitted_by: "",
            submitted_files: "",
            testcase_id: null,
        },
    ])

    const [testcases, setTestcases] = useState([])
    const [groups, setGroups] = useState([])

    useEffect(() => {
        axios
            .get("/api/group/")
            .then((res) => {
                setGroups(res.data)
            })
            .catch((e) => {
                console.error(e)
            })
    }, [])

    useEffect(() => {
        if (selectedGroup) {
            axios
                .get("/api/testcases/", {
                    params: {
                        group: selectedGroup,
                    },
                })
                .then((res) => {
                    setTestcases(Array.isArray(res.data) ? res.data : [])
                })
                .catch((e) => {
                    console.error(e)
                    setTestcases([])
                })
        } else {
            setTestcases([])
        }
    }, [selectedGroup])


    // Add this effect to log selected submissions whenever they change
    useEffect(() => {
        console.log("Selected submissions:", selectedSubmissions)
    }, [selectedSubmissions])

    const handleSearch = () => {
        if (
            selectedGroup === undefined ||
            selectedTestcase === undefined ||
            toDate === undefined ||
            fromDate === undefined
        ) {
            toast.error("Please fill the required fields")
            return
        }

        const SearchData = {
            group_id: selectedGroup,
            testcase_id: selectedTestcase, //testcases.find(testcase => testcase.id === selectedTestcase)?.id,
            from: new Date(fromDate).toISOString().slice(0, 19).replace("T", " "),
            to: new Date(toDate).toISOString().slice(0, 19).replace("T", " "),
        }
        axios.get("/api/submission/", {params: SearchData})
            .then((res) => {
                console.log(res.data)
                setSubmission(Array.isArray(res.data) ? res.data : [])
                // Reset selections when new data is loaded
                setSelectedSubmissions([])
                setSelectAll(false)
            })
            .catch((e) => {
                console.error(e)
                setTestcases([])
            })
    }

    // Handle individual checkbox change
    const handleCheckboxChange = (submissionId) => {
        setSelectedSubmissions((prev) => {
            if (prev.includes(submissionId)) {
                // If already selected, remove it
                const newSelected = prev.filter((id) => id !== submissionId)
                // Update selectAll state based on whether all items are selected
                setSelectAll(newSelected.length === submission.length && submission.length > 0)
                return newSelected
            } else {
                // If not selected, add it
                const newSelected = [...prev, submissionId]
                // Update selectAll state based on whether all items are selected
                setSelectAll(newSelected.length === submission.length)
                return newSelected
            }
        })
    }

    // Handle select all checkbox change
    const handleSelectAllChange = () => {
        if (selectAll) {
            // If all are selected, deselect all
            setSelectedSubmissions([])
            setSelectAll(false)
        } else {
            // If not all selected, select all
            const allSubmissionIds = submission.map((sub) => sub.id)
            setSelectedSubmissions(allSubmissionIds)
            setSelectAll(true)
        }
    }

    // Function to get the selected submission objects (not just IDs)
    const getSelectedSubmissionData = () => {
        return submission.filter((sub) => selectedSubmissions.includes(sub.id))
    }

    // Handle evaluate button click
    const handleEvaluate = () => {
        const selectedData = getSelectedSubmissionData()
        console.log("Evaluating submissions:", selectedData)
        axios.post('/api/eval/', {
            submissions: selectedSubmissions,
        }).then((res) => {
            toast.success(`${selectedData.length} submissions sent for Evaluation`)
        }).catch((e) => {
            toast.error(`${selectedData.length} submissions failed for Evaluation`)
        })
    }

    return (
        <div className="px-5">
            <div className="bg-white rounded-lg shadow-2xs relative w-full p-5 mt-5 pb-14">
                <CardHeader className="pb-0">
                    <CardTitle className="text-2xl font-semibold text-primary">Submission Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        className="flex flex-wrap gap-4 mb-8"
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleSearch()
                        }}
                    >
                        <Select onValueChange={(value) => setSelectedGroup(value)} value={selectedGroup}>
                            <SelectTrigger className="w-[180px] bg-muted/40 ring-none border-none outline-none">
                                <SelectValue placeholder="Group ID"/>
                            </SelectTrigger>
                            <SelectContent>
                                {groups?.map((option) => (
                                    <SelectItem key={option.id} value={option.id}>
                                        {option.id}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select onValueChange={(value) => setSelectedTestcase(value)} value={selectedTestcase}>
                            <SelectTrigger
                                className="w-[180px] bg-muted/40 ring-none border-none outline-none text-black">
                                <SelectValue placeholder="Testcase ID">{selectedTestcase}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {testcases.map((item, index) => (
                                    <SelectItem key={index} value={item._id}>
                                        {item.id}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>


                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">From:</span>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline"
                                            className="w-[180px] justify-start text-left font-normal bg-muted/40">
                                        {fromDate ? format(fromDate, "dd-MM-yyyy") : "dd-mm-yyyy"}
                                        <Calendar className="ml-auto h-4 w-4 opacity-50"/>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <CalendarComponent mode="single" selected={fromDate} onSelect={setFromDate}
                                                       initialFocus/>
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">To:</span>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline"
                                            className="w-[180px] justify-start text-left font-normal bg-muted/40">
                                        {toDate ? format(toDate, "dd-MM-yyyy") : "dd-mm-yyyy"}
                                        <Calendar className="ml-auto h-4 w-4 opacity-50"/>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <CalendarComponent mode="single" selected={toDate} onSelect={setToDate}
                                                       initialFocus/>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <button
                            type={"submit"}
                            className="flex items-center bg-gradient-to-b from-[#009be5] to-[#0088cc] text-white px-4 py-1 ml-5 rounded-md hover:from-[#0088cc] hover:to-[#0077b3] shadow-sm border border-[#0077b3] transition duration-150 ease-in-out cursor-pointer gap-2"
                        >
                            <Search className="h-5 w-5 mr-1"/>
                            <span>Search</span>
                        </button>
                    </form>
                    {submission.length > 0 && submission[0].testcase_id !== null && (
                        <Fragment>
                            <div className="border-b-2 border-primary mb-4">
                                <h2 className="text-xl font-semibold text-primary mb-2">Submissions</h2>
                            </div>

                            {selectedSubmissions.length > 0 && (
                                <div className="mb-4 flex items-center gap-2">
                <span className="text-sm font-medium text-red-500">
                  {selectedSubmissions.length} {selectedSubmissions.length === 1 ? "submission" : "submissions"}{" "}
                    selected
                </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setSelectedSubmissions([])
                                            setSelectAll(false)
                                        }}
                                    >
                                        Clear Selection
                                    </Button>
                                </div>
                            )}

                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-12">
                                                <Checkbox
                                                    checked={selectAll}
                                                    onCheckedChange={handleSelectAllChange}
                                                    aria-label="Select all submissions"
                                                />
                                            </TableHead>
                                            <TableHead className="font-bold">Student ID</TableHead>
                                            <TableHead className="font-bold">Group ID</TableHead>
                                            <TableHead className="font-bold">Testcase ID</TableHead>
                                            <TableHead className="font-bold">Date</TableHead>
                                            <TableHead className="font-bold text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {submission.map((submission, index) => (
                                            <TableRow key={index}
                                                      className={selectedSubmissions.includes(submission.id) ? "bg-muted/30" : ""}
                                                      onClick={() => {
                                                          navigate(`/evaluate/submittedPrograms/view/${submission.id}`)
                                                      }}>
                                                <TableCell>
                                                    <Checkbox
                                                        checked={selectedSubmissions.includes(submission.id)}
                                                        onCheckedChange={() => handleCheckboxChange(submission.id)}
                                                        aria-label={`Select submission for ${submission.submitted_by}`}
                                                    />
                                                </TableCell>
                                                <TableCell className="font-medium">{submission.submitted_by}</TableCell>
                                                <TableCell>{submission.group_id}</TableCell>
                                                <TableCell>{submission.testcase_id}</TableCell>
                                                <TableCell>{submission.created_at}</TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <span className="sr-only">Open menu</span>
                                                                <div
                                                                    className="flex flex-col items-center justify-center h-full">
                                                                    <div
                                                                        className="w-1 h-1 rounded-full bg-foreground mb-0.5"></div>
                                                                    <div
                                                                        className="w-1 h-1 rounded-full bg-foreground mb-0.5"></div>
                                                                    <div
                                                                        className="w-1 h-1 rounded-full bg-foreground"></div>
                                                                </div>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem>View</DropdownMenuItem>
                                                            <DropdownMenuItem>Delete</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </Fragment>
                    )}

                    {selectedSubmissions.length > 0 && (
                        <button
                            onClick={handleEvaluate}
                            className="absolute bottom-2 right-10 flex items-center bg-gradient-to-b from-[#009be5] to-[#0088cc] text-white px-4 py-1 ml-5 rounded-md hover:from-[#0088cc] hover:to-[#0077b3] shadow-sm border border-[#0077b3] transition duration-150 ease-in-out cursor-pointer gap-2"
                        >
                            <span>Evaluate</span>
                        </button>
                    )}
                </CardContent>
            </div>
        </div>
    )
}

