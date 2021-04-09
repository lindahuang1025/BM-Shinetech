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
    public class BookBorrowAgent : BaseAgent<BookBorrow>
    {
        public async Task<List<BookBorrow>> GetListByUserId(int userId)
        {
            using (var context = new BMDbContext())
            {
                return await context.BookBorrow.Where(x => x.BorrowUserId == userId).ToListAsync();
            }
        }

        public async Task<List<BookBorrow>> Query(string key, int pageSize, int pageIndex, int userId)
        {
            var dataList = await QueryByParameter(key, userId);
            return dataList.Skip((pageIndex - 1) * pageSize).Take(pageSize).OrderByDescending(x => x.UpdateDate).ToList();
        }

        public async Task<int> QueryCount(string key, int userId)
        {
            var dataList = await QueryByParameter(key, userId);
            return dataList.Count();
        }

        public async Task<List<BookBorrow>> QueryByParameter(string key, int userId)
        {
            using (var context = new BMDbContext())
            {
                var dataList = await context.BookBorrow.Include(x => x.BookInfo.BookCategory).Where(x => x.BorrowUserId == userId).ToListAsync();
                return dataList.Where(x => x.BookInfo.Title.Contains(key) ||
                        x.BookInfo.Description.Contains(key) ||
                        x.BookInfo.BookCategory.CategoryName.Contains(key)).ToList();
            }
        }

        public async Task<BookBorrow> GetbyBookIdAndUserId(long bookId, long userId)
        {
            using (var context = new BMDbContext())
            {
                return await context.BookBorrow.FirstOrDefaultAsync(x => x.BookId == bookId && x.BorrowUserId == userId);
            }
        }

        public async Task<BookBorrow> GetByBookIdAndStatus(long bookId, int status)
        {
            using (var context = new BMDbContext())
            {
                return await context.BookBorrow.FirstOrDefaultAsync(x => x.BookId == bookId && x.Status == status);
            }
        }
    }
}
