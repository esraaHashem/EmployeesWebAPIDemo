using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Employees.Core
{
    public class Employee
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public required string FirstName { get; set; }
        public required string LastName { get; set; }

        public string Email { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
    }
}