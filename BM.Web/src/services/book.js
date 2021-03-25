import request from '@/utils/request';

export async function queryBookList(params) {
    return request('/api/bookInfo/query', {
        method: 'POST',
        data: {
            ...params
        }
    });
}

export async function queryBookListByAdmin(params) {
    const res = await request('/api/bookInfo/query', {
        method: 'POST',
        data: {
            keyword: "",
            pageIndex: params.current,
            pageSize: params.pageSize
        }
    });
    const dataList = {
        data: res.Datas.map(function(item) {
            return {
                key: item.Id,
                Author: item.Author,
                BookCategory: item.BookCategory,
                BorrowDate: item.BorrowDate,
                BorrowedBy: item.BorrowedBy,
                CategoryId: item.CategoryId,
                Description: item.Description,
                ImageUrl: item.ImageUrl,
                PlanReturnDate: item.PlanReturnDate,
                Status: item.Status,
                StatusName: item.StatusName,
                Title: item.Title,
                UpdateBy: item.UpdateBy,
                UpdateDate: item.UpdateDate
            }
        }),
        current: params.pageIndex,
        pageSize: params.pageSize.toString(),
        total: res.Total,
        success: true
    };
    console.log(dataList)
    return dataList;
}

export async function getBookInfoById(id) {
    return request(`/api/bookInfo/getById/${id}`, {
        method: 'GET'
    });
}