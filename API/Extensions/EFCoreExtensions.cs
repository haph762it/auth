using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class EFCoreExtensions
    {
        public static IServiceCollection InjectDbContext(
           this IServiceCollection services,
           IConfiguration config)
        {
            services.AddDbContext<AppDbContext>(options =>
                     options.UseSqlServer(config.GetConnectionString("DevDB")));
            return services;
        }
    }
}
