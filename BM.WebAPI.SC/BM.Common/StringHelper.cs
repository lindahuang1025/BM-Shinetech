using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BM.Common
{
    public class StringHelper
    {
        public static string ToSmallHump(string str)
        {
            var firstStr = str.Substring(0, 1);
            var firstStrLower = firstStr.ToLower();

            var remainStr = str.Substring(1);
            return $"{firstStrLower}{remainStr}";
        }
    }
}
