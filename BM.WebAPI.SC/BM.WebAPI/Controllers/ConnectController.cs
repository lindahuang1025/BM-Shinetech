using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace BM.WebAPI.Controllers
{
    public class ConnectController : ApiController
    {
        [Route("connect")]
        public bool GetConnect()
        {
            return true;
        }
    }
}