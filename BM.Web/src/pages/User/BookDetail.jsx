import React, { useState, useEffect } from 'react';
import './BookDetail.less';
import { borrowBook } from '@/services/bookBorrow';
import { Button, Card, Modal, DatePicker, List } from 'antd-mobile';
import { message } from 'antd';
import { connect, useIntl } from 'umi';
import bookStatusEnum from '@/enums/bookStatusEnum';
import { getStoredUser } from '@/utils/utils';
import bookDefaultImg from '@/assets/defaultBg.jpg'
import { BackTop } from 'antd';
import moment from 'moment'

const bookDetail = (props) => {
    // 本地化语言设置
    const intl = useIntl();
    const intlString = 'pages.bookList.';
    // 获取用户信息
    const user = getStoredUser();
    // borrow Modal
    const [borrowModalVisable, setBorrowModalVisable] = useState(false);
    //借书日期
    const [borrowDate, setBorrowDate] = useState(new Date(null));
    const nowTimeStamp = Date.now();
    const defaultDate = new Date(moment().add(31, 'days'));
    // 控制最小日期
    let minDate = new Date(nowTimeStamp - 1e7);
    const maxDate = new Date(nowTimeStamp + 1e7);
    // console.log(minDate, maxDate);
    if (minDate.getDate() !== maxDate.getDate()) {
        // set the minDate to the 0 of maxDate
        minDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
    }
    // 获取props数据
    const { bookModel = {}, dispatch } = props;
    const { bookInfo } = bookModel;
    const bookIdValue = props.history.location.state?.bookId || null;

    useEffect(() => {
        getBookInfo();
        console.log(bookInfo)
        // 默认设置借书30天
        setBorrowDate(defaultDate)
    }, []);

    // 获取图书详情
    const getBookInfo = ()=>{
        dispatch({
            type: 'BookListSpace/getBookInfo',
            payload: bookIdValue
        });
    }

    const onBorrowDateChange = (value) => {
        setBorrowDate(value)
    }

    return (
        <div className="bookDetailComponent">
                {(bookInfo.Status || 0 )=== bookStatusEnum.Normal ? <Button type="primary" onClick={()=>{setBorrowModalVisable(true)}} className="borrow-button">{intl.formatMessage({id:`${intlString}borrow`})}</Button>: <div><div className="borrowDisablePrompt">本书在 {bookInfo.BorrowedBy} 处大约还有 <span className="global-borrow-fixed-btn-text-disable">{moment(bookInfo.PlanReturnDate).diff(moment(), 'days')}</span> 天释放</div><div className="borrowDisablePrompt">借阅日期：{moment(bookInfo.BorrowDate).format("YYYY-MM-DD")}</div></div> }
                <Card className="book-info">
                    <Card.Body className="global-flex-column-center">
                        <img src={bookInfo.ImageUrl || bookDefaultImg} className="book-img"/>
                        <Card.Header
                            title={<div className="global-flex-column-center">
                                <div className="book-name">《{bookInfo.Title}》</div>
                                <div className="book-author">{bookInfo.Author}</div>
                            </div>}
                    />
                    </Card.Body>
                    <Card.Footer content={<div className="book-description">{bookInfo.Description}</div>} />
                </Card>
                {/* 浮动借阅 */}
                {(bookInfo.Status || 0 ) === bookStatusEnum.Normal && <BackTop visibilityHeight={50} onClick={()=>{setBorrowModalVisable(true)}}>
                    <div className="global-backTop"><div className="global-borrow-fixed-btn-text">借</div></div>
                </BackTop>}
                {/* 借阅弹框 */}
                <Modal
                    visible={borrowModalVisable}
                    transparent
                    maskClosable={false}
                    onClose={()=>{setBorrowModalVisable(false)}}
                    title="有借有还，再借不难"
                    footer={[
                        { text: intl.formatMessage({id:`${intlString}ConfirmCancel`}), onPress: () => { setBorrowModalVisable(false)} },
                        { text: intl.formatMessage({id:`${intlString}Confirm`}), onPress: async() => {
                                setBorrowModalVisable(false);
                                const hide = message.loading(intl.formatMessage({id:`${intlString}borrowing`}));
                                try {
                                    await borrowBook({ bookId:bookInfo.Id, userId: user.UserId, planReturnDate: moment(borrowDate).format("YYYY-MM-DD") });
                                    hide();
                                    message.success({
                                        content: intl.formatMessage({id:`${intlString}borrowSuccessed`}),
                                        style: {
                                        marginTop: '5vh',
                                        }
                                    });
                                    // 成功刷新当前状态
                                    getBookInfo();
                                } catch (error) {
                                    message.error(error.Message);
                                }
                            } 
                        }]}
                    >
                        <div>
                            <DatePicker
                                mode="date"
                                title="选择日期"
                                extra="Optional"
                                minDate={minDate}
                                value={borrowDate}
                                onChange={date => onBorrowDateChange(date)}
                                onOk={date => onBorrowDateChange(date)}
                            >
                                <List.Item arrow="horizontal">选个吉日还：</List.Item>
                            </DatePicker>
                            <List.Item>预计借书时长 ： {moment(borrowDate).diff(moment(), 'days') } 天</List.Item>
                        </div>
                </Modal>
            </div>
    )
}

export default connect(({ BookListSpace }) => ({
    bookModel: BookListSpace
}))(bookDetail);
