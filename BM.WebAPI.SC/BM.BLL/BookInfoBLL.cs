using BM.Common;
using BM.Common.Log;
using BM.DAL;
using BM.DataModel;
using ExcelDataReader;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace BM.BLL
{
    public class BookInfoBLL
    {
        private readonly BookInfoAgent bookInfoAgent;
        private readonly BookBorrowAgent bookBorrowAgent;
        private readonly SysUserAgent sysUserAgent;

        public BookInfoBLL()
        {
            this.bookInfoAgent = new BookInfoAgent();
            this.bookBorrowAgent = new BookBorrowAgent();
            this.sysUserAgent = new SysUserAgent();
        }


        public async Task<Operate> AddOrUpdate(BookInfo entity)
        {
            var result = new Operate();
            try
            {
                await bookInfoAgent.AddOrUpdate(entity);
            }
            catch (Exception ex)
            {
                result.Status = -1;
                result.Message = ex.Message;
                Logger.WriteErrorLog(ex);
            }
            return result;
        }

        public async Task<Operate> DeleteById(long id)
        {
            var result = new Operate();
            try
            {
                await bookInfoAgent.DeleteById(id);
            }
            catch (Exception ex)
            {
                result.Status = -1;
                result.Message = ex.Message;
                Logger.WriteErrorLog(ex);
            }
            return result;
        }

        public async Task<ViewResult<BookInfo>> GetById(long id)
        {
            var result = new ViewResult<BookInfo>();
            try
            {
                var data = await bookInfoAgent.GetIncludeById(id);
                if (data.Status == (int)Enums.BookStatus.Borrowed)
                {
                    var borrow = await bookBorrowAgent.GetByBookIdAndStatus(id, data.Status ?? 0);
                    if (borrow != null)
                    {
                        var user = await sysUserAgent.GetById(borrow.BorrowUserId);
                        data.BorrowedBy = user.UserName;
                        data.BorrowDate = borrow.BorrowDate;
                        data.PlanReturnDate = borrow.PlanReturnDate;
                    }
                }
                result.Data = data;
            }
            catch (Exception ex)
            {
                result.Status = -1;
                result.Message = ex.Message;
                Logger.WriteErrorLog(ex);
            }
            return result;
        }

        public async Task<MulitViewResult<BookInfo>> Query(string keyword, int pageSize, int pageIndex)
        {
            var result = new MulitViewResult<BookInfo>();
            try
            {
                result.Datas = await bookInfoAgent.Query(keyword, pageSize, pageIndex);
                result.Total = await bookInfoAgent.QueryCount(keyword);
            }
            catch (Exception ex)
            {
                result.Status = -1;
                result.Message = ex.Message;
                Logger.WriteErrorLog(ex);
            }
            return result;
        }

        public async Task<Operate> ImportByExcel(HttpRequest httpRequest)
        {
            #region Variable Declaration
            DataSet dsexcelRecords = new DataSet();
            IExcelDataReader reader = null;
            HttpPostedFile Inputfile = null;
            Stream FileStream = null;
            #endregion

            var result = new Operate();
            try
            {
                if (httpRequest.Files.Count > 0)
                {
                    Inputfile = httpRequest.Files[0];
                    FileStream = Inputfile.InputStream;
                    if (Inputfile != null && FileStream != null)
                    {
                     
                        reader = ExcelReaderFactory.CreateOpenXmlReader(FileStream);
                        dsexcelRecords = reader.AsDataSet();
                        reader.Close();
                        if (dsexcelRecords != null && dsexcelRecords.Tables.Count > 0)
                        {
                            DataTable dtStudentRecords = dsexcelRecords.Tables[0];
                            int output = 0;
                            for (int i = 1; i < dtStudentRecords.Rows.Count; i++)
                            {
                                BookInfo objBookInfo = new BookInfo();
                                objBookInfo.Title = Convert.ToString(dtStudentRecords.Rows[i][0]);
                                objBookInfo.Author = Convert.ToString(dtStudentRecords.Rows[i][1]);
                                objBookInfo.Description = Convert.ToString(dtStudentRecords.Rows[i][2]);
                                objBookInfo.CategoryId = 1;
                                objBookInfo.ImageUrl = "defaultBg.jpg";
                                int addSecceed = await bookInfoAgent.ImportByExcel(objBookInfo);
                                output += addSecceed;
                            }
                            if (output > 0)
                            {
                                result.Message = "�ɹ�����"+output+"���鼮��";
                            } else if (output == 0)
                            {
                                result.Message = "��⵽�����鼮�Ѿ��������Ŷ��";
                            }
                            else
                                result.Message = "ŶŶ�����˵����⣬�ٵ���һ�����ԣ����о�ȥ�ҳ���Ա���ˣ�";
                        }
                        else 
                            result.Message = "�εΣ��㵼���excel�ǿյ�Ŷ��";
                    }
                    else 
                        result.Message = "��Ч���ļ���";
                }else
                    result.Message = "���󻵵��ˣ�ˢ�����ٵ������ԣ�";
            }
            catch (Exception ex)
            {
                result.Status = -1;
                result.Message = ex.Message;
                Logger.WriteErrorLog(ex);
            }
            return result;
        }
    }
}
