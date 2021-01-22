import request from '@/utils/request';

export async function AccountLogin(para) {
  return request('/api/sysUser/login', {
    method: 'POST',
    data: {
      ...para
    },
  });
}
