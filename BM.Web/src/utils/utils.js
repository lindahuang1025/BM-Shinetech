import { parse } from 'querystring';
import { message } from 'antd';
import { history } from 'umi';
import { turnJsonStringify, turnJsonParse } from './common'

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);
export const isAntDesignPro = () => {
    if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
        return true;
    }
    return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
    const { NODE_ENV } = process.env;
    if (NODE_ENV === 'development') {
        return true;
    }
    return isAntDesignPro();
};

//保存上一个页面的地址链接
export const getPageQuery = () => parse(window.location.href.split('?')[1]);

//user
export const setStoredUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
}

export const getStoredUser = () => {
    const storedUser = localStorage.getItem('user');
    debugger
    if (storedUser !== null) {
        return JSON.parse(storedUser);
    } else {
        return {
            UserId: 0,
            UserName: '',
            RoleId: 0
        };
    }
}

export const delStoredUser = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('antd-pro-authority');
    localStorage.removeItem('token');
}

//Bearer Token
export const setToken = (token) => {
    localStorage.setItem('token', token);
}

export const getToken = () => {
    const token = localStorage.getItem('token');
    return token || '';
}