"use client"

import CircularProgress from "./CircularProgress"
import {useEffect, useState} from "react"
import axios from "axios"

export default function HomePage() {
    const [data, setData] = useState(null)
    const [recentData, setRecentData] = useState(null)

    useEffect(() => {
        axios
            .get("/api/eval/")
            .then((response) => {
                setData(response.data)
            })
            .catch((e) => {
                console.error(e)
            })
    }, [])

    useEffect(() => {
        axios
            .get("/api/testcases/recent")
            .then((response) => {
                setRecentData(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.error("Error fetching data:", e);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Title */}
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-gray-900">Streamline Evaluation –</h1>
                    <h2 className="text-2xl font-medium text-gray-800">Define, Test, and Assess with Checkio!</h2>
                </div>

                {/* View Report Card */}
                <div className="mb-8">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="p-6">
                            <div className="flex justify-between items-start">
                                <h2 className="text-xl font-semibold text-[#009BE5]">Evaluation Statistics</h2>
                            </div>

                            <div
                                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                                <div className="bg-gray-50 rounded-lg p-4 w-full md:w-auto gap-2 flex flex-col">
                                    <div className="flex items-baseline">
                                        <span className="text-gray-500 w-40">Total:</span>
                                        <span className="font-medium text-gray-700">{data?.pass_percent.total}</span>
                                    </div>
                                    <div className="flex items-baseline">
                                        <span className="text-gray-500 w-40">Passed:</span>
                                        <span className="font-medium text-green-600">{data?.pass_percent.passed}</span>
                                    </div>
                                    <div className="flex items-baseline">
                                        <span className="text-gray-500 w-40">Failed:</span>
                                        <span
                                            className="font-medium text-red-600">{data?.pass_percent.total - data?.pass_percent.passed}</span>
                                    </div>
                                </div>

                                <div className="flex-shrink-0">
                                    <CircularProgress
                                        value={(data?.pass_percent.passed / data?.pass_percent.total) * 100}
                                        label="Pass Percent" color="#009BE5" size={120}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recents Section */}
                <div>
                    <h2 className="text-xl font-semibold text-[#009BE5] mb-4">Recents</h2>
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        {recentData?.map((item, index) => (
                            <button
                                key={index}
                                className="w-full px-6 py-3 flex justify-between items-center hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                            >
                                <div className="flex items-center">
                                    <span className="font-medium text-gray-800"># {item.group_id}-{item.id}</span>
                                </div>
                                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm font-medium">8</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

