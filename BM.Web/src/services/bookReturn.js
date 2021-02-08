import request from '@/utils/request';

export async function returnBook(params) {
    return request('/api/bookBorrow/returnBook', {
        method: 'POST',
        data: {
            ...params
        }
    });
}