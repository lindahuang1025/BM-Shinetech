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
    [RoutePrefix("api/bookBorrow")]
    public class BookBorrowController : ApiController
    {
        private readonly BookBorrowBLL bookBorrowBLL;
        public BookBorrowController()
        {
            this.bookBorrowBLL = new BookBorrowBLL();
        }

        [HttpPost]
        [Route("addOrUpdate")]
        public async Task<Operate> AddOrUpdate(BookBorrow model)
        {
            return await bookBorrowBLL.AddOrUpdate(model);
        }

        [HttpPost]
        [Route("deleteById")]
        public async Task<Operate> DeleteById(long id)
        {
            return await bookBorrowBLL.DeleteById(id);
        }

        [HttpGet]
        [Route("getById/{id}")]
        public async Task<ViewResult<BookBorrow>> GetById(long id)
        {
            return await bookBorrowBLL.GetById(id);
        }

        [HttpPost]
        [Route("query")]
        public async Task<MulitViewResult<BookBorrow>> Query(JObject paramter)
        {
            var keyword = paramter["keyword"].ToObject<string>();
            var pageSize = paramter["pageSize"].ToObject<int>();
            var pageIndex = paramter["pageIndex"].ToObject<int>();
            var userId = paramter["userId"].ToObject<int>();
            return await bookBorrowBLL.Query(keyword, pageSize, pageIndex, userId);
        }

        [HttpPost]
        [Route("borrowBook")]
        public async Task<Operate> BorrowBook(JObject paramter)
        {
            var bookId = paramter["bookId"].ToObject<long>();
            var userId = paramter["userId"].ToObject<long>();
            var planReturnDate = paramter["planReturnDate"].ToObject<DateTime>();
            return await bookBorrowBLL.BorrowBook(bookId, userId, planReturnDate);
        }

        [HttpPost]
        [Route("returnBook")]
        public async Task<Operate> ReturnBook(JObject paramter)
        {
            var bookId = paramter["bookId"].ToObject<long>();
            var userId = paramter["userId"].ToObject<long>();
            return await bookBorrowBLL.ReturnBook(bookId, userId);
        }

        [HttpPost]
        [Route("outStock")]
        public async Task<Operate> OutStock(JObject paramter)
        {
            var bookId = paramter["bookId"].ToObject<long>();
            var userId = paramter["userId"].ToObject<long>();
            var planReturnDate = paramter["planReturnDate"].ToObject<DateTime>();
            return await bookBorrowBLL.BorrowBook(bookId, userId, planReturnDate);
        }
    }
}