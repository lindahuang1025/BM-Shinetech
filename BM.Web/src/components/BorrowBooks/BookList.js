import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { connect, useIntl, history } from 'umi';
import { useState,useEffect } from 'react';

const BookList = (props) => {
    const BootstrapButton = styled(Button)({
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#0063cc',
        borderColor: '#0063cc',
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
          backgroundColor: '#0069d9',
          borderColor: '#0062cc',
          boxShadow: 'none',
        },
        '&:active': {
          boxShadow: 'none',
          backgroundColor: '#0062cc',
          borderColor: '#005cbf',
        },
        '&:focus': {
          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
      });

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
    const [pageNo, setPageNo] = useState(1);
    const { bookListModel = {}, loading, dispatch } = props;
    const { bookList } = bookListModel;
    console.log(bookList);
    useEffect(()=>{
      getlistData();
    },[]);

    // 获取列表
    const getlistData = ()=>{
      dispatch({
          type: 'BookListSpace/query',
          payload: {
              keyword:'',
              pageIndex:pageNo,
              pageSize:pageSize
            }
      });
    }
  

    // const rows = [
    //     {
    //         Id: 1,
    //         Title: '阿米巴经营',
    //         calories:159,
    //         Author: '稻盛合夫',
    //         Description: '本书介绍了Elasticsearch这个优秀的全文检索和分析引擎从安装和配置到集群管理的各方面知识。本书这一版不仅补充了上一版中遗漏的重要内容，并且所有示例和功能均基于Elasticsearch服务器1.0版进行了更新。你可以从头开始循序渐进地学习本书，也可以查阅具体功能解决手头问题。',
    //         protein: 4.0
    //     },
    //     {
    //         Id: 2,
    //         Title: 'SCRUM敏捷项目管理',
    //         calories:237,
    //         Author: '[美] 史威伯 ',
    //         Description: 'The rules and practices for Scrum...',
    //         protein: 4.0
    //     },
    //     {
    //         Id: 3,  
    //         Title: '代码整洁之道',
    //         calories:204,
    //         Author: 'Robert C.Martin',
    //         Description: '本书提出一种观念：代码质量与其整洁度成正比。干净的代码，既在质量上较为可靠，也为后期维护、升级奠定了良好基础。作为编程领域的佼佼者，本书作者给出了一系列行之有效的整洁代码操作实践。这些实践在本书中体现为一条条规则（或称“启示”），并辅以来自现实项目的正、反两面的范例。只要遵循这些规则，就能编写出干净的代码，从而有效提升代码质量。  本书阅读对象为一切有志于改善代码质量的程序员及技术经理。书中介绍的规则均来自作者多年的实践经验，涵盖从命名到重构的多个编程方面，虽为一“家”之言，然诚有可资借鉴的价值。',
    //         protein: 4.0
    //     },
    //     {
    //         Id: 4,
    //         Title: 'Elasticsearch 服务器开发',
    //         calories:305,
    //         Author: '[波兰] Rafa·Ku·Marek Rogoziński',
    //         Description: '本书介绍了Elasticsearch这个优秀的全文检索和分析引擎从安装和配置到集群管理的各方面知识。本书这一版不仅补充了上一版中遗漏的重要内容，并且所有示例和功能均基于Elasticsearch服务器1.0版进行了更新。你可以从头开始循序渐进地学习本书，也可以查阅具体功能解决手头问题。',
    //         protein: 4.0
    //     },
    
    //   ];

   
       // 跳转详情页面
    const AddBook = (row) => {
      history.push({
        pathname: '/SearchBooks/BorrowBook',
        state:{book:row}
      })
      };
    

      return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Title</StyledTableCell>
              {/* <StyledTableCell align="center">Category</StyledTableCell> */}
              <StyledTableCell align="left">Author</StyledTableCell>
              <StyledTableCell align="center">Brief</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {bookList.map((row) => (
              <StyledTableRow 
                key={row.Id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell  component="th" scope="row">
                  {row.Title}
                </StyledTableCell>
     
                <StyledTableCell  align="left">{row.Author}</StyledTableCell>
                <StyledTableCell  align="left">{row.Description}</StyledTableCell>
                <BootstrapButton  variant="contained" align="center" onClick={()=>AddBook(row)}>
                    Borrow
                </BootstrapButton>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      )

}

export default connect(({ BookListSpace, loading }) => ({
  bookListModel: BookListSpace,
  loading: loading.effects['BookListSpace/query'],
}))(BookList);
