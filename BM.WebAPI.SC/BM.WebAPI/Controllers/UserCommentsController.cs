using BM.BLL;
using BM.DataModel;
using BM.WebAPI.Base;
using Microsoft.Owin.Security;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;

namespace BM.WebAPI.Controllers
{
    [Authorize]
    [RoutePrefix("api/userComments")]
    public class UserCommentsController : ApiController
    {
        private readonly UserCommentsBLL userCommentsBLL;
        public UserCommentsController()
        {
            this.userCommentsBLL = new UserCommentsBLL();
        }

        [HttpGet]
        [Route("getAll")]
        public async Task<MulitViewResult<UserComments>> GetAll()
        {
            return await userCommentsBLL.GetAll();
        }

        [HttpPost]
        [Route("addOrUpdate")]
        public async Task<Operate> AddOrUpdate(UserComments model)
        {
            return await userCommentsBLL.AddOrUpdate(model);
        }

        [HttpPost]
        [Route("deleteById/{id}")]
        public async Task<Operate> DeleteById([FromUri] long id)
        {
            return await userCommentsBLL.DeleteById(id);
        }
    }
}