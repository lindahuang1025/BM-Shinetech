import { queryCurrent, query as queryUsers , getUserCommentsList } from '@/services/user';
import moment from 'moment';
// import { User } from '@/types/User'

const UserModel = {
    namespace: 'user',
    state: {
        currentUser: {},
        userCommentsList:[]
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

        * fetchUserCommentsList(_, { call, put }) {
            const response = yield call(getUserCommentsList);
            let commentsList = [];
            if(response && response.Datas){
                commentsList = response.Datas.map(function(item) {
                    return {
                        Id:item.Id,
                        author: "Ta说",
                        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
                        content: item.Comment,
                        datetime: moment(item.UpdateDate).format('YYYY.MM.DD HH:mm')
                    }
                })
            }
            yield put({
                type: 'ChangeUserCommentsList',
                payload: commentsList,
            });
        },

    },
    reducers: {
        saveCurrentUser(state, action) {
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

        ChangeUserCommentsList(state, action) {
            return {...state, userCommentsList: action.payload };
        },
    },
};
export default UserModel;