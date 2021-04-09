--create bookinfo
INSERT INTO dbo.BookInfo
        ( Title ,
          Description ,
          CategoryId ,
          UpdateBy ,
          UpdateDate
        )
SELECT '阿米巴经营' AS Title,
		'作者：稻盛合夫

出版社：中国大百科全书出版社

内容简介 · · · · · ·
稻盛和夫，被称为日本的“经营之圣、人生之师”，作为日本的企业家兼哲学家第一人，在企业经营和人生理念方面均有独到而务实的见解。他用40年时间创建了两家世界500强企业，是目前唯一在世的日本四大“经营之圣”(另三位分别是松下公司的创始人松下幸之助、索尼公司的创始人盛田昭夫、本田公司的创始人本田宗一郎)之一。他是4000多名经营者追随的企业导师，曾出版过10多本介绍企业经营理念和人生哲学的图书。 稻盛和夫的“阿米巴经营”理念及管理方式，被誉为“京瓷经营成功的两大支柱之一”。 “阿米巴经营”基于牢固的经营哲学和精细的部门独立核算管理，将企业划分为“小集体”，像自由自在的重复进行细胞分裂的“阿米巴”——以各个“阿米巴”为核心，自行制订计划，独立核算，持续自主成长，让每一位员工成为主角，“全员参与经营”，打造激情四射的集体，依靠全体智慧和努力完成企业经营目标，实现企业的飞速发展。 日本已有超过300家的企业在京瓷关联公司的指导下引进了阿米巴经营模式，业绩得以大幅提升。' AS Description,
		Id AS CategoryId,
		N'Admin' AS UpdateBy,
		GETDATE() AS UpdateDate
FROM dbo.BookCategory WHERE CategoryName='企业/项目/时间管理类'
GO


INSERT INTO dbo.BookInfo
        ( Title ,
          Description ,
          CategoryId ,
          UpdateBy ,
          UpdateDate
        )
SELECT 'SCRUM敏捷项目管理' AS Title,
		'作者:  [美] 史威伯
 出版社: 世界图书出版公司

内容简介 · · · · · ·
The rules and practices for Scrum--a simple process for managing complex projects--are few, straightforward,and easy to learn. But Scrum''s simplicity itself--its lack of prescription--can be disarming, and new practitioners often find themselves reverting to old project management habits and tools and yielding lesser results. In this illuminating series of case studies, Scrum co-creator and evangelist Ken Schwaber identifies the real-world lessons--the successes and failures--culled from his years of experience coaching companies in agile project management. Through them, you''ll understand how to use Scrum to solve complex problems and drive results--delivering more valuable software faster.' AS Description,
		Id AS CategoryId,
		N'Admin' AS UpdateBy,
		GETDATE() AS UpdateDate
FROM dbo.BookCategory WHERE CategoryName='企业/项目/时间管理类'
GO

INSERT INTO dbo.BookInfo
        ( Title ,
          Description ,
          CategoryId ,
          UpdateBy ,
          UpdateDate
        )
SELECT '代码整洁之道' AS Title,
		'作者：Robert C.Martin
出版社：人民邮电出版社

内容简介 · · · · · ·
软件质量，不但依赖于架构及项目管理，而且与代码质量紧密相关。这一点，无论是敏捷开发流派还是传统开发流派，都不得不承认。
本书提出一种观念：代码质量与其整洁度成正比。干净的代码，既在质量上较为可靠，也为后期维护、升级奠定了良好基础。作为编程领域的佼佼者，本书作者给出了一系列行之有效的整洁代码操作实践。这些实践在本书中体现为一条条规则（或称“启示”），并辅以来自现实项目的正、反两面的范例。只要遵循这些规则，就能编写出干净的代码，从而有效提升代码质量。
本书阅读对象为一切有志于改善代码质量的程序员及技术经理。书中介绍的规则均来自作者多年的实践经验，涵盖从命名到重构的多个编程方面，虽为一“家”之言，然诚有可资借鉴的价值。' AS Description,
		Id AS CategoryId,
		N'Admin' AS UpdateBy,
		GETDATE() AS UpdateDate
FROM dbo.BookCategory WHERE CategoryName='计算机/软件/网络工程开发类'
GO

INSERT INTO dbo.BookInfo
        ( Title ,
          Description ,
          CategoryId ,
          UpdateBy ,
          UpdateDate
        )
SELECT 'Elasticsearch 服务器开发' AS Title,
		'作者:  [波兰] Rafa·Ku·Marek Rogoziński 
出版社: 人民邮电出版社

内容简介 · · · · · ·
本书介绍了Elasticsearch这个优秀的全文检索和分析引擎从安装和配置到集群管理的各方面知识。本书这一版不仅补充了上一版中遗漏的重要内容，并且所有示例和功能均基于Elasticsearch服务器1.0版进行了更新。你可以从头开始循序渐进地学习本书，也可以查阅具体功能解决手头问题。' AS Description,
		Id AS CategoryId,
		N'Admin' AS UpdateBy,
		GETDATE() AS UpdateDate
FROM dbo.BookCategory WHERE CategoryName='计算机/软件/网络工程开发类'
GO

INSERT INTO dbo.BookInfo
        (Title ,
          Description ,
          CategoryId ,
          UpdateBy ,
          UpdateDate
        )
SELECT '重构 改善既有代码的设计' AS Title,
		'作者:  [美] Martin Fowler 

出版社: 人民邮电出版社
内容简介 · · · · · ·
Martin Fowler和《重构:改善既有代码的设计》(中文版)另几位作者清楚揭示了重构过程，他们为面向对象软件开发所做的贡献，难以衡量。《重构:改善既有代码的设计》(中文版)解释重构的原理（principles）和最佳实践方式（best practices），并指出何时何地你应该开始挖掘你的代码以求改善。《重构:改善既有代码的设计》(中文版)的核心是一份完整的重构名录（catalog of refactoring），其中每一项都介绍一种经过实证的代码变换手法（code transformation）的动机和技术。某些项目如Extract Method和Move Field看起来可能很浅显，但不要掉以轻心，因为理解这类技术正是有条不紊地进行重构的关键。' AS Description,
		Id AS CategoryId,
		N'Admin' AS UpdateBy,
		GETDATE() AS UpdateDate
FROM dbo.BookCategory WHERE CategoryName='系统实践/设计类'
GO

INSERT INTO dbo.BookInfo
        ( Title ,
          Description ,
          CategoryId ,
          UpdateBy ,
          UpdateDate
        )
SELECT 'Groovy程序设计' AS Title,
		'作者:  [美] Venkat Subramaniam 

出版社: 人民邮电出版社' AS Description,
		Id AS CategoryId,
		N'Admin' AS UpdateBy,
		GETDATE() AS UpdateDate
FROM dbo.BookCategory  WHERE CategoryName='系统实践/设计类'
GO

INSERT INTO dbo.BookInfo
        ( Title ,
          Description ,
          CategoryId ,
          UpdateBy ,
          UpdateDate
        )
SELECT '正能量' AS Title,
		'作者:  [英] 理查德·怀斯曼 

出版社: 湖南文艺出版社
内容简介 · · · · · ·
《正能量》——《怪诞心理学》作者理查德·怀斯曼最新转型之作！！
《正能量》内容简介：坚持正向能量，人生无所畏惧！到底什么是正能量？科学的解释是：以真空能量为零，能量大于真空的物质为正，能量低于真空的物质为负。而在此书中，正能量指的是一切予人向上和希望、促使人不断追求、让生活变得圆满幸福的动力和感情。
《正能量》是一本世界级心理励志书。也是《怪诞心理学》作者的转型之作。这将是继“不抱怨”之后，引发全国团购热潮的励志读本！书中的内容深入浅出，为读者打开了一扇重新认识自己和他人的窗户，并结合多项实例，教会我们如何激发自身的潜能，引爆内在的正能量。
《正能量》延续了作者一贯的风格，是其和诸多卓越的心理学家共同研究成果的结晶。通过种种实验和数据，理查德•怀斯曼向我们阐释了伟大的“表现”原理，破除了我们过去秉持的“性格决定命运”“情绪决定行为”等认知。运用“表现”原理激发出的正能量，可以使我们产生一个新的自我，让我们变得更加自信、充满活力、也更有安全感。
《正能量》告诉我们：每个人身上都是带有能量的，而只有健康、积极、乐观的人才带有正能量，和这样人交往能将正能量传递给你。而人的意念力来自于我们内在的能量场，减少不该有的欲望，保持心态的平和，喜乐地生活能增加人生的正能量。
《正能量》严谨又趣味十足地阐释了“表现”原理与正能量之间的“亲密”关系，揭秘了什么样的行为模式可以影响人的信念、情绪、意志力。它通过一系列的训练方法，提升我们内在的信任、豁达、愉悦、进取等正能量；规避自私、猜疑、沮丧、消沉的负能量，是一本能彻底改变我们工作、生活、行为模式的心理学著作。
书中的数十个案例和步骤，是最理想的实践指南，通过《正能量》，了解你自身的能量，知道你是如何散发并引导这股能量的。当你陷身困惑、争执或消极能量之中时，尝试解脱或改变破坏性的能量。当积极的能量被引爆时，你的人生将会得到神奇的大转变！' AS Description,
		Id AS CategoryId,
		N'Admin' AS UpdateBy,
		GETDATE() AS UpdateDate
FROM dbo.BookCategory  WHERE CategoryName='文学/生活类'
GO

INSERT INTO dbo.BookInfo
        (Title ,
          Description ,
          CategoryId ,
          UpdateBy ,
          UpdateDate
        )
SELECT '我可以咬一口吗' AS Title,
		'作者:  [美] 莉兹·克里莫
 
出版社: 天津人民出版社
内容简介 · · · · · ·
《我可以咬一口吗》是美国漫画家莉兹•克里莫继《你今天真好看》之后的又一本清新暖萌的漫画集，收录了莉兹•克里莫一百多张逗趣漫画。书中集结了所有你能想到的各种萌物，狮子、斑马、兔子、乌龟，甚至还有伞蜥、獾、土拨鼠、狐獴……在诙谐的对话中，它们展现出一种与生俱来的幽默感和令人艳羡的生活情趣。
你可能是书中任何一个动物，而书中的动物可能是你身边的任何一个人。
这本书就是有这样的魔力让你不由自主地会心一笑，然后气血满满地快乐生活。' AS Description,
		Id AS CategoryId,
		N'Admin' AS UpdateBy,
		GETDATE() AS UpdateDate
FROM dbo.BookCategory  WHERE CategoryName='文学/生活类'
GO


