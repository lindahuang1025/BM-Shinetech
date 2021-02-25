export default [{
        path: '/account',
        component: '../layouts/UserLayout',
        routes: [{
            name: 'login',
            path: '/Account/Login',
            component: './Account/Login',
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
                    // {
                    //     path: '/welcome',
                    //     name: 'welcome',
                    //     icon: 'smile',
                    //     component: './Welcome',
                    // },
                    // {
                    //     path: '/admin',
                    //     name: 'admin',
                    //     icon: 'crown',
                    //     component: './Admin',
                    //     authority: ['admin'],
                    //     routes: [{
                    //         path: '/admin/sub-page',
                    //         name: 'sub-page',
                    //         icon: 'smile',
                    //         component: './Welcome',
                    //         authority: ['admin'],
                    //     }, ],
                    // },
                    {
                        name: 'list.book-list',
                        icon: 'table',
                        path: '/list',
                        component: './BookList.jsx',
                    },
                    {
                        name: 'list.myBorrow',
                        icon: 'crown',
                        path: '/borrow',
                        component: './MyBorrow.jsx',
                    },
                    {
                        path: '/search',
                        component: './SearchPage.jsx',
                    },
                    {
                        path: '/bookDetail',
                        component: './BookDetail.jsx',
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
    {
        component: './404',
    },
];
