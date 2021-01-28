import request from '@/utils/request';

export async function queryBookList(params) {
    return request('/api/bookInfo/query', {
        method: 'POST',
        data: {
            ...params
        }
    });
}

export async function borrowBook(params) {
    return request('/api/bookBorrow/borrowBook', {
        method: 'POST',
        data: {
            ...params
        }
    });
}