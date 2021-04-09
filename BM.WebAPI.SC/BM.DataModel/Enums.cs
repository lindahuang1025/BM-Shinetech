using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BM.DataModel
{
    public class Enums
    {
        public enum BookStatus : int
        {
            Normal = 0,
            Borrowed = 1,
            Returned = 2
        }

        public enum UserRole : int
        {
            Admin =1,
            User =2
        }
    }
}
