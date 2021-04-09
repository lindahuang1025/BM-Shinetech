using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace BM.Common
{
    public class GlobalVariance
    {
        private static NameValueCollection Headers
        {
            get
            {
                try
                {
                    return HttpContext.Current.Request.Headers;
                }
                catch
                {
                    return new NameValueCollection();
                }
            }
        }


        private static string GetValue(string key)
        {

            var values = Headers.GetValues(key);
            if (values != null && values.Length > 0)
            {
                return values[0];
            }

            return string.Empty;
        }

        public static int UserId
        {
            get
            {
                var userId = GetValue("UserId");
                if (!string.IsNullOrEmpty(userId))
                {
                    return Convert.ToInt32(userId);
                }
                return 0;
            }
        }

        public static string UserName => GetValue("UserName");

        public static string UserRole => GetValue("UserRole");
    }
}
