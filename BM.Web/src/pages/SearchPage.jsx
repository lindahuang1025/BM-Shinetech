import React, { useState, useEffect, useRef } from 'react';
import './SearchPage.less';
import { SearchBar } from 'antd-mobile';
import { useIntl, history } from 'umi';

const searchPageList = (props) => {
    // 本地化语言设置
    const intl = useIntl();
    // 搜索关键字
    const [keyword, setKeyword] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    // 设置搜索字段
    const onSearchChanged= (value) => {
        setKeyword(value);
    }

    // 取消搜索
    const onSearchCancel= () => {
        history.push({
            pathname: '/list',
            state:{
                keyword:null
            }
        })
    }

    // 提交搜索
    const onSearchSubmit= (value) => {
        setKeyword(value);
        history.push({
            pathname: '/list',
            state:{
                keyword:value
            }
        })
    }

    return (
        <div>
            <div className="searchPageComponent">
                <SearchBar
                    placeholder={intl.formatMessage({id:'pages.list.searchPlaceholoder'})}
                    value={keyword}
                    onCancel={() => onSearchCancel()}
                    onSubmit={value => onSearchSubmit(value)}
                    onChange={value => onSearchChanged(value)}
                    maxLength={20}
                    ref={inputRef}
                />
            </div>
        </div>
    )
}

export default searchPageList;
