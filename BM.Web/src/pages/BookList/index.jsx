import React, { useState, useEffect } from 'react';
import './BookList.less';
import { PageLoading } from '@ant-design/pro-layout';
import { message } from 'antd';
import { ListView, Modal, Result, Button } from 'antd-mobile';
import { borrowBook } from '@/services/bookBorrow';
import { getStoredUser } from '@/utils/utils';
import { connect, useIntl } from 'umi';

const bookList = (props) => {
    const intl = useIntl();
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
    // 是否正在请求当前列表
    const [isLoading, setIsLoading] = useState(false);
    // 保存当前页数据，作用为 和请求下一页新数据进行合并
    const [currentData, setCurrentData] = useState([]);
    // 借书或者还书的触发
    const [isRorrowOrReturnComplete, setIsRorrowOrReturnComplete] = useState(false);
    // 获取props数据
    const { bookListModel = {},queryBookListLoading, dispatch } = props;
    const { bookList } = bookListModel;

    useEffect(() => {
        getlistData();
    }, []);

    useEffect(() => {
        logicByAfterGetData();
    }, [bookList]);

    // 获取列表
    const getlistData = ()=>{
        dispatch({
            type: 'BookListSpace/query',
            payload: {
                keyword:keyword, 
                pageIndex:pageNo, 
                pageSize:pageSize
              }
        });
    }

    // 从请求获取列表后的处理逻辑
    const logicByAfterGetData= ()=>{
        clearListStatus();
        // 临时存储列表
        const dataList = bookList;
        // 当页面为1时，进行重置数据操作，否则进行追加数据操作
        if(pageNo === 1){
             setCurrentData(dataList);
             setDataSource(dataSource.cloneWithRows(dataList));
         }else{
             const len = dataList.length;
             if (len <= 0) { // 判断是否已经没有数据了
                 setIsLoading(false);
                 setHasMore(false);
                 return;
             }
             // 合并state中已有的数据和新增的数据
             var newDataArr = currentData.concat(dataList) //关键代码
             setDataSource(dataSource.cloneWithRows(newDataArr));
             // 更新当前数据
             setCurrentData(newDataArr);
             clearListStatus();
        }
    }

    // 用户下向滑动动态触发加载列表
    const onEndReached = () => {
        // 加载中或没有数据了都不再加载
        if (isLoading || !hasMore) {
          return;
        }
        setIsLoading(true);
        setPageNo(pageNo + 1) ;
    }

    // 恢复当前列表初始状态
    const clearListStatus = () => {
        // 将loading的状态恢复至初始状态，好为下一次判断做准备
        setIsLoading(false);
        setHasMore(true);
    }

    // 本地话语言配置
    const localSetting = (idString) => {
        return intl.formatMessage({id:idString});
    }

    // 借阅操作
    const onBorrow = (id) => {
        alert(localSetting("pages.bookList.borrowConfirmPrompt"), '', [
            { text: localSetting("pages.bookList.borrowConfirmCancel") },
            { text: localSetting("pages.bookList.borrowConfirm"), onPress: async() => {
                const hide = message.loading(intl.formatMessage({id:"pages.bookList.borrowing"}));
                    try {
                        await borrowBook({ bookId:id, userId: user.UserId });
                        hide();
                        message.success({
                            content: localSetting("pages.bookList.borrowSuccessed"),
                            style: {
                              marginTop: '5vh',
                            }
                        });
                        // 当借阅成功后触发更新列表
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

    // 用户向下滑动和借阅操作都会触发重新加载列表
    useEffect(() => {
        getlistData();
    }, [pageNo]);

    // 特殊情况，借阅成功后，是通过页码改变来刷新列表，但是如果当前用户就在第一页，那么就不会触发刷新，所以新加了isRorrowOrReturnComplete字段来监控
    useEffect(() => {
        getlistData();
    }, [isRorrowOrReturnComplete]);

    // 根据loading状态来调用公共的loading组件
    useEffect(() => {
        if (queryBookListLoading || isLoading) {
            return <PageLoading />;
        }
    }, [queryBookListLoading,isLoading]);

    const row = (rowData, rowID) => {
        // 这里rowData,就是上面方法cloneWithRows的数组遍历的单条数据了，直接用就行
        return <div key={rowID} className="book col-12 col-sm-6 col-lg-4">
            <div className="book-content">
                <div className="book-main">
                    <div className="book-main-top-status">
                        {rowData.Status ===0? <div className="book-status-active">⬤ {localSetting("pages.bookList.bookStatusActive")} </div>:<div className="book-status-inactive">⬤ {localSetting("pages.bookList.bookStatusInactive")} </div>}
                    </div>
                    <div className="book-main-top">
                       <div className="book-name">《{rowData.Title}》</div>
                    </div>
                    <div className="description">{rowData.Description}</div>
                    {rowData.Status === 0 && <div className="operation">
                        <Button type="primary" onClick={()=>{onBorrow(rowData.Id)}} style={{width:'30%'}}>{localSetting("pages.bookList.borrow")}</Button>
                    </div>}
                </div>
            </div>
        </div>
    }

    return (
        <div>
            <div className="booksComponent">
                <div className="found">
                    <div>{localSetting("pages.bookList.foundFrist")}<strong className="theme-color"> {currentData.length} </strong>{localSetting("pages.bookList.foundLast")}</div>
                </div>
                <div className="container">
                    <ListView
                        dataSource={dataSource}
                        renderRow={row}
                        useBodyScroll={true}
                        onEndReachedThreshold={5}
                        onEndReached={onEndReached}
                        scrollRenderAheadDistance={1500}
                    />  
                </div>
            </div>
        </div>
    )
}

export default connect(({ BookListSpace, loading }) => ({
    bookListModel: BookListSpace,
    queryBookListLoading: loading.effects['BookListSpace/query'],
}))(bookList);