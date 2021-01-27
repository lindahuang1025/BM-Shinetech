import request from '@/utils/request';

export async function queryBorrowList(params) {
    return request('/api/bookInfo/query', {
        method: 'POST',
        data: {
            ...params
        }
    });
}