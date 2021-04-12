using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Text;
using System.Threading.Tasks;

namespace BM.DataModel
{
    public class BMDbContext : DbContext
    {
        public BMDbContext() : base("name=BMDbContext")
        {

        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }

        public DbSet<SysUser> SysUser { get; set; }
        public DbSet<BookCategory> BookCategory { get; set; }
        public DbSet<BookInfo> BookInfo { get; set; }
        public DbSet<BookBorrow> BookBorrow { get; set; }
        public DbSet<UserComments> UserComments { get; set; }
    }
}
