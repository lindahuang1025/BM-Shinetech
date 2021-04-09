using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BM.DataModel
{
    public class BaseInfo
    {
        [Key]
        public long Id { get; set; }

        [StringLength(256)]
        public string UpdateBy { get; set; }

        public DateTime UpdateDate { get; set; }
    }
}
