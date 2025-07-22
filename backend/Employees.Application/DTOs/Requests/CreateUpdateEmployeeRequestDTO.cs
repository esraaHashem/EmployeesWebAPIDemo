using System.ComponentModel.DataAnnotations;

namespace Employees.Application.DTOs.Requests
{
    public class CreateUpdateEmployeeRequestDTO
    {
        /// <summary>
        /// first name of the user.
        /// </summary>
        public required string FirstName { get; set; }

        /// <summary>
        /// last name of the user.
        /// </summary>
        public required string LastName { get; set; }

        /// <summary>
        /// email of the user.
        /// </summary>
        [EmailAddress]
        public required string Email { get; set; } = string.Empty;

        /// <summary>
        /// position of the user.
        /// </summary>
        public string Position { get; set; } = string.Empty;
    }
}