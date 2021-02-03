import React from 'react';
import './myBorrow.less';
import { message } from 'antd';
import { Toast, ListView, ActivityIndicator, Modal, Button} from 'antd-mobile';
import { queryBorrowList, returnBook} from './service';
import { getStoredUser } from '@/utils/utils';
import moment from 'moment'

export default (props) => {
    let defaultData = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2 // rowHasChanged(prevRowData, nextRowData); 用其进行数据变更的比较
    });
    const alert = Modal.alert;
    const [keyword, setKeyword] = React.useState("");
    //listview
    const [dataSource, setDataSource] = React.useState(defaultData);
    const [pageNo, setPageNo] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10);
    const [hasMore, setHasMore] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(true);
    const [dataArr, setDataArr] = React.useState([]);
    const [isComplete, setIsComplete] = React.useState(false);
    const [isRorrowOrReturnComplete, setIsRorrowOrReturnComplete] = React.useState(false);
    const user = getStoredUser();

    React.useEffect(() => {
        window.scrollTo(0, 0);
        logicByAfterGetData();
    }, []);

    //获取列表
    const getlistData = async()=>{
        const user = getStoredUser();
        setIsComplete(true);
        const response = await queryBorrowList({keyword:keyword, pageIndex:pageNo, pageSize:pageSize, userId:user.UserId});
        setIsComplete(false);
        if (response && response.Status===0) {
            if(response.Datas){
                const List = response.Datas.filter((item)=>item.Status ===1 );
                return List;
            }
        } else {
            Toast.info("获取列表失败, 请刷新页面！", 1);
            return [];
        }
    }

    //从请求获取列表后的逻辑
    const logicByAfterGetData= async()=>{
        const dataList = await getlistData();
        if(pageNo === 1){
             setDataArr(dataList)
             setDataSource(dataSource.cloneWithRows(dataList))
         }else{
             const len = dataList.length;
             if (len <= 0) { // 判断是否已经没有数据了
                 setIsLoading(false)
                 setHasMore(false)
                 return
             }
             // 合并state中已有的数据和新增的数据
             var newDataArr = dataArr.concat(dataList) //关键代码
             setPageNo(pageNo)
             setDataSource(dataSource.cloneWithRows(newDataArr))
           
             setIsLoading(false)
             setDataArr(newDataArr)
        }
    }

    //用户下向滑动动态触发加载列表
    const onEndReached = (event) => {
        // 加载中或没有数据了都不再加载
        if (isLoading || !hasMore) {
          return
        }
            setIsLoading(true)
            setPageNo(pageNo + 1) 
    }

    //归还逻辑
    const onReturnClicked = (id) => {
          alert('确定归还吗？', '', [
            { text: '我再瞅瞅' },
            { text: '确定', onPress: async() => {
                const hide = message.loading('正在归还');
                    hide();
                    const response = await returnBook({ bookId:id, userId: user.UserId });
                    if (response && response.Status===0) {
                        message.success({
                            content: '归还成功',
                            style: {
                              marginTop: '5vh',
                            },
                          });
                        //当借阅成功后触发更新列表
                        setPageNo(1);
                        if(pageNo === 1) setIsRorrowOrReturnComplete(!isRorrowOrReturnComplete);
                    }else{
                        message.error(response.Message);
                    }
            } },
        ])
    }

    //用户向下滑动和借阅操作都会触发重新加载列表
    React.useEffect(() => {
        logicByAfterGetData();
    }, [pageNo]);

    //特殊情况，借阅成功后，是通过页码改变来刷新列表，但是如果当前用户就在第一页，那么就不会触发刷新，所以新加了isRorrowOrReturnComplete字段来监控
    React.useEffect(() => {
        logicByAfterGetData();
    }, [isRorrowOrReturnComplete]);

      const row = (rowData, sectionID, rowID) => {
        // 这里rowData,就是上面方法cloneWithRows的数组遍历的单条数据了，直接用就行
            return <div key={rowID} className="book col-12 col-sm-6 col-lg-4">
                <div className="book-content">
                    <div className="book-main">
                        <div className="book-main-top">
                           <div className="book-name">《{rowData.Title}》</div>
                        </div>
                        <div className="operation">
                            <div className="global-flex-column">
                                <div className="date">借日：{moment(rowData.BorrowDate).format('YYYY MM-DD')}</div>
                            </div>
                            <Button type="primary" onClick={()=>{onReturnClicked(rowData.Id)}} style={{width:'30%'}}>归还</Button>
                        </div>
                    </div>
                </div>
            </div>
      }

    return (
        <div>
            <div className="borrowComponent">
                <div className="found">
                    {dataArr.length===0?<div>快去借阅书箱，把墨水给喝饱吧!</div>:<div>您一共有<strong className="theme-color"> {dataArr.length} </strong>本书正在借阅中！</div>}
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
            <div>
                    <ActivityIndicator
                        toast
                        text="Loading..."
                        animating={isComplete}
                    />
            </div>
        </div>

    )
}