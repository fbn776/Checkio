import {Link, Outlet, useLocation} from "react-router";
import {Bell, LogOut, User} from 'lucide-react';
import {ROUTES} from "@/lib/data.js";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Layout() {
    const pathname = useLocation().pathname;
    const selectedRoute = ROUTES.find(route => route.route.split('/')[1] === pathname.split('/')[1]);

    return <main className="w-full h-full flex">
        <div className="h-full bg-secondary shadow text-white w-[350px] flex flex-col justify-between">
            <header className="h-[80px] flex items-center justify-center border-b-2 mx-10 border-white/10">
                <h1 className="text-2xl">Checkio</h1>
            </header>
            <section className="h-full flex-1 flex flex-col items-start px-10 gap-4 pt-10 space-y-4">
                {ROUTES.map((route, index) =>
                    <Link
                        key={index}
                        to={route.route}
                        className="overflow-visible flex gap-2 items-center relative group  hover:translate-x-2 hover:text-primary transition-transform"
                        data-state={pathname.split('/')[1] === route.route.split('/')[1]}
                    >
                        <div className="group-data-[state=false]:hidden group-hover:opacity-0 transition-opacity absolute w-[3px] bg-white rounded-r-full h-full -left-10"/>
                        <route.icon className="size-5"/>
                        {route.title}
                    </Link>
                )}
            </section>
            <footer className="mx-10 border-t-2 border-white/10">
                <button className="w-full flex items-center justify-center py-6 gap-4 hover:text-red-400">
                    <LogOut className="size-5"/>Logout
                </button>
            </footer>
        </div>
        <div className="h-full flex-1 flex flex-col">
            <header className="flex flex-col w-full shadow">
                <div className="px-5 h-[80px] bg-primary flex items-center justify-end text-white gap-5">
                    <div className="relative">
                        <Bell/>
                        <label
                            className="text-white bg-red-500 absolute -top-2 -right-3 text-xs px-1 rounded-full">4+</label>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            className="rounded-full text-white cursor-pointer flex items-center justify-center h-[60%] w-auto aspect-square">
                            <User/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="mr-5">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem>Subscription</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
                {selectedRoute && selectedRoute.children.length > 0 &&
                    <div className="flex items-center divide-x divide-white/30 px-2 h-[40px] bg-[#007ab3] overflow-x-auto overflow-y-hidden">
                        {selectedRoute.children.map((child, index) =>
                            <Link
                                key={index}
                                to={child.route}
                                className="text-white transition-colors px-5 text-sm relative text-center inline-block"
                            >
                                {child.name}
                                <div className="hidden absolute h-1 bg-white rounded-full left-2 right-2 -bottom-3"/>
                            </Link>
                        )}
                    </div>
                }
            </header>
            <div className="flex-1">
                <Outlet/>
            </div>
        </div>
    </main>
}