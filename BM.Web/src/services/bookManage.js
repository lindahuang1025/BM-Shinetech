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
    // 将file转为formData类型
    const formData = new FormData();
    formData.append('file', file);
    const res = await request('/api/bookInfo/uploadFile', {
        method: 'POST',
        data: formData
    });

    // 返回一个upload组件需要的结构，onChange会根据status触发获取response
    const fileData = {...file};
    file.response = res;

    return fileData;
}