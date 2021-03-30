import { getBookCategoryList } from '@/services/bookManage';

const Model = {
    namespace: 'BookListByAdminSpace',
    state: {
        bookCategoryList:[]
    },
    effects: {
        * queryBookCategoryList({ payload }, { call, put }) {
            const response = yield call(getBookCategoryList, payload);
            let newOptionData = [];
            // 替换为Select 组件需要的结构
            if(response && response.Datas){
                newOptionData = response.Datas.map(function(item) {
                    return {
                        label: item.CategoryName,
                        value: item.Id
                    }
                })
            }
            yield put({
                type: 'setBookCategoryListState',
                payload: newOptionData,
            });
        }
    },
    reducers: {
        setBookCategoryListState(state, { payload }) {
            console.log(payload)
            return {
                ...state,
                bookCategoryList: payload,
            };
        }
    }
};
export default Model;