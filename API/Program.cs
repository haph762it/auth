using API.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddSwagger(builder.Configuration);
builder.Services.InjectDbContext(builder.Configuration);
builder.Services.AddAppConfig(builder.Configuration);
builder.Services.AddIdentityHandlersAndStores();
builder.Services.ConfigureIdentityOptions();
builder.Services.AddIdentityAuth(builder.Configuration);



var app = builder.Build();

app.UseSwagger(builder.Configuration);

app.ConfigureCORS(builder.Configuration);

app.AddIdentityAuthMiddlewares();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
