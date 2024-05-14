﻿using System.Security.Claims;
using ReDo.server.Data;
using ReDo.server.DTOs;

namespace ReDo.server.Endpoints;

public static class ItemEndpoints {
    public static void MapItemEndpoints(this WebApplication app) {
        app.MapGet("/items", async (
                IItemRepository repository,
                ClaimsPrincipal user
            ) => {
                var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

                if (userId == null) {
                    return Results.BadRequest("User ID not found in claims.");
                }

                var redoItemDtos = await repository.GetAllItemsForUser(userId);

                return Results.Ok(redoItemDtos);
            })
            .RequireAuthorization()
            .WithOpenApi();


        app.MapPut("/items/toggle-finish/{id}", async (
                int id,
                IItemRepository repository,
                ClaimsPrincipal user
            ) => {
                var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

                if (userId == null) {
                    return Results.BadRequest("User ID not found.");
                }

                var success = await repository.ToggleFinished(userId, id);

                if (!success) {
                    return Results.NotFound("Item not found or not accessible.");
                }

                return Results.Ok("Item finish time toggled successfully.");
            })
            .RequireAuthorization()
            .WithOpenApi();


        app.MapPost("/items", async (
                CreateReDoItemDto itemDto,
                IItemRepository repository,
                ClaimsPrincipal user
            ) => {
                var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

                if (userId == null) {
                    return Results.BadRequest("User ID not found.");
                }

                try {
                    var newItem = await repository.AddItem(userId, itemDto);
                    return Results.Created($"/items/{newItem.ReDoItemEntityId}", newItem);
                }
                catch (Exception ex) {
                    return Results.Problem(ex.Message);
                }
            })
            .RequireAuthorization()
            .WithOpenApi(); 
    }
}