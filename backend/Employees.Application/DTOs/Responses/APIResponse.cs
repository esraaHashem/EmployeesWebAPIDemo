namespace Employees.Application.DTOs.Responses
{
    public class APIResponse<T>
    {
        public int StatusCode { get; set; }
        public List<T>? Data { get; set; }
    }
}