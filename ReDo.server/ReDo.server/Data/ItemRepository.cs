using LanguageExt;
using LanguageExt.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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


    public async Task<Result<ReDoItemDto>> DeleteItem(string userId, int itemId) {
        var items = await _context.ItemEntities
            .Where(i => i.UserEntityId == userId)
            .ToListAsync();
        
        if (items.IsNullOrEmpty()) {
            var error = new ArgumentException($"No items for userId {userId}");
            return new Result<ReDoItemDto>(error); 
        }

        var item = items.FirstOrDefault(i => i.ReDoItemEntityId == itemId);

        if (item.IsNull()) {
            var error = new ArgumentException($"Cannot find itemId {itemId} owned by userId {userId}");
            return new Result<ReDoItemDto>(error); 
        }

        _context.ItemEntities.Remove(item!);
        await _context.SaveChangesAsync();

        var itemDto = new ReDoItemDto(item.ReDoItemEntityId, item.Description, item.AddedDateTime, item.FinishedDateTime,
            item.IsFinished); 
        
        return itemDto; 
    }
}