import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.jsx";
import {Minus} from "lucide-react";

export function MinusButton(props) {
    return <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <Minus className="absolute right-12 top-4 size-4 text-red-600 hover:cursor-pointer"
                        onClick={props.onClick}/>
            </TooltipTrigger>
            <TooltipContent
                className="bg-white border-gray-200 border-[1px] text-black text-[12px] px-2 py-2 rounded-[5px] shadow-lg mb-1"
                side={"top"}>
                <p>Delete an InputBox</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>;
}