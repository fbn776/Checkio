import CircularProgress from "./CircularProgress";
import {useEffect} from "react";
import axios from "axios";


export default function HomePage() {

    useEffect(() => {
        axios.get('/api/group/').then(response => {
            console.log(response.data);
        }).catch(e => {
            console.error(e);
        })
    }, []);

    return <div>
        {/* home */}
        <div className={'bg-[#009BE5] '}>
            <div className=" ml-[15px] border-b-3">
            <h1 className='p-[10px] mb-[5px] w-[120px]  text-center font-medium text-white h-[40px] rounded-[8px] hover:bg-[#0088cc]'>HOME</h1>
            </div>
        </div>
        {/* line */}
        <div>
            <h1 className="m-[40px] mb-[5px] font-semibold text-black text-[30px]">Streamline Evaluation – </h1>
            <h1 className="mt-0 ml-[40px] mb-[10px] font-medium text-black text-[30px] p-0">Define, Test, and Assess with Checkio!</h1>
        </div>

        <div className="h-screen flex flex-col p-[40px] gap-[40px]">
            {/* horizontal divs */}
            <div className="w-full flex flex-row gap-[40px]">
                {/* Recently Generated report */}
                <div className="w-full bg-[#fff] shadow-[0px_0px_20px_2px_#c4c4c4] h-auto p-[20px] flex flex-col gap-[20px] hover:bg-[#e8f6fc] rounded-[15px]">
                    <h1 className="text-[22px] font-medium text-[#009BE5] font-semibold">View Report</h1>
                    <div className="flex gap-[10px] ml-[20px]">
                        <div className="flex flex-col gap-[2px] w-full">
                            <p className="text-[#9c9c9c]">Submissions: <span className="font-light">75</span></p>
                            <p className="text-[#9c9c9c]">Most Passed Test: <span className="font-light">12</span></p>
                            <p className="text-[#9c9c9c]">Most Failed Test: <span className="font-light">8</span></p>
                        </div>
                        <div className="w-[200px] h-full flex justify-center items-top">
                            <CircularProgress value={55} label="Pass Percent" />    {/* value = pass percent of the test case*/}
                        </div>
                    </div>
                </div>
                {/* Lab preview */}
                <div className="w-full bg-[#fff] shadow-[0px_0px_20px_2px_#c4c4c4] h-auto p-[20px] flex flex-col gap-[20px] hover:bg-[#e8f6fc] rounded-[15px]">
                    <h1 className="text-[22px] font-medium text-[#009BE5] font-semibold">XXX Lab</h1>
                    <div className="flex gap-[10px] ml-[20px]">
                        <div className="flex flex-col gap-[2px] w-full">
                            <p className="text-[#9c9c9c]">Created Test Cases: <span className="font-light">15</span></p>
                            <p className="text-[#9c9c9c]">Submissions: <span className="font-light">12</span></p>
                            <p className="text-[#9c9c9c]">Report Generated: <span className="font-light">10</span></p>
                        </div>
                        <div className="w-[200px] h-full flex justify-center items-center">
                            <CircularProgress value={55} label="Lab Completed" />
                        </div>
                    </div>
                </div>
            </div>
            {/* recents */}
            <div className="w-full flex flex-col gap-[10px]">
                <h1 className="text-[22px] font-medium text-[#009BE5] font-semibold ">Recents</h1>
                {/* recent test cases */}
                <div className="w-full h-auto flex flex-col gap-[2px] items-start shadow-[0px_0px_20px_2px_#c4c4c4] bg-[#c4c4c4]">
                    <button className="w-full h-[40px] px-[40px] flex justify-between items-center bg-[#fff] hover:bg-[#e8f6fc] rounded">#test case 1 <span className="w-[20px]">8</span></button>                
                    <button className="w-full h-[40px] px-[40px] flex justify-between items-center bg-[#fff] hover:bg-[#e8f6fc] rounded">#test case 1 <span className="w-[20px]">8</span></button>                
                    <button className="w-full h-[40px] px-[40px] flex justify-between items-center bg-[#fff] hover:bg-[#e8f6fc] rounded">#test case 1 <span className="w-[20px]">8</span></button>                
                    <button className="w-full h-[40px] px-[40px] flex justify-between items-center bg-[#fff] hover:bg-[#e8f6fc] rounded">#test case 1 <span className="w-[20px]">8</span></button>                
                    <button className="w-full h-[40px] px-[40px] flex justify-between items-center bg-[#fff] hover:bg-[#e8f6fc] rounded">#test case 1 <span className="w-[20px]">8</span></button>                
                </div>
            </div>
        </div>

    </div>
}