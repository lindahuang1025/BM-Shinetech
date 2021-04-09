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
    public class BookCategoryAgent: BaseAgent<BookCategory>
    {
        public async Task<List<BookCategory>> Query(string keyword, int pageSize, int pageIndex)
        {
            using (var context = new BMDbContext())
            {
                var dataList = context.BookCategory.AsQueryable();
                if (!string.IsNullOrEmpty(keyword))
                {
                    dataList = dataList.Where(x => x.CategoryName.Contains(keyword));
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
                var dataList = context.BookCategory.AsQueryable();
                if (!string.IsNullOrEmpty(keyword))
                {
                    dataList = dataList.Where(x => x.CategoryName.Contains(keyword));
                }
                return await dataList
                    .CountAsync();
            }
        }

        public async Task<List<BookCategory>> GetAll()
        {
            using (var context = new BMDbContext())
            {
                return await context.BookCategory.ToListAsync();
            }
        }

        public async Task<BookCategory> ExistSameName(long id, string categoryName)
        {
            using (var context = new BMDbContext())
            {
                return await context.BookCategory
                    .Where(x => (x.Id != id || id == 0) && x.CategoryName == categoryName)
                    .FirstOrDefaultAsync();
            }
        }
    }
}
