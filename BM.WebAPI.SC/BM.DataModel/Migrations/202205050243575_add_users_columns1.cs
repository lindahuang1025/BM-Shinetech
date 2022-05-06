namespace BM.DataModel.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class add_users_columns1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.SysUser", "PhoneNumber", c => c.Int(nullable: false));
            DropColumn("dbo.SysUser", "PhoneNumbe");
        }
        
        public override void Down()
        {
            AddColumn("dbo.SysUser", "PhoneNumbe", c => c.Int(nullable: false));
            DropColumn("dbo.SysUser", "PhoneNumber");
        }
    }
}
