using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BM.DataModel
{
    public class BookInfo: BaseInfo
    {
        public string Title { get; set; }

        public string Author { get; set; }

        public string Description { get; set; }

        public long CategoryId { get; set; }

        public int? Status { get; set; }

        public string ImageUrl { get; set; }

        [ForeignKey("CategoryId")]
        public virtual BookCategory BookCategory { get; set; }

        [NotMapped]
        public string StatusName => Enum.GetName(typeof(Enums.BookStatus), Status??0);

        [NotMapped]
        public string BorrowedBy { get; set; }

        [NotMapped]
        public DateTime? PlanReturnDate { get; set; }

        [NotMapped]
        public DateTime? BorrowDate { get; set; }
    }
}
