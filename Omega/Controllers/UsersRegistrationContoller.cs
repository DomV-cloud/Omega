using Microsoft.AspNetCore.Mvc;
using Omega.Exceptions;
using Omega.Models;
using Omega.Models.DAOModels;

namespace Omega.Controllers
{
    public class UsersRegistrationContoller : Controller
    {
       
        DAOUsers users = new DAOUsers();
        
        [HttpGet]
        public IActionResult Index()
        {
            return Ok();
        }
        [HttpPost]
        [Route("/api/user/registration")]
        public IActionResult Post([FromBody] Users user)
        {
            try
            {
                users.Save(new Users
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
