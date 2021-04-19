import request from '@/utils/request';
import { getStoredUser } from '@/utils/utils';

export async function query() {
    return request('/api/users');
}
export async function queryCurrent() {
    return getStoredUser();
}
export async function queryNotices() {
    return request('/api/notices');
}

export async function getUserCommentsList() {
    return request('/api/userComments/getAll', {
      method: 'GET'
    });
}

export async function UserCommentsAddOrUpdate(params) {
    return request('/api/userComments/addOrUpdate', {
        method: 'POST',
        data: {
            ...params
        }
    });
}

export async function UserCommentsDeleted(id) {
    return request(`/api/userComments/deleteById/${id}`, {
        method: 'POST'
    });
}