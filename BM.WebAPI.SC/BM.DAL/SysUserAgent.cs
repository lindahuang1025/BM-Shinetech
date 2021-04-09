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
    public class SysUserAgent:BaseAgent<SysUser>
    {
        public async Task<SysUser> GetByUserName(string userName)
        {
            using (var context = new BMDbContext())
            {
                return await context.SysUser.FirstOrDefaultAsync(x => x.UserName.ToLower() == userName.ToLower());
            }
        }

        public async Task<List<SysUser>> Query(string keyword, int pageSize, int pageIndex)
        {
            using (var context = new BMDbContext())
            {
                var dataList = context.SysUser.AsQueryable();
                if (!string.IsNullOrEmpty(keyword))
                {
                    dataList = dataList.Where(x => x.UserName.Contains(keyword));
                }
                return await dataList
                    .OrderByDescending(x => x.UpdateDate)
                    .Skip((pageIndex - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();
            }
        }

        public async Task<int> QueryCount(string keyword)
        {
            using (var context = new BMDbContext())
            {
                var dataList = context.SysUser.AsQueryable();
                if (!string.IsNullOrEmpty(keyword))
                {
                    dataList = dataList.Where(x => x.UserName.Contains(keyword));
                }
                return await dataList
                    .CountAsync();
            }
        }

        public async Task<SysUser> GetByUserNameAndId(string userName, long id)
        {
            using (var context = new BMDbContext())
            {
                return await context.SysUser
                    .FirstOrDefaultAsync(x => x.UserName.ToLower() == userName.ToLower() && (id == 0 || x.Id != id));
            }
        }
    }
}
