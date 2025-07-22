using Employees.Application.CustomExceptions;
using Employees.Application.DTOs.Requests;
using Employees.Application.DTOs.Responses;
using Employees.Core;
using Employees.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Employees.Application.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly EmployeeDBContext _employeeDBContext;

        public EmployeeService(EmployeeDBContext employeeDBContext)
        {
            _employeeDBContext = employeeDBContext;
        }

        public async Task<bool> CreateEmployeeAsync(CreateUpdateEmployeeRequestDTO employeeToCreate)
        {
            var newEmployee = new Employee
            {
                FirstName = employeeToCreate.FirstName,
                LastName = employeeToCreate.LastName,
                Email = employeeToCreate.Email,
                Position = employeeToCreate.Position,
            };

            await _employeeDBContext.AddAsync(newEmployee);

            var result = await _employeeDBContext.SaveChangesAsync();

            return result > 0;
        }

        public async Task<GetEmployeeDTO?> GetEmployeeAsync(int id)
        {
            var employee = await _employeeDBContext.Employees.FindAsync(id);

            if (employee is null)
            {
                throw new EmployeeNotFoundException("Employee is not found", id);
            }

            return new GetEmployeeDTO
            {
                Id = employee.Id,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Email = employee.Email,
                Position = employee.Position,
            };
        }

        public async Task<IEnumerable<GetEmployeeDTO>> GetEmployeesAsync()
        {
            return await _employeeDBContext.Employees.AsNoTracking()
                                    .Select(b => new GetEmployeeDTO
                                    {
                                        Id = b.Id,
                                        FirstName = b.FirstName,
                                        LastName = b.LastName,
                                        Email = b.Email,
                                        Position = b.Position,
                                    })
                                    .ToListAsync();
        }

        public async Task<bool> UpdateEmployeeAsync(int employeeId, CreateUpdateEmployeeRequestDTO employeeToUpdate)
        {
            var employee = await _employeeDBContext.Employees.FindAsync(employeeId);
            if (employee is null)
            {
                throw new EmployeeNotFoundException("Employee is not found", employeeId);
            }

            employee.FirstName = employeeToUpdate.FirstName;
            employee.LastName = employeeToUpdate.LastName;
            employee.Email = employeeToUpdate.Email;
            employee.Position = employeeToUpdate.Position;

            await _employeeDBContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteEmployeeAsync(int id)
        {
            var employee = await _employeeDBContext.Employees.FindAsync(id);
            if (employee is null)
            {
                throw new EmployeeNotFoundException("Employee is not found", id);
            }

            _employeeDBContext.Employees.Remove(employee);
            await _employeeDBContext.SaveChangesAsync();
            return true;
        }
    }
}