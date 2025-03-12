import { useState } from "react";
import CircularProgress from "./CircularProgress";

export default function EvaluationReport() {
    const [visibleStudent, setVisibleStudent] = useState(null);
    const [visibleTest, setVisibleTest] = useState(null); // Track individual test visibility

    const group_id = "DS";
    const testcase_id = "02";
    const eTitle = "Linear Search";
    const DOS = "27-02-2025";
    const Definedtests = [
        { id: "01", name: "Test 1", output: "5" },
        { id: "02", name: "Test 2", output: "0" },
        { id: "03", name: "Test 3", output: "-1" },
        { id: "04", name: "Test 4", output: "3" }
    ];

    const studentsRecord = [
        {
            id: "22BR10076",
            tests: [
                { id: "01", name: "Test 1", status: "Passed", output: "5" },
                { id: "02", name: "Test 2", status: "Passed", output: "0" },
                { id: "03", name: "Test 3", status: "Failed", output: "-1" },
                { id: "04", name: "Test 4", status: "Passed", output: "3" }
            ],
            total: "75"
        },
        {
            id: "22BR12076",
            tests: [
                { id: "01", name: "Test 1", status: "Passed", output: "5" },
                { id: "02", name: "Test 2", status: "Passed", output: "0" },
                { id: "03", name: "Test 3", status: "Failed", output: "-1" },
                { id: "04", name: "Test 4", status: "Passed", output: "3" }
            ],
            total: "75"
        }
    ];

    const passPercentage = 75;

    const toggleVisibility = (id) => {
        setVisibleStudent((prev) => (prev === id ? null : id));
    };

    const toggleTestVisibility = (testId) => {
        setVisibleTest((prev) => (prev === testId ? null : testId));
    };

    return (
        <div className="m-[20px] flex flex-col gap-[30px]">
            <div className="flex justify-between items-center">
                <div className="flex flex-col bg-white w-full p-[20px] rounded-md hover:bg-[#e8f6fc]">
                    <h1 className="text-xl text-[#009BE5] font-semibold">Evaluation Overview</h1>
                    <div className="flex flex-row justify-between items-start">
                        <div className="flex gap-0.5 w-full pt-[40px]">
                            <div className="w-full pl-[40px]">
                                <p className="text-sm">Group ID: <span className="font-light">{group_id}</span></p>
                                <p className="text-sm">Testcase ID: <span className="font-light">{testcase_id}</span></p>
                                <p className="text-sm">Title: <span className="font-light">{eTitle}</span></p>
                                <p className="text-sm">No. of Tests: <span className="font-light">{Definedtests.length}</span></p>
                            </div>
                            <div className="w-[5px] bg-gray-300"></div>
                            <div className="w-full pl-[40px]">
                                <p className="text-sm">No. of Submissions: <span className="font-light">{studentsRecord.length}</span></p>
                                <p className="text-sm">Submitted Date: <span className="font-light">{DOS}</span></p>
                                <p className="text-sm">Most Passed Tests: <span className="font-light">02</span></p>
                                <p className="text-sm">Most Failed Tests: <span className="font-light">03</span></p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center w-[200px]">
                            <CircularProgress value={passPercentage} label="Pass Percentage" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white w-full flex flex-col p-[20px] rounded-md gap-1">
                <h1 className="text-xl text-[#009BE5] font-semibold mb-[10px]">Evaluation Details</h1>
                {studentsRecord.map((student) => (
                    <div key={student.id} className="flex flex-col gap-1">
                        {/* Clickable div to toggle student details */}
                        <div
                            className="flex justify-between p-[10px] border-2 border-gray-200 rounded-md hover:bg-[#e8f6fc] cursor-pointer"
                            onClick={() => toggleVisibility(student.id)}
                        >
                            <p className="text-gray-700 font-medium">{student.id}</p>
                            <p className="text-gray-600">{student.total}%</p>
                        </div>

                        {/* Show tests only if student is visible */}
                        {visibleStudent === student.id && (
                            <div>
                                {student.tests.map((test) => (
                                    <div key={test.id} className="flex flex-col gap-0.2">
                                        {/* Clickable div to toggle expected/actual output */}
                                        <div 
                                            className="flex justify-between m-[10px] p-[10px] border-2 border-gray-200 rounded-md hover:bg-[#e8f6fc] cursor-pointer"
                                            onClick={() => toggleTestVisibility(test.id)}
                                        >
                                            <p className="text-gray-700">Test {test.id}</p>
                                            <p className="text-gray-600">{test.status}</p>
                                        </div>

                                        {/* Show Expected and Actual Output only if the test is visible */}
                                        {visibleTest === test.id && (
                                            <div className="flex gap-2 justify-between m-[10px] p-[10px] border-2 border-gray-200 rounded-md">
                                                <div className="w-full">
                                                    <h2>Expected Output</h2>
                                                    <div className="bg-gray-100 px-[10px] rounded-md">
                                                        <p>{Definedtests.find(t => t.id === test.id)?.output || "N/A"}</p>
                                                    </div>
                                                </div>
                                                <div className="w-1 bg-gray-300"></div>
                                                <div className="w-full">
                                                    <h2>Actual Output</h2>
                                                    <div className="bg-gray-100 px-[10px] rounded-md">
                                                        <p>{test.output}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
