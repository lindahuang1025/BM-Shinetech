import request from '@/utils/request';

export async function queryBorrowList(params) {
    return request('/api/bookBorrow/query', {
        method: 'POST',
        data: {
            ...params
        }
    });
}

export async function returnBook(params) {
    return request('/api/bookBorrow/returnBook', {
        method: 'POST',
        data: {
            ...params
        }
    });
}