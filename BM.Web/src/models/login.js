import { history, FormattedMessage } from 'umi';
import { AccountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
import { setStoredUser, setToken, delStoredUser } from '@/utils/utils';

const Model = {
    namespace: 'login',
    state: {
        status: 0
    },
    effects: {
        * login({ payload }, { call, put }) {
            const response = yield call(AccountLogin, payload);
            yield put({
                type: 'changeLoginStatus',
                payload: response,
            }); // Login successfully
            if (response && response.Status > -1) {
                const params = getPageQuery();
                //save user data
                setStoredUser({...response.Data });
                //save Bearer token
                setToken(response.Data.AccessToken);
                message.success('🎉 🎉 🎉  登录成功！');
                let { redirect } = params;

                //if access book borrow but not login, go to login page, after login, directly to original book borrow page
                history.replace(redirect || '/');
            }
        },
        logout() {
            const { redirect } = getPageQuery();
            if (!redirect && window.location.pathname !== '/user/login') {
                history.replace({ pathname: '/user/login' });
            }
            delStoredUser();
        },
    },
    reducers: {
        changeLoginStatus(state, { payload }) {
            setAuthority('admin');
            return {...state, status: payload.Status, message: payload.Message, currentAuthority: 'admin' };
        },
    },
};
export default Model;