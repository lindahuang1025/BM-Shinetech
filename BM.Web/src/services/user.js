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