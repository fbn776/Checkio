import {Bell} from "lucide-react";
import ProfileIcon from "@/components/ProfileIcon/index.jsx";
import {useState} from "react";

export default function TestcasePage() {
    const [countNotification, setCountNotification] = useState(5);
    const tabs = ['HOME', 'CREATE PROGRAM', 'TEST CASE', 'PROGRAM', 'EVALUATE', 'REPORT', 'CONFIGURATION']
    const [activeTab, setActiveTab] = useState(tabs[0])
    const handleClick = (tab) => {
        setActiveTab(tab)
    }

    return (
        <div className="container flex flex-row items-center justify-center min-vh-100">
            <div className="flex flex-grow flex-col items-center justify-start min-h-[100vh]">
                <div className="flex flex-col bg-[#009be5] min-h-[130px] w-full items-center justify-between">
                    <div className="w-full p-6 flex flex-row items-center justify-between">
                        <div className="h-[50px] w-[50px] rounded-full bg-white"></div>
                        <div className="flex flex-row items-center gap-5">
                            <div className="relative flex flex-row gap[-2px]">
                                <Bell size={35} stroke={'white'}/>
                                <div
                                    className="absolute right-[-2px] top-[-4px] bg-red-500 w-5 h-5 flex items-center justify-center rounded-full text-[12px] text-white">
                                    {countNotification}
                                </div>
                            </div>
                            <ProfileIcon/>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-around px-8 text-white poppins-semibold">
                        {tabs.map((tab, i) => (
                            <div key={tab} className="cursor-pointer" onClick={() => {
                                handleClick(tab)
                            }}>
                                <div className="px-1">
                                    {tab}
                                </div>
                                <div className={`min-h-1 rounded-full transition-all duration-250 ease-in-out  ${tab === activeTab ? 'bg-blue-900 w-full' : 'bg-transparent w-2'}`}></div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white w-full flex-grow">

                </div>
            </div>
        </div>
    )
}