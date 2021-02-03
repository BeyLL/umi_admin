/*
 * @Author: ZWH
 * @Email: zhangwh@uway.com
 * @Date: 2021-01-11 14:42:58
 * @Description: 公共展示主要内容
 * @LastEditTime: 2021-02-03 13:40:17
 */

import { useEffect } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'dva';
import router from 'umi/router';
import { Layout, message } from 'antd';

//自定义组件
import Sliders from '@/components/SiderMenu';

//样式
import styles from './_layout.less';

const { Header, Sider, Content } = Layout;

const MainLayout = props => {
  console.log(props);
  const { children, main, dispatch, route, location:{pathname} } = props;
  //请求菜单栏
  useEffect(() => {
    // const list = route.routes.map(item => item.path);
    // if (list && list.length) {
    //   const index = list.indexOf(pathname);
    //   console.log(index)
    //   if (index < 0 ) router.push('/404');
    // }
    dispatch({ type: 'main/getMenu', payload: { rlevel: '1,2' } });
  }, []);

  return (
    <Layout className={styles.mainBody}>
      {/*顶部内容提供*/}
      <Header className={styles.mainHeader}></Header>
      <Layout className={styles.mainContainer}>
        {/*公共侧边栏*/}
        <Sider trigger={null} collapsible>
          <Sliders menues={main.menues} />
        </Sider>
        {/*右侧内容*/}
        <Content className={styles.mainRight}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default connect(main => main)(MainLayout);
