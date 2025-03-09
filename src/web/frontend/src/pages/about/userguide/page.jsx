export default function UserguidePage() {
    return (
        <div className="p-5">
           <div className = "px-[30px] py-[20px] bg-white shadow-xl rounded-[10px] mb-[30px]">
            {/* Section 3: How to Use */}
               <h2 className="text-[#081627] text-[30px] font-semibold mb-4">
                    User Guide
                </h2>
                <h3 className="text-[#081627] text-[20px] font-semibold mb-2">
                    For Faculty
                </h3>
                Instructions for faculty members on how to set up, configure, and use Checkio for managing student code submissions and evaluations.
                <div >
                    1. Setting up Checkio<br/>
                    To set up Checkio and adjust system settings, use:
                        checkio config
                    This command allows you to configure necessary settings, such as database connections, environment variables, and other system preferences.
                </div>
           </div>
        </div>

    )
}