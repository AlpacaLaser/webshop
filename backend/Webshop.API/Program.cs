using Webshop.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Service regisztráció — ezért tudja a .NET "beinjektálni"
builder.Services.AddSingleton<ProductService>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS — engedélyezzük az Angular frontendnek hogy elérje az API-t
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("AllowAngular");
app.UseAuthorization();
app.MapControllers();

app.Run();