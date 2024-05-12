using Microsoft.AspNetCore.Identity;

namespace ReDo.server.Data;

public class UserEntity : IdentityUser {
    public int UserEntityId { get; set; }
    public string FirstNAme { get; set; } = string.Empty;
    public int Age { get; set; }

    public ICollection<ReDoItemEntity> ReDoItemEntities { get; set; } = [];
}