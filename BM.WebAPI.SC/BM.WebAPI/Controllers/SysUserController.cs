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
    [RoutePrefix("api/sysUser")]
    public class SysUserController : ApiController
    {
        private readonly SysUserBLL sysUserBLL;
        public SysUserController()
        {
            this.sysUserBLL = new SysUserBLL();
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("addOrUpdate")]
        //[PageRightFilterAttribute("User Add/Edit")]
        public async Task<Operate> AddOrUpdate(SysUser model)
        {
            return await sysUserBLL.AddOrUpdate(model);
        }

        [HttpPost]
        [Route("deleteById/{id}")]
        public async Task<Operate> DeleteById([FromUri]long id)
        {
            return await sysUserBLL.DeleteById(id);
        }

        [HttpGet]
        [Route("getById/{id}")]
        public async Task<ViewResult<SysUser>> GetById(long id)
        {
            return await sysUserBLL.GetById(id);
        }


        [HttpGet]
        [AllowAnonymous]
        [Route("randomCode")]
        public ViewResult<VerificationCode> RandomCode()
        {
            return sysUserBLL.RandomCode();
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("login")]
        public async Task<ViewResult<JObject>> Login(JObject paramter)
        {
            var result = new ViewResult<JObject>();
            var userName = paramter["userName"].ToObject<string>();
            var password = paramter["password"].ToObject<string>();

            var loginRes = await sysUserBLL.Login(userName, password);
            //login fail
            if (loginRes.Status < 0)
            {
                result.Status = loginRes.Status;
                result.Message = loginRes.Message;
                return result;
            }

            //login success
            var userInfo = loginRes.Data;
            var roleName = Enum.GetName(typeof(Enums.UserRole), userInfo.UserRole);
            var identity = new ClaimsIdentity(Startup.OAuthBearerOptions.AuthenticationType, userInfo.UserName, roleName);
            var ticket = new AuthenticationTicket(identity, CreateProperties(userInfo.UserName, roleName));
            ticket.Properties.IssuedUtc = DateTime.UtcNow;
            ticket.Properties.ExpiresUtc = DateTime.UtcNow.Add(TimeSpan.FromDays(1));
            var data = new JObject()
            {
                ["UserId"] = userInfo.Id,
                ["UserName"] = userInfo.UserName,
                ["UserRole"] = userInfo.UserRole,
                ["RoleName"] = roleName,
                ["PhoneNumber"] = userInfo.PhoneNumber,
                ["Website"] = userInfo.Website,
                ["Nickname"] = userInfo.Nickname,
                ["AccessToken"] = Startup.OAuthBearerOptions.AccessTokenFormat.Protect(ticket),
            };
            result.Data = data;

            return result;
        }

        private static AuthenticationProperties CreateProperties(string userName, string userRole)
        {
            var data = new Dictionary<string, string>
                {
                    { "userName", userName},
                    { "userRole", userRole }
                };
            return new AuthenticationProperties(data);
        }

        [HttpPost]
        [Route("changePassword")]
        public async Task<Operate> ChangePassword(JObject paramter)
        {
            var userId = paramter["userId"].ToObject<long>();
            var newPassword = paramter["newPassword"].ToObject<string>();
            return await sysUserBLL.ChangePassword(userId, newPassword);
        }

        [HttpPost]
        [Route("query")]
        public async Task<MulitViewResult<SysUser>> Query(JObject paramter)
        {
            var keyword = paramter["keyword"].ToObject<string>();
            var pageSize = paramter["pageSize"].ToObject<int>();
            var pageIndex = paramter["pageIndex"].ToObject<int>();
            return await sysUserBLL.Query(keyword, pageSize, pageIndex);
        }
    }
}