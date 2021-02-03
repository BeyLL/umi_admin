/*
 * @Author: ZWH
 * @Email: zhangwh@uway.com
 * @Date: 2021-01-29 10:15:04
 * @Description: 主页面
 * @LastEditTime: 2021-02-03 15:28:32
 */
'use strict';
import { delay } from 'dva/saga';
import router from 'umi/router';
import { getList } from '@/services/main';
import { reorganize } from '@/utils';
import Pagination from '@/components/Pagination.js';

export default {
  namespace: 'main',
  state: {
    menues: [],
    sorterForm: {},
    searchForm: {},
    userListPage: new Pagination({
      dispatchType: 'getUsers',
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 50,
    }),
    userLists: [],
  },
  reducers: {
    setState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    //获取列表
    *getMenu({ payload }, { put, call }) {
      //   const res = yield call(getList, payload);
      let menues = [];
      const res = {
        code: 200,
        msg: '查询成功',
        data: [
          {
            id: 101,
            name: '学生信息',
            resourceName: '学生信息',
            url: null,
            resourceId: '1001',
            resource_id: '1001',
            menu: 1,
            assignable: 1,
            parentId: '1',
            resourceParentId: '1',
            childId: null,
            menuSign: null,
            primaryName: 'student',
            router: null,
            auths: 'CONSTANT,ATTACK_TREND,ATTACK_GIS,BASE_TREND,VULN_TREND',
            orders: 0,
            createTime: '2019-08-30 14:42:39.0',
            updateTime: '2019-09-02 18:39:26.0',
            own: null,
            menulever: null,
            identify: null,
            rlevel: '2',
          },
         
          {
            id: 201,
            name: '课程简介',
            resourceName: '课程简介',
            url: null,
            resourceId: '2001',
            resource_id: '2001',
            menu: 1,
            assignable: 1,
            parentId: '2',
            resourceParentId: '2',
            childId: null,
            menuSign: null,
            primaryName: 'course_info',
            router: null,
            auths: 'EXPORT,LIST,IMPORT,DELETE,LIST,UPDATE,LIST,ADD',
            orders: 1,
            createTime: '2019-09-02 14:07:15.0',
            updateTime: '2021-02-02 15:46:32.0',
            own: null,
            menulever: null,
            identify: null,
            rlevel: '2',
          },
        
         
          {
            id: 1,
            name: '档案管理',
            resourceName: '档案管理',
            url: null,
            resourceId: '1',
            resource_id: '1',
            menu: 1,
            assignable: 1,
            parentId: '',
            resourceParentId: '',
            childId: null,
            menuSign: 'security-bigdata-1,security-bigdata-2',
            primaryName: 'asset_supervision',
            router: null,
            auths: '0',
            orders: 1,
            createTime: '2019-08-29 18:06:14.0',
            updateTime: '2021-02-01 16:51:58.0',
            own: null,
            menulever: null,
            identify: null,
            rlevel: '1',
          },
          
          {
            id: 2,
            name: '课程管理',
            resourceName: '课程管理',
            url: null,
            resourceId: '2',
            resource_id: '2',
            menu: 1,
            assignable: 1,
            parentId: '',
            resourceParentId: '',
            childId: null,
            menuSign: 'asset-manage-1,asset-manage-2',
            primaryName: 'asset_supervision1',
            router: null,
            auths: '0',
            orders: 2,
            createTime: '2019-08-29 18:06:14.0',
            updateTime: '2021-02-01 16:51:59.0',
            own: null,
            menulever: null,
            identify: null,
            rlevel: '1',
          },
        
          {
            id: 206,
            name: '优秀课程集锦',
            resourceName: '优秀课程集锦',
            url: null,
            resourceId: '2006',
            resource_id: '2006',
            menu: 1,
            assignable: 1,
            parentId: '2',
            resourceParentId: '2',
            childId: null,
            menuSign: null,
            primaryName: 'excellent_course',
            router: null,
            auths: 'DOWN,LIST,DELETE,IMPORT,EXPORT,UPDATE',
            orders: 5,
            createTime: '2020-11-16 09:55:33.0',
            updateTime: '2021-02-02 15:47:02.0',
            own: null,
            menulever: null,
            identify: null,
            rlevel: '2',
          },
         
          {
            id: 404,
            name: '漏洞管理 - 漏洞预警',
            resourceName: '漏洞管理 - 漏洞预警',
            url: null,
            resourceId: '4004',
            resource_id: '4004',
            menu: 1,
            assignable: 1,
            parentId: '4',
            resourceParentId: '4',
            childId: null,
            menuSign: null,
            primaryName: 'vul_warning',
            router: null,
            auths: '',
            orders: 5,
            createTime: '2019-09-02 14:07:15.0',
            updateTime: '2021-02-02 15:50:07.0',
            own: null,
            menulever: null,
            identify: null,
            rlevel: '2',
          },
      
          {
            id: 205,
            name: '教职工信息',
            resourceName: '教职工信息',
            url: null,
            resourceId: '2005',
            resource_id: '2005',
            menu: 1,
            assignable: 1,
            parentId: '1',
            resourceParentId: '1',
            childId: null,
            menuSign: null,
            primaryName: 'teacher',
            router: null,
            auths: 'EXPORT,LIST',
            orders: 6,
            createTime: '2020-11-16 09:54:22.0',
            updateTime: '2021-02-02 15:47:07.0',
            own: null,
            menulever: null,
            identify: null,
            rlevel: '2',
          }
        ],
      };

      if (res && res.code === 200) menues = reorganize(res.data, 'resourceParentId', 'resourceId');
      yield put({ type: 'setState', payload: { menues } });
    },

    //获取用户数据列表
    *getUsers({ payload }, { put, call, select }) {
      const { dispatch } = payload;
      const { searchForm, userListPage } = yield select(state => state.main);
      const res = {
        code: 200,
        msg: '成功',
        data: [
          {
            key: '1',
            name: 'John Brown',
            age: 18,
            sex: '男',
            date: '2002-11-04',
            nation:'美国',
            address: '4045 White Oak Drive',
          },
          {
            key: '2',
            name: 'Jim Green',
            age: 19,
            sex: '女',
            date: '2001-01-18',
            nation:'法国',
            address: '18 rue Sébastopol',
          },
          {
            key: '3',
            name: 'Joe Black',
            age: 20,
            sex: '男',
            date: '2000-05-02',
            nation:'英国',
            address: '13 Freezeland Lane',
          },
          {
            key: '4',
            name: 'Disabled User',
            age: 99,
            sex: '男',
            study: '本科',
            date: '2020-11-04',
            money: '12k',
            nation:'法国',
            time: '2017-10-11至2020-11-04',
            address: 'Sidney No. 1 Lake Park',
          },
          {
            key: '5',
            name: 'Disabled User',
            age: 44,
            sex: '男',
            study: '博士',
            date: '2020-11-04',
            money: '58k',
            time: '2017-10-11至2020-11-04',
            address: 'Sidney No. 1 Lake Park',
          },
          {
            key: '6',
            name: 'Disabled User',
            age: 44,
            sex: '男',
            study: '博士',
            date: '2020-11-04',
            money: '58k',
            time: '2017-10-11至2020-11-04',
            address: 'Sidney No. 1 Lake Park',
          },
          {
            key: '7',
            name: '克沙汗',
            age: 29,
            sex: '男',
            study: '本科',
            date: '2020-11-04',
            money: '22k',
            time: '2017-10-11至2020-11-04',
            address: 'Sidney No. 1 Lake Park',
          },
          {
            key: '8',
            name: '布妮',
            age: 31,
            sex: '女',
            study: '博士',
            date: '2020-11-04',
            money: '60k',
            time: '2017-10-11至2020-11-04',
            address: 'Sidney No. 1 Lake Park',
          },
          {
            key: '9',
            name: '胡科',
            age: 56,
            sex: '男',
            study: '博士',
            date: '2020-11-04',
            money: '32k',
            time: '2017-10-11至2020-11-04',
            address: 'Sidney No. 1 Lake Park',
          },
          {
            key: '10',
            name: '克莱兒',
            age: 44,
            sex: '女',
            study: '博士后',
            date: '2020-11-04',
            money: '58k',
            time: '2017-10-11至2020-11-04',
            address: 'Sidney No. 1 Lake Park',
          },
          {
            key: '11',
            name: 'Json stance',
            age: 35,
            sex: '男',
            study: '博士',
            date: '2020-11-04',
            money: '58k',
            time: '2017-10-11至2020-11-04',
            address: 'Sidney No. 1 Lake Park',
          },
          {
            key: '12',
            name: '伊丽莎',
            age: 23,
            sex: '女',
            study: '硕士',
            date: '2020-11-04',
            money: '58k',
            time: '2017-10-11至2020-11-04',
            address: 'Sidney No. 1 Lake Park',
          },
          {
            key: '13',
            name: '伊丽莎',
            age: 23,
            sex: '女',
            study: '硕士',
            date: '2020-11-04',
            money: '58k',
            time: '2017-10-11至2020-11-04',
            address: 'Sidney No. 1 Lake Park',
          },
          {
            key: '14',
            name: '伊丽莎',
            age: 23,
            sex: '女',
            study: '硕士',
            date: '2020-11-04',
            money: '58k',
            time: '2017-10-11至2020-11-04',
            address: 'Sidney No. 1 Lake Park',
          },
          {
            key: '15',
            name: '伊丽莎',
            age: 23,
            sex: '女',
            study: '硕士',
            date: '2020-11-04',
            money: '58k',
            time: '2017-10-11至2020-11-04',
            address: 'Sidney No. 1 Lake Park',
          },
          {
            key: '16',
            name: '伊丽莎',
            age: 23,
            sex: '女',
            study: '硕士',
            date: '2020-11-04',
            money: '58k',
            time: '2017-10-11至2020-11-04',
            address: 'Sidney No. 1 Lake Park',
          },
          {
            key: '17',
            name: '伊丽莎',
            age: 23,
            sex: '女',
            study: '硕士',
            date: '2020-11-04',
            money: '58k',
            time: '2017-10-11至2020-11-04',
            address: 'Sidney No. 1 Lake Park',
          },
          {
            key: '18',
            name: '伊丽莎',
            age: 23,
            sex: '女',
            study: '硕士',
            date: '2020-11-04',
            money: '58k',
            time: '2017-10-11至2020-11-04',
            address: 'Sidney No. 1 Lake Park',
          },
          {
            key: '19',
            name: '伊丽莎',
            age: 23,
            sex: '女',
            study: '硕士',
            date: '2020-11-04',
            money: '58k',
            time: '2017-10-11至2020-11-04',
            address: 'Sidney No. 1 Lake Park',
          },
          {
            key: '20',
            name: '伊丽莎',
            age: 23,
            sex: '女',
            study: '硕士',
            date: '2020-11-04',
            money: '58k',
            time: '2017-10-11至2020-11-04',
            address: 'Sidney No. 1 Lake Park',
          },
          {
            key: '21',
            name: '伊丽莎',
            age: 23,
            sex: '女',
            study: '硕士',
            date: '2020-11-04',
            money: '58k',
            time: '2017-10-11至2020-11-04',
            address: 'Sidney No. 1 Lake Park',
          },
        ],
        totalNum: 21,
      };

      const options = {
        dispatch,
        params: searchForm,
        total: res.totalNum,
      };

      userListPage.setPage(options);
      if (res.code) yield put({ type: 'setState', payload: { userLists: res.data } });
    },
  },

  subscriptions: {
    setup({ history }) {},
  },
};
