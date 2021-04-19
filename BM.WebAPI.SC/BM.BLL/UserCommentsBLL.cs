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
    public class UserCommentsBLL
    {
        private readonly UserCommentsAgent userCommentsAgent;

        public UserCommentsBLL()
        {
            this.userCommentsAgent = new UserCommentsAgent();
        }

        public async Task<Operate> AddOrUpdate(UserComments model)
        {
            var result = new Operate();
            try
            {
                await AddOrUpdateUserComments(model);
            }
            catch (Exception ex)
            {
                result.Status = -1;
                result.Message = ex.Message;
                Logger.WriteErrorLog(ex);
            }
            return result;
        }

        private async Task AddOrUpdateUserComments(UserComments entity)
        {
            await userCommentsAgent.AddOrUpdate(entity);
        }

        public async Task<MulitViewResult<UserComments>> GetAll()
        {
            var result = new MulitViewResult<UserComments>();
            try
            {
                result.Datas = await userCommentsAgent.GetAll();
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
                await userCommentsAgent.DeleteById(id);
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
