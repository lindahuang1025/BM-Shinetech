--create bookcategory
INSERT INTO dbo.BookCategory
        ( CategoryName ,
          UpdateBy ,
          UpdateDate
        )
VALUES  ( N'��ҵ/��Ŀ/ʱ�������' , -- CategoryName - nvarchar(max)
          N'Admin' , -- CreateBy - nvarchar(256)
          GETDATE()  -- CreateDate - datetime
        )
GO

INSERT INTO dbo.BookCategory
        ( CategoryName ,
          UpdateBy ,
          UpdateDate
        )
VALUES  ( N'�����/���/���繤�̿�����' , -- CategoryName - nvarchar(max)
          N'Admin' , -- CreateBy - nvarchar(256)
          GETDATE()  -- CreateDate - datetime
        )
GO

INSERT INTO dbo.BookCategory
        ( CategoryName ,
          UpdateBy ,
          UpdateDate
        )
VALUES  ( N'ϵͳʵ��/�����' , -- CategoryName - nvarchar(max)
          N'Admin' , -- CreateBy - nvarchar(256)
          GETDATE()  -- CreateDate - datetime
        )
GO

INSERT INTO dbo.BookCategory
        ( CategoryName ,
          UpdateBy ,
          UpdateDate
        )
VALUES  ( N'��ѧ/������' , -- CategoryName - nvarchar(max)
          N'Admin' , -- CreateBy - nvarchar(256)
          GETDATE()  -- CreateDate - datetime
        )
GO



