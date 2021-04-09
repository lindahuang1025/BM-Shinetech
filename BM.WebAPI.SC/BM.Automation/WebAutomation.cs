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
    public class WebAutomation
    {
        readonly private string RootPath = ConfigurationManager.AppSettings["projectRootPath"];

        //file template
        readonly private string TemplateRoute = Resource.TemplateRoute;
        readonly private string TemplateService = Resource.TemplateService;
        readonly private string TemplateViewList = Resource.TemplateViewList;
        readonly private string TemplateCtrlList = Resource.TemplateCtrlList;
        readonly private string TemplateViewDetail = Resource.TemplateViewDetail;
        readonly private string TemplateCtrlDetail = Resource.TemplateCtrlDetail;
        readonly private string TemplateGridColumn = Resource.TemplateGridColumn;

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
                    var lowerCaseTemplate = StringHelper.ToSmallHump(templateName);

                    #region delete route
                    var fileNameRoute = $"{lowerCaseTemplate}.route.js";
                    var templatePathRoute = Path.Combine(RootPath, FileConfig.RouteRelativePath);
                    templatePathRoute = Path.Combine(templatePathRoute, lowerCaseTemplate);
                    var filePathRoute = Path.Combine(templatePathRoute, fileNameRoute);
                    if (File.Exists(filePathRoute))
                    {
                        File.Delete(filePathRoute);
                    }
                    #endregion

                    #region delete services
                    var fileNameService = $"{lowerCaseTemplate}.services.js";
                    var templatePathService = Path.Combine(RootPath, FileConfig.ServiceRelativePath);
                    var filePathService = Path.Combine(templatePathService, fileNameService);
                    if (File.Exists(filePathService))
                    {
                        File.Delete(filePathService);
                    }
                    #endregion

                    #region delete view list
                    var fileNameViewList = $"{lowerCaseTemplate}.list.html";
                    var templatePathViewList = Path.Combine(RootPath, FileConfig.ViewRelativePath);
                    templatePathViewList = Path.Combine(templatePathViewList, lowerCaseTemplate);
                    var filePathViewList = Path.Combine(templatePathViewList, fileNameViewList);
                    if (File.Exists(filePathViewList))
                    {
                        File.Delete(filePathViewList);
                    }
                    #endregion

                    #region delete ctrl list
                    var fileNameCtrlList = $"{lowerCaseTemplate}.list.ctrl.js";
                    var templatePathCtrlList = Path.Combine(RootPath, FileConfig.CtrlRelativePath);
                    templatePathCtrlList = Path.Combine(templatePathCtrlList, lowerCaseTemplate);
                    var filePathCtrlList = Path.Combine(templatePathCtrlList, fileNameCtrlList);
                    if (File.Exists(filePathCtrlList))
                    {
                        File.Delete(filePathCtrlList);
                    }
                    #endregion

                    #region delete view detail
                    var fileNameViewDetail = $"{lowerCaseTemplate}.edit.html";
                    var templatePathViewDetail = Path.Combine(RootPath, FileConfig.ViewRelativePath);
                    templatePathViewDetail = Path.Combine(templatePathViewDetail, lowerCaseTemplate);
                    var filePathViewDetail = Path.Combine(templatePathViewDetail, fileNameViewDetail);
                    if (File.Exists(filePathViewDetail))
                    {
                        File.Delete(filePathViewDetail);
                    }
                    #endregion

                    #region delete ctrl detail 
                    var fileNameCtrlDetail = $"{lowerCaseTemplate}.edit.ctrl.js";
                    var templatePathCtrlDetail = Path.Combine(RootPath, FileConfig.CtrlRelativePath);
                    templatePathCtrlDetail = Path.Combine(templatePathCtrlDetail, lowerCaseTemplate);
                    var filePathCtrlDetail = Path.Combine(templatePathCtrlDetail, fileNameCtrlDetail);
                    if (File.Exists(filePathCtrlDetail))
                    {
                        File.Delete(filePathCtrlDetail);
                    }
                    #endregion

                    #region delete grid column
                    var fileNameGridColumn = $"{lowerCaseTemplate}.column.js";
                    var templatePathGridColumn = Path.Combine(RootPath, FileConfig.GridColumnRelativePath);
                    var filePathGridColumn = Path.Combine(templatePathGridColumn, fileNameGridColumn);
                    if (File.Exists(filePathGridColumn))
                    {
                        File.Delete(filePathGridColumn);
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
                    var lowerCaseTemplate = StringHelper.ToSmallHump(templateName);

                    #region create route
                    var fileNameRoute = $"{lowerCaseTemplate}.route.js";
                    var templatePathRoute = Path.Combine(RootPath, FileConfig.RouteRelativePath);
                    templatePathRoute = Path.Combine(templatePathRoute, lowerCaseTemplate);
                    FileWrite(fileNameRoute, lowerCaseTemplate, TemplateRoute, templatePathRoute);
                    #endregion

                    #region create service
                    var fileNameService = $"{lowerCaseTemplate}.services.js";
                    var templatePathService = Path.Combine(RootPath, FileConfig.ServiceRelativePath);
                    FileWrite(fileNameService, lowerCaseTemplate, TemplateService, templatePathService);
                    #endregion

                    #region create view list
                    var fileNameViewList = $"{lowerCaseTemplate}.list.html";
                    var templatePathViewList = Path.Combine(RootPath, FileConfig.ViewRelativePath);
                    templatePathViewList = Path.Combine(templatePathViewList, lowerCaseTemplate);
                    FileWrite(fileNameViewList, lowerCaseTemplate, TemplateViewList, templatePathViewList);
                    #endregion

                    #region create ctrl list
                    var fileNameCtrlList = $"{lowerCaseTemplate}.list.ctrl.js";
                    var templatePathCtrlList = Path.Combine(RootPath, FileConfig.CtrlRelativePath);
                    templatePathCtrlList = Path.Combine(templatePathCtrlList, lowerCaseTemplate);
                    FileWrite(fileNameCtrlList, lowerCaseTemplate, TemplateCtrlList, templatePathCtrlList);
                    #endregion

                    #region create view detail
                    var fileNameViewDetail = $"{lowerCaseTemplate}.edit.html";
                    var templatePathViewDetail = Path.Combine(RootPath, FileConfig.ViewRelativePath);
                    templatePathViewDetail = Path.Combine(templatePathViewDetail, lowerCaseTemplate);
                    FileWrite(fileNameViewDetail, lowerCaseTemplate, TemplateViewDetail, templatePathViewDetail);
                    #endregion

                    #region create ctrl detail
                    var fileNameCtrlDetail = $"{lowerCaseTemplate}.edit.ctrl.js";
                    var templatePathCtrlDetail = Path.Combine(RootPath, FileConfig.CtrlRelativePath);
                    templatePathCtrlDetail = Path.Combine(templatePathCtrlDetail, lowerCaseTemplate);
                    FileWrite(fileNameCtrlDetail, lowerCaseTemplate, TemplateCtrlDetail, templatePathCtrlDetail);
                    #endregion

                    #region create grid column
                    var fileNameGridColumn = $"{lowerCaseTemplate}.column.js";
                    var templatePathGridColumn = Path.Combine(RootPath, FileConfig.GridColumnRelativePath);
                    FileWrite(fileNameGridColumn, lowerCaseTemplate, TemplateGridColumn, templatePathGridColumn);
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

        private void FileWrite(string fileName, string lowerCaseTemplate, string templateFile, string templatePath)
        {
            var context = templateFile.Replace("{{LowerCaseTemplate}}", lowerCaseTemplate);
            var filePath = Path.Combine(templatePath, fileName);
            FileReadWrite.FileWrite(filePath, context);
        }
    }
}
