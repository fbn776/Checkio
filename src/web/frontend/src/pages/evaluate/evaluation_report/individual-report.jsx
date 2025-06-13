"use client"

import {useEffect, useState} from "react"
import axios from "axios"
import {toast} from "sonner"
import {Link, useParams} from "react-router"
import {ArrowLeft, ArrowUpRight, ChevronDown, ChevronUp} from "lucide-react"
import {Collapsible, CollapsibleContent} from "@/components/ui/collapsible"
import CircularProgress from "./CircularProgress";

export default function IndividualReport() {
    const {evaluationId} = useParams()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [expandedItems, setExpandedItems] = useState({})

    useEffect(() => {
        setLoading(true)
        axios
            .get(`/api/eval/${evaluationId}`)
            .then((res) => {
                setData(res.data)
                console.log(res.data)
            })
            .catch((e) => {
                console.error(e)
                toast.error("Failed to fetch data")
            })
            .finally(() => {
                setLoading(false)
            })
    }, [evaluationId])

    const toggleExpand = (index) => {
        setExpandedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }))
    }

    const handleCardClick = (e, index) => {
        toggleExpand(index)
    }

    if (loading || !data) {
        return <p>Loading...</p>
    }

    return (
        <div className="pt-5 p-3">
            <div className="p-6 bg-white rounded-lg shadow-sm w-full mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <Link to="/evaluate/evaluation-report"
                          className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft className="h-5 w-5 text-gray-700"/>
                    </Link>
                    <h1 className="text-xl font-medium">
                        {data.name}
                        <span className="text-gray-500 text-sm ml-2">#{data.id}</span>
                    </h1>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 px-6">
                    <div className="bg-gray-50 rounded-lg p-4 w-full md:w-auto">
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                            <div className="text-gray-600 font-medium">Total</div>
                            <div className="font-medium">{data.pass_percent.total}</div>

                            <div className="text-gray-600 font-medium">Passed</div>
                            <div className="font-medium text-green-600">{data.pass_percent.passed}</div>

                            <div className="text-gray-600 font-medium">Failed</div>
                            <div
                                className="font-medium text-red-600">{data.pass_percent.total - data.pass_percent.passed}</div>

                            <div className="text-gray-600 font-medium">Created At</div>
                            <div className="font-medium">23/2/2025</div>
                        </div>
                    </div>

                    <CircularProgress value={(data.pass_percent.passed / data.pass_percent.total) * 100}
                                      label="Pass Percent"/>
                </div>
            </div>

            <div className="mt-5 space-y-4">
                {data.eval && data.eval.length > 0 ? (
                    data.eval.map((item, index) => {
                        const evalData = JSON.parse(item.data)
                        const passPercent = item.pass_percent || {passed: 0, total: 0}
                        const percentage = passPercent.total > 0 ? Math.round((passPercent.passed / passPercent.total) * 100) : 0
                        const isExpanded = expandedItems[index] || false

                        return (
                            <Collapsible
                                key={index}
                                open={isExpanded}
                                onOpenChange={() => toggleExpand(index)}
                                className="w-full rounded-lg p-4 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={(e) => handleCardClick(e, index)}
                            >
                                <div className="flex items-center justify-between">
                                    <h1 className="text-sm text-gray-500">
                                        Submitted By <b
                                        className="ml-1 font-normal text-black text-xl">{item.submitted_by}</b>
                                    </h1>

                                    <div className="flex items-center gap-4">
                                        <Link
                                            to={`/evaluate/submittedPrograms/view/${item.submission_id}`}
                                            className="flex items-center gap-2 z-10 relative"
                                            onClick={(e) => e.stopPropagation()} // Prevent card click when clicking the link
                                        >
                                            See Submission
                                            <ArrowUpRight/>
                                        </Link>

                                        <div className="p-2 rounded-full bg-gray-100">{isExpanded ? <ChevronUp/> :
                                            <ChevronDown/>}</div>
                                    </div>
                                </div>

                                <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-3 gap-4">
                                    <div>
                                        <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">Pass Rate
                                        </div>
                                        <div
                                            className={`text-base font-medium ${percentage >= 70 ? "text-gray-900" : "text-gray-700"}`}>
                                            {percentage}%
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">Tests</div>
                                        <div className="text-base font-medium text-gray-900">
                                            {passPercent.passed}/{passPercent.total} passed
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">Status
                                        </div>
                                        <div className="inline-flex items-center">
                                            <div
                                                className={`inline-block w-2 h-2 rounded-full mr-2 ${
                                                    item.status === "success" ? "bg-green-500" : "bg-red-500"
                                                }`}
                                            />
                                            <span className="text-base font-medium text-gray-900">
                                                {item.status === "success" ? "Success" : "Failed"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <CollapsibleContent>
                                    <h2 className="mt-6 mb-4 font-medium">Test Case Details</h2>
                                    <div className="space-y-4">
                                        {evalData.tests &&
                                            evalData.tests.map((test, testIndex) => {
                                                return (
                                                    <div key={testIndex} className="border rounded-lg p-3 space-y-4">
                                                        <div className="flex justify-between items-start">
                                                            <h3 className="font-medium">Test Case #{testIndex + 1}</h3>
                                                            {test.passed ? (
                                                                <div
                                                                    className="bg-green-500 text-white w-fit px-3 py-1 rounded-lg">Passed</div>
                                                            ) : (
                                                                <div
                                                                    className="bg-red-500 text-white w-fit px-3 py-1 rounded-lg">Failed</div>
                                                            )}
                                                        </div>

                                                        <div>
                                                            <h3 className="text-sm text-gray-500">Input</h3>
                                                            <div
                                                                className="mt-2 w-fit bg-gray-200 rounded-lg px-4 py-1">{test.input}</div>
                                                        </div>

                                                        <div>
                                                            <h3 className="text-sm text-gray-500">CLI Args</h3>
                                                            <div className="flex w-full flex-wrap gap-1">
                                                                {test.cli_args && test.cli_args.length > 0 ? (
                                                                    test.cli_args.map((cli, j) => (
                                                                        <div key={j}
                                                                             className="mt-2 w-fit bg-gray-200 rounded-lg px-4 py-1">
                                                                            {cli}
                                                                        </div>
                                                                    ))
                                                                ) : (
                                                                    <div className="mt-2 text-sm text-gray-400">No CLI
                                                                        arguments</div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <h3 className="text-sm text-gray-500">Expected Output</h3>
                                                            <div
                                                                className="mt-2 w-fit bg-gray-200 rounded-lg px-4 py-1">{test.expected_output}</div>
                                                        </div>

                                                        <div>
                                                            <h3 className="text-sm text-gray-500">Output</h3>
                                                            <div
                                                                className="mt-2 w-fit bg-gray-200 rounded-lg px-4 py-1">{test.output}</div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        )
                    })
                ) : (
                    <div className="w-full rounded-lg p-4 bg-white text-center">No evaluation data available</div>
                )}
            </div>
        </div>
    )
}

