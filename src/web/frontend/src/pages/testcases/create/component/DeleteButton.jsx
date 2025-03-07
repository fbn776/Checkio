import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.jsx";
import {Trash2} from "lucide-react";

export function DeleteButton(props) {
    return <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <Trash2 className="absolute right-4 top-4 size-4 text-red-600 hover:cursor-pointer"
                        onClick={props.onClick}/>
            </TooltipTrigger>
            <TooltipContent
                className="bg-white border-gray-200 border-[1px] text-black text-[12px] px-2 py-2 rounded-[5px] shadow-lg mb-1"
                side={"top"}>
                <p>Delete Section</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>;
}