import { stringify } from 'querystring';
import { history } from 'umi';
import { AccountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
import storageUtil from '@/utils/storageUtil'

const Model = {
    namespace: 'login',
    state: {
        status: undefined,
        currentUser: {},
    },
    effects: {
        * login({ payload }, { call, put }) {
            const response = yield call(AccountLogin, payload);
            yield put({
                type: 'changeLoginStatus',
                payload: response,
            }); // Login successfully
            if (response && response.Status === 0) {
                const urlParams = new URL(window.location.href);
                const params = getPageQuery();
                message.success('🎉 🎉 🎉  登录成功！');
                window.location.href = '/';
                let { redirect } = params;

                if (redirect) {
                    const redirectUrlParams = new URL(redirect);

                    if (redirectUrlParams.origin === urlParams.origin) {
                        redirect = redirect.substr(urlParams.origin.length);

                        if (redirect.match(/^\/.*#/)) {
                            redirect = redirect.substr(redirect.indexOf('#') + 1);
                        }
                    } else {
                        window.location.href = '/';
                        return;
                    }
                }

                history.replace(redirect || '/');
            }
        },

        logout() {
            const { redirect } = getPageQuery(); // Note: There may be security issues, please note

            if (window.location.pathname !== '/user/login' && !redirect) {
                history.replace({
                    pathname: '/user/login',
                    search: stringify({
                        redirect: window.location.href,
                    }),
                });
            }
        },
    },
    reducers: {
        changeLoginStatus(state, { payload }) {
            // if(payload.Data.AccessToken){

            // }
            // if(payload){
            //   setAuthority(payload.Data.RoleName === 'management' ? 'admin' : 'guest');
            // }

            setAuthority('admin');
            //save user data
            storageUtil.saveUser(payload.Data);
            return {...state, status: payload.Status, message: payload.Message, currentAuthority: 'admin', currentUser: payload.Data };
        },
    },
};
export default Model;