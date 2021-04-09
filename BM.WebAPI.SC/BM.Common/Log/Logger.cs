using log4net;
using log4net.Config;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BM.Common.Log
{
    public class Logger
    {
        static Logger()
        {
            XmlConfigurator.Configure();
        }

        public static readonly ILog loginfo = LogManager.GetLogger("loginfo");

        public static readonly ILog logerror = LogManager.GetLogger("logerror");

        public static void WriteTraceLog(string info)
        {
            if (loginfo.IsInfoEnabled)
            {
                loginfo.Info(info);
            }
        }

        public static void WriteErrorLog(Exception exception)
        {
            if (logerror.IsErrorEnabled)
            {
                logerror.Error(string.Empty, exception);
            }
        }

        public static void WriteErrorLog(Exception exception, string errorCode)
        {
            if (logerror.IsErrorEnabled)
            {
                logerror.Error($"(Error Code: {errorCode} )", exception);
            }
        }
    }
}
