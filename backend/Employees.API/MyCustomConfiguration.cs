using Employees.Application.Services;
using Employees.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Employees.API
{
    /// <summary>
    ///
    /// </summary>
    public static class MyCustomConfiguration
    {
        /// <summary>
        ///
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection InjectServices(this IServiceCollection services)
        {
            services.AddScoped<IEmployeeService, EmployeeService>();

            return services;
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        ///
        public static IServiceCollection InjectDBContexts(this IServiceCollection services)
        {
            services.AddDbContext<EmployeeDBContext>(options =>
            {
                options.UseInMemoryDatabase("UsersDB");
            });
            return services;
        }
    }
}