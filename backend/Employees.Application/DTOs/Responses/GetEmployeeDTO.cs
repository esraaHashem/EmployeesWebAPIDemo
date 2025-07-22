﻿namespace Employees.Application.DTOs.Responses
{
    public class GetEmployeeDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        public string Position { get; set; } = string.Empty;
    }
}