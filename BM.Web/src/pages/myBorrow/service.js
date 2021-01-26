import request from '@/utils/request';

export async function queryBookList(params) {
    return request('/api/bookInfo/query', {
        method: 'POST',
        data: {
            ...params
        }
    });
}