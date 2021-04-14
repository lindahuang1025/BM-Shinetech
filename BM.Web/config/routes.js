export default [
  {
    path: '/account',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/Account/Login',
        component: './Account/Login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['Admin', 'User'],
        routes: [
          {
            path: '/',
            redirect: '/bookList',
          },
          /* admin config start */
          {
            name: 'list.book-manage',
            icon: 'table',
            path: '/bookManage',
            component: './Admin/BookManage.jsx',
            authority: ['Admin'],
            wrappers: [
              '@/wrappers/authByAdmin.jsx',
            ],
          },
          {
            path: '/bookManage/edit',
            component: './Admin/BookEdit.jsx',
            authority: ['Admin'],
          },
          /* admin config end */

          /* user config start */
          {
            name: 'list.book-list',
            icon: 'table',
            path: '/bookList',
            component: './User/BookList.jsx',
            authority: ['User','Admin']
          },
          {
            name: 'list.borrow-list',
            icon: 'crown',
            path: '/borrowList',
            component: './User/MyBorrow.jsx',
            authority: ['User','Admin'],
          },
          {
            path: '/search',
            component: './User/SearchPage.jsx',
            authority: ['User','Admin'],
          },
          {
            path: '/bookDetail',
            component: './User/BookDetail.jsx',
            authority: ['User','Admin'],
          },
          {
            name: 'list.user-info',
            icon: 'user',
            path: '/userInfo',
            component: './User/User.jsx',
            authority: ['User','Admin'],
          },
          /* user config end */
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
