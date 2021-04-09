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
    public class BookCategoryBLL
    {
        private readonly BookCategoryAgent bookCategoryAgent;
        public BookCategoryBLL()
        {
            this.bookCategoryAgent = new BookCategoryAgent();
        }


        public async Task<Operate> AddOrUpdate(BookCategory entity)
        {
            var result = new Operate();
            try
            {
                var existName = await bookCategoryAgent.ExistSameName(entity.Id, entity.CategoryName);
                if (existName != null) {
                    result.Status = -1;
                    result.Message = "This name already exists";
                    return result;
                }
                await bookCategoryAgent.AddOrUpdate(entity);
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
                await bookCategoryAgent.DeleteById(id);
            }
            catch (Exception ex)
            {
                result.Status = -1;
                result.Message = ex.Message;
                Logger.WriteErrorLog(ex);
            }
            return result;
        }

        public async Task<ViewResult<BookCategory>> GetById(long id)
        {
            var result = new ViewResult<BookCategory>();
            try
            {
                result.Data = await bookCategoryAgent.GetById(id);
            }
            catch (Exception ex)
            {
                result.Status = -1;
                result.Message = ex.Message;
                Logger.WriteErrorLog(ex);
            }
            return result;
        }

        public async Task<MulitViewResult<BookCategory>> Query(string keyword, int pageSize, int pageIndex)
        {
            var result = new MulitViewResult<BookCategory>();
            try
            {
                result.Datas = await bookCategoryAgent.Query(keyword, pageSize, pageIndex);
                result.Total = await bookCategoryAgent.QueryCount(keyword);
            }
            catch (Exception ex)
            {
                result.Status = -1;
                result.Message = ex.Message;
                Logger.WriteErrorLog(ex);
            }
            return result;
        }

        public async Task<MulitViewResult<BookCategory>> GetAll()
        {
            var result = new MulitViewResult<BookCategory>();
            try
            {
                result.Datas = await bookCategoryAgent.GetAll();
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
