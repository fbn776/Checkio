export default function HomePage() {
    return <>
        <div className="container flex flex-row items-center justify-center min-vh-100">
            <div className="w-[300px] bg-[#081627] min-h-[100vh]">
            </div>
            <div className="flex flex-grow flex-col items-center justify-start min-h-[100vh]">
                <div className="flex flex-col bg-[#009be5] min-h-[150px] w-full items-center justify-between">
                    <div className="w-full p-6">
                        <div className="h-[60px] w-[60px] rounded-full bg-white"></div>
                    </div>
                    <div className="w-full flex items-center justify-start px-8 text-white">
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