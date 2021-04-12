using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BM.DataModel
{
    public class UserComments:BaseInfo
    {
        [Required]
        [StringLength(256)]
        public string UserName { get; set; }

        [Required]
        public string Comment { get; set; }
    }
}
