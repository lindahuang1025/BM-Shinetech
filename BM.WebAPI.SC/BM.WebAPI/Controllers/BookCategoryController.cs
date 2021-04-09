using BM.BLL;
using BM.DataModel;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace BM.WebAPI.Controllers
{
    [Authorize]
    [RoutePrefix("api/bookCategory")]
    public class BookCategoryController : ApiController
    {
        private readonly BookCategoryBLL bookCategoryBLL;
        public BookCategoryController()
        {
            this.bookCategoryBLL = new BookCategoryBLL();
        }

        [HttpPost]
        [Route("addOrUpdate")]
        public async Task<Operate> AddOrUpdate(BookCategory entity)
        {
            return await bookCategoryBLL.AddOrUpdate(entity);
        }

        [HttpPost]
        [Route("deleteById/{id}")]
        public async Task<Operate> DeleteById([FromUri]long id)
        {
            return await bookCategoryBLL.DeleteById(id);
        }

        [HttpGet]
        [Route("getById/{id}")]
        public async Task<ViewResult<BookCategory>> GetById(long id)
        {
            return await bookCategoryBLL.GetById(id);
        }

		[HttpPost]
        [Route("query")]
        public async Task<MulitViewResult<BookCategory>> Query(JObject paramter)
        {
            var keyword = paramter["keyword"].ToObject<string>();
            var pageSize = paramter["pageSize"].ToObject<int>();
            var pageIndex = paramter["pageIndex"].ToObject<int>();
            return await bookCategoryBLL.Query(keyword, pageSize, pageIndex);
        }

        [HttpGet]
        [Route("getAll")]
        public async Task<MulitViewResult<BookCategory>> GetAll()
        {
            return await bookCategoryBLL.GetAll();
        }
    }
}