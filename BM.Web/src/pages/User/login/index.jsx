import {
  LockTwoTone,
  UserOutlined,
} from '@ant-design/icons';
import { Alert } from 'antd';
import React from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { connect, FormattedMessage, formatMessage } from 'umi';
import styles from './index.less';

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
  const { userLogin = {}, submitting } = props;
  const { status } = userLogin;

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
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
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
        {status < 0 && !submitting && (
          <LoginMessage
            content={formatMessage({id:"pages.login.accountLogin.tab"})}
          />
        )}

        <ProFormText
          name="userName"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={styles.prefixIcon} />,
          }}
          placeholder={formatMessage({id:"pages.login.username.required"})}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.login.username.required"
                />
              ),
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockTwoTone className={styles.prefixIcon} />,
          }}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.login.password.required"
                />
              ),
            },
          ]}
        />
      </ProForm>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
