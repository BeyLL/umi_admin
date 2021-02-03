/*
 * @Author: ZWH
 * @Email: zhangwh@uway.com
 * @Date: 2021-01-11 14:12:27
 * @Description: 404页面
 * @LastEditTime: 2021-02-03 14:06:39
 */
import { Redirect } from 'dva/router'
import NotFind from '@/components/NotFind'
 const NotFound = (props)=>{
     const {location:{pathname}} = props;
     if(pathname!=='/404') return <Redirect to='/404'/>
     return <NotFind/>
 }

 export default NotFound

