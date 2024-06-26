using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using ReDo.server.Data;
using ReDo.server.Endpoints;
using ReDo.server.Entities;
using ReDo.server.Validation;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(); 

builder.Services.AddCors(options => {
    options.AddPolicy("AllowAll", policy => {
        policy.AllowAnyOrigin() // For development, allow any origin
            .AllowAnyMethod()
            .AllowAnyHeader()
            // .AllowCredentials()
            // .WithOrigins("http://localhost:5173")
            ;
    });
});

builder.Services.AddScoped<IItemRepository, ItemRepository>(); 

builder.Services.AddDbContext<ReDoDbContext>(options => {
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")
        );
    }
);

builder.Services.AddIdentityApiEndpoints<UserEntity>()
    .AddEntityFrameworkStores<ReDoDbContext>();

builder.Services.AddAuthorization();

builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<CreateReDoItemDtoValidator>(); 


var app = builder.Build();

app.UseCors("AllowAll");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapIdentityApi<UserEntity>();

app.UseHttpsRedirection();

// app.UseAuthentication();
// app.UseAuthorization();

app.MapMemberEndpoints();
app.MapItemEndpoints();



app.Run();



