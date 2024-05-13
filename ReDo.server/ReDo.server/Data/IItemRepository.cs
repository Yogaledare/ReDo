using ReDo.server.DTOs;

namespace ReDo.server.Data;

public interface IItemRepository {
    Task<IEnumerable<ReDoItemDto>> GetAllItemsForUser(string userId);

    Task<bool> ToggleFinished(string userId, int itemId); 
}