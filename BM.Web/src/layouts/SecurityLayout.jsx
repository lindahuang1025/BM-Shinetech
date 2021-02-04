import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { connect, Redirect } from 'umi';
import { stringify } from 'querystring';
import { isLoginSuccessed } from '@/utils/utils';

class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }

  render() {
    const { isReady } = this.state;
    const { children, loading } = this.props;
    const isLogin= isLoginSuccessed();
    const queryString = stringify({
      redirect: window.location.href,
    });

    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }

    //如果没有登录的情况下，路由不为/user/login，都将跳转
    if (!isLogin) {
      let returnUrl ='';
      if(window.location.pathname !== '/user/login'){
        returnUrl = `/user/login?${queryString}`;
      }
      if(window.location.pathname == '/'){
        returnUrl = '/user/login';
      }
      return <Redirect to={returnUrl} />;
    }

    return children;
  }
}

export default connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);
