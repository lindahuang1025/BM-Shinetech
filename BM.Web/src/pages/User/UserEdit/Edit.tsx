// import styles from "./index.less";
import { Space } from 'antd';
import React, { useState } from "react";
import { connect, history,useIntl } from 'umi';
import {User} from '@/types/User'
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  message,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import {UserEdit} from '@/services/user';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

// const residences = [
//   {
//     value: "zhejiang",
//     label: "Zhejiang",
//     children: [
//       {
//         value: "hangzhou",
//         label: "Hangzhou",
//         children: [
//           {
//             value: "xihu",
//             label: "West Lake",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     value: "jiangsu",
//     label: "Jiangsu",
//     children: [
//       {
//         value: "nanjing",
//         label: "Nanjing",
//         children: [
//           {
//             value: "zhonghuamen",
//             label: "Zhong Hua Men",
//           },
//         ],
//       },
//     ],
//   },
// ];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Edit = (props) => {
  // const userId = props.history.location.state?.userId || 0;
  //  console.log('props',props);
  const [form] = Form.useForm();
  const [email, setEmail] = useState(props.currentUser.UserName);
  const [nickname, setNickName] = useState('');
  const [phone, setPhone] = useState('0');
  const [website, setWebsite] = useState('');
  const intl = useIntl();
  const intlString = 'pages.bookList.';

  const onFinish = async (values) => {
    
    const hide = message.loading(intl.formatMessage({id:`${intlString}edit user`}));

    // const user: User = {
    //   UserId: 1,
    //   UserName: 'andy'
    // }

    // var value = await UserEdit(user);
    var value = await UserEdit({
      UserId:props.currentUser.UserId,
      UserName:email,
      UserRole:props.currentUser.UserRole,
      Nickname:nickname,
      PhoneNumber: phone,
      Website:website
    
    });

    try {
     
          if( value.length > 0)
          {
            hide();
            message.success({
                content: intl.formatMessage({id:`${intlString}borrowSuccessed`}),
                style: {
                marginTop: '5vh',
                }
            });
            // 成功刷新当前状态
            GoBack();
          }
        
      } catch (error) {
          message.error(error.Message);
      }
      
    // console.log("Received values of form: ", values);
  };

  const GoBack = () => {
    history.push({
      pathname: '/userInfo',
     
    })
    };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));


  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ["zhejiang", "hangzhou", "xihu"],
        prefix: "86",
      }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: false,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input type='text' defaultValue={email} disabled />
      </Form.Item>

      {/* <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                "The two passwords that you entered do not match!"
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item> */}

      <Form.Item
        name="nickname"
        label={
          <span>
            Nickname&nbsp;
            <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: false,
            message: "Please input your nickname!",
            whitespace: true,
          },
        ]}
      >
        <Input defaultValue={nickname} onChange={(k)=>setNickName(k.target.value)}/>
      </Form.Item>

      {/* <Form.Item
        name="residence"
        label="Habitual Residence"
        rules={[
          {
            type: "array",
            required: true,
            message: "Please select your habitual residence!",
          },
        ]}
      >
        <Cascader options={residences} />
      </Form.Item> */}

      <Form.Item
        name="phone"
        label="Phone Number"
        
        rules={[{  required: false, message: "Please input your phone number!" },{pattern: new RegExp("[0-9\/]"), message: "Plese input number." ,type: "regexp"}]}
      >
        <Input addonBefore={prefixSelector} style={{ width: "100%" }} value={phone}   onChange={(k)=>setPhone(k.target.validity.valid ? k.target.value : "0")} maxLength={11}  />
      </Form.Item>

      <Form.Item
        name="website"
        label="Website"
        rules={[{ required: false, message: "Please input website!" }]}
      >
        <AutoComplete
          options={websiteOptions}
          onChange={onWebsiteChange}
          placeholder="website"
        >
          <Input />
        </AutoComplete>
      </Form.Item>

      {/* <Form.Item
        label="Captcha"
        extra="We must make sure that your are a human."
      >
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="captcha"
              noStyle
              rules={[
                {
                  required: true,
                  message: "Please input the captcha you got!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button>Get captcha</Button>
          </Col>
        </Row>
      </Form.Item> */}

      {/* <Form.Item
        name="agreement"
        valuePropName="checked"
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item> */}
      <Form.Item {...tailFormItemLayout}>
        <Space>
        <Button type="primary" htmlType="submit">
          Edit
        </Button>
        <Button type="primary" onClick={()=>GoBack()} >
        Cancel
        </Button>
        </Space>
       
      </Form.Item>
    </Form>
  );
};

// export default Edit
export default connect(({ user }) => ({
  currentUser: user.currentUser
}))(Edit);

// export default (props) => (
//   // <div className={styles.container}>
//   <div >
//     <div id="components-form-demo-register">
//       <Edit {...props}/>
//     </div>
//   </div>
// );
