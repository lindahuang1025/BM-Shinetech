using BM.WebAPI.Filter;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace BM.WebAPI
{
    public class FilterConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter("Bearer"));
            config.Filters.Add(new CrossDomainFilter());
        }
    }
}
