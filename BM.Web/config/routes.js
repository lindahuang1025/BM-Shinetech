export default [
  {
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
                      redirect: '/bookList'
                  },
                  /* user config start */
                  {
                      name: 'list.book-list',
                      icon: 'table',
                      path: '/bookList',
                      component: './User/BookList.jsx',
                      authority: ['user']
                  },
                  {
                      name: 'list.borrow-list',
                      icon: 'crown',
                      path: '/borrowList',
                      component: './User/MyBorrow.jsx',
                      authority: ['user']
                  },
                  {
                      path: '/search',
                      component: './User/SearchPage.jsx',
                      authority: ['user']
                  },
                  {
                      path: '/bookDetail',
                      component: './User/BookDetail.jsx',
                      authority: ['user']
                  },
                  /* user config end */

                  /* admin config start */
                  {
                    name: 'list.book-manage',
                    icon: 'table',
                    path: '/book',
                    component: './Admin/Book.jsx',
                    authority: ['user']
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
