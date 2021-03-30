import request from '@/utils/request';

export async function bookDeleted(id) {
    return request(`/api/bookInfo/deleteById/${id}`, {
        method: 'POST'
    });
}

export async function getBookCategoryList() {
    return request('/api/bookCategory/getAll', {
        method: 'GET'
    });
}