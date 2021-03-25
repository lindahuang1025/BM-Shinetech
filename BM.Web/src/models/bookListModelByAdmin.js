import { queryBookList } from '@/services/book';

const Model = {
    namespace: 'BookListByAdminSpace',
    state: {
        data: [],
        current: 1,
        pageSize: 20,
        success: undefined,
        message: ''
    },
    effects: {
        * queryListByAdmin({ payload }, { call, put }) {
            console.log("2222222222222")
            const response = yield call(queryBookList, payload);
            const bookListByProTable = {
                data: response.Datas,
                current: payload.pageIndex,
                pageSize: payload.pageSize,
                success: response.Status,
                total: response.Total,
                message: response.Message
            }
            yield put({
                type: 'setBookListState',
                payload: bookListByProTable,
            });
        }
    },
    reducers: {
        setBookListState(state, { payload }) {
            console.log(payload)
            return {
                ...state,
                data: payload.data || [],
                current: payload.current,
                pageSize: payload.pageSize,
                success: true,
                message: payload.message
            };
        }
    }
};
export default Model;