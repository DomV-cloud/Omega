using Omega.Interfaces.Base;

namespace Omega.Models
{
    /// <summary>
    /// Class representing a user.
    /// </summary>
    public class Users : IBase
    {

        public int Id { get; set; }
        public string? Fname { get; set; }
        public string? Lname { get; set; }
        public string? Email { get; set; }
        public string? Phone_number { get; set; }
        public string? Password { get; set; }


    }
}
