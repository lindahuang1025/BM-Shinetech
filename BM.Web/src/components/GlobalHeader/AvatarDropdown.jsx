import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Spin } from 'antd';
import React from 'react';
import { history, connect } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import AvatarImg from '@/assets/user.png';

class AvatarDropdown extends React.Component {
  onMenuClick = (event) => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }
      return;
    }
  };

  onUserClick = () => {
    history.push('/userInfo/');
  };

  render() {
    const {
      currentUser = {
        avatar: AvatarImg,
        UserName: '',
      },
      menu,
    } = this.props;
    let isMobile = window.screen.width < 1000;
    const menuHeaderDropdown = !isMobile ? (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    ): <div></div>;
    return currentUser && currentUser.UserName ? (
        <span className={`${styles.action} ${styles.account}`}>
          <UserOutlined className={styles.userIcon} onClick={this.onUserClick}/> 
          {/* <HeaderDropdown overlay={menuHeaderDropdown}>
            <span className={`${styles.action} ${styles.account}`}>
              <UserOutlined className={styles.userIcon} style={{marginRight:'5px'}}/>
              <span className={`${styles.name} anticon`}>{currentUser.UserName}</span>
            </span>
          </HeaderDropdown> */}
        </span>
    ) : (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </span>
    );
  }
}

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
