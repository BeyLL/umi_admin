/*
 * @Author: ZWH
 * @Email: zhangwh@uway.com
 * @Date: 2021-01-29 14:10:28
 * @Description: 
 * @LastEditTime: 2021-01-29 14:11:23
 */
export const dva = {
    config: {
      onError(e) {
        e.preventDefault();
        console.error(e.message);
      },
    }
}  