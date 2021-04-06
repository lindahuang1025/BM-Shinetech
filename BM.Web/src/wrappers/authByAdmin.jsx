import { Redirect } from 'umi'
import { getAuthority } from '@/utils/authority';
import AdminPage from '@/pages/Admin';

export default (props) => {
  // 获取权限信息
  const auth = getAuthority();
  if (auth[0] === "Admin") {
    return <div>{ props.children }</div>;
  } else {
    return <AdminPage />;
  }
}