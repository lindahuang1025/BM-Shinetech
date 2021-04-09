using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BM.Automation
{
    public class FileConfig
    {
        #region web API
        public static string DataModelRelativePath = @"BM.DataModel";
        public static string DalRelativePath = @"BM.DAL";
        public static string BllRelativePath = @"BM.BLL";
        public static string ControllerRelativePath = @"BM.WebAPI\Controllers";
        public static string ViewModelRelativePath = @"BM.ViewModel\ViewModel";
        public static string ConvertModelRelativePath = @"BM.ViewModel\ModelConvert";

        public static string DataContextRelativePath = @"BM.DataModel";
        public static string DataContextFile = "BMDbContext";
        #endregion

        #region web 
        public static string RouteRelativePath = @"BM.Web\App\routes\app";
        public static string ServiceRelativePath = @"BM.Web\App\services\data";
        public static string ViewRelativePath = @"BM.Web\App\views";
        public static string CtrlRelativePath = @"BM.Web\App\controllers";
        public static string GridColumnRelativePath = @"BM.Web\App\template\columnSetting";
        #endregion
    }
}
