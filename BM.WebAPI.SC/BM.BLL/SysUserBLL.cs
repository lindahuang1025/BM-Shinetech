using BM.Common;
using BM.Common.Log;
using BM.DAL;
using BM.DataModel;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace BM.BLL
{
    public class SysUserBLL
    {
        private readonly string showRandomCode = ConfigurationManager.AppSettings["showRandomCode"];

        private readonly SysUserAgent sysUserAgent;

        public SysUserBLL()
        {
            this.sysUserAgent = new SysUserAgent();
        }


        public async Task<Operate> AddOrUpdate(SysUser model)
        {
            var result = new Operate();
            try
            {
                var user = await sysUserAgent.GetByUserNameAndId(model.UserName, model.Id);
                if (user != null)
                {
                    result.Status = -1;
                    result.Message = "This user name already exists";
                    return result;
                }

                await AddOrUpdateUser(model);
            }
            catch (Exception ex)
            {
                result.Status = -1;
                result.Message = ex.Message;
                Logger.WriteErrorLog(ex);
            }
            return result;
        }

        private async Task AddOrUpdateUser(SysUser entity)
        {
            await sysUserAgent.AddOrUpdate(entity);
        }

        public async Task<Operate> DeleteById(long id)
        {
            var result = new Operate();
            try
            {
                await sysUserAgent.DeleteById(id);
            }
            catch (Exception ex)
            {
                result.Status = -1;
                result.Message = ex.Message;
                Logger.WriteErrorLog(ex);
            }
            return result;
        }

        public async Task<ViewResult<SysUser>> GetById(long id)
        {
            var result = new ViewResult<SysUser>();
            try
            {
                result.Data = await sysUserAgent.GetById(id);
            }
            catch (Exception ex)
            {
                result.Status = -1;
                result.Message = ex.Message;
                Logger.WriteErrorLog(ex);
            }
            return result;
        }

        public ViewResult<VerificationCode> RandomCode()
        {
            var result = new ViewResult<VerificationCode>();
            try
            {
                var model = new VerificationCode();
                var code = Convert.ToBoolean(showRandomCode) ? RandomCodeHelper.CreateRandomCode(4) : "1234";
                model.ValidaCode = PasswordHelper.GetMd5Hash(code.ToLower());
                model.ValidateImage = RandomCodeHelper.CreateValidateGraphic(code);
                result.Data = model;
            }
            catch (Exception ex)
            {
                result.Status = -1;
                result.Message = ex.Message;
                Logger.WriteErrorLog(ex);
            }
            return result;
        }

        public async Task<ViewResult<SysUser>> Login(string userName, string password)
        {
            var result = new ViewResult<SysUser>();
            try
            {
                string beaconLoginUrl = ConfigurationManager.AppSettings["beaconLoginUrl"];
                string adminUsers = ConfigurationManager.AppSettings["adminUsers"];
                HttpClient client = new HttpClient();
                var values = new Dictionary<string, string>
                {
                    { "DomainUserName", userName },
                    { "Password", password }
                };

                var content = new FormUrlEncodedContent(values);

                var response = await client.PostAsync(beaconLoginUrl, content);

                var responseString = await response.Content.ReadAsStringAsync();
                if (responseString.Contains("Login failed"))
                {
                    result.Status = -1;
                    result.Message = "µÇÂ¼Ê§°Ü, ÓÃ»§Ãû»òÃÜÂë´íÎó";
                    return result;
                }

                var userRole = adminUsers.Split(',').Contains(userName) ? (int)Enums.UserRole.Admin : (int)Enums.UserRole.User;

                //save data to dataBase
                var user = await sysUserAgent.GetByUserName(userName);
                if (user == null)
                {
                    var entity = new SysUser()
                    {
                        UserName = userName,
                        UserPwd = password,
                        UserRole = userRole
                    };
                    await sysUserAgent.AddOrUpdate(entity);
                    result.Data = entity;
                }
                else
                {
                    if (user.UserRole != userRole)
                    {
                        user.UserRole = userRole;
                        await sysUserAgent.AddOrUpdate(user);
                    }
                    result.Data = user;
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

        public async Task<Operate> ChangePassword(long userId, string newPassword)
        {
            var result = new Operate();
            try
            {
                var user = await sysUserAgent.GetById(userId);
                user.UserPwd = newPassword;
                await sysUserAgent.AddOrUpdate(user);
            }
            catch (Exception ex)
            {
                result.Status = -1;
                result.Message = ex.Message;
                Logger.WriteErrorLog(ex);
            }
            return result;
        }

        public async Task<MulitViewResult<SysUser>> Query(string keyword, int pageSize, int pageIndex)
        {
            var result = new MulitViewResult<SysUser>();
            try
            {
                var datalist = await sysUserAgent.Query(keyword, pageSize, pageIndex);
                result.Datas = datalist.ToList();
                result.Total = await sysUserAgent.QueryCount(keyword);
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
