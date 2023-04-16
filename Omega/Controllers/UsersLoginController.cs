using Microsoft.AspNetCore.Mvc;
using Omega.Exceptions;
using Omega.Models;
using Omega.Models.DAOModels;

namespace Omega.Controllers
{
    public class UsersLoginController : Controller
    {
        DAOUsers users = new DAOUsers();

        [HttpGet]
        [Route("/api/user")]
        public IActionResult Index()
        {
            return Ok();
        }

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
