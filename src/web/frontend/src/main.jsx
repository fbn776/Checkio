import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router";
import HomePage from "./pages/home/page.jsx";
import Layout from "@/pages/layout.jsx";
import Page from "@/pages/testcases/page.jsx";
import EvaluatePage from "@/pages/evaluate/page.jsx";
import SettingsPage from "@/pages/settings/page.jsx";
import CreatePage from "@/pages/testcases/create/page.jsx";
import ViewPage from "@/pages/testcases/view/page.jsx";
import BriefPage from './pages/about/brief/page';
import CommandPage from './pages/about/commands/page';
import InstallPage from './pages/about/installation/page';
import UserguidePage from './pages/about/userguide/page';
import SubmittedPrograms from "@/pages/evaluate/submitted_programs/page.jsx";

import LoginPage from "@/pages/login/page.jsx";
import {Toaster} from "sonner";
import AuthTokenSetup from "@/lib/axios-interceptor.js";
import EvaluationReport from "@/pages/evaluate/evaluation_report/page.jsx";
import ViewedTestcase from "@/pages/testcases/view/component/ViewedTestcase.jsx";
import ViewedSubmittedProgram from "@/pages/evaluate/submitted_programs/view/page.jsx";
import IndividualReport from "@/pages/evaluate/evaluation_report/individual-report.jsx";

AuthTokenSetup();

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Toaster richColors/>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route element={<Layout/>}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/testcase" element={<Page/>}>
                        <Route path="create" element={<CreatePage/>}/>
                        <Route path="view" element={<ViewPage/>}/>
                        <Route path="view/:testcaseId" element={<ViewedTestcase/>}/>
                    </Route>
                    <Route path="/about" element={<Page/>}>
                        <Route path="brief" element={<BriefPage/>}/> 
                        <Route path="commands" element={<CommandPage/>}/>
                        <Route path="install" element={<InstallPage/>}/>
                        <Route path="userguide" element={<UserguidePage/>}/>
                    </Route>
                    <Route path="/evaluate" element={<Page/>}>
                        <Route path="submittedPrograms" element={<SubmittedPrograms/>}/>
                        <Route path="evaluation-report" element={<EvaluationReport/>}/>
                        <Route path="evaluation-report/:evaluationId" element={<IndividualReport/>}/>
                        <Route path="submittedPrograms/view/:submissionId" element={<ViewedSubmittedProgram/>}/>
                    </Route>
                    <Route path="/settings" element={<SettingsPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
