using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ReDo.server.Entities;

namespace ReDo.server.Data;

public class ReDoDbContext : IdentityDbContext<UserEntity> {
    public ReDoDbContext(DbContextOptions<ReDoDbContext> options) : base(options) {
    }

    public DbSet<UserEntity> UserEntities { get; set; }
    public DbSet<ReDoItemEntity> ItemEntities { get; set; }
}

