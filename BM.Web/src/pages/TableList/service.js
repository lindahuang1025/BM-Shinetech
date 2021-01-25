import request from '@/utils/request';

export async function queryRule(params) {
    return request('/api/rule', {
        params,
    });
}
export async function removeRule(params) {
    return request('/api/rule', {
        method: 'POST',
        data: {...params, method: 'delete' },
    });
}
export async function addRule(params) {
    return request('/api/rule', {
        method: 'POST',
        data: {...params, method: 'post' },
    });
}
export async function updateRule(params) {
    return request('/api/rule', {
        method: 'POST',
        data: {...params, method: 'update' },
    });
}

export async function queryBookList(params) {
    console.log(params)
    return request('api/bookInfo/query', {
        method: 'POST',
        data: {
            ...params
        }
    });
}