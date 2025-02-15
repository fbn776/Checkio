import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ProfileIcon() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="h-[45px] w-[45px] rounded-full bg-white hover:cursor-pointer"></div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-45 mr-5 mt-2">
                <DropdownMenuLabel className="text-[#081627]">Profile</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Account Details
                    </DropdownMenuItem>
                    <DropdownMenuItem  className="">
                        Login
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Logout
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Sign In
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Sign Out
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
