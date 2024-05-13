using Microsoft.EntityFrameworkCore;
using ReDo.server.DTOs;

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
}