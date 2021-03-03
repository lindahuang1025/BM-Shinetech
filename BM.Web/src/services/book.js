import request from '@/utils/request';

export async function queryBookList(params) {
    return request('/api/bookInfo/query', {
        method: 'POST',
        data: {
            ...params
        }
    });
}

export async function getBookInfoById(id) {
    return request(`/api/bookInfo/getById/${id}`, {
        method: 'GET'
    });
}