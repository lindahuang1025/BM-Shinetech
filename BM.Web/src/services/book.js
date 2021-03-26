import request from '@/utils/request';

export async function queryBookList(params) {
    return request('/api/bookInfo/query', {
        method: 'POST',
        data: {
            ...params
        }
    });
}

export async function queryBookListByAdmin(params) {
    const res = await request('/api/bookInfo/query', {
        method: 'POST',
        data: {
            keyword: params.keyword,
            pageIndex: params.current,
            pageSize: params.pageSize
        }
    });
    const dataList = {
        data: res.Datas,
        current: params.pageIndex,
        pageSize: params.pageSize.toString(),
        total: res.Total,
        success: res.Status
    };
    return dataList;
}

export async function getBookInfoById(id) {
    return request(`/api/bookInfo/getById/${id}`, {
        method: 'GET'
    });
}