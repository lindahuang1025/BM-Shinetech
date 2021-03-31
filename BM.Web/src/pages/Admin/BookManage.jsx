import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Input, Drawer, Popconfirm, Tag  } from 'antd';
import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { updateRule, addRule } from './service';
import { queryBookListByAdmin } from '@/services/book';
import { bookDeleted } from '@/services/bookManage';
import { history } from 'umi';

const { Search } = Input;

const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

const handleUpdate = async (fields) => {
  const hide = message.loading('正在配置');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

const TableList = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef();
  const [row, setRow] = useState();
  const [searchValue, setSearchValue] = useState("");

  const columns = [
    {
      title: '图书名称',
      dataIndex: 'Title',
      tip: '图书名称',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '图书名称为必填项',
          },
        ],
      },
      width:500,
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
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </div>
  );
};

export default TableList;
