/*
 * @Author: ZWH
 * @Email: zhangwh@uway.com
 * @Date: 2021-01-11 14:46:29
 * @Description: 公共的左侧列表
 * @LastEditTime: 2021-02-02 15:49:48
 */
'use strict';
import { useState, useEffect } from 'react';
import withRouter from 'umi/withRouter';
import router from 'umi/router';
//插件
import { Menu, Icon } from 'antd';
import { findIndex } from 'lodash';

//样式
import styles from './index.less';
const { SubMenu } = Menu;
const Sliders = props => {
  const {
    menues,
    location: { pathname },
  } = props;

  const [showMenu, setShowMenu] = useState([]);
  const [activeMenu, setActiveMenu] = useState('');
  //数据转化
  useEffect(() => {
    const list = menues.filter(({ children }) =>
      children.some(item => `/main/${item.primaryName}` === pathname),
    );
    if (!list || !list.length) return;
    setShowMenu([`${list[0].resourceId}`]);
    const pathList = pathname.split('/');
    setActiveMenu(pathList[pathList.length - 1]);
  }, [menues]);

  //生成元素
  const createMenu = menue => {
    const { resourceName, resourceId, menuSign, children, primaryName } = menue;
    if (children && children.length)
      return (
        <SubMenu
          key={resourceId}
          title={
            <span>
              <i className={`iconfont ${menuSign} ${styles.signIcon}`} />
              <span>{resourceName}</span>
            </span>
          }
        >
          {children.map(child => createMenu(child))}
        </SubMenu>
      );

    return <Menu.Item key={primaryName}>{resourceName}</Menu.Item>;
  };

  //菜单栏点击事件
  const changeMenu = current => {
    const { key } = current;
    setActiveMenu(key);
    router.push(`/main/${key}`);
  };
  return (
    <Menu
      className={styles.siderContainer}
      selectedKeys={[`${activeMenu}`]}
      openKeys={showMenu}
      onClick={changeMenu}
      onOpenChange={key => {
        key = key.length > 1 ? key.pop().split() : key;
        setShowMenu(key);
      }}
      mode="inline"
    >
      {!menues.length ? null : menues.map(menue => createMenu(menue))}
    </Menu>
  );
};

export default withRouter(Sliders);
