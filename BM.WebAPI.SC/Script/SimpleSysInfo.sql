--add role
IF NOT EXISTS(SELECT * FROM SysRole WHERE RoleName='Admin')
BEGIN
	INSERT INTO dbo.SysRole
        ( RoleName ,
          UpdateBy ,
          UpdateDate
        )
	SELECT 'Admin' AS RoleName,
		N'Admin' AS UpdateBy,
		GETDATE() AS UpdateDate
END
GO

IF NOT EXISTS(SELECT * FROM SysRole WHERE RoleName='User')
BEGIN
	INSERT INTO dbo.SysRole
        ( RoleName ,
          UpdateBy ,
          UpdateDate
        )
	SELECT 'User' AS RoleName,
		N'Admin' AS UpdateBy,
		GETDATE() AS UpdateDate
END
GO
