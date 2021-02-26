import React, { useState, useEffect } from 'react';
import './BookDetail.less';
import { borrowBook } from '@/services/bookBorrow';
import { Button, Card, Modal, DatePicker, List } from 'antd-mobile';
import { message } from 'antd';
import { useIntl } from 'umi';
import bookStatusEnum from '@/enums/bookStatusEnum';
import { getStoredUser } from '@/utils/utils';
import bookDefaultImg from '@/assets/defaultBg.jpg'
import { BackTop } from 'antd';

const bookDetail = (props) => {
    // 本地化语言设置
    const intl = useIntl();
    const intlString = 'pages.bookList.';
    // 获取用户信息
    const user = getStoredUser();
    // 订阅弹出框
    const {alert} = Modal;
    const [bookInfo, setBookInfo] = useState({});
    //借书日期
    const [borrowDate, setBorrowDate] = useState(new Date());
    const nowTimeStamp = Date.now();
    const now = new Date(nowTimeStamp);

    useEffect(() => {
        const bookInfo = props.history.location.state?.bookInfo || {};
        if(bookInfo) {
            setBookInfo(bookInfo);
        }
        setBorrowDate(now)
    }, []);

    // 借阅操作
    const onBorrowClicked  = (id) => {
        alert(intl.formatMessage({id:`${intlString}borrowConfirmPrompt`}),  
        <div>
            <DatePicker
                mode="date"
                title="Select Date"
                extra="Optional"
                value={borrowDate}
                onChange={date => setBorrowDate(date)}
            >
                <List.Item arrow="horizontal">选个吉日还：</List.Item>
            </DatePicker>
            <List.Item>预计借书时长 ： 30 天</List.Item>
        </div>
      , [
            { text: intl.formatMessage({id:`${intlString}ConfirmCancel`}) },
            { text: intl.formatMessage({id:`${intlString}Confirm`}), onPress: async() => {
                const hide = message.loading(intl.formatMessage({id:`${intlString}borrowing`}));
                    try {
                        await borrowBook({ bookId:id, userId: user.UserId });
                        hide();
                        message.success({
                            content: intl.formatMessage({id:`${intlString}borrowSuccessed`}),
                            style: {
                              marginTop: '5vh',
                            }
                        });
                    } catch (error) {
                        message.error(error.Message);
                    }
            } },
        ])
    }

    return (
        <div className="bookDetailComponent">
                {(bookInfo.Status || 0 )=== bookStatusEnum.Normal && <Button type="primary" onClick={()=>{onBorrowClicked (bookInfo.Id)}} className="borrow-button">{intl.formatMessage({id:`${intlString}borrow`})}</Button>}
                <Card className="book-info">
                    <Card.Body className="global-flex-column-center">
                        <img src={bookInfo.ImageUrl || bookDefaultImg} className="book-img"/>
                        <Card.Header
                            title={<div className="global-flex-column">
                                <div className="book-name">《{bookInfo.Title}》</div>
                                <div className="book-author">{bookInfo.Author}</div>
                            </div>}
                    />
                    </Card.Body>
                    <Card.Footer content={<div className="book-description">{bookInfo.Description}</div>} />
                </Card>
                {/* 浮动借阅 */}
                 <BackTop visibilityHeight={50} onClick={()=>{onBorrowClicked (bookInfo.Id)}}>
                    <div className={(bookInfo.Status || 0 )=== bookStatusEnum.Normal ? "global-backTop" : "global-backTop global-borrow-fixed-btn-disable"}><div className={(bookInfo.Status || 0 )=== bookStatusEnum.Normal ? "global-borrow-fixed-btn-text":"global-borrow-fixed-btn-text global-borrow-fixed-btn-text-disable"}>借</div></div>
                </BackTop>
        </div>
    )
}

export default bookDetail;
