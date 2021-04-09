using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BM.Automation
{
    class Program
    {
        static void Main(string[] args)
        {
            int i = 0;
            while (i < 100)
            {
                #region create and remove web API
                Console.WriteLine("Automatically create/delete a template:");
                Console.WriteLine("Please input the template:");
                var templateName = Console.ReadLine();

                Console.WriteLine("Template for Web(1)， WebAPI(2), All(3):");
                var type = Convert.ToInt32(Console.ReadLine());

                Console.WriteLine("Create/Delete (Y/N):");
                var isCreate = Console.ReadLine() == "Y";

                if (type == 1)
                {
                    CreateWebTemplate(templateName, isCreate);
                }
                if (type == 2)
                {
                    CreateWebAPITemplate(templateName, isCreate);
                }
                if (type == 3)
                {
                    CreateWebTemplate(templateName, isCreate);
                    CreateWebAPITemplate(templateName, isCreate);
                }
                #endregion
                i++;
            }

            Console.ReadLine();

        }

        private static void CreateWebTemplate(string templateName, bool isCreate)
        {
            WebAutomation web = new WebAutomation();
            bool isSuccessWeb = web.OperateFile(templateName, isCreate);
            var message = isSuccessWeb ? "Successful on web" : "Fail on web";
            Console.WriteLine(message);
        }

        private static void CreateWebAPITemplate(string templateName, bool isCreate)
        {
            WebAPIAutomation webApi = new WebAPIAutomation();
            bool isSuccessWebApi = webApi.OperateFile(templateName, isCreate);
            var message = isSuccessWebApi ? "Successful on webAPI" : "Fail on webApi";
            Console.WriteLine(message);
        }
    }
}
