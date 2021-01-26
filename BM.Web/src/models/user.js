import { queryCurrent, query as queryUsers } from '@/services/user';
import request from '@/utils/request';

const UserModel = {
    namespace: 'user',
    state: {
        currentUser: {},
    },
    effects: {
        * fetch(_, { call, put }) {
            const response = yield call(queryUsers);
            yield put({
                type: 'save',
                payload: response,
            });
        },

        * fetchCurrent(_, { call, put }) {
            const response = yield call(queryCurrent);
            yield put({
                type: 'saveCurrentUser',
                payload: response,
            });
        },
    },
    reducers: {
        saveCurrentUser(state, action) {

            // if (action.payload && action.payload.AccessToken) {
            //     request.extendOptions({ headers: { 'Authorization': `Bearer ${action.payload.AccessToken}` } });
            // }

            return {...state, currentUser: action.payload || {} };
        },

        changeNotifyCount(
            state = {
                currentUser: {},
            },
            action,
        ) {
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    notifyCount: action.payload.totalCount,
                    unreadCount: action.payload.unreadCount,
                },
            };
        },
    },
};
export default UserModel;