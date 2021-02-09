import { queryBookList } from '@/services/book';

const Model = {
    namespace: 'BookListSpace',
    state: {
        bookList: [],
        status: undefined,
        message: ''
    },
    effects: {
        * query({ payload }, { call, put }) {
            const response = yield call(queryBookList, payload);
            yield put({
                type: 'setBookListState',
                payload: response,
            });
        }
    },
    reducers: {
        setBookListState(state, { payload }) {
            return {
                ...state,
                bookList: payload.Datas || [],
                status: payload.Status,
                message: payload.Message
            };
        }
    }
};
export default Model;