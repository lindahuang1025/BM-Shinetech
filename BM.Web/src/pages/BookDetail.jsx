import React, { useState, useEffect, useRef } from 'react';
import './BookDetail.less';
import { useIntl, history } from 'umi';

const bookDetail = (props) => {
    // 本地化语言设置
    const intl = useIntl();
    const [bookInfo, setBookInfo] = useState({})

    useEffect(() => {
        const bookInfo = props.history.location.state?.bookInfo || {};
        if(bookInfo) {
            setBookInfo(bookInfo);
        }
    }, []);

    return (
        <div>
            <div className="bookDetailComponent">
                <div className="detail-main">
                    <div className="book-main-top">
                        <div className="book-default-bg" style={bookInfo?.ImageUrl ? { backgroundImage: "url('" + bookInfo?.ImageUrl + "')" } : { backgroundImage: "url(" + require('../assets/defaultBg.jpg') + ")" }}>
                        </div>
                        <div className="book-main-top-right global-flex-column">
                            <div className="global-flex-row global-flex-row-between">
                                <div className="book-name">《{bookInfo.Title}》</div>
                                <div className="book-main-top-status">
                                    {bookInfo.Status ===0? <div className="book-status-active">⬤可借</div>:<div className="book-status-inactive">⬤已借</div>}
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default bookDetail;
