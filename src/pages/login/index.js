/*
 * @Author: ZWH
 * @Email: zhangwh@uway.com
 * @Date: 2021-01-08 10:59:06
 * @Description: 登录页
 * @LastEditTime: 2021-02-03 10:20:54
 */
import { connect } from 'dva';
import { Icon } from 'antd';

//组件
import FormData from '@/components/Form/FormData';

//样式
import styles from './index.less';
const Login = ({ loading, dispatch, login }) => {
  const { effects } = loading;
  //表单数据
  const formProps = {
    formClass: `${styles.formLogin}`,
    formColumns: [
      {
        // type: 'input',
        placeholder: '请输入用户名',
        field: 'user',
        ruleValue: {
          rules: [
            {
              required: true,
              message: '请输入用户名',
            },
            {
              //   validator: this.validateToNextPassword,
            },
          ],
        },
        prefix: <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />,
        formItemLayout: {
          labelCol: {
            xs: { span: 0 },
            sm: { span: 0 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 24 },
          },
        },
      },
      {
        type: 'input',
        placeholder: '请输入密码',
        field: 'password',
        ruleValue: {
          rules: [
            {
              required: true,
              message: '请输入密码',
            },
            {
              //   validator: this.validateToNextPassword,
            },
          ],
        },
        inputType: 'password',
        formItemLayout: {
            labelCol: {
              xs: { span: 0 },
              sm: { span: 0 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 24 },
            },
          },
        prefix: <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />,
      },
      {
        type: 'check',
        field: 'forget',
        labelText: '记住密码',
        formItemClass: `${styles.checkBtn}`,
      },
      {
        type: 'btn',
        formItemClass:`${styles.loginBtn}`,
        btnLists: [
          {
            title: '登录',
            type: 'primary',
            btnClass: styles.subFormStyle,
            clickFuc: `onSubmitValues`,
          }
        ],
      },
    ],
    formValue: values => {
      dispatch({ type: 'login/login', payload: {} });
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.content_center}>
        <FormData {...formProps} />
      </div>
    </div>
  );
};

export default connect(({ loading, login }) => ({ loading, login }))(Login);
