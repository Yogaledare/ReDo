using Microsoft.EntityFrameworkCore;
using ReDo.server.DTOs;

namespace ReDo.server.Data;

public class ReDoItemRepository {
    private readonly ReDoDbContext _context;

    public ReDoItemRepository(ReDoDbContext context) {
        _context = context;
    }

    public async Task<IEnumerable<ReDoItemDto>> GetAll() {
        var output = await _context.RedoItemEntities.Select(i => new ReDoItemDto(
            i.ReDoItemEntityId,
            i.Description,
            i.AddedDateTime,
            i.FinishedDateTime,
            i.IsFinished
        )).ToListAsync();

        return output; 
    } 
    
    
    
    
}