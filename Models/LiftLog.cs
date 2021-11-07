using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LiftApi.Models
{
    public class LiftLog
    {
        [Key]
        public int Id { get; set; }
        [Timestamp]
        public byte[] CalledOn { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Status { get; set; }
        [Required]
        public int CurrentFloor { get; set; }
    }
}
