import {Outlet} from "react-router";
import {LogOut} from 'lucide-react';

export default function Layout() {
    return <main className="w-full h-full flex">
        <div className="h-full bg-[#081627] shadow text-white w-[350px] flex flex-col justify-between">
            <header className="h-[80px] flex items-center justify-center border-b-2 mx-10 border-white/10">
                <h1 className="text-2xl">Checkio</h1>
            </header>
            <section className="h-full flex-1 flex flex-col items-start px-10 gap-4 pt-10">
                <button className="hover:text-[#009be5] hover:cursor-pointer">Home</button>
                <button className="hover:text-[#009be5] hover:cursor-pointer">Testcases</button>
                <button className="hover:text-[#009be5] hover:cursor-pointer">Profile</button>
            </section>
            <footer>
                <button className="w-full flex items-center justify-center py-6 gap-4 hover:text-red-400">
                    <LogOut className="size-5"/>Logout
                </button>
            </footer>
        </div>
        <div className="h-full flex-1 flex flex-col">
            <header className="w-full h-[80px] bg-secondary">

            </header>
            <div>
                <Outlet/>
            </div>
        </div>
    </main>
}