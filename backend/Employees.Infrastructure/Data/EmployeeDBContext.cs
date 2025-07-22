using Employees.Core;
using Microsoft.EntityFrameworkCore;

namespace Employees.Infrastructure.Data;

public class EmployeeDBContext : DbContext
{
    public EmployeeDBContext(DbContextOptions<EmployeeDBContext> options) : base(options)
    {
    }

    public DbSet<Employee> Employees { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Employee>().Property(b => b.Id).ValueGeneratedOnAdd();

        for (int i = 1; i <= 50; i++)
        {
            modelBuilder.Entity<Employee>().HasData(
                new Employee { Id = i, FirstName = $"First Name {i}", LastName = $"Last Name {i}", Position = $"Position {i}", Email = $"Email{i}@gmail.com" }
            );
        }
    }
}