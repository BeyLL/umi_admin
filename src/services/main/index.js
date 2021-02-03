/*
 * @Author: ZWH
 * @Email: zhangwh@uway.com
 * @Date: 2021-01-29 10:52:06
 * @Description: 主页接口
 * @LastEditTime: 2021-01-29 13:30:13
 */

import { menueUrl } from './api.json';
import  request  from '@/utils/request';
import {formData} from '@/utils'

//菜单接口
export async function getList(data) {
  return request({
    url: menueUrl,
    method: 'POST',
    data:formData(data),
  });
}
