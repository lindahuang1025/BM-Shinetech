namespace BM.DataModel.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addUserComments : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.UserComments",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        UserName = c.String(nullable: false, maxLength: 256),
                        Comment = c.String(nullable: false),
                        UpdateBy = c.String(maxLength: 256),
                        UpdateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.UserComments");
        }
    }
}
