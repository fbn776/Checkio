import {CircleHelp, GraduationCap, House, Settings, TestTubeDiagonal} from "lucide-react";

export const ROUTES = [
    {
        title: 'Home',
        route: '/',
        icon: House,
        children: []
    }, {
        title: 'Testcases',
        route: '/testcase/create',
        icon: TestTubeDiagonal,
        children: [
            {
                name: 'Create Testcase',
                route: '/testcase/create'
            }, {
                name: 'View Testcase',
                route: '/testcase/view'
            }
        ]
    }, {
        title: 'Evaluate',
        route: '/evaluate',
        icon: GraduationCap,
        children: [
            {
                name: 'Evaluation',
                route: '/evaluate'
            }, {
                name: 'Submitted Programs',
                route: '/evaluate/submittedPrograms'
            }, {
                name: 'Create Evaluation',
                route: '/evaluate/create'
            }
        ]
    }, {
        title: 'About',
        route: '/about/brief',
        icon: CircleHelp,
        children: [
            {
                name: 'Brief',
                route: '/about/brief'
            },{
                name: 'Commands',
                route: '/about/commands'
            },{
                name: 'Installation',
                route:'/about/install'
            },{
                name: 'User Guide',
                route: '/about/userguide'
            }
        ]
    }, {
        title: 'Settings',
        route: '/settings',
        icon: Settings,
        children: []
    }
]

export const AUTH_TOKEN_KEY = 'auth_token';