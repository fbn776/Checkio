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
                name: 'View Evaluation',
                route: '/evaluate'
            }, {
                name: 'Create',
                route: '/evaluate/create'
            }
        ]
    }, {
        title: 'About',
        route: '/about',
        icon: CircleHelp,
        children: []
    }, {
        title: 'Settings',
        route: '/settings',
        icon: Settings,
        children: []
    }
]

export const AUTH_TOKEN_KEY = 'auth_token';