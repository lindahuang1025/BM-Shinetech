import { extend } from 'umi-request';
import { notification } from 'antd';
import { getToken, getStoredUser } from '@/utils/utils';
import { getDvaApp } from 'umi';
import { Toast } from 'antd-mobile';

const user = getStoredUser();

//异常处理程序
const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

const errorHandler = (error) => {
    Toast.hide();
    const { response } = error;

    if (response && response.status) {
        const errorText = codeMessage[response.status] || response.statusText;
        const { status, url } = response;

        notification.error({
            message: `请求错误 ${status}: ${url}`,
            description: errorText,
        });

        //如果token时效消失，请求返回401，额外加一个退出登录的操作，从而删除内存中的user
        if (response.status === 401) {
            const dvaApp = getDvaApp();
            dvaApp._store.dispatch({
                type: 'login/logout',
            });
        }
    } else if (!response) {
        notification.error({
            description: '您的网络发生异常，无法连接服务器',
            message: '网络异常',
        });
    }

    return response;
};

//配置request请求时的默认参数
const request = extend({
    prefix: apiUrl,
    // 默认错误处理
    errorHandler,
    credentials: 'omit', // 不在请求中包含凭据
    headers: {
        Authorization: `Bearer ${getToken()}`,
        UserId: user.UserId,
        UserName: user.UserName,
        UserRole: user.RoleId
    }
});

request.interceptors.request.use(() => {
    Toast.loading('看官稍安勿躁', 60);
});

//统一处理status不为正常的状态，例如 > 0 的状态
request.interceptors.response.use(async(response, options) => {
    Toast.hide();
    let result;
    //获取当前请求后端返回的response
    const data = await response.clone().json();
    if (data.Status < 0) {
        // 界面报错处理
        notification.error({
            message: `请求错误 ${data.Status}`,
            description: data.Message,
        });
    } else {
        // 如为正常（例如0），则正常返回response
        result = response;
    }
    return result;
});

export default request;