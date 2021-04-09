using BM.Common;
using BM.Common.Log;
using BM.DAL;
using BM.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BM.BLL
{
    public class BookInfoBLL
    {
        private readonly BookInfoAgent bookInfoAgent;
        private readonly BookBorrowAgent bookBorrowAgent;
        private readonly SysUserAgent sysUserAgent;

        public BookInfoBLL()
        {
            this.bookInfoAgent = new BookInfoAgent();
            this.bookBorrowAgent = new BookBorrowAgent();
            this.sysUserAgent = new SysUserAgent();
        }


        public async Task<Operate> AddOrUpdate(BookInfo entity)
        {
            var result = new Operate();
            try
            {
                await bookInfoAgent.AddOrUpdate(entity);
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
                await bookInfoAgent.DeleteById(id);
            }
            catch (Exception ex)
            {
                result.Status = -1;
                result.Message = ex.Message;
                Logger.WriteErrorLog(ex);
            }
            return result;
        }

        public async Task<ViewResult<BookInfo>> GetById(long id)
        {
            var result = new ViewResult<BookInfo>();
            try
            {
                var data = await bookInfoAgent.GetIncludeById(id);
                if (data.Status == (int)Enums.BookStatus.Borrowed)
                {
                    var borrow = await bookBorrowAgent.GetByBookIdAndStatus(id, data.Status ?? 0);
                    if (borrow != null)
                    {
                        var user = await sysUserAgent.GetById(borrow.BorrowUserId);
                        data.BorrowedBy = user.UserName;
                        data.BorrowDate = borrow.BorrowDate;
                        data.PlanReturnDate = borrow.PlanReturnDate;
                    }
                }
                result.Data = data;
            }
            catch (Exception ex)
            {
                result.Status = -1;
                result.Message = ex.Message;
                Logger.WriteErrorLog(ex);
            }
            return result;
        }

        public async Task<MulitViewResult<BookInfo>> Query(string keyword, int pageSize, int pageIndex)
        {
            var result = new MulitViewResult<BookInfo>();
            try
            {
                result.Datas = await bookInfoAgent.Query(keyword, pageSize, pageIndex);
                result.Total = await bookInfoAgent.QueryCount(keyword);
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
