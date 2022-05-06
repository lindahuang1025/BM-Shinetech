using BM.Common;
using BM.Common.Log;
using BM.DAL;
using BM.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace BM.BLL
{
    public class BookBorrowBLL
    {
        private readonly BookBorrowAgent bookBorrowAgent;
        private readonly BookInfoAgent bookInfoAgent;

        public BookBorrowBLL()
        {
            this.bookBorrowAgent = new BookBorrowAgent();
            this.bookInfoAgent = new BookInfoAgent();
        }


        public async Task<Operate> AddOrUpdate(BookBorrow entity)
        {
            var result = new Operate();
            try
            {
                await bookBorrowAgent.AddOrUpdate(entity);
            }
            catch (Exception ex)
            {
                result.Status = -1;
                result.Message = ex.Message;
                Logger.WriteErrorLog(ex);
            }
            return result;
        }

        public async Task<Operate> DeleteById(long id)
        {
            var result = new Operate();
            try
            {
                await bookBorrowAgent.DeleteById(id);
            }
            catch (Exception ex)
            {
                result.Status = -1;
                result.Message = ex.Message;
                Logger.WriteErrorLog(ex);
            }
            return result;
        }

        public async Task<ViewResult<BookBorrow>> GetById(long id)
        {
            var result = new ViewResult<BookBorrow>();
            try
            {
                result.Data = await bookBorrowAgent.GetById(id);
            }
            catch (Exception ex)
            {
                result.Status = -1;
                result.Message = ex.Message;
                Logger.WriteErrorLog(ex);
            }
            return result;
        }

        public async Task<MulitViewResult<BookBorrow>> Query(string keyword, int pageSize, int pageIndex, int userId)
        {
            var result = new MulitViewResult<BookBorrow>();
            try
            {
                result.Datas = await bookBorrowAgent.Query(keyword, pageSize, pageIndex, userId);
                result.Total = await bookBorrowAgent.QueryCount(keyword, userId);
            }
            catch (Exception ex)
            {
                result.Status = -1;
                result.Message = ex.Message;
                Logger.WriteErrorLog(ex);
            }
            return result;
        }

        public async Task<Operate> BorrowBook(long bookId, long userId, DateTime planReturnDate)
        {
            var result = new Operate();
            try
            {
                //if this book has been borrowed
                var bookEntity = await bookInfoAgent.GetById(bookId);
                if (bookEntity.Status == (int)Enums.BookStatus.Borrowed)
                {
                    result.Status = -1;
                    result.Message = "This book has been borrowed";
                    return result;
                }

                using (var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
                {
                    //update status of book info
                    bookEntity.Status = (int)Enums.BookStatus.Borrowed;
                    await bookInfoAgent.AddOrUpdate(bookEntity);

                    /* book borrow
                     1. if current user has been borrowed this book, only change status and book borrow date
                     2. if current user is first to borrow this book, create new data
                     */
                    var now = DateTime.Now;
                    var bookBorrowEntity = await bookBorrowAgent.GetbyBookIdAndUserId(bookId, userId);
                    if (bookBorrowEntity != null)
                    {
                        bookBorrowEntity.Status = (int)Enums.BookStatus.Borrowed;
                        bookBorrowEntity.BorrowDate = now;
                        bookBorrowEntity.PlanReturnDate = planReturnDate;
                        await bookBorrowAgent.AddOrUpdate(bookBorrowEntity);
                    }
                    else
                    {
                        var bookBorrowModel = new BookBorrow
                        {
                            BookId = bookId,
                            BorrowUserId = userId,
                            Status = (int)Enums.BookStatus.Borrowed,
                            BorrowDate = now,
                            PlanReturnDate = planReturnDate
                        };
                        await bookBorrowAgent.AddOrUpdate(bookBorrowModel);
                    }
                    scope.Complete();
                }
                result.Status = 1;
                result.Message = "Sucessful.";
            }
            catch (Exception ex)
            {
                result.Status = -1;
                result.Message = ex.Message;
                Logger.WriteErrorLog(ex);
            }
            return result;
        }

        public async Task<Operate> ReturnBook(long bookId, long userId)
        {
            var result = new Operate();
            try
            {
                //if this book has been returned
                var bookEntity = await bookInfoAgent.GetById(bookId);
                if (bookEntity.Status == (int)Enums.BookStatus.Normal)
                {
                    result.Status = -1;
                    result.Message = "This book has been returned";
                    return result;
                }

                using (var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
                {
                    //update status of book info
                    bookEntity.Status = (int)Enums.BookStatus.Normal;
                    await bookInfoAgent.AddOrUpdate(bookEntity);

                    //update status for bookborrow
                    var bookBorrowEntity = await bookBorrowAgent.GetbyBookIdAndUserId(bookId, userId);
                    bookBorrowEntity.Status = (int)Enums.BookStatus.Returned;
                    bookBorrowEntity.ReturnDate = DateTime.Now;
                    await bookBorrowAgent.AddOrUpdate(bookBorrowEntity);

                    scope.Complete();
                }
            }
            catch (Exception ex)
            {
                result.Status = -1;
                result.Message = ex.Message;
                Logger.WriteErrorLog(ex);
            }
            return result;
        }
    }
}
