namespace ReDo.server.DTOs;

public record ReDoItemDto(
    int ReDoItemEntityId,
    string Description,
    DateTime AddedDateTime,
    DateTime? FinishedDateTime,
    bool IsFinished
);