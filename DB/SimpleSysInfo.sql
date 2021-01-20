--add permission user
IF NOT EXISTS(SELECT * FROM SysPermission WHERE PermissionName='User')
BEGIN
	INSERT INTO dbo.SysPermission
        ( PermissionName ,
          ParentId ,
          CreateBy ,
          CreateDate
        )
	SELECT 'User' AS PermissionName, 
		0 AS ParentId,
		N'Admin' AS CreateBy,
		GETDATE() AS CreateDate


	INSERT INTO dbo.SysPermission
        ( PermissionName ,
          ParentId ,
          CreateBy ,
          CreateDate
        )
	SELECT 'View Listing' AS PermissionName, 
		Id AS ParentId,
		N'Admin' AS CreateBy,
		GETDATE() AS CreateDate
		FROM SysPermission WHERE PermissionName='User'

	INSERT INTO dbo.SysPermission
        ( PermissionName ,
          ParentId ,
          CreateBy ,
          CreateDate
        )
	SELECT 'Add/Edit' AS PermissionName, 
		Id AS ParentId,
		N'Admin' AS CreateBy,
		GETDATE() AS CreateDate
		FROM SysPermission WHERE PermissionName='User'

	INSERT INTO dbo.SysPermission
        ( PermissionName ,
          ParentId ,
          CreateBy ,
          CreateDate
        )
	SELECT 'Delete' AS PermissionName, 
		Id AS ParentId,
		N'Admin' AS CreateBy,
		GETDATE() AS CreateDate
		FROM SysPermission WHERE PermissionName='User'
END
GO

--add permission role
IF NOT EXISTS(SELECT * FROM SysPermission WHERE PermissionName='Role')
BEGIN
	INSERT INTO dbo.SysPermission
        ( PermissionName ,
          ParentId ,
          CreateBy ,
          CreateDate
        )
	SELECT 'Role' AS PermissionName, 
		0 AS ParentId,
		N'Admin' AS CreateBy,
		GETDATE() AS CreateDate


	INSERT INTO dbo.SysPermission
        ( PermissionName ,
          ParentId ,
          CreateBy ,
          CreateDate
        )
	SELECT 'View Listing' AS PermissionName, 
		Id AS ParentId,
		N'Admin' AS CreateBy,
		GETDATE() AS CreateDate
		FROM SysPermission WHERE PermissionName='Role'

	INSERT INTO dbo.SysPermission
        ( PermissionName ,
          ParentId ,
          CreateBy ,
          CreateDate
        )
	SELECT 'Add/Edit' AS PermissionName, 
		Id AS ParentId,
		N'Admin' AS CreateBy,
		GETDATE() AS CreateDate
		FROM SysPermission WHERE PermissionName='Role'

	INSERT INTO dbo.SysPermission
        ( PermissionName ,
          ParentId ,
          CreateBy ,
          CreateDate
        )
	SELECT 'Delete' AS PermissionName, 
		Id AS ParentId,
		N'Admin' AS CreateBy,
		GETDATE() AS CreateDate
		FROM SysPermission WHERE PermissionName='Role'
END
GO

--add role
IF NOT EXISTS(SELECT * FROM SysRole WHERE RoleName='Management')
BEGIN
	INSERT INTO dbo.SysRole
        ( RoleName ,
          CreateBy ,
          CreateDate
        )
	SELECT 'Management' AS RoleName,
		N'Admin' AS CreateBy,
		GETDATE() AS CreateDate
END
GO

--add role permission
IF NOT EXISTS(SELECT * FROM SysRolePermission)
BEGIN
	INSERT INTO SysRolePermission(
	RoleId,
	PermissionId,
	CreateBy,
	CreateDate
	)
    SELECT SysRole.Id AS RoleId,
	SysPermission.Id AS PermissionId,
	N'Admin' AS CreateBy,
	GETDATE() AS CreateDate
	FROM SysRole, dbo.SysPermission WHERE RoleName='Management' AND ParentId!=0
END
GO

--add user
IF NOT EXISTS(SELECT * FROM SysUser WHERE UserName='Admin')
BEGIN
	INSERT INTO dbo.SysUser
        ( UserName ,
          UserPwd ,
          RoleId ,
          CreateBy ,
          CreateDate
        )
	SELECT 'Admin' AS UserName, 
			'123456' AS UserPwd,
			Id AS RoleId,
			N'Admin' AS CreateBy,
			GETDATE() AS CreateDate
	FROM dbo.SysRole WHERE RoleName='Management'
END
GO


