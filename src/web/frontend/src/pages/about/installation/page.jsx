export default function InstallPage () {
    return (
        <div className="p-5">
           <div className = "px-[30px] py-[20px] bg-white shadow-xl rounded-[10px] mb-[30px]">
            {/* Section 3: How to Install */}
                <h2 className="text-[#081627] text-[30px] font-semibold mb-4">
                    Installation
                </h2>
                <div>
               1. Clone the repository<br/>
                    <div className="bg-gray-200 text-center py-[5px] font-semibold w-[200px] rounded-[10px]">
                        git clone [repo-url]
                    </div>
                Or download the zip file and extract it.<br/><br/>

                2. Change the directory to the project folder<br/>
                <div className="bg-gray-200 text-center py-[5px] font-semibold w-[200px] rounded-[10px] mb-6">
                    cd [project-folder]
                </div>

                3. Install the dependencies<br/>
                <div className="bg-gray-200 text-center py-[5px] font-semibold w-[200px] rounded-[10px] mb-6">
                    uv pip install -e .
                </div>

                4. Setup DB
                <div className="bg-gray-200 text-center py-[5px] font-semibold w-[300px] rounded-[10px] mb-6">
                    uv run src/core/db/schema.py
                </div>
    
                5. Run the project
                <div className="bg-gray-200 text-center py-[5px] font-semibold w-[270px] rounded-[10px] mb-6">
                    uv run python3 src/main.py
                </div>
                The above might only work for Unix based systems. For Windows, you can use `python src/main.py` or `py src/main.py`.<br/><br/>

                6. For usage like a cli tool use
                <div className="bg-gray-200 text-center py-[5px] font-semibold w-[200px] rounded-[10px]">
                    uv pip install -e .
                </div>
                This will install the package in editable mode, so you can run the tool from anywhere in the terminal.
                </div>
            </div>
        </div>
    )
}