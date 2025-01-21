public class MuseumDbContext : DbContext
{
    public MuseumDbContext(DbContextOptions<MuseumDbContext> options) : base(options)
    {
    }

    public DbSet<Work> Works { get; set; }
}
