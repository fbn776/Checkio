import {Search} from 'lucide-react'

export default function ViewPage() {


    return (
        <div className="w-full p-5 flex flex-col gap-3">
            <form className="flex flex-col gap-3">
            {/*Testcase Id*/}
            <div className="border shadow p-4 bg-white rounded-md">
                <h1 className="text-xl mb-4">Testcase Id</h1>
                <div className="flex items-center gap-5">
                    <input
                        className="w-full p-3 flex-1 border bg-white border-gray-300 rounded-md px-4 py-2 focus:border-[#009be5] focus:outline-none mb-[8px]"
                        placeholder="Enter Group Id" required={true}/>
                    <input
                        className="w-full p-3 flex-1 border bg-white border-gray-300 rounded-md px-4 py-2 focus:border-[#009be5] focus:outline-none mb-[8px]"
                        placeholder="Enter Testcase Id" required={true}/>
                </div>
            </div>
                {/* Submit Button */}
                <div className="w-full flex items-center justify-center">
                    <button
                        type="submit"
                        className="flex items-center bg-gradient-to-b from-[#009be5] to-[#0088cc] text-white px-4 py-2 rounded-md hover:from-[#0088cc] hover:to-[#0077b3] shadow-sm border border-[#0077b3] transition duration-150 ease-in-out cursor-pointer gap-2"
                    >
                        <Search size={18} />
                        Search
                    </button>
                </div>
            </form>
        </div>
    )
}