using System.Security.Claims;
using ReDo.server.Data;

namespace ReDo.server.Endpoints;

public static class ItemEndpoints {
    public static void MapItemEndpoints(this WebApplication app) {
        app.MapGet("/items", async (
                    IItemRepository repository,
                    ClaimsPrincipal user
                ) => {
                    var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
                    Console.WriteLine($"inside get, user id: {userId}");

                    if (userId == null) {
                        return Results.BadRequest("User ID not found in claims.");
                    }

                    var redoItemDtos = await repository.GetAllItemsForUser(userId);

                    return Results.Ok(redoItemDtos);
                }
            )
            .RequireAuthorization()
            .WithOpenApi();
    }
}