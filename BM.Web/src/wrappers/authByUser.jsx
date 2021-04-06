import { Redirect } from 'umi'
import { getAuthority } from '@/utils/authority';

export default (props) => {
  // 获取权限信息
  const auth = getAuthority();
  if (auth[0] === "Admin") {
    return <Redirect to="/bookManage" />;
  } else {
    return <div>{ props.children }</div>;
  }
}