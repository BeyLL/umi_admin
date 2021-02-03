/*
 * @Author: ZWH
 * @Email: zhangwh@uway.com
 * @Date: 2021-01-29 10:16:09
 * @Description: 登录页
 * @LastEditTime: 2021-02-03 11:17:50
 */
'use strict';
import { delay } from 'dva/saga';
import router from 'umi/router'

import  Cookie from 'js-cookie'
export default {
  namespace: 'login',
  state: {},
  reducers: {},
  effects: {
    * login({ payload }, { put, call }) {
      yield delay(3000);
      console.log('登录成功');

      Cookie.set('Authorization','zhang',{domain:'',expires:7})
      router.push('/')
    },
  },
};
