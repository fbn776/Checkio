export default function UserguidePage() {
    return (
        <div className="p-5">
           <div className = "px-[30px] py-[20px] bg-white shadow-xl rounded-[10px] mb-[30px]">
            {/* Section 3: User Guide for Faculty */}
               <h2 className="text-[#081627] text-[30px] font-semibold mb-4">
                    User Guide
                </h2>
                <h3 className="text-[#081627] text-[22px] font-semibold mb-2">
                    For Faculty
                </h3>
                Instructions for faculty members on how to set up, configure, and use Checkio for managing student code submissions and evaluations.
                <div>
                    <h2 className="text-[#081627] text-[18px] font-semibold mt-7 mb-2">
                        1. Setting up Checkio
                    </h2>
                    To set up Checkio and adjust system settings, use:<br/>
                    <div className="bg-gray-200 text-center py-[5px] font-semibold w-[230px] rounded-[10px]">
                        checkio config
                    </div>
                    This command allows Faculty to configure necessary settings, such as database connections, environment variables, and other system preferences.
                </div>
                <div>
                    <h2 className="text-[#081627] text-[18px] font-semibold mt-7 mb-2">
                        2. User Management
                    </h2>
                    <h2 className="text-[#081627] text-[16px] font-semibold mt-4 px-1 mb-2">
                        2.1 Creating a Faculty user
                    </h2>
                    Before using Checkio, Faculty members need an account. To create a new faculty account:<br/>
                    <div className="bg-gray-200 text-center py-[5px] font-semibold w-[230px] rounded-[10px]">
                        checkio user create
                    </div>
                    <h2 className="text-[#081627] text-[16px] font-semibold mt-4 px-1 mb-2">
                        2.2 Deleting a Faculty user
                    </h2>
                    If a faculty member’s account is no longer needed, you can remove it using:<br/>
                    <div className="bg-gray-200 text-center py-[5px] font-semibold w-[230px] rounded-[10px]">
                        checkio user delete
                    </div>  
                </div>
                <div>
                    <h2 className="text-[#081627] text-[18px] font-semibold mt-7 mb-2">
                       3. Web-Based Access
                    </h2>
                    To access the Checkio dashboard via a web browser:<br/>
                    <div className="bg-gray-200 text-center py-[5px] font-semibold w-[230px] rounded-[10px]">
                        checkio serve
                    </div>
                </div>
                <div>
                    <h2 className="text-[#081627] text-[18px] font-semibold mt-7 mb-2">
                       4. Creating Test Cases
                    </h2>
                    To create a test case for student assignments:<br/>
                    <div className="bg-gray-200 text-center py-[5px] font-semibold w-[230px] rounded-[10px]">
                        checkio create
                    </div>
                </div> 
           </div>

           <div className = "px-[30px] py-[20px] bg-white shadow-xl rounded-[10px] mb-[30px]">
            {/* Section 3:User Guide for Students */}
               <h2 className="text-[#081627] text-[30px] font-semibold mb-4">
                    User Guide
                </h2>
                <h3 className="text-[#081627] text-[22px] font-semibold mb-2">
                    For Student
                </h3>
                Provides students with detailed instructions on how to use Checkio for submitting, running, and analyzing their programs.
                <div>
                    <h2 className="text-[#081627] text-[18px] font-semibold mt-7 mb-2">
                        1. Running a Program
                    </h2>
                    To execute the program and check if it produces the desired output, use:<br/>
                    <div className="bg-gray-200 text-center py-[5px] font-semibold w-[230px] rounded-[10px]">
                        checkio run
                    </div>
                </div>
                <div>
                    <h2 className="text-[#081627] text-[18px] font-semibold mt-7 mb-2">
                        2. Analyzing Code
                    </h2>
                    To analyze the logic and performance of a program, use:<br/>
                    <div className="bg-gray-200 text-center py-[5px] font-semibold w-[230px] rounded-[10px]">
                       checkio analyze 
                    </div>  
                </div>
                <div>
                    <h2 className="text-[#081627] text-[18px] font-semibold mt-7 mb-2">
                       3.Submitting Code
                    </h2>
                    To submit a program to Checkio for evaluation, use:<br/>
                    <div className="bg-gray-200 text-center py-[5px] font-semibold w-[230px] rounded-[10px]">
                        checkio submit
                    </div>
                </div>
           </div>
        </div>

    )
}