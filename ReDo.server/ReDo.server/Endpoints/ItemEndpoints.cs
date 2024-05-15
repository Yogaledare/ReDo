using System.Security.Claims;
using FluentValidation;
using LanguageExt.Common;
using Microsoft.AspNetCore.Mvc;
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
                ClaimsPrincipal user,
                IValidator<CreateReDoItemDto> validator
            ) => {
                var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

                if (userId == null) {
                    return Results.BadRequest("User ID not found.");
                }

                var validationResult = await validator.ValidateAsync(itemDto);

                if (!validationResult.IsValid) {
                    return Results.Problem(new ValidationProblemDetails {
                        Status = StatusCodes.Status400BadRequest,
                        Title = "Validation Error",
                        Detail = "One or more server side validation errors",
                        Errors = validationResult.ToDictionary(),
                    });
                }

                try {
                    var newItemDto = await repository.AddItem(userId, itemDto);
                    return Results.Created($"/items/{newItemDto.ReDoItemEntityId}", newItemDto);
                }
                catch (Exception ex) {
                    return Results.Problem(ex.Message);
                }
            })
            .RequireAuthorization()
            .WithOpenApi();


        app.MapDelete("/items/{id}", async (
                int id,
                IItemRepository repository,
                ClaimsPrincipal user
            ) => {
                var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

                if (userId == null) {
                    return Results.BadRequest("User ID not found.");
                }

                var result = await repository.DeleteItem(userId, id);

                return result.Match(
                    Succ: item => {
                        return Results.Ok(item);
                    },
                    Fail: ex => Results.Problem(ex.Message, statusCode: StatusCodes.Status400BadRequest));
            })
            .RequireAuthorization()
            .WithOpenApi()
            ;


        app.MapDelete("/items/last", async (
                IItemRepository repository,
                ClaimsPrincipal user
            ) => {
                var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

                if (userId == null) {
                    return Results.BadRequest("User ID not found.");
                }

                var result = await repository.DeleteLastAddedItem(userId);

                return result.Match(
                    Succ: item => {
                        return Results.Ok(item);
                    },
                    Fail: ex => Results.Problem(ex.Message, statusCode: StatusCodes.Status400BadRequest));
            })
            .RequireAuthorization()
            .WithOpenApi();


        app.MapDelete("/items", async (
                IItemRepository repository,
                ClaimsPrincipal user
            ) => {
                var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

                if (userId == null) {
                    return Results.BadRequest("User ID not found.");
                }

                var result = await repository.DeleteAllItems(userId);

                return result.Match(
                    Succ: items => {
                        return Results.Ok(items);
                    },
                    Fail: ex => Results.Problem(ex.Message, statusCode: StatusCodes.Status400BadRequest));
            })
            .RequireAuthorization()
            .WithOpenApi();
    }
}