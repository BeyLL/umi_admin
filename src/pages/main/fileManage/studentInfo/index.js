/*
 * @Author: ZWH
 * @Email: zhangwh@uway.com
 * @Date: 2021-01-12 14:52:02
 * @Description: 用户管理
 * @LastEditTime: 2021-02-03 15:18:47
 */
'use strict';

import { useEffect, useRef } from 'react';
import { connect } from 'dva';
//插件
import { Table } from 'antd';

//自定义组件
import FormData from '@/components/Form/FormData';

//样式
import styles from './index.less';

const Student = ({ dispatch, main }) => {
  const currentRef = useRef(null);
  useEffect(() => {
    dispatch({ type: 'main/getUsers', payload: { dispatch } });

    const refs = currentRef && currentRef.current.refs;
    // findDOMNode('ant-table-tbody')
    // const ele = table.querySelector('.ant-table-tbody');
  }, []);

  const { userLists, userListPage } = main;

  //查询表单
  const formProps = {
    formClass: styles.searchStyle,
    formColumns: [
      {
        placeholder: '请输入姓名',
        field: 'name',
        label: '姓名',
        colSpan: 6,
        // prefix={prefix} type={inputType}
      },
      {
        type: 'select',
        field: 'sex',
        label: '性别',
        placeholder: '请选择性别',
        colSpan: 6,
        selectLists: [{ label: '男', id: '1' }, { label: '女', id: '2' }],
        // ruleValue: {
        //   initialValue: '1',
        // },
      },
      {
        placeholder: '请输入年龄',
        field: 'age',
        label: '年龄',
        colSpan: 6,
        // prefix={prefix} type={inputType}
      },

      {
        type: 'date',
        field: 'dateTime',
        label: '出生日期',
        colSpan: 6,
        formItemClass: styles.formItem,
        placeholder: '请选择日期',
      },
      {
        type: 'input',
        field: 'address',
        label: '户籍地址',
        colSpan: 6,
        formItemClass: styles.formItem,
        placeholder: '请输入户籍地址',
      },
      {
        type: 'input',
        field: 'card',
        label: '身份证号',
        colSpan: 6,
        formItemClass: styles.formItem,
        placeholder: '请输入身份证号',
      },
      {
        type: 'input',
        field: 'nation',
        label: '国籍',
        colSpan: 6,
        formItemClass: styles.formItem,
        placeholder: '请输入国籍',
      },
      {
        type: 'btn',
        colSpan: 6,
        btnLists: [
          {
            title: '查询',
            type: 'primary',
            clickFuc: `onSubmitValues`,
            btnClass: styles.btnLeft,
          },
          {
            title: '重置',
            clickFuc: `onReset`,
          },
        ],
      },
    ],
    formValue: values => {
      dispatch({ type: 'main/setState', payload: { searchForm: values } });
      dispatch({ type: 'main/getUsers', payload: {} });
      console.log(values, '提交表单');
    },
  };

  //tablepros
  const tableProps = {
    columns: [
      {
        title: '姓名',
        dataIndex: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: '年龄',
        dataIndex: 'age',
      },
      {
        title: '性别',
        dataIndex: 'sex',
      },

      {
        title: '国籍',
        dataIndex: 'nation',
      },
      {
        title: '出生日期',
        dataIndex: 'date',
      },
      {
        title: '户籍地址',
        dataIndex: 'address',
      },
      {
        title: '身份证号',
        dataIndex: 'card',
      }
    ],
    dataSource: userLists,
    pagination: userListPage,
    className: styles.userTable,
    ref: currentRef,
  };

  return (
    <div>
      {/* form表单 */}
      <FormData {...formProps} />

      {/* 表格展示 */}
      <Table {...tableProps} scroll={{ y: 'calc(100vh - 370px)' }} />
    </div>
  );
};

export default connect(({ main }) => ({ main }))(Student);
