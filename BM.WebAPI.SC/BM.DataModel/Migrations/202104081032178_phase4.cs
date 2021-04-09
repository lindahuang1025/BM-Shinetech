namespace BM.DataModel.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class phase4 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BookBorrow",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        BookId = c.Long(nullable: false),
                        BorrowUserId = c.Long(nullable: false),
                        Status = c.Int(nullable: false),
                        PlanReturnDate = c.DateTime(),
                        BorrowDate = c.DateTime(),
                        ReturnDate = c.DateTime(),
                        UpdateBy = c.String(maxLength: 256),
                        UpdateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.BookInfo", t => t.BookId, cascadeDelete: true)
                .Index(t => t.BookId);
            
            CreateTable(
                "dbo.BookInfo",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Title = c.String(),
                        Author = c.String(),
                        Description = c.String(),
                        CategoryId = c.Long(nullable: false),
                        Status = c.Int(),
                        ImageUrl = c.String(),
                        UpdateBy = c.String(maxLength: 256),
                        UpdateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.BookCategory", t => t.CategoryId, cascadeDelete: true)
                .Index(t => t.CategoryId);
            
            CreateTable(
                "dbo.BookCategory",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        CategoryName = c.String(),
                        UpdateBy = c.String(maxLength: 256),
                        UpdateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.SysUser",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        UserName = c.String(nullable: false, maxLength: 256),
                        UserPwd = c.String(nullable: false, maxLength: 256),
                        UserRole = c.Long(nullable: false),
                        UpdateBy = c.String(maxLength: 256),
                        UpdateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.BookBorrow", "BookId", "dbo.BookInfo");
            DropForeignKey("dbo.BookInfo", "CategoryId", "dbo.BookCategory");
            DropIndex("dbo.BookInfo", new[] { "CategoryId" });
            DropIndex("dbo.BookBorrow", new[] { "BookId" });
            DropTable("dbo.SysUser");
            DropTable("dbo.BookCategory");
            DropTable("dbo.BookInfo");
            DropTable("dbo.BookBorrow");
        }
    }
}
