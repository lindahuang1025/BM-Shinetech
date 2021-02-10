import React, { useState, useEffect } from 'react';
import './index.less';
import PageLoading from '@/components/PageLoading/index';
import { message } from 'antd';
import { ListView, PullToRefresh, Modal, Result, Button } from 'antd-mobile';
import { CaretUpOutlined } from '@ant-design/icons';
import { BackTop } from 'antd';
import { returnBook } from '@/services/bookReturn';
import { getStoredUser } from '@/utils/utils';
import { connect, useIntl } from 'umi';
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
    // 借书或者还书的触发
    const [isRorrowOrReturnComplete, setIsRorrowOrReturnComplete] = useState(false);
    // 获取props数据
    const { borrowListModel = {}, loading, dispatch } = props;
    const { borrowList } = borrowListModel;
    //下拉刷新
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getlistData();
    }, []);

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
                        // 会设置页码为1触发更新
                        setPageNo(1);
                        // 如果恰好正在首页，则启用备用字段进行触发更新
                        if(pageNo === 1) setIsRorrowOrReturnComplete(!isRorrowOrReturnComplete);
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

    // 特殊情况，归还成功后，是通过页码改变来刷新列表，但是如果当前用户就在第一页，那么就不会触发刷新，所以新加了isRorrowOrReturnComplete字段来监控
    useEffect(() => {
        getlistData();
    }, [isRorrowOrReturnComplete]);

    const row = (rowData, rowID) => {
        // 这里rowData,就是上面方法cloneWithRows的数组遍历的单条数据了，直接用就行
        return <div key={rowID} className="book col-12 col-sm-6 col-lg-4">
            <div className="book-content">
                <div className="book-main">
                    <div className="book-main-top">
                    <div className="book-name">《{rowData.Title}》</div>
                    </div>
                    <div className="operation">
                        <div className="global-flex-column">
                            <div className="date">{intl.formatMessage({id:`${intlString}borrowDate`})}{moment(rowData.BorrowDate).format('YYYY MM-DD')}</div>
                        </div>
                        <Button type="primary" onClick={()=>{onReturnClicked(rowData.Id)}} style={{width:'30%'}}>{intl.formatMessage({id:`${intlString}return`})}</Button>
                    </div>
                </div>
            </div>
        </div>
    }

    return (
        <div>
            <div className="borrowComponent">
                <div className="container">
                    <ListView
                        renderHeader={() => <div className="found">
                            {currentData.length===0?<div>{intl.formatMessage({id:`${intlString}returnNotFound`})}</div>:<div>{intl.formatMessage({id:`${intlString}returnFoundFrist`})}<strong className="theme-color"> {currentData.length} </strong>{intl.formatMessage({id:`${intlString}returnFoundLast`})}</div>}
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
                </div>
            </div>
             {/* 回到顶部 */}
             <BackTop>
                <div className="global_backTop"><CaretUpOutlined className="global_backTop_icon"/></div>
            </BackTop>
            {/* 出现加载图标 */}
            {loading && <PageLoading />}
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