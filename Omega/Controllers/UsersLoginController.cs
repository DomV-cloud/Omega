using Microsoft.AspNetCore.Mvc;
using Omega.Exceptions;
using Omega.Models;
using Omega.Models.DAOModels;

namespace Omega.Controllers
{
    /// <summary>
    /// Controller for handling user authentication and login.
    /// </summary>
    public class UsersLoginController : Controller
    {
        private DAOUsers users = new DAOUsers();

        /// <summary>
        /// Default endpoint to handle HTTP GET requests to "/api/user".
        /// </summary>
        /// <returns>An HTTP 200 OK response.</returns>
        [HttpGet]
        [Route("/api/user")]
        public IActionResult Index()
        {
            return Ok();
        }

        /// <summary>
        /// Endpoint to handle HTTP GET requests to "/api/user/auth".
        /// Authenticates the user with the provided email and password.
        /// </summary>
        /// <param name="email">The user's email.</param>
        /// <param name="password">The user's password.</param>
        /// <returns>An HTTP 200 OK response with the user's data if authenticated successfully, or an HTTP 401 Unauthorized response if the authentication fails.</returns>
        [HttpGet]
        [Route("/api/user/auth")]
        public IActionResult Login(string email, string password)
        {
            try
            {
                var user = users.Authetication(email, password);
                if (user == null)
                {
                    return StatusCode(StatusCodes.Status401Unauthorized, "Invalid email or password");
                }
                else
                {
                    return Ok(user);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

    }
}
