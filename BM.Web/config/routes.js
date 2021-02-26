export default [{
        path: '/account',
        component: '../layouts/UserLayout',
        routes: [{
            name: 'login',
            path: '/Account/Login',
            component: './Account/Login',
        }, ]
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
                        redirect: '/bookManage'
                    },
                    /* user config start */
                    {
                        name: 'list.book-list',
                        icon: 'table',
                        path: '/bookList',
                        component: './user/BookList.jsx',
                        authority: ['user']
                    },
                    {
                        name: 'list.borrow-list',
                        icon: 'crown',
                        path: '/borrowList',
                        component: './user/MyBorrow.jsx',
                        authority: ['user']
                    },
                    {
                        path: '/search',
                        component: './user/SearchPage.jsx',
                        authority: ['user']
                    },
                    {
                        path: '/bookDetail',
                        component: './user/BookDetail.jsx',
                        authority: ['user']
                    },
                    /* user config end */

                    /* admin config start */
                    {
                        name: 'list.book-manage',
                        icon: 'table',
                        path: '/bookManage',
                        component: './admin/BookManage.jsx',
                        authority: ['admin']
                    },
                    /* admin config end */
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
    }
];