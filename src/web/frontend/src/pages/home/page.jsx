import ProfileIcon from "@/components/ProfileIcon/index.jsx";
import { Bell } from 'lucide-react';

export default function HomePage() {
    return <>
        <div className="container flex flex-row items-center justify-center min-vh-100">
            <div className="flex flex-grow flex-col items-center justify-start min-h-[100vh]">
                <div className="flex flex-col bg-[#009be5] min-h-[120px] w-full items-center justify-between">
                    <div className="w-full p-6 flex flex-row items-center justify-between">
                        <div className="h-[50px] w-[50px] rounded-full bg-white"></div>
                        <div className="flex flex-row items-center gap-5">
                            <Bell size={35} stroke={'white'}/>
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