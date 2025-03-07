import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router";
import HomePage from "./pages/home/page.jsx";
import Layout from "@/pages/layout.jsx";
import Page from "@/pages/testcases/page.jsx";
import AboutPage from "@/pages/about/page.jsx";
import EvaluatePage from "@/pages/evaluate/page.jsx";
import SettingsPage from "@/pages/settings/page.jsx";
import CreatePage from "@/pages/testcases/create/page.jsx";
import ViewPage from "@/pages/testcases/view/page.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/testcase" element={<Page/>}>
                        <Route path="create" element={<CreatePage/>}/>
                        <Route path="view" element={<ViewPage/>}/>
                        <Route path="view/:testcaseId" element={<ViewPage/>}/>
                    </Route>
                    <Route path="/about" element={<AboutPage/>}/>
                    <Route path="/evaluate" element={<EvaluatePage/>}/>
                    <Route path="/settings" element={<SettingsPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
