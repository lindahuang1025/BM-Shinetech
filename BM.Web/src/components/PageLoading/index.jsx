import { PageLoading } from '@ant-design/pro-layout'; // loading components from code split
// https://umijs.org/plugin/umi-plugin-react.html#dynamicimport

const loading = (props) => {
    return(
        <div>
            <PageLoading/>
        </div>
    )
}

export default loading;
