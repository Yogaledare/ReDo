using Microsoft.EntityFrameworkCore;
using ReDo.server.DTOs;
using ReDo.server.Entities;

namespace ReDo.server.Data;

public class ItemRepository : IItemRepository {
    private readonly ReDoDbContext _context;

    public ItemRepository(ReDoDbContext context) {
        _context = context;
    }

    public async Task<IEnumerable<ReDoItemDto>> GetAllItemsForUser(string userId) {
        Console.WriteLine("inside getALlitemsforUsEr------------------");
        
        var itemEntities = await _context.ItemEntities
            .ToListAsync(); 
            
        Console.WriteLine($"count: {itemEntities.Count}");


        var output = itemEntities
            .Where(i => i.UserEntityId == userId)
            .Select(i => new ReDoItemDto(
                i.ReDoItemEntityId,
                i.Description,
                i.AddedDateTime,
                i.FinishedDateTime,
                i.IsFinished
            ));
            // .ToListAsync();

        
        // foreach (var reDoItemDto in output) {
            // Console.WriteLine(reDoItemDto);
        // }

        return output;
    }

    public async Task<bool> ToggleFinished(string userId, int itemId) {

        var item = await _context.ItemEntities
            .Where(i => i.UserEntityId == userId)
            .FirstOrDefaultAsync(i => i.ReDoItemEntityId == itemId);

        if (item == null) return false;

        item.FinishedDateTime = item.FinishedDateTime.HasValue ? null : DateTime.Now;
        _context.ItemEntities.Update(item);
        await _context.SaveChangesAsync();
        
        return true; 
    }

    public async Task<ReDoItemDto> AddItem(string userId, CreateReDoItemDto itemDto) {
        var newItem = new ReDoItemEntity {
            Description = itemDto.Description,
            AddedDateTime = DateTime.Now,
            UserEntityId = userId
        };

        _context.ItemEntities.Add(newItem);
        await _context.SaveChangesAsync();
        
        var newItemDto = new ReDoItemDto(newItem.ReDoItemEntityId, newItem.Description, newItem.AddedDateTime,
            newItem.FinishedDateTime, newItem.IsFinished); 

        return newItemDto; 
    }
}