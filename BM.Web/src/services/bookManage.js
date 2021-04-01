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

export async function bookAddOrUpdate(params) {
    return request('/api/bookInfo/addOrUpdate', {
        method: 'POST',
        data: {
            ...params
        }
    });
}

export async function uploadBookBgImg(file) {
    const formData = new FormData();
    formData.append('file', file);
    return request('/api/bookInfo/uploadFile', {
        method: 'POST',
        data: formData
    });
}