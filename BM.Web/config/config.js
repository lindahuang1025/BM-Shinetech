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
        apiUrl: 'http://localhost:51464',
        // apiUrl: 'http://localhost:8080/bmShinetech',
        uploadImgUrl: 'http://localhost:8080/bmShinetech/File/BookFile/',
        pageSize: 20
    },
    title: false,
    ignoreMomentLocale: true,
    proxy: proxy[REACT_APP_ENV || 'dev'],
    manifest: {
        basePath: '/',
    },
    esbuild: {},
    mfsu:{},
});
