using Employees.Application.DTOs.Requests;
using Employees.Application.DTOs.Responses;
using Employees.Application.Services;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace EmployeesAPI.Controllers
{
    [Route("/api/Employees")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeesController(IEmployeeService Employeeservice)
        {
            _employeeService = Employeeservice;
        }

        /// <summary>
        /// get all Employees.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [SwaggerResponse(StatusCodes.Status200OK, "Successfully returned list of employees",
            typeof(IEnumerable<GetEmployeeDTO>))]
        public async Task<IActionResult> GetEmployees()
        {
            return Ok(await _employeeService.GetEmployeesAsync());
        }

        /// <summary>
        /// get a employee by id.
        /// </summary>
        /// <param name="employeeId"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{employeeId}")]
        [SwaggerResponse(StatusCodes.Status200OK, "Successfully get an employee", typeof(GetEmployeeDTO))]
        [SwaggerResponse(StatusCodes.Status404NotFound, "Not Found", typeof(ProblemDetails))]
        public async Task<IActionResult> GetEmployee(int employeeId)
        {
            var employee = await _employeeService.GetEmployeeAsync(employeeId);

            return Ok(employee);
        }

        /// <summary>
        /// create a new Employee.
        /// </summary>
        /// <param name="employee"></param>
        /// <returns>bool</returns>
        [HttpPost]
        [Route("/api/Employees")]
        [SwaggerResponse(StatusCodes.Status200OK, "Successfully a added employee", typeof(bool))]
        public async Task<IActionResult> AddEmployee(CreateUpdateEmployeeRequestDTO employee)
        {
            var result = await _employeeService.CreateEmployeeAsync(employee);

            return Ok(result);
        }

        /// <summary>
        /// update existing user.
        /// </summary>
        /// <param name="employeeId"></param>
        /// <param name="employeeToUpdate"></param>
        /// <returns>bool</returns>
        [HttpPut]
        [Route("{employeeId}")]
        [SwaggerResponse(StatusCodes.Status200OK, "Successfully update an employee", typeof(bool))]
        [SwaggerResponse(StatusCodes.Status404NotFound, "Not Found", typeof(ProblemDetails))]
        public async Task<IActionResult> UpdateEmployee(int employeeId, CreateUpdateEmployeeRequestDTO employeeToUpdate)
        {
            var result = await _employeeService.UpdateEmployeeAsync(employeeId, employeeToUpdate);
            return Ok(result);
        }

        /// <summary>
        /// delete existing user.
        /// </summary>
        /// <param name="employeeId"></param>
        /// <returns></returns>
        [HttpDelete]
        [Route("{employeeId}")]
        [SwaggerResponse(StatusCodes.Status200OK, "Successfully delete an employee", typeof(bool))]
        [SwaggerResponse(StatusCodes.Status404NotFound, "Not Found", typeof(ProblemDetails))]
        public async Task<IActionResult> DeleteUser(int employeeId)
        {
            var result = await _employeeService.DeleteEmployeeAsync(employeeId);
            return Ok(result);
        }
    }
}