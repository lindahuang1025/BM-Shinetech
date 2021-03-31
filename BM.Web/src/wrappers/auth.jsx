import { Redirect } from 'umi'
import { getStoredUser } from '@/utils/utils';

export default (props) => {
  const { isLogin } = useAuth();
  // 获取用户信息
  const user = getStoredUser();
  if (isLogin) {
    return <div>{ props.children }</div>;
  } else {
    return <Redirect to="/login" />;
  }
}