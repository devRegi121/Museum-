using Microsoft.EntityFrameworkCore;
using Projekti.Models;

namespace Projekti.Data
{
    public class MuseumDbContext : DbContext
    {
        public MuseumDbContext(DbContextOptions<MuseumDbContext> options) : base(options) { }

        public DbSet<Work> Works { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Optional: Seed initial data
            modelBuilder.Entity<Work>().HasData(
                new Work
                {
                    Id = 1,
                    Name = "The School of Athens",
                    Artist = "Raphael",
                    Description = "A fresco representing philosophy and knowledge.",
                    Category = "Fresco",
                    CreationDate = new DateTime(1510, 1, 1),
                    Era = "Renaissance",
                    CreationDateText = "1510-01-01"  // Add value for CreationDateText
                }
            );
        }
    }
}
