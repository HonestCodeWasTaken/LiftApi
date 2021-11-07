using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LiftApi.Models
{
    public class Lift
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int CurrentFloor { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Status { get; set; }
        [Column(TypeName = "nvarchar(30)")]
        public string Direction { get; set; }
        [Required]
        public int FloorsItCanGoUpTo { get; set; }
    }
}
