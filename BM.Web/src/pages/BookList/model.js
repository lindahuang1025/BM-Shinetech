import { queryBookList } from './service';

const Model = {
    namespace: 'BookList',
    state: {
        state: null
    },
    effects: {
        * query({ payload }, { call, put }) {
            const response = yield call(queryBookList, payload);
            yield put({
                type: 'setBookList',
                payload: response,
            });

            console.log(response)
                // if (response && response.Status === 0) {

            // }
        }
    },
    reducers: {
        setBookList(state, { payload }) {

            return {...state, status: payload.Status, message: payload.Message };
        },
    },
};
export default Model;