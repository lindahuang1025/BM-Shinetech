using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BM.Common.FileHelper
{
    public class FileReadWrite
    {
        public static string FileRead(string filePath)
        {
            var context = "";
            using (StreamReader sr = new StreamReader(filePath))
            {
                context = sr.ReadToEnd();
            }
            return context;
        }

        public static void FileWrite(string filePath, string context)
        {
            if (!File.Exists(filePath))
            {
                var directory = Path.GetDirectoryName(filePath);
                if (!Directory.Exists(directory))
                {
                    Directory.CreateDirectory(directory);
                }
                File.Create(filePath).Close();
                File.AppendAllText(filePath, context);
            }
        }
    }
}
