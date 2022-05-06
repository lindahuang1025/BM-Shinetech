import { useState } from "react"
import { Form, Button,message } from 'antd';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { history,useIntl } from 'umi';
import { outStock,borrowBook } from '@/services/bookBorrow';
import {getStoredUser} from '@/utils/utils';
import moment from 'moment'


const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
// const config = {
//   rules: [
//     {
//       type: 'object',
//       required: true,
//       message: 'Please select time!',
//     },
//   ],
// };


const BorrowBook = ({id,title,brief}) => {
  const intl = useIntl();
  const intlString = 'pages.bookList.';
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
      backgroundColor: '#0062DD',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  });


  const [borrowDate, setBorrowDate] = useState(new Date().toLocaleString());
  const [returnDate, setReturnDate] = useState(new Date());
  const [borrowNumber,setBorrowNumber] = useState(1); 
  const [borrowTitle,setBorrowTitle] = useState(title); 
  const [borrowBrief,setBorrowBrief] = useState(brief); 
  
  const user = getStoredUser();

  const handleBorrowChange = (newValue) => {
    setBorrowDate(newValue.toLocaleString());
  };
  const handleReturnChange = (newValue) => {
    setReturnDate(newValue.toLocaleString());
  };


  const onFinish = async() => {
    // console.log(fieldsValue);
    
      const hide = message.loading(intl.formatMessage({id:`${intlString}borrowing`}));
      // const value = await outStock({bookId: id, bookNumber: borrowNumber, returnDate: returnDate });
      const value = await borrowBook({ bookId:id, userId: user.UserId, planReturnDate: moment(returnDate).format("YYYY-MM-DD")});
        try {
          if( value.Status > 0)
          {
            hide();
            message.success({
                content: intl.formatMessage({id:`${intlString}borrowSuccessed`}),
                style: {
                marginTop: '5vh',
                }
            });
            // 成功刷新当前状态
            GoBackSearchBook();
          }
         
      } catch (error) {
          message.error(error.Message);
      }

  };

  const GoBackSearchBook = () => {
    history.push({
      pathname: '/SearchBooks',
     
    })
    };




  return (
    <>
    <Form name="time_related_controls" {...formItemLayout} onFinish={onFinish}>
      <Form.Item name="borrow-date-picker" label="Borrow Date">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
            label="Borrow Date"
            inputFormat="MM/dd/yyyy"
            value={borrowDate}
            onChange={handleBorrowChange}
            renderInput={(params) => <TextField {...params} />}
          />
      </LocalizationProvider>
     
      </Form.Item>
      <Form.Item name="return-date-picker" label="Return Date">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
              label="Return Date"
              inputFormat="MM/dd/yyyy"
              value={returnDate}
              onChange={handleReturnChange}
              renderInput={(params) => <TextField {...params} />}
            />
      </LocalizationProvider>
      </Form.Item>
      <Form.Item name="borrow-title" label="Title" >
      <TextField
          id="standard-required"
          label="Title"
          // disabled
          defaultValue={borrowTitle}
          // InputLabelProps={{
          //   shrink: true,
          // }}
          // variant="standard"
        />
  
      </Form.Item>
      <Form.Item name="borrow-title" label="Brief" >
      <TextareaAutosize
      disabled
      maxRows={4}
      aria-label="maximum height"
      placeholder="Maximum 4 rows"
      defaultValue={borrowBrief}
      style={{ width: 500 }}
    />
      </Form.Item>
      <Form.Item name="borrow-number" label="Borrow Number" >
      <TextField
          id="standard-required"
          label="Number*"
          type="number"
          defaultValue={borrowNumber}
          onChange={(e)=> {
            console.log('value',e.target.value)
            setBorrowNumber(e.target.value)
          }}
          // InputLabelProps={{
          //   shrink: true,
          // }}
          // variant="standard"
        />
      </Form.Item>
     {/*} <Form.Item name="range-picker" label="RangePicker" {...rangeConfig}>
        <RangePicker />
      </Form.Item>
      <Form.Item name="range-time-picker" label="RangePicker[showTime]" {...rangeConfig}>
        <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
      </Form.Item> */}

      <Form.Item
        wrapperCol={{
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        }}
      >
        <BootstrapButton  variant="contained" align="center" htmlType="submit">
                    Submit
                </BootstrapButton>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <BootstrapButton  variant="contained" align="center"  onClick={()=>GoBackSearchBook()}>
            Cancel
        </BootstrapButton>
      </Form.Item>
   
    </Form>
    </>
  )
}

export default BorrowBook
// export default () => <TimeRelatedForm />;




