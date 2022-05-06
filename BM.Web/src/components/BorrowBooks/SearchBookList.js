import { useState,useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { connect, useIntl, history } from 'umi';
import debounce from 'lodash.debounce';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];



function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

const SearchBookList = (props) => {
  const { keyword } = props;

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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { bookListModel = {}, loading, dispatch } = props;
  const { bookList } = bookListModel;
console.log(bookList);

const doSearch = (v) => {
  const word = v || '';
  if(word) {
      dispatch({
          type: 'BookListSpace/query',
          payload: {
              keyword:word,
              pageIndex:page,
              pageSize:pageSize
            }
      });
  }else{
      getlistData();
  }
}

const emitChangeDebounced = debounce(doSearch, 2000);
useEffect(()=>{
  emitChangeDebounced(keyword);
  
// eslint-disable-next-line react-hooks/exhaustive-deps
},[keyword]);


// 获取列表
const getlistData = ()=>{
  dispatch({
      type: 'BookListSpace/query',
      payload: {
          keyword:'',
          pageIndex:page,
          pageSize:pageSize
        }
  });
}

       // 跳转详情页面
  const AddBook = (row) => {
  history.push({
    pathname: '/SearchBooks/BorrowBook',
    state:{book:row}
  })
  };
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
            {/* <StyledTableCell>ID</StyledTableCell> */}
              <StyledTableCell>Title</StyledTableCell>
       
              <StyledTableCell align="left">Author</StyledTableCell>
              <StyledTableCell align="center">Brief</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
          
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {bookList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  // <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  //   {columns.map((column) => {
                  //     const value = row[column.id];
                  //     return (
                  //       <TableCell key={column.id} align={column.align}>
                  //         {column.format && typeof value === 'number'
                  //           ? column.format(value)
                  //           : value}
                  //       </TableCell>
                  //     );
                  //   })}
                  // </TableRow>
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
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default connect(({ BookListSpace, loading }) => ({
  bookListModel: BookListSpace,
  loading: loading.effects['BookListSpace/query'],
}))(SearchBookList);
