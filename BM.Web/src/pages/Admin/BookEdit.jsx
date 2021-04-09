import { Button, Card, Input, Form, Upload, message, Modal, Typography, PageHeader, Avatar, Select  } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { connect, history } from 'umi';
import React, { useState, useEffect} from 'react';
import { bookAddOrUpdate, uploadBookBgImg } from '@/services/bookManage';
import './BookEdit.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Paragraph } = Typography;
const { Meta } = Card;

const BookEditPage = (props) => {
  const { submitting } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  const [imgUrl, setImgUrl] = useState('');
  const [fileList, setFileList] = useState([]);
  const hasBook = props.history.location.state?.bookItem || null;
  const { bookModel = {},dispatch } = props;
  const { bookCategoryList } = bookModel;

  useEffect(() => {
    onBookCategoryListLoad();
    // 编辑功能下，如果ImageUrl不为空，则显示相应保存的图片
    if(hasBook && hasBook.ImageUrl){
      setFileList([{
        uid:'-1',
        name:hasBook.ImageUrl,
        status:'done',
        url:`${uploadImgUrl}${hasBook.ImageUrl}`
      }])
    }
  }, []);

  const onBookCategoryListLoad= () => {
    dispatch({
        type: 'BookListByAdminSpace/queryBookCategoryList'
    });
  };

  // 表单布局
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 7,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 12,
      },
      md: {
        span: 10,
      },
    },
  };
  const submitFormLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 10,
        offset: 7,
      },
    },
  };

  // 提交表单
  const onFinish = async(values) => {
    if(imgUrl !==''){
      values.ImageUrl = imgUrl;
    }
    try {
      await bookAddOrUpdate({ ...values });
      if(hasBook?.Id) {message.success('修改成功')} else {message.success('添加成功')};
      goBack();
      return true;
    } catch (error) {
      message.error('出错了，再试一下看看或者刷新看看~');
      return false;
    }
  };

  // 图片上传按钮渲染
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  // 上传图片前的校验
  const beforeImgUpload = (file) => {
    return new Promise((resolve, reject) => {
      // 利用resolve和reject来控制返回，从而控制失败不显示缩略图
      const isJpgOrPng =  file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('请上传 JPG/PNG 类型的图片!');
        return reject(false)
      }
      const isLt3M = file.size / 1024 / 1024 < 3;
      if (!isLt3M) {
        message.error('图片太大啦，缩小一下体积吧，超过3MB了!');
        return reject(false)
      }
      return resolve(true);
    });
  };

  // 关闭预览窗口
  const handlePreviewCancel = () => {
    setPreviewVisible(false)
  };

  // 将图片进行临时转码以显示
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
  }

  // 点击图片预览按钮触发
  const handlePreview = async(file) => {
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview)
      setPreviewVisible(true)
  };

  // 删除当前上传图片
  const handleDelete= () => {
    setFileList([]);
    setImgUrl('');
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="BookEditContainer">
      <PageHeader
          className="site-page-header"
          onBack={() => goBack()}
          title={ hasBook !=null ? "编辑图书" : "新增图书"}
          extra={
            <Button type="primary" onClick={()=>goBack()} style={{width:'100px'}}>
              返回
            </Button>
          }
      />
    <Card bordered={true}>
            <Form
            hideRequiredMark
            style={{
                marginTop: 8,
            }}
            form={form}
            name="basic"
            initialValues={{
              Id: hasBook?.Id || null,
              Status: hasBook?.Status || null,
              Title: hasBook?.Title || '',
              Author: hasBook?.Author || '',
              CategoryId : hasBook?.CategoryId || 1 ,
              Description: hasBook?.Description || '',
              ImageUrl:hasBook?.ImageUrl || ''
            }}
            onFinish={onFinish}
            >
            <FormItem
                name="Status"
                hidden = {true}
            >
            </FormItem>
            <FormItem
                name="Id"
                hidden = {true}
            >
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="图书封面"
            >
               <div className="global-flex-row global-flex-row-between">
                 <div>
                  <Upload
                      listType="picture-card"
                      className="avatar-uploader"
                      customRequest={async(info)=>{
                        const file = await uploadBookBgImg(info.file);
                        const fileListTemp = {
                          file:file,
                          fileList:[file]
                        };
                        setFileList(fileListTemp.fileList);
                        setImgUrl(file.response.Data || '');
                      }}
                      fileList={fileList}
                      beforeUpload={beforeImgUpload}
                      onPreview={handlePreview}
                      onRemove={handleDelete}
                  >
                      {fileList.length >= 1 ? null : uploadButton}
                  </Upload>
                  <Paragraph>支持 JPG/PNG 图片格式文件</Paragraph>
                  <Modal
                      visible={previewVisible}
                      footer={null}
                      onCancel={handlePreviewCancel}
                      >
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                 </div>
                 <div>
                  { hasBook?.Status === 1 && <Card style={{ width: 300, marginTop: 16, backgroundColor: "#fde6c3" }} loading={loading}>
                    <Meta
                        avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title="借阅中"
                        description={<div className="global-flex-center"><div>借阅人: {hasBook?.BorrowedBy}</div><div>借阅日期: {hasBook?.BorrowDate}</div></div>}
                    />
                  </Card>}
                 </div>
               </div>
               
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="图书名称"
                name="Title"
                rules={[
                  {
                      required: true,
                      message: "一定得填一个哦",
                  },
                ]}
            >
                <Input placeholder="请输入图书名称吧" />
            </FormItem>
            <Form.Item
                {...formItemLayout}
                  name = 'CategoryId'
                  label="图书类别"
                  rules={[
                    {
                      required: true,
                      message: '请选择一个类别',
                    },
                  ]}
                >
   
                <Select options={bookCategoryList}/>
            </Form.Item>
            <FormItem
                {...formItemLayout}
                label="作者"
                name="Author"
                rules={[
                  {
                      required: true,
                      message: "一定得填一个哦",
                  },
                ]}
            >
                <Input
                placeholder="请输入图书作者吧"
                />
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="图书详情"
                name="Description"
            >
                <TextArea
                style={{
                    minHeight: 32,
                }}
                placeholder="请输入图书详情"
                rows={10}
                />
            </FormItem>
            {hasBook ==="update" &&<FormItem
                {...formItemLayout}
                label="借阅人"
                name="BorrowedBy"
            >
                <Input disabled={true}/>
            </FormItem>}
            {hasBook ==="update" &&<FormItem
                {...formItemLayout}
                label="借阅日期"
                name="BorrowDate"
            >
                <Input disabled={true}/>
            </FormItem>}
            <FormItem
                {...submitFormLayout}
                style={{
                marginTop: 32,
                }}
            >
              <div className="global-flex-row global-flex-row-between">
                <Button type="primary" htmlType="submit" loading={submitting}>
                提交
                </Button>
              </div>
            </FormItem>
            </Form>
        </Card>
    </div>
  );
};

export default connect(({ BookListByAdminSpace }) => ({
    bookModel: BookListByAdminSpace
}))(BookEditPage);
