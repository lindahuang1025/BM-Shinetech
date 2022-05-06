import request from '@/utils/request';

export async function queryBorrowList(params) {
    return request('/api/bookBorrow/query', {
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

export async function outStock(params){
    return request('api/bookBorrow/outStock',{
        method: 'POST',
        data:{
            ...params
        }
    });
}