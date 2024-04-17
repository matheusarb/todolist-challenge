using System.ComponentModel.DataAnnotations;

namespace todolist.Models.DbEntities
{
    public class Todo
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public bool IsComplete { get; set; }
    }
}
