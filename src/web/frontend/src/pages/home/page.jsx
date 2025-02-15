import Checkio from '../../assets/Checkio.svg'
import BellIcon from '../../assets/BellIcon.svg'

export default function HomePage() {
    return <>
        <div className="container flex flex-row items-center justify-center min-vh-100">
            <div className="w-[300px] bg-[#081627] min-h-[100vh] flex flex-col items-center justify-start">
                <div className="flex items-center justify-center py-10 w-full ">
                    <img src={Checkio} alt="Checkio Logo" width="120" height="120"/>
                </div>
                <div className="flex flex-col p-2 pl-10 w-full text-[#009be5] poppins-semibold">
                    Home
                </div>
            </div>
            <div className="flex flex-grow flex-col items-center justify-start min-h-[100vh]">
                <div className="flex flex-col bg-[#009be5] min-h-[120px] w-full items-center justify-between">
                    <div className="w-full p-6 flex flex-row items-center justify-between">
                        <div className="h-[50px] w-[50px] rounded-full bg-white"></div>
                        <div className="flex flex-row items-center gap-8">
                            <img src={BellIcon} alt="Checkio Logo" width="30" height="30"/>
                            <div className="h-[50px] w-[50px] rounded-full bg-white"></div>
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