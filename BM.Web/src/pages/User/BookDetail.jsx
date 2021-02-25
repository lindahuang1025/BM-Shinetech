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
       
        </div>
    )
}

export default bookDetail;
