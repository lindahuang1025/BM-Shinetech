using BM.Common;
using BM.DataModel;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BM.DAL
{
    public class UserCommentsAgent:BaseAgent<UserComments>
    {
        public async Task<List<UserComments>> GetAll()
        {
            using (var context = new BMDbContext())
            {
                return await context.UserComments.OrderByDescending(x=>x.UpdateDate).ToListAsync();
            }
        }
    }
}
