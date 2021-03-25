import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Input, Drawer,Popconfirm  } from 'antd';
import React, { useState, useRef } from 'react';
import { FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { queryRule, updateRule, addRule, removeRule } from './service';
import { queryBookListByAdmin } from '@/services/book';

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

const handleRemove = async (selectedRows) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef();
  const [row, setRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);

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
      // render: (dom, entity) => {
      //   return <a onClick={() => setRow(entity)}>{dom}</a>;
      // },
    },
    {
      title: '作者',
      dataIndex: 'Author',
      valueType: 'text',
      width:200
    },
    {
      title: '图书详情',
      dataIndex: 'Description',
      valueType: 'textarea',
      width:500
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
    },
    {
      title: '借阅人',
      dataIndex: 'BorrowedBy',
      hideInForm: true,
      valueType: 'text',
    },
    {
      title: '借阅时间',
      dataIndex: 'BorrowDate',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('Status');
        if (`${status}` === '0') {
          return false;
        }
        return defaultRender(item);
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          {/* <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            修改
          </a> */}
          <Divider type="vertical" />
          <a href="">
            <Popconfirm title="确认删除?" onConfirm={() => onDelete(record.id)}>
              <Button>删除</Button>
            </Popconfirm>
          </a>
        </>
      ),
    },
  ];

  return (
    <div>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button key="1" type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={(params, sorter, filter) => queryBookListByAdmin({...params, sorter, filter})}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}
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
          rowKey="key"
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
