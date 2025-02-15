import ProfileIcon from "@/components/ProfileIcon/index.jsx";
import {Bell} from 'lucide-react';
import {useState} from "react";

export default function HomePage() {
    const [countNotification, setCountNotification] = useState(4);
    return <>
        <div className="container flex flex-row items-center justify-center min-vh-100">
            <div className="flex flex-grow flex-col items-center justify-start min-h-[100vh]">
                <div className="flex flex-col bg-[#009be5] min-h-[130px] w-full items-center justify-between">
                    <div className="w-full p-6 flex flex-row items-center justify-between">
                        <div className="h-[50px] w-[50px] rounded-full bg-white"></div>
                        <div className="flex flex-row items-center gap-5">
                            <div className="relative flex flex-row gap[-2px]">
                                <Bell size={35} stroke={'white'}/>
                                <div className="absolute right-[-2px] top-[-4px] bg-red-500 w-5 h-5 flex items-center justify-center rounded-full text-[12px] text-white">
                                    {countNotification}
                                </div>
                            </div>
                            <ProfileIcon/>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-start px-8 text-white poppins-semibold">
                        <div className="min-h-[30px] w-full">
                            HOME
                        </div>
                    </div>
                </div>
                <div className="bg-white w-full flex-grow">

                </div>
            </div>
        </div>
    </>
}