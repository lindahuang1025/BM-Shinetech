import React from 'react';
import { SmileTwoTone } from '@ant-design/icons';
import { Card, Typography } from 'antd';
import { history } from 'umi';
import { Button } from 'antd'

export default () => {
  const goBack = () => {
    history.goBack();
  };
  return (
      <Card>
        <Typography.Title
          level={2}
          style={{
            textAlign: 'center',
          }}
        >
          <SmileTwoTone /> 这个页面只有 admin 权限才能查看
        </Typography.Title>
        <Typography
          level={2}
          style={{
            textAlign: 'center',
          }}
        >
          <Button type="primary" onClick={()=>goBack()} style={{width:'100px'}}>
              返回
          </Button>
        </Typography>
      </Card>
  );
};
