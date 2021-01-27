export default {

    'GET /api/borrowList/': (req, res) => {

        const list = [{
                Id: 1,
                BookId: 1,
                BookName: "阿米巴经营",
                BorrowUserId: 1,
                Status: 1,
                PlanReturnData: "2021-01-30",
                CreateBy: "Admin",
                CreateDate: "2021-01-27"
            },
            {
                Id: 2,
                BookId: 2,
                BookName: "SCRUM敏捷项目管理",
                BorrowUserId: 1,
                Status: 1,
                PlanReturnData: "2021-01-30",
                CreateBy: "Admin",
                CreateDate: "2021-01-27"
            },
            {
                Id: 3,
                BookId: 3,
                BookName: "代码整洁之道",
                BorrowUserId: 1,
                Status: 1,
                PlanReturnData: "2021-01-30",
                CreateBy: "Admin",
                CreateDate: "2021-01-27"
            },
        ]
        res.send(list);
    }
}