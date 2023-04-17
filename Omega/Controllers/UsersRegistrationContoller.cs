using Microsoft.AspNetCore.Mvc;
using Omega.Exceptions;
using Omega.Models;
using Omega.Models.DAOModels;

namespace Omega.Controllers
{
    /// <summary>
    /// Controller responsible for handling user registration requests.
    /// </summary>
    public class UsersRegistrationContoller : Controller
    {
        private readonly DAOUsers _users;

        public UsersRegistrationContoller()
        {
            _users = new DAOUsers();
        }

        /// <summary>
        /// Returns an HTTP OK response for the default Index action.
        /// </summary>
        [HttpGet]
        public IActionResult Index()
        {
            return Ok();
        }

        /// <summary>
        /// Handles user registration requests by saving user information to the database.
        /// </summary>
        /// <param name="user">A <see cref="Users"/> object containing the user's information.</param>
        /// <returns>An HTTP OK response if the user information was successfully saved to the database.</returns>
        [HttpPost]
        [Route("/api/user/registration")]
        public IActionResult Post([FromBody] Users user)
        {
            try
            {
                _users.Save(new Users
                {
                    Fname = user.Fname,
                    Lname = user.Lname,
                    Email = user.Email,
                    Phone_number = user.Phone_number,
                    Password = user.Password
                });
            }
            catch (NullReferenceException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            catch (InvalidInput ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
            }

            return Ok();
        }
    }

}

