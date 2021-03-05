import React, { useState, useEffect } from 'react';
import './MyBorrow.less';
import { message } from 'antd';
import { ListView, PullToRefresh, Modal, Result, Button, Card } from 'antd-mobile';
import { ArrowUpOutlined, BellTwoTone } from '@ant-design/icons';
import { BackTop } from 'antd';
import { returnBook } from '@/services/bookReturn';
import { getStoredUser } from '@/utils/utils';
import { connect, useIntl } from 'umi';
import bookDefaultImg from '@/assets/defaultBg.jpg'
import moment from 'moment'

const borrowList = (props) => {
    // 本地化语言设置
    const intl = useIntl();
    const intlString = 'pages.bookList.';
    // 获取用户信息
    const user = getStoredUser();
    // 订阅弹出框
    const {alert} = Modal;
    // 搜索关键字
    const [keyword] = useState("");
    // listview data
    let defaultDataSource = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2 // rowHasChanged(prevRowData, nextRowData); 用其进行数据变更的比较
    });
    const [dataSource, setDataSource] = useState(defaultDataSource);
    // 当前请求页码
    const [pageNo, setPageNo] = useState(1);
    // 请求当前列表是否还有更多
    const [hasMore, setHasMore] = useState(true);
    // 保存当前页数据，作用为 和请求下一页新数据进行合并
    const [currentData, setCurrentData] = useState([]);
    // 获取props数据
    const { borrowListModel = {}, loading, dispatch } = props;
    const { borrowList } = borrowListModel;
    //下拉刷新
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        logicByAfterGetData();
    }, [borrowList]);

    // 获取列表
    const getlistData = ()=>{
        dispatch({
            type: 'MyBorrowSpace/query',
            payload: {
                keyword:keyword, 
                pageIndex:pageNo, 
                pageSize:pageSize, 
                userId:user.UserId
              }
        });
    }

    // 从请求获取列表后的处理逻辑
    const logicByAfterGetData= ()=>{
        // 将loading的状态恢复至初始状态，好为下一次判断做准备
        setHasMore(true);
        // 临时存储列表
        const dataList = borrowList;
        // 当页面为1时，进行重置数据操作，否则进行追加数据操作
        if(pageNo === 1){
             setCurrentData(dataList);
             setDataSource(dataSource.cloneWithRows(dataList));
         }else{
             const len = dataList.length;
             if (len <= 0) { // 判断是否已经没有数据了
                 setHasMore(false);
                 return;
             }
             // 合并state中已有的数据和新增的数据
             var newDataArr = currentData.concat(dataList) //关键代码
             setDataSource(dataSource.cloneWithRows(newDataArr));
             // 更新当前数据
             setCurrentData(newDataArr);
             // 将loading的状态恢复至初始状态，好为下一次判断做准备
             setHasMore(true);
        }
    }

    // 用户下向滑动动态触发加载列表
    const onEndReached = () => {
        // 加载中或没有数据了都不再加载
        if (loading || !hasMore) {
          return;
        }
        setPageNo(pageNo + 1) ;
    }

    // 归还操作
    const onReturnClicked = (id) => {
        alert(intl.formatMessage({id:`${intlString}returnConfirmPrompt`}), '', [
            { text: intl.formatMessage({id:`${intlString}ConfirmCancel`}) },
            { text: intl.formatMessage({id:`${intlString}Confirm`}), onPress: async() => {
                const hide = message.loading(intl.formatMessage({id:`${intlString}returning`}));
                    try {
                        await returnBook({ bookId:id, userId: user.UserId });
                        hide();
                        message.success({
                            content: intl.formatMessage({id:`${intlString}returnSuccessed`}),
                            style: {
                              marginTop: '5vh',
                            }
                        });
                        // 当归还成功后触发更新列表
                        setPageNo(1);
                        getlistData();
                    } catch (error) {
                        message.error(error.Message);
                    }
            } },
        ])
    }

    //下拉重新加载
    const onRefresh = () => {
        setRefreshing(true);
        // simulate initial Ajax
        setTimeout(() => {
            getlistData();
            setRefreshing(false);
        }, 600);
    };

    // 用户向下滑动和归还操作都会触发重新加载列表
    useEffect(() => {
        getlistData();
    }, [pageNo]);

    const row = (rowData, sectionID , rowID) => {
        // 这里rowData,就是上面方法cloneWithRows的数组遍历的单条数据了，直接用就行
        return <Card key={rowID}>
                    <Card.Body>
                        <Card.Header
                                title={<div className="global-flex-column">
                                    <div className="book-name">《{rowData.BookInfo.Title}》</div>
                                    <div className="deadline">


                                        <BellTwoTone twoToneColor={(moment(rowData.PlanReturnDate).diff(moment(), 'days')<= 3)? "orangered":"rgb(16, 212, 16)"}/>{(moment(rowData.PlanReturnDate).diff(moment(), 'days') >= 0)? <span> {intl.formatMessage({id:`${intlString}borrowDate`})}</span>:<span> {intl.formatMessage({id:`${intlString}borrowDateOverdue`})}</span>}<span className={(moment(rowData.PlanReturnDate).diff(moment(), 'days')<= 3)? "deadline-number-orange":"deadline-number-green"}>{Math.abs(moment(rowData.PlanReturnDate).diff(moment(), 'days')) } </span>{intl.formatMessage({id:`${intlString}borrowDateLast`})}
                                    </div>
                                </div>}
                                thumb={rowData.BookInfo.ImageUrl || bookDefaultImg}
                                thumbStyle={{borderRadius: '5px',width: '50px',height: '80px'}}
                                extra={<Button type="primary" onClick={()=>{onReturnClicked(rowData.BookId)}}>{intl.formatMessage({id:`${intlString}return`})}</Button>}
                            />
                    </Card.Body>
                </Card>
    }

    return (
        <div className="borrowComponent">
            <ListView
                useBodyScroll={true}
                renderHeader={() => <div className="found">
                    {currentData.length===0 && <div>{intl.formatMessage({id:`${intlString}returnNotFound`})}</div>}
                </div>}
                dataSource={dataSource}
                renderRow={row}
                useBodyScroll={true}
                onEndReachedThreshold={5}
                onEndReached={onEndReached}
                scrollRenderAheadDistance={1500}
                pullToRefresh={<PullToRefresh
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />}
            />  
            {/* 回到顶部 */}
            <BackTop>
                <div className="global-backTop"><ArrowUpOutlined className="global-backTop-icon"/></div>
            </BackTop>
            {/* 没有更多加载，显示提示信息 */}
               {!hasMore && <Result
                    message={intl.formatMessage({id:`${intlString}noMoreFound`})}
                    style={{ backgroundColor: 'transparent' }}
            />}
        </div>
    )
}

export default connect(({ MyBorrowSpace, loading }) => ({
    borrowListModel: MyBorrowSpace,
    loading: loading.effects['MyBorrowSpace/query'],
}))(borrowList);