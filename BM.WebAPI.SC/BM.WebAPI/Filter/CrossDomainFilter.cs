using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Filters;

namespace BM.WebAPI.Filter
{
    public class CrossDomainFilter : ActionFilterAttribute
    {
        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
        {
            //actionExecutedContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");
            //actionExecutedContext.Response.Headers.Add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
            //actionExecutedContext.Response.Headers.Add("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Key,Authorization");
        }
    }
}