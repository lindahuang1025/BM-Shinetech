export default [{
        path: '/',
        component: '../layouts/BlankLayout',
        routes: [{
                path: '/user',
                component: '../layouts/UserLayout',
                routes: [{
                    name: 'login',
                    path: '/user/login',
                    component: './User/login',
                }, ],
            },
            {
                path: '/',
                component: '../layouts/SecurityLayout',
                routes: [{
                        path: '/',
                        component: '../layouts/BasicLayout',
                        authority: ['admin', 'user'],
                        routes: [{
                                path: '/',
                                redirect: '/list',
                            },
                            {
                                path: '/welcome',
                                name: 'welcome',
                                icon: 'smile',
                                component: './Welcome',
                            },
                            {
                                path: '/admin',
                                name: 'admin',
                                icon: 'crown',
                                component: './Admin',
                                authority: ['admin'],
                                routes: [{
                                    path: '/admin/sub-page',
                                    name: 'sub-page',
                                    icon: 'smile',
                                    component: './Welcome',
                                    authority: ['admin'],
                                }, ],
                            },
                            {
                                name: '图书列表',
                                icon: 'table',
                                path: '/list',
                                component: './BookList',
                            },
                            {
                                component: './404',
                            },
                        ],
                    },
                    {
                        component: './404',
                    },
                ],
            },
        ],
    },
    {
        component: './404',
    },
];