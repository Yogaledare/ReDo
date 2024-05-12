using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ReDo.server.Data;

public class ReDoDbContext : IdentityDbContext<UserEntity> {
    public ReDoDbContext(DbContextOptions<ReDoDbContext> options) : base(options) {
    }

    public DbSet<UserEntity> UserEntities { get; set; }
    public DbSet<ReDoItemEntity> RedoItemEntities { get; set; }
}


// public ReDoDbContext() : base(new DbContextOptionsBuilder<ReDoDbContext>().UseSqlServer("FallbackConnectionString").Options)
// {
// }


// protected override void OnModelCreating(ModelBuilder modelBuilder)
// {
//
//     modelBuilder.Entity<UserEntity>()
//         .HasMany(u => u.ReDoItemEntities)
//         .WithOne(r => r.UserEntity)
//         .HasForeignKey(r => r.UserEntityId)
//         .OnDelete(DeleteBehavior.Cascade);
//
//     base.OnModelCreating(modelBuilder);
// }