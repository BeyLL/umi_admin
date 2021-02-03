// ref: https://umijs.org/config/
import { resolve } from 'path';
export default {
  publicPath: './',
  history: 'hash',
  hash: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html

    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: '后台管理系统  ',
        locale: {
          //默认的语言环境
          default: 'zh-CN',
          //antd开启国际化
          antd: true,
          // default true, when it is true, will use `navigator.language` overwrite default
          baseNavigator: false,
        },
        dll: false,

        links: [
          { rel: 'icon', href: '<%= PUBLIC_PATH %>images/favicon.ico' },
        //   { rel: 'stylesheet', href: '<%= PUBLIC_PATH %>font/iconfont.css' },
        ],
        scripts: [
          // { src: 'http://cdn/a.js' },
        //   { src: '<%= PUBLIC_PATH %>jquery.min.js' },
        ],
      },
    ],
  ],
  routes: [
    //路由配置
    { path: '/login', component: '../pages/login/index', name: '登录' },
    { path: '/register', component: '../pages/register/index', name: '注册' },
    {
      path: '/',
      component: '../layouts',
      routes: [
        { path: '/', redirect: '/main/student' },
        {
          path: '/main',
          component: '../pages/main/_layout',
          routes: [
            {
              path: '/main/student',
              component: '../pages/main/fileManage/studentInfo',
              icon: 'smile',
              name: '学生信息',
            },
            {
              path: '/main/teacher',
              component: '../pages/main/fileManage/teacherInfo',
              icon: 'smile',
              name: '教职工信息',
            },
            {
              path: '/main/course_info',
              component: '../pages/main/courseManage/courseInfo',
              icon: 'smile',
              name: '课程信息',
            },
            {
              path: '/main/excellent_course',
              component: '../pages/main/courseManage/excellentCourse',
              icon: 'smile',
              name: '优秀课程集锦',
            }
          ],
        },
        {
          path: '/shop',
          component: '../pages/shop',
        },
        {
          path: '/404',
          component: '../pages/404',
        },
      ],
    }
  ],
  proxy: {
    '/safe': {
      target: 'http://192.168.8.242:8080/',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
    },
  },

  alias: {
    pages: resolve(__dirname, './src/pages'),
    components: resolve(__dirname, './src/components'),
    services: resolve(__dirname, './src/services'),
    utils: resolve(__dirname, './src/utils'),
  },
  targets: { ie: 11 },
  devtool: 'source-map',
  theme: './src/theme.js',
};
