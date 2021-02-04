import { history } from 'umi';
import { AccountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
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
                type: 'loginReducer',
                payload: response,
            });
            if (response && response.Status > -1) {
                //save user data
                setStoredUser({...response.Data });

                //save Bearer token
                setToken(response.Data.AccessToken || '');

                //redirect home page
                const params = getPageQuery();
                const { redirect } = params;
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
        loginReducer(state, { payload }) {
            setAuthority('admin');
            return {...state, status: payload.Status, message: payload.Message, currentAuthority: 'admin' };
        },
    },
};
export default Model;