import React, { useState, useEffect } from 'react';
import './BookList.less';
import { ListView, PullToRefresh, Result, SearchBar, Card } from 'antd-mobile';
import { ArrowUpOutlined, AlertTwoTone  } from '@ant-design/icons';
import { BackTop } from 'antd';
import { connect, useIntl, history } from 'umi';
import bookStatusEnum from '@/enums/bookStatusEnum';
import bookDefaultImg from '@/assets/defaultBg.jpg'

const bookList = (props) => {
    // 本地化语言设置
    const intl = useIntl();
    const intlString = 'pages.bookList.';
    // 搜索关键字
    const [keyword, setKeyword] = useState('');
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
    const { bookListModel = {}, loading, dispatch } = props;
    const { bookList } = bookListModel;
    //下拉刷新
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        setKeyword('');
        console.log(props.history.location.state?.keyword)
        const word = props.history.location.state?.keyword || '';
        if(word) {
            setKeyword(word);
        }
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
        // 将loading的状态恢复至初始状态，好为下一次判断做准备
        setHasMore(true);
        // 临时存储列表
        const dataList = bookList;
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

    //下拉重新加载
    const onRefresh = () => {
        setRefreshing(true);
        // simulate initial Ajax
        setTimeout(() => {
            getlistData();
            setRefreshing(false);
        }, 600);
    };

    // 触发搜索页面
    const onSearchFocused = () => {
        history.push({
            pathname: '/search'
        })
    }

    // 取消搜索
    const onSearchCancel= () => {
        setKeyword('')
    }

    // 跳转详情页面
    const goBookDetail = (id) => {
        history.push({
            pathname: '/bookDetail',
            state:{
                bookId:id
            }
        })
    }

    // 用户向下滑动和借阅操作都会触发重新加载列表
    useEffect(() => {
        getlistData();
    }, [pageNo,keyword]);

    const row = (rowData, sectionID, rowID) => {
        // 这里rowData,就是上面方法cloneWithRows的数组遍历的单条数据了，直接用就行
        return <Card key={rowID} onClick={()=>{goBookDetail(rowData.Id)}}>
            <Card.Body>
                <Card.Header
                        title={<div className="global-flex-column">
                            <div className="book-name">《{rowData.Title}》</div>
                            <div className="book-author">{rowData.Author}</div>
                        </div>}
                        thumb={ rowData.ImageUrl? `${uploadImgUrl}${rowData.ImageUrl}`: bookDefaultImg}
                        thumbStyle={{borderRadius: '5px',width: '50px',height: '50px'}}
                        extra={<span>{(rowData.Status || 0) === bookStatusEnum.Normal? <AlertTwoTone  twoToneColor="rgb(16, 212, 16)"/>:<AlertTwoTone  twoToneColor="red"/>}</span>}
                    />
            </Card.Body>
        </Card>
    }

    return (
        <div>
            <div className="booksComponent">
                <div className="container">
                    <SearchBar
                        placeholder={intl.formatMessage({id:'pages.list.searchPlaceholoder'})}
                        onFocus={() => onSearchFocused()}
                        onCancel={() => onSearchCancel()}
                        value={keyword}
                    />
                    <ListView
                        useBodyScroll={true}
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
            <BackTop visibilityHeight={50}>
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

export default connect(({ BookListSpace, loading }) => ({
    bookListModel: BookListSpace,
    loading: loading.effects['BookListSpace/query'],
}))(bookList);
