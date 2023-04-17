using Omega.Interfaces.Base;

namespace Omega.Models
{
    /// <summary>
    /// Class representing a user.
    /// </summary>
    public class Users : IBase
    {
        /// <summary>
        /// Gets or sets the unique identifier of the user.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the first name of the user.
        /// </summary>
        public string? Fname { get; set; }

        /// <summary>
        /// Gets or sets the last name of the user.
        /// </summary>
        public string? Lname { get; set; }

        /// <summary>
        /// Gets or sets the email address of the user.
        /// </summary>
        public string? Email { get; set; }

        /// <summary>
        /// Gets or sets the phone number of the user.
        /// </summary>
        public string? Phone_number { get; set; }

        /// <summary>
        /// Gets or sets the password of the user.
        /// </summary>
        public string? Password { get; set; }
    }
}
