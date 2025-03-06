import {Plus} from "lucide-react";

export function InputSelectorButton({Icon, text, onClick}) {
    return <div onClick={onClick}
                className="flex items-center bg-gradient-to-b from-[#009be5] to-[#0088cc] text-white px-4 py-2 rounded-md hover:from-[#0088cc] hover:to-[#0077b3] shadow-sm border border-[#0077b3] transition duration-150 ease-in-out cursor-pointer gap-2">
        <Icon size={18}/>
        {text}
        <div className="bg-[#40b0e9] p-1 rounded-full ml-2">
            <Plus size={16}/>
        </div>
    </div>;
}