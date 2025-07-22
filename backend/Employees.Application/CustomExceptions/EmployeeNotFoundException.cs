namespace Employees.Application.CustomExceptions
{
    public class EmployeeNotFoundException : Exception
    {
        public int EmployeeId { get; }

        public EmployeeNotFoundException(string message, int employeeId) : base(message)
        {
            EmployeeId = employeeId;
        }
    }
}