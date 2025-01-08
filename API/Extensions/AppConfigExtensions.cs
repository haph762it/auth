﻿using API.Models;

namespace API.Extensions
{
    public static class AppConfigExtensions
    {
        public static WebApplication ConfigureCORS(this WebApplication app, IConfiguration config)
        {
            app.UseCors(options =>
              options.WithOrigins("http://localhost:4200")
              .AllowAnyMethod()
              .AllowAnyHeader());
            return app;
        }

        public static IServiceCollection AddAppConfig(this IServiceCollection services, IConfiguration config)
        {
            var setting = config.GetSection("AppSettings");
            services.Configure<AppSettings>(setting);
            return services;
        }
    }
}
