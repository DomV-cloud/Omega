using Omega.Interfaces.Base;

namespace Omega.Models
{
    /// <summary>
    /// Class representing a user.
    /// </summary>
    public class Users : IBase
    {
        private int id;
        private string fname;
        private string lname;
        private string email;
        private string phone_number;


        /// <summary>
        /// Constructor for creating a User object.
        /// </summary>
        /// <param name="fname">User's first name.</param>
        /// <param name="lname">User's last name.</param>
        /// <param name="phone_number">User's phone number.</param>
        public Users(string fname = "", string lname = "", string email = "", string phone_number = "")
        {
            this.id = 0;
            this.fname = fname;
            this.lname = lname;
            this.email = email;
            this.phone_number = phone_number;
        }

        public override string? ToString()
        {
            return "id:" + id + "fname:" + fname + "lname:" + lname + "phone:" + phone_number;
        }
        /// <summary>
        /// Gets or sets id of the User
        /// </summary>
        public int Id { get => id; set => id = value; }

        /// <summary>
        /// Gets or sets the first name of the User.
        /// </summary>
        public string Fname { get => fname; set => fname = value; }

        /// <summary>
        /// Gets or sets the last name of the User.
        /// </summary>
        public string Lname { get => lname; set => lname = value; }

        /// <summary>
        /// Gets or sets the phone number of the User.
        /// </summary>
        public string Phone_number { get => phone_number; set => phone_number = value; }

        /// <summary>
        /// Gets or sets the email of the User.
        /// </summary>
        public string Email { get => email; set => email = value; }
    }
}
