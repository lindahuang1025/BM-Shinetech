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
                authority: ['Admin', 'User'],
                routes: [{
                        path: '/',
                        redirect: '/bookList'
                    },
                    /* user config start */
                    {
                        name: 'list.book-list',
                        icon: 'table',
                        path: '/bookList',
                        component: './User/BookList.jsx',
                        authority: ['User']
                    },
                    {
                        name: 'list.borrow-list',
                        icon: 'crown',
                        path: '/borrowList',
                        component: './User/MyBorrow.jsx',
                        authority: ['User']
                    },
                    {
                        path: '/search',
                        component: './User/SearchPage.jsx',
                        authority: ['User']
                    },
                    {
                        path: '/bookDetail',
                        component: './User/BookDetail.jsx',
                        authority: ['User']
                    },
                    {
                      name: 'list.user-info',
                      icon: 'user',
                      path: '/userInfo',
                      component: './User/User.jsx',
                      authority: ['User']
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
