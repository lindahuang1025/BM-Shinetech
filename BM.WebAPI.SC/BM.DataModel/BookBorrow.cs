using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BM.DataModel
{
    public class BookBorrow: BaseInfo
    {
        public long BookId { get; set; }
        public long BorrowUserId { get; set; }
        public int Status { get; set; } 
        public DateTime? PlanReturnDate { get; set; }
        public DateTime? BorrowDate { get; set; }
        public DateTime? ReturnDate { get; set; }

        [ForeignKey("BookId")]
        public virtual BookInfo BookInfo { get; set; }

        [NotMapped]
        public string StatusName => Enum.GetName(typeof(Enums.BookStatus), Status);
    }
}
