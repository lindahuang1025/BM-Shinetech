import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Divider, message, Input, Popconfirm,Tag, Popover, Avatar } from 'antd';
import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { queryBookListByAdmin } from '@/services/book';
import { bookDeleted } from '@/services/bookManage';
import { history } from 'umi';

const { Search } = Input;

const TableList = () => {
  const actionRef = useRef();
  const [searchValue, setSearchValue] = useState("");

  const columns = [
    {
      title: '封面',
      dataIndex: 'ImageUrl',
      width: 80,
      render: (_, record) => {
        console.log(record)
        return record.ImageUrl ? <Popover placement="topLeft" content={<img alt={record.name} src={`${uploadImgUrl}${record.ImageUrl}`} style={{ maxWidth: '480px' }} />}><Avatar size={24} src={`${uploadImgUrl}${record.ImageUrl}`} /></Popover> : <Avatar size={24} icon={<EllipsisOutlined />} />
      }
    },
    {
      title: '图书名称',
      dataIndex: 'Title',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '图书名称为必填项',
          },
        ],
      },
      width:400,
      sorter: (a, b) => a.Title.length - b.Title.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '图书类别',
      dataIndex: 'CategoryId',
      hideInForm: true,
      valueEnum: {
        1: { text: '企业/项目/时间管理类', status: 1 },
        2: { text: '计算机/软件/网络工程开发类', status: 2 },
        3: { text: '系统实践/设计类', status: 3 },
        4: { text: '文学/生活类', status: 4 }
      },
      filters:[
        { text: '企业/项目/时间管理类', value: 1 },
        { text: '计算机/软件/网络工程开发类', value: 2 },
        { text: '系统实践/设计类', value: 3 },
        { text: '文学/生活类', value: 4 }
      ],
    },
    {
      title: '作者',
      dataIndex: 'Author',
      valueType: 'text',
      width:300,
    },
    {
      title: '图书详情',
      dataIndex: 'Description',
      valueType: 'textarea',
      hideInTable:true,
      hideInForm: true,
    },
    {
      title: '状态',
      dataIndex: 'Status',
      hideInForm: true,
      valueEnum: {
        0: { text: '可借阅', status: 'Normal' },
        1: { text: '已借阅', status: 'Borrowed' },
        2: { text: '已归还', status: 'Returned' }
      },
      render: (_, record) => {
        let color = record.Status === 1 ?  'red' : 'green';
        return (
            <Tag color={color}>
              {record.Status === 1 ?  '已借阅' : '可借阅'}
            </Tag>
        );
  
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a 
            onClick={() => {
              goEditPage(record)
            }}>
              <Button>修改</Button>
          </a>
          <Divider type="vertical" />
          <a href="">
            <Popconfirm title="确认删除?" onConfirm={() => handleRemove(record)}>
              <Button>删除</Button>
            </Popconfirm>
          </a>
        </>
      ),
    },
  ];

  const handleNameFilter =(value)=>{
    setSearchValue(value)
  }

  const handleRemove = async (book) => {
    const hide = message.loading('正在删除');
    try {
      await bookDeleted(book.Id);
      hide();
      message.success('删除成功!');
      // 重新加载列表
      actionRef.current.reload();
      return true;
    } catch (error) {
      hide();
      message.error('删除失败，请重试');
      return false;
    }
  };

  // 跳转详情页面
  const goEditPage = (book) => {
    history.push({
      pathname: '/bookManage/edit',
      state:{
        bookItem:book
      }
    })
  }

  return (
    <div>
      <ProTable
        size='small'
        headerTitle={<h3><strong>图书列表</strong></h3>}
        actionRef={actionRef}
        rowKey="key"
        search={false}
        toolBarRender={() => [
          <>
            <Search
              placeholder="输入查询信息"
              onSearch={value => handleNameFilter(value)}
              style={{ width: 200, fontSize: 10,marginRight:15 }}
            />
            <Button key="1" type="primary" onClick={() => goEditPage()}>
              <PlusOutlined /> 新建
            </Button>
          </>,
        ]}
        request={(params, sorter, filter) => queryBookListByAdmin({...params, sorter, filter})}
        params={
          {
            keyword: searchValue
          }
        }
        columns={columns}
      />
    </div>
  );
};

export default TableList;
