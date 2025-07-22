using System.ComponentModel.DataAnnotations;

namespace Employees.Application.DTOs.Requests
{
    public class CreateUpdateEmployeeRequestDTO
    {
        /// <summary>
        /// first name of the user.
        /// </summary>
        [Required]
        public string FirstName { get; set; } = string.Empty;

        /// <summary>
        /// last name of the user.
        /// </summary>
        [Required]
        public string LastName { get; set; } = string.Empty;

        /// <summary>
        /// email of the user.
        /// </summary>
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// position of the user.
        /// </summary>
        public string Position { get; set; } = string.Empty;
    }
}