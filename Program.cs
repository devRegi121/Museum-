using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MuseumAPI.Data;
using MuseumAPI.Data.Services;


var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();

        });
});

builder.Services.AddControllers();

//Configure DBContext with SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnectionString")));

//Configure the Services
builder.Services.AddTransient<ArtistService>();
builder.Services.AddTransient<PaintingService>();
builder.Services.AddTransient<GiftService>();
builder.Services.AddTransient<TicketsService>();   
builder.Services.AddTransient<RegistrationService>();
builder.Services.AddScoped<ShoppingCartService>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
AppDbInitializer.Seed(app);

app.UseCors();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

