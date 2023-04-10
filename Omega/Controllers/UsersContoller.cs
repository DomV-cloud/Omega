using Microsoft.AspNetCore.Mvc;
using Omega.Exceptions;
using Omega.Models.DAOModels;

namespace Omega.Controllers
{
    public class UsersContoller : Controller
    {
        DAOUsers users = new DAOUsers();
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]

        public IActionResult GetAll()
        {
            try
            {
                users.GetAll();
                return Ok();
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpDelete]
        [Route("/user/delete/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                if (id < 0 || id.GetType() != typeof(int) )
                {
                    throw new InvalidInput("Invalid inputs.");
                }
                users.Delete(id);
                return Ok();
            }
            catch (InvalidInput ex)
            {
                return StatusCode(400, ex.Message);
            }
            
        }
    }
}
