import { queryBookList, getBookInfoById } from '@/services/book';

const Model = {
    namespace: 'BookListSpace',
    state: {
        bookList: [],
        bookInfo: {},
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
        },
        * getBookInfo({ payload }, { call, put }) {
            console.log(payload)
            const response = yield call(getBookInfoById, payload);
            console.log(response)
            yield put({
                type: 'setBookInfoState',
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
        },
        setBookInfoState(state, { payload }) {
            return {
                ...state,
                bookInfo: payload.Data || {},
                status: payload.Status,
                message: payload.Message
            };
        }
    }
};
export default Model;