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

    private static ReDoItemDto ConvertEntityToDto(ReDoItemEntity entity) {
        return new ReDoItemDto(entity.ReDoItemEntityId, entity.Description, entity.AddedDateTime, entity.FinishedDateTime,
            entity.IsFinished); 
    }

    public async Task<IEnumerable<ReDoItemDto>> GetAllItemsForUser(string userId) {
        var itemEntities = await _context.ItemEntities
            .ToListAsync(); 

        var output = itemEntities
            .Where(i => i.UserEntityId == userId)
            .Select(i => ConvertEntityToDto(i));
        
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

        var itemDto = ConvertEntityToDto(item!); 
        
        return itemDto; 
    }


    public async Task<Result<ReDoItemDto>> DeleteLastAddedItem(string userId) {
        var items = await _context.ItemEntities
            .Where(i => i.UserEntityId == userId)
            .ToListAsync();
        
        if (items.IsNullOrEmpty()) {
            var error = new ArgumentException($"No items for userId {userId}");
            return new Result<ReDoItemDto>(error); 
        }

        var lastAddedItem = items.Last();

        _context.ItemEntities.Remove(lastAddedItem);
        await _context.SaveChangesAsync(); 
        
        var itemDto = ConvertEntityToDto(lastAddedItem!); 
        
        return itemDto; 
    }
    
    
    public async Task<Result<IEnumerable<ReDoItemDto>>> DeleteAllItems(string userId) {
        var items = await _context.ItemEntities
            .Where(i => i.UserEntityId == userId)
            .ToListAsync();
        
        if (items.IsNullOrEmpty()) {
            var error = new ArgumentException($"No items for userId {userId}");
            return new Result<IEnumerable<ReDoItemDto>>(error); 
        }

        _context.ItemEntities.RemoveRange(items);
        await _context.SaveChangesAsync();

        var itemDtos = items.Select(i => ConvertEntityToDto(i))
            .ToList();  
        
        return itemDtos; 
    }
}