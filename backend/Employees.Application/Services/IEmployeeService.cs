using Employees.Application.DTOs.Requests;
using Employees.Application.DTOs.Responses;

namespace Employees.Application.Services
{
    /// <summary>
    /// interface that represents CRUD operations of employee.
    /// </summary>
    public interface IEmployeeService
    {
        Task<GetEmployeeDTO?> GetEmployeeAsync(int id);

        Task<IEnumerable<GetEmployeeDTO>> GetEmployeesAsync();

        Task<bool> CreateEmployeeAsync(CreateUpdateEmployeeRequestDTO ToAdd);

        Task<bool> UpdateEmployeeAsync(int userId, CreateUpdateEmployeeRequestDTO userToUpdate);

        Task<bool> DeleteEmployeeAsync(int Id);
    }
}