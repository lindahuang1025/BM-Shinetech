using BM.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace BM.WebAPI.Base
{
    public class PageRightFilterAttribute : ActionFilterAttribute
    {
        private string pageRight;
        public PageRightFilterAttribute(string pageRight)
        {
            this.pageRight = pageRight;
        }

        public override void OnActionExecuting(HttpActionContext context)
        {
            if (!HasPageRight(context))
            {
                //HttpContext.Current.Response.Write($"You don't have permission for '{this.pageRight}'");
                context.Response = new HttpResponseMessage(System.Net.HttpStatusCode.Unauthorized);
                context.Response.ReasonPhrase = $"You don't have permission for '{this.pageRight}'";
            }
        }

        public override void OnActionExecuted(HttpActionExecutedContext context)
        {

        }

        private bool HasPageRight(HttpActionContext context)
        {
            var roleId = GlobalVariance.UserRole;
            var pageRightList = new List<string>();
            pageRightList.Add("get");
            pageRightList.Add("add");
            return pageRightList.Any(x => x == pageRight);
        }
    }
}