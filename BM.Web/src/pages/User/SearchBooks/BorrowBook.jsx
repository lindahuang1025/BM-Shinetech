import MyBook from '../../../components/BorrowBooks/BorrowBook'



const BorrowBook = (props) => {
  const bookId = props.history.location.state?.book.Id || 0;
  const bookTitle = props.history.location.state?.book.Title || '';
  const bookBrief = props.history.location.state?.book.Description || '';
  return (
    <div>
  {/* <div>{bookId}</div>
  <div>{bookTitle}</div>
  <div>{bookBrief}</div> */}
  
    <MyBook id={bookId} title={bookTitle} brief={bookBrief} />
   
    </div>
  )
}

export default BorrowBook
