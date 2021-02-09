import { queryBorrowList } from '@/services/bookBorrow';

const Model = {
    namespace: 'MyBorrowSpace',
    state: {
        borrowList: [],
        status: undefined,
        message: ''
    },
    effects: {
        * query({ payload }, { call, put }) {
            const response = yield call(queryBorrowList, payload);
            yield put({
                type: 'setBorrowListState',
                payload: response,
            });
        }
    },
    reducers: {
        setBorrowListState(state, { payload }) {
            let list = [];
            if (payload.Datas) {
                list = payload.Datas.filter((item) => item.Status === 1);
            }
            return {
                ...state,
                borrowList: list,
                status: payload.Status,
                message: payload.Message
            };
        },
    },
};
export default Model;