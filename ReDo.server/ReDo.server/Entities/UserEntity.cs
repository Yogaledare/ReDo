using Microsoft.AspNetCore.Identity;

namespace ReDo.server.Entities;

public class UserEntity : IdentityUser {
    public ICollection<ReDoItemEntity> ReDoItemEntities { get; set; } = [];
}