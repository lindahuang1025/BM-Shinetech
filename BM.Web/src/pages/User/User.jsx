import "./User.less";
import { connect } from 'umi';
import { Button, WhiteSpace } from 'antd-mobile';
import { message } from 'antd';

const User = (props) => {
  // 获取props数据
  const { currentUser, dispatch} = props;

  const newFuturePrompt =()=>{
    message.info("喔嚯，这个功能还在上线中哦！",1);
  }

  const logOut = ()=>{
    if (dispatch) {
      dispatch({
        type: 'login/logout',
      });
    }
    return;
  }
  return <div className="userContainer">
      <Button className="user-info-button" onClick={()=>{newFuturePrompt()}}>
          <div className="global-flex-row user-info-button-content">
            <div>用户名</div>
            <div>{currentUser.UserName}</div>
          </div>
        </Button>
        <WhiteSpace size="md"/>
      <Button className="user-info-button" onClick={()=>{logOut()}}>退出登录</Button><WhiteSpace />
  </div>;
}

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(User);
