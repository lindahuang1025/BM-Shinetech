import request from '@/utils/request';
import storageUtil from '@/utils/storageUtil'

export async function query() {
    return request('/api/users');
}
export async function queryCurrent() {
    return storageUtil.getUser();
}
export async function queryNotices() {
    return request('/api/notices');
}