import React, { useState, useEffect, useRef } from 'react';
import './BookDetail.less';
import { borrowBook } from '@/services/bookBorrow';
import { Button, Card, Modal, WingBlank, WhiteSpace  } from 'antd-mobile';
import { message } from 'antd';
import { useIntl, history } from 'umi';
import bookStatus from '@/enums/bookStatusEnum';
import { getStoredUser } from '@/utils/utils';
import bookDefaultImg from '@/assets/defaultBg.jpg'
import { BellTwoTone } from '@ant-design/icons';

const bookDetail = (props) => {
    // 本地化语言设置
    const intl = useIntl();
    const intlString = 'pages.bookList.';
    // 获取用户信息
    const user = getStoredUser();
    // 订阅弹出框
    const {alert} = Modal;
    const [bookInfo, setBookInfo] = useState({})

    useEffect(() => {
        const bookInfo = props.history.location.state?.bookInfo || {};
        if(bookInfo) {
            setBookInfo(bookInfo);
        }
    }, []);

    // 借阅操作
    const onBorrowClicked  = (id) => {
        alert(intl.formatMessage({id:`${intlString}borrowConfirmPrompt`}), '', [
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
            <WingBlank size="md">   
                {(bookInfo.Status || 0 )=== bookStatus.Normal && <div className="borrow-button">
                <Button type="primary" onClick={()=>{onBorrowClicked (bookInfo.Id)}}>{intl.formatMessage({id:`${intlString}borrow`})}</Button>
                </div>}
                <Card className="book-info">
                    <Card.Body>
                        <img src={bookInfo.ImageUrl || bookDefaultImg} className="book-img"/>
                        <Card.Header
                            title={<div className="global-flex-column">
                                <div className="book-name">《{bookInfo.Title}》</div>
                                <div className="book-author">{bookInfo.Author}</div>
                            </div>}
                            extra={<span>{(bookInfo.Status || 0) === bookStatus.Normal? <BellTwoTone twoToneColor="rgb(16, 212, 16)"/>:<BellTwoTone twoToneColor="red"/>}</span>}
                    />
                    </Card.Body>
                
                </Card>
            </WingBlank>
        </div>
    )
}

export default bookDetail;
