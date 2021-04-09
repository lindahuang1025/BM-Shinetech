using BM.Automation.Properties;
using BM.Common;
using BM.Common.FileHelper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace BM.Automation
{
    public class WebAPIAutomation
    {
        readonly private string RootPath = ConfigurationManager.AppSettings["projectRootPath"];

        //file template
        readonly private string TemplateDataModel = Resource.TemplateDataModel;
        readonly private string TemplateDAL = Resource.TemplateDAL;
        readonly private string TemplateBLL = Resource.TemplateBLL;
        readonly private string TemplateController = Resource.TemplateController;
        readonly private string TemplateViewModel = Resource.TemplateViewModel;
        readonly private string TemplateConvertModel = Resource.TemplateConvertModel;

        //sql template
        readonly private string DbSql = Resource.DbSql;

        public bool OperateFile(string templateName, bool isCreate)
        {
            if (isCreate)
            {
                return CreateNewFile(templateName);
            }
            else
            {
                return DeleteFile(templateName);
            }
        }

        public bool DeleteFile(string templateName)
        {
            try
            {
                using (var scope = new TransactionScope())
                {
                    #region delete DataModel
                    var fileNameDataModel = $"{templateName}.cs";
                    var templatePathDataModel = Path.Combine(RootPath, FileConfig.DataModelRelativePath);
                    var filePathDataModel = Path.Combine(templatePathDataModel, fileNameDataModel);
                    if (File.Exists(filePathDataModel))
                    {
                        File.Delete(filePathDataModel);
                    }
                    #endregion

                    #region delete DAL
                    var fileNameDAL = $"{templateName}Agent.cs";
                    var templatePathDAL = Path.Combine(RootPath, FileConfig.DalRelativePath);
                    var filePathDAL = Path.Combine(templatePathDAL, fileNameDAL);
                    if (File.Exists(filePathDAL))
                    {
                        File.Delete(filePathDAL);
                    }
                    #endregion

                    #region delete BLL
                    var fileNameBLL = $"{templateName}BLL.cs";
                    var templatePathBLL = Path.Combine(RootPath, FileConfig.BllRelativePath);
                    var filePathBLL = Path.Combine(templatePathBLL, fileNameBLL);
                    if (File.Exists(filePathBLL))
                    {
                        File.Delete(filePathBLL);
                    }
                    #endregion

                    #region delete Controller
                    var fileNameController = $"{templateName}Controller.cs";
                    var templatePathController = Path.Combine(RootPath, FileConfig.ControllerRelativePath);
                    var filePathController = Path.Combine(templatePathController, fileNameController);
                    if (File.Exists(filePathController))
                    {
                        File.Delete(filePathController);
                    }
                    #endregion

                    #region delete ViewModel
                    var fileNameViewModel = $"{templateName}Model.cs";
                    var templatePathViewModel = Path.Combine(RootPath, FileConfig.ViewModelRelativePath);
                    var filePathViewModel = Path.Combine(templatePathViewModel, fileNameViewModel);
                    if (File.Exists(filePathViewModel))
                    {
                        File.Delete(filePathViewModel);
                    }
                    #endregion

                    #region delete ConvertModel
                    var fileNameConvertModel = $"{templateName}Model.cs";
                    var templatePathConvertModel = Path.Combine(RootPath, FileConfig.ConvertModelRelativePath);
                    var filePathConvertModel = Path.Combine(templatePathConvertModel, fileNameConvertModel);
                    if (File.Exists(filePathConvertModel))
                    {
                        File.Delete(filePathConvertModel);
                    }
                    #endregion
                    scope.Complete();
                }

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool CreateNewFile(string templateName)
        {
            try
            {
                using (var scope = new TransactionScope())
                {
                    //#region add data to dbcontext
                    //var templatePath = Path.Combine(RootPath, FileConfig.DataContextRelativePath);
                    //FileWriteSql(templateName, FileConfig.DataContextFile, templatePath);
                    //#endregion

                    #region create DataModel
                    var fileNameDataModel = $"{templateName}.cs";
                    var templatePathDataModel = Path.Combine(RootPath, FileConfig.DataModelRelativePath);
                    FileWrite(fileNameDataModel, templateName, TemplateDataModel, templatePathDataModel);
                    #endregion

                    #region create DAL
                    var fileNameDAL = $"{templateName}Agent.cs";
                    var templatePathDAL = Path.Combine(RootPath, FileConfig.DalRelativePath);
                    FileWrite(fileNameDAL, templateName, TemplateDAL, templatePathDAL);
                    #endregion

                    #region create BLL
                    var fileNameBLL = $"{templateName}BLL.cs";
                    var templatePathBLL = Path.Combine(RootPath, FileConfig.BllRelativePath);
                    FileWriteWithLower(fileNameBLL, templateName, TemplateBLL, templatePathBLL);
                    #endregion

                    #region create Controller
                    var fileNameController = $"{templateName}Controller.cs";
                    var templatePathController = Path.Combine(RootPath, FileConfig.ControllerRelativePath);
                    FileWriteWithLower(fileNameController, templateName, TemplateController, templatePathController);
                    #endregion

                    #region create ViewModel
                    var fileNameViewModel = $"{templateName}Model.cs";
                    var templatePathViewModel = Path.Combine(RootPath, FileConfig.ViewModelRelativePath);
                    FileWrite(fileNameViewModel, templateName, TemplateViewModel, templatePathViewModel);
                    #endregion

                    #region ConvertModel
                    var fileNameConvertModel = $"{templateName}Model.cs";
                    var templatePathConvertModel = Path.Combine(RootPath, FileConfig.ConvertModelRelativePath);
                    FileWrite(fileNameConvertModel, templateName, TemplateConvertModel, templatePathConvertModel);
                    #endregion

                    scope.Complete();
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        private void FileWrite(string fileName, string templateName, string templateFile, string templatePath)
        {
            var context = templateFile.Replace("{{Template}}", templateName);
            var filePath = Path.Combine(templatePath, fileName);
            FileReadWrite.FileWrite(filePath, context);
        }


        private void FileWriteWithLower(string fileName, string templateName, string templateFile, string templatePath)
        {
            var lowerCaseTemplate = StringHelper.ToSmallHump(templateName);
            var context = templateFile
                .Replace("{{Template}}", templateName)
                .Replace("{{LowerCaseTemplate}}", lowerCaseTemplate);
            var filePath = Path.Combine(templatePath, fileName);
            FileReadWrite.FileWrite(filePath, context);
        }

        private void FileWriteSql(string templateName, string templateFile, string templatePath)
        {
            var sqlStr = DbSql.Replace("{{Template}}", templateName);
            var filePath = Path.Combine(templatePath, templateFile);
            var context = FileReadWrite.FileRead(filePath);
            context = $"{context}{sqlStr}";
            FileReadWrite.FileWrite(filePath, context);
        }
    }
}
