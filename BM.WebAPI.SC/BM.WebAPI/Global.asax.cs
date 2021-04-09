using BM.Common.Log;
using BM.WebAPI.App_Start;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace BM.WebAPI
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            GlobalConfiguration.Configure(RetrunConfig.Register);
            GlobalConfiguration.Configure(FilterConfig.Register);
        }

        protected void Application_BeginRequest()
        {
            try
            {
                if (Request.HttpMethod == "OPTIONS")
                {
                    Response.Flush();
                }
            }
            catch (Exception exception)
            {
                Logger.WriteErrorLog(exception);
            }
        }

        protected void Application_End()
        {


        }
    }
}
