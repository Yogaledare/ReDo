using ReDo.server.DTOs;
using ReDo.server.Entities;

namespace ReDo.server.Data;

public interface IItemRepository {
    Task<IEnumerable<ReDoItemDto>> GetAllItemsForUser(string userId);

    Task<bool> ToggleFinished(string userId, int itemId);
    Task<ReDoItemDto> AddItem(string userId, CreateReDoItemDto itemDto);
    

}