using BM.BLL;
using BM.DataModel;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace BM.WebAPI.Controllers
{
    [Authorize]
    [RoutePrefix("api/bookInfo")]
    public class BookInfoController : ApiController
    {
        private readonly BookInfoBLL bookInfoBLL;
        public BookInfoController()
        {
            this.bookInfoBLL = new BookInfoBLL();
        }

        [HttpPost]
        [Route("uploadFile")]
        public ViewResult<string> UploadFile()
        {
            var result = new ViewResult<string>();
            try
            {
                var httpRequest = HttpContext.Current.Request;
                var postFile = httpRequest.Files[0];

                var bookFilePath = ConfigurationManager.AppSettings["bookFilePath"];
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(postFile.FileName);
                var filePath = Path.Combine(bookFilePath, fileName);

                postFile.SaveAs(filePath);
                result.Data = fileName;
            }
            catch (Exception ex)
            {
                result.Status = -1;
                result.Message = ex.Message;
            }
            return result;
        }


        [HttpPost]
        [Route("addOrUpdate")]
        public async Task<Operate> AddOrUpdate(BookInfo model)
        {
            return await bookInfoBLL.AddOrUpdate(model);
        }

        [HttpPost]
        [Route("deleteById/{id}")]
        public async Task<Operate> DeleteById([FromUri]long id)
        {
            return await bookInfoBLL.DeleteById(id);
        }

        [HttpGet]
        [Route("getById/{id}")]
        public async Task<ViewResult<BookInfo>> GetById(long id)
        {
            return await bookInfoBLL.GetById(id);
        }

        [HttpPost]
        [Route("query")]
        public async Task<MulitViewResult<BookInfo>> Query(JObject paramter)
        {
            var keyword = paramter["keyword"].ToObject<string>();
            var pageSize = paramter["pageSize"].ToObject<int>();
            var pageIndex = paramter["pageIndex"].ToObject<int>();
            return await bookInfoBLL.Query(keyword, pageSize, pageIndex);
        }
    }
}