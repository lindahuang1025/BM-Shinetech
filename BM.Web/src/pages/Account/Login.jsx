import {
  LockTwoTone,
  UserOutlined,
} from '@ant-design/icons';
import { Alert } from 'antd';
import React from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { connect, FormattedMessage, useIntl } from 'umi';
import styles from './Login.less';

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = (props) => {
  const intl = useIntl();
  const intlString = 'pages.login.';
  const { loginModel = {}, loading } = props;
  const { status } = loginModel;

  const handleSubmit = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values },
    });
  };

  return (
    <div className={styles.main}>
      <ProForm
      
        submitter={{
          // searchConfig: {
          //   submitText: "gogogog",
          // },
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: loading,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={(values) => {
          handleSubmit(values);
          return Promise.resolve();
        }}
      >
        {status < 0 && !loading && (
          <LoginMessage
            content={intl.formatMessage({id:`${intlString}accountLogin.tab`})}
          />
        )}

        <ProFormText
          name="userName"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={styles.prefixIcon} />,
            placeholder:"公司Beacon账号互通" 
          }}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id={`${intlString}username.required`}
                />
              ),
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          placeholder = "公司Beacon账号互通"
          fieldProps={{
            size: 'large',
            prefix: <LockTwoTone className={styles.prefixIcon} />,
          }}

          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id={`${intlString}password.required`}
                />
              ),
            },
          ]}
        />
      </ProForm>
    </div>
  );
};

export default connect(({ loginModel, loading }) => ({
  loginModel: loginModel,
  loading: loading.effects['login/login'],
}))(Login);
