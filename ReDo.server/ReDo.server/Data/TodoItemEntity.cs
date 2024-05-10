namespace ReDo.server.Data;

public class TodoItemEntity {

    public int TodoItemEntityId { get; set; }
    public string Description { get; set; } = string.Empty;
    public DateTime AddedDateTime { get; set; }
    public DateTime? FinishedDateTime { get; set; }

    public bool IsFinished => FinishedDateTime.HasValue; 
}



