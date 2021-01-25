export default {

    'GET /api/bookList/': (req, res) => {

        const list = [{
                name: "阿米巴经营",
                description: "稻盛和夫，被称为日本的“经营之圣、人生之师”，作为日本的企业家兼哲学家第一人，在企业经营和人生理念方面均有独到而务实的见解。",
                isBorrow: false
            },
            {
                name: "SCRUM敏捷项目管理",
                description: "The rules and practices for Scrum--a simple process for managing complex projects--are few, straightforward,and easy to learn. ",
                isBorrow: true
            },
            {
                name: "代码整洁之道",
                description: "软件质量，不但依赖于架构及项目管理，而且与代码质量紧密相关。这一点，无论是敏捷开发流派还是传统开发流派，都不得不承认。",
                isBorrow: true
            }
        ]
        res.send(list);
    }
}