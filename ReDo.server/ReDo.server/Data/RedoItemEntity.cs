namespace ReDo.server.Data;

public class ReDoItemEntity
{

    public int ReDoItemEntityId { get; set; }
    public string Description { get; set; } = string.Empty;
    public DateTime AddedDateTime { get; set; }
    public DateTime? FinishedDateTime { get; set; }

    public bool IsFinished => FinishedDateTime.HasValue;

    // public int UserEntityId { get; set; }
    public UserEntity? UserEntity { get; set; }
}



