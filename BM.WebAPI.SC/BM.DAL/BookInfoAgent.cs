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
    public class BookInfoAgent : BaseAgent<BookInfo>
    {
        public async Task<List<BookInfo>> Query(string key, int pageSize, int pageIndex)
        {
            var dataList = await QueryByParameter(key);
            return dataList.Skip((pageIndex - 1) * pageSize).Take(pageSize).OrderByDescending(x => x.UpdateDate).ToList();
        }

        public async Task<int> QueryCount(string key)
        {
            var dataList = await QueryByParameter(key);
            return dataList.Count();
        }

        public async Task<List<BookInfo>> QueryByParameter(string key)
        {
            using (var context = new BMDbContext())
            {
                return await context.BookInfo.Include(x => x.BookCategory).Where(x => x.Title.Contains(key) ||
                          x.Description.Contains(key) ||
                          x.BookCategory.CategoryName.Contains(key)).ToListAsync();
            }
        }

        public async Task<BookInfo> GetIncludeById(long id)
        {
            using (var context = new BMDbContext())
            {
                return await context.BookInfo.Include(x => x.BookCategory)
                    .FirstOrDefaultAsync(x => x.Id == id);
            }
        }
        public async Task<int> ImportByExcel(BookInfo entity)
        {
            using (var context = new BMDbContext())
            {
                entity.UpdateBy = GlobalVariance.UserName ?? "";
                entity.UpdateDate = DateTime.Now;
                var count = 0;
                var hasExist = await context.BookInfo.FirstOrDefaultAsync(x => x.Title == entity.Title);

                if (hasExist == null)
                {
                    count += 1;
                    context.Set<BookInfo>().AddOrUpdate(entity);
                    await context.SaveChangesAsync();
                }

                return count;
            }
        }
    }
}
