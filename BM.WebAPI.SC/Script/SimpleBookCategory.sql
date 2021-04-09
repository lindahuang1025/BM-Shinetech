--create bookcategory
INSERT INTO dbo.BookCategory
        ( CategoryName ,
          UpdateBy ,
          UpdateDate
        )
VALUES  ( N'企业/项目/时间管理类' , -- CategoryName - nvarchar(max)
          N'Admin' , -- CreateBy - nvarchar(256)
          GETDATE()  -- CreateDate - datetime
        )
GO

INSERT INTO dbo.BookCategory
        ( CategoryName ,
          UpdateBy ,
          UpdateDate
        )
VALUES  ( N'计算机/软件/网络工程开发类' , -- CategoryName - nvarchar(max)
          N'Admin' , -- CreateBy - nvarchar(256)
          GETDATE()  -- CreateDate - datetime
        )
GO

INSERT INTO dbo.BookCategory
        ( CategoryName ,
          UpdateBy ,
          UpdateDate
        )
VALUES  ( N'系统实践/设计类' , -- CategoryName - nvarchar(max)
          N'Admin' , -- CreateBy - nvarchar(256)
          GETDATE()  -- CreateDate - datetime
        )
GO

INSERT INTO dbo.BookCategory
        ( CategoryName ,
          UpdateBy ,
          UpdateDate
        )
VALUES  ( N'文学/生活类' , -- CategoryName - nvarchar(max)
          N'Admin' , -- CreateBy - nvarchar(256)
          GETDATE()  -- CreateDate - datetime
        )
GO



