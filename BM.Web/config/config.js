// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;
export default defineConfig({
    hash: true,
    antd: {},
    dva: {
        hmr: true,
    },
    history: {
        type: 'hash',
    },
    locale: {
        // default zh-CN
        default: 'zh-CN',
        antd: false,
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
    },
    targets: {
        ie: 11,
    },
    // umi routes: https://umijs.org/docs/routing
    routes,
    // Theme for antd: https://ant.design/docs/react/customize-theme-cn
    theme: {
        'primary-color': defaultSettings.primaryColor,
    },
    define: {
        apiUrl: 'http://localhost:2021/server',
        uploadImgUrl: 'http://localhost:2021/server/File/BookFile/',
        // apiUrl: 'https://shinetechbm.cn.utools.club/server',
        // uploadImgUrl: 'https://shinetechbm.cn.utools.club/server/File/BookFile/',
        pageSize: 20
    },
    title: false,
    ignoreMomentLocale: true,
    proxy: proxy[REACT_APP_ENV || 'dev'],
    manifest: {
        basePath: '/',
    },
    esbuild: {},
});
