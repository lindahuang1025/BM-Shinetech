import request from '@/utils/request';

export async function queryBookList(params) {
    console.log(params)
    return request('api/bookInfo/query', {
        method: 'POST',
        data: {
            ...params
        }
    });
}