import "./User.less";
import React, {useState, useEffect, useRef} from 'react'
import { connect } from 'umi';
import { Button, Modal } from 'antd-mobile';
import { message, Comment, List, Avatar, Form , Input  } from 'antd';
import { UserCommentsAddOrUpdate } from '@/services/user';
import InfiniteScroll from 'react-infinite-scroller';
import "animate.css";
import { CloseCircleOutlined  } from '@ant-design/icons';
import { UserCommentsDeleted } from '@/services/user';

const { TextArea } = Input;

const CommentList = ({ currentUser, comments, onDeleted }) => (
  // 滚动加载
  // <InfiniteScroll
  // initialLoad={false}
  // pageStart={0}
  // loadMore={this.handleInfiniteOnLoad}
  // hasMore={!this.state.loading && this.state.hasMore}
  // useWindow={false}
  // >
    <div className="commentList">
      <List
        dataSource={comments}
        itemLayout="horizontal"
        renderItem={comment => <div className="global-flex-row global-flex-row-between global-flex-row-center"><Comment {...comment} /> {currentUser.UserRole === 1 && <CloseCircleOutlined style={{ fontSize: '22px', color: 'red' }} onClick={()=>{onDeleted(comment)}}/>} </div> }
      />
    </div>
  // </InfiniteScroll>
);

const User = (props) => {
  // 获取props数据
  const { currentUser,userCommentsList, dispatch} = props;
  const [submitting, setSubmitting] = useState(false);
  const [editorValue, setEditorValue] = useState('');
  const rocketRef = useRef(null);
  const {alert} = Modal;

  useEffect(() => {
    getUserCommentsList();
  }, []);

  const getUserCommentsList =()=>{
    dispatch({
      type: 'user/fetchUserCommentsList'
    });
  }

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

  const deletedCommentByAdmin = (comment)=>{
    alert("确认删除用户留言", '', [
      { text: "取消" },
      { text: "确认", onPress: async() => {
              try {
                  await UserCommentsDeleted(comment.Id);
                  message.success("删除成功！");
                  getUserCommentsList();
              } catch (error) {
                  message.error(error.Message);
              }
      } },
    ])
  }

  const handleChange = (e) => {
    if(e) {setEditorValue(e.target.value)} else {setEditorValue('')}
  }

  const handleSubmit = async() => {
    if (!editorValue) {
      return message.info("随便来一句吧，冲个留言KPI业绩也行啊");
    }
    try {
      await UserCommentsAddOrUpdate({ 
          UserName: currentUser.UserName,
          Comment: editorValue
       });
      message.success('biu~ 🚀 ');
      getUserCommentsList();
      handleChange(null);
      // rocketRef.current.style.left = '90%';
    } catch (error) {
      message.error('出错了，再试一下看看或者刷新看看，不行就去找程序员算账！');
    }
  }

  return <div className="userContainer">
      <Button className="user-info-button" onClick={()=>{newFuturePrompt()}}>
          <div className="global-flex-row user-info-button-content">
            <div>用户名</div>
            <div>{currentUser.UserName}</div>
          </div>
      </Button>
      <div id="animation" ref={rocketRef} >
            <div className="spaceship">
                <div className="body"></div>
                <div className="window"></div>
                <div className="fins"></div>
                <div className="rocket"></div>
                <div className="fireWrapper">
                    <div className="fire">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
              </div>
      </div>
      <div>
          {userCommentsList.length > 0 && <CommentList currentUser = {currentUser} comments={userCommentsList} onDeleted={deletedCommentByAdmin} />}
          <Comment
            avatar={
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="靓仔/靓女说："
                className="animated bounce"
              />
            }
            content={
              <>
              <Form.Item>
                <TextArea rows={5} onChange={handleChange} value={editorValue} placeholder="自由发言啦，大家可以在这里留下想说的话:想看的书或观后感、生活工作的心得、当成树洞等等，最后最后，各位看官，来点软件优化建议吧（PS：是匿名显示滴，社恐患者不要慌哈）"/>
                </Form.Item>
                <Form.Item>
                  <Button loading={submitting} onClick={handleSubmit} type="primary">
                    biu~ 发射到公告
                  </Button>
                </Form.Item>
              </>
            }
          />

          <Button className="user-info-button" onClick={()=>{logOut()}}>退出登录</Button>
      </div>
    </div>  
}

export default connect(({ user }) => ({
  currentUser: user.currentUser,
  userCommentsList:user.userCommentsList
}))(User);
