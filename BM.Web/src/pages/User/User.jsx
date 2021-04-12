import "./User.less";
import React, {useState, useEffect, useRef} from 'react'
import { connect } from 'umi';
import { WhiteSpace, Button } from 'antd-mobile';
import { message, Comment, List, Avatar, Form , Input  } from 'antd';
import { UserCommentsAddOrUpdate } from '@/services/user';
import InfiniteScroll from 'react-infinite-scroller';

const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, editorValue }) => (
  <>
    <Form.Item>
      <TextArea rows={5} onChange={onChange} value={editorValue} placeholder="自由发言啦，大家可以在这里留下想说的话，什么都可以，对书的感受，生活工作的心得，暗恋日记，当成树洞等，最后救救孩子吧，给点软件优化建议哈~  （PS：是匿名显示滴，社恐患者不要慌哈）"/>
    </Form.Item>
    <Form.Item>
      <Button loading={submitting} onClick={onSubmit} type="primary">
         biu~ 发射到公告
      </Button>
    </Form.Item>
  </>
);

const CommentList = ({ comments }) => (
  <InfiniteScroll
  initialLoad={false}
  pageStart={0}
  // loadMore={this.handleInfiniteOnLoad}
  // hasMore={!this.state.loading && this.state.hasMore}
  useWindow={false}
  >
    <div className="commentList">
      <List
        dataSource={comments}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
      />
    </div>

  </InfiniteScroll>
);


const User = (props) => {
  // 获取props数据
  const { currentUser,userCommentsList, dispatch} = props;
  const [submitting, setSubmitting] = useState(false);
  const [editorValue, setEditorValue] = useState('');
  const rocketRef = useRef(null);

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

  const handleChange = (e) => {
    if(e) {setEditorValue(e.target.value)} else {setEditorValue('')}
  }

  const handleSubmit = async() => {
    if (!editorValue) {
      return message.info("随便来一句吧，冲个留言KPI业绩也行啊");
    }
    try {
      // await UserCommentsAddOrUpdate({ 
      //     UserName: currentUser.UserName,
      //     Comment: editorValue
      //  });
      // message.success('biu~ 触发彩蛋🚀 ');
      // getUserCommentsList();
      // handleChange(null);
      console.log(rocketRef)
      // const timeout = setTimeout(() => {
      //   setEditorValue('')
      // }, 1000);
      // return function cleanup() {
      //     clearTimeout(timeout);
      // };
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
      <div id="animation" ref={rocketRef}>
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
          {userCommentsList.length > 0 && <CommentList comments={userCommentsList} />}
          <Comment
            avatar={
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="靓仔/靓女说："
              />
            }
            content={
              <Editor
                onChange={handleChange}
                onSubmit={handleSubmit}
                submitting={submitting}
                value={editorValue}
              />
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
