namespace BM.DataModel.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class add_users_columns : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.SysUser", "Nickname", c => c.String(maxLength: 256));
            AddColumn("dbo.SysUser", "PhoneNumbe", c => c.Int(nullable: false));
            AddColumn("dbo.SysUser", "Website", c => c.String(maxLength: 256));
        }
        
        public override void Down()
        {
            DropColumn("dbo.SysUser", "Website");
            DropColumn("dbo.SysUser", "PhoneNumbe");
            DropColumn("dbo.SysUser", "Nickname");
        }
    }
}
