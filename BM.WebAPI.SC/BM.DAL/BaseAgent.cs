using BM.Common;
using BM.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity.Migrations;
using System.Data.Entity;

namespace BM.DAL
{
    public class BaseAgent<T> where T : BaseInfo
    {
        public async Task AddOrUpdate(T entity)
        {
            using (var context = new BMDbContext())
            {
                entity.UpdateBy = GlobalVariance.UserName ?? "";
                entity.UpdateDate = DateTime.Now;
                context.Set<T>().AddOrUpdate(entity);
                await context.SaveChangesAsync();
            }
        }

        public async Task DeleteById(long id)
        {
            using (var context = new BMDbContext())
            {
                var item = context.Set<T>().FirstOrDefault(x => x.Id == id);
                if (item != null)
                {
                    context.Set<T>().Remove(item);
                }
                await context.SaveChangesAsync();
            }
        }

        public async Task<T> GetById(long id)
        {
            using (var context = new BMDbContext())
            {
                return await context.Set<T>().FirstOrDefaultAsync(x => x.Id == id);
            }
        }
    }
}
