using Microsoft.EntityFrameworkCore;
using todolist.Models.DbEntities;

namespace todolist.DAL
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options)
            : base(options)
        {            
        }

        public virtual DbSet<Todo> Todos { get; set; }

        
    }
}
