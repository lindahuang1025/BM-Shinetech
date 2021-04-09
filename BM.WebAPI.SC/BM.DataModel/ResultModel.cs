﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BM.DataModel
{
    public class ResultModel
    {

    }

    public class Operate
    {
        public int Status { get; set; }
        public string Message { get; set; }
    }

    public class ViewResult<T>
    {
        public int Status { get; set; }
        public string Message { get; set; }

        public T Data { get; set; }
    }

    public class MulitViewResult<T>
    {
        public int Status { get; set; }
        public string Message { get; set; }

        public List<T> Datas { get; set; }
        public int Total { get; set; }
    }
}
