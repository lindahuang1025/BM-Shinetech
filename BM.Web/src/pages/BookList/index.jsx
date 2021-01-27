import React from 'react';
import './BookList.less';
import { Button } from 'antd';
import { Toast, ListView} from 'antd-mobile';
import { queryBookList} from './service';

export default (props) => {
    const [keyword, setKeyword] = React.useState("");

    //listview
    const [dataSource, setDataSource] = React.useState(new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2 // rowHasChanged(prevRowData, nextRowData); 用其进行数据变更的比较
    }));
    const [pageNo, setPageNo] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10);
    const [hasMore, setHasMore] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(true);
    const [dataArr, setDataArr] = React.useState([]);

    React.useEffect(() => {
        window.scrollTo(0, 0);
        getList();
    }, []);

    const getList= async(ref = false)=>{
        // const { dispatch } = props;
        // dispatch({
        //     type: 'vendorSettings/fetchDiscountList',
        //     payload: {
        //         VendorId: currentUser.vendorId
        //     }
        // });
        const response = await queryBookList({keyword:keyword, pageIndex:pageNo, pageSize:pageSize})
        if (response && response.Status===0) {
               const dataList = response.Datas;
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
        } else {
            Toast.info("Failed, Please refresh or contact the administrator.", 1);
        }
    }

    const onEndReached = (event) => {
        // 加载中或没有数据了都不再加载
        if (isLoading || !hasMore) {
          return
        }
            setIsLoading(true)
            setPageNo(pageNo + 1) 
    }

    const onBorrow = (id) => {
      
    }

      const row = (rowData, sectionID, rowID) => {
        // 这里rowData,就是上面方法cloneWithRows的数组遍历的单条数据了，直接用就行
            return <div key={rowID} className="book col-12 col-sm-6 col-lg-4">
                <div className="book-content">
                    <div className="book-main">
                        <div className="book-main-top-status">
                            {rowData.isBorrow? <div className="book-status-active">⬤ 可借 </div>:<div className="book-status-inactive">⬤ 已借 </div>}
                        </div>
                        <div className="book-main-top">
                           <div className="book-name">《{rowData.Title}》</div>
                        </div>
                        <div className="description">{rowData.Description}</div>
                        <div className="operation">
                            <button className="global-btn" type="submit" onClick={()=>{onBorrow(rowData.Id)}}>借阅</button>
                        </div>
                    </div>
                </div>
            </div>
      }

    return (
        <div>
            <div className="booksComponent container">
                <div className="found">
                    <div>叮！找到<strong className="theme-color"> {dataArr.length} </strong>本藏书。</div>
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
            </div >
        </div>

    )
}