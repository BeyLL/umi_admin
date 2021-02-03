/*
 * @Author: ZWH
 * @Email: zhangwh@uway.com
 * @Date: 2021-01-14 13:41:57
 * @Description: 
 * @LastEditTime: 2021-01-14 13:43:14
 */
export default {
    // 支持值为 Object 和 Array
    'GET /api/users': { users: [1, 2] },
    // GET 可忽略
    '/api/users/1': { id: 1 },
    // 支持自定义函数，API 参考 express@4
    'POST /api/users/create': (req, res) => {
      // 添加跨域请求头
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end('ok');
    },
  }