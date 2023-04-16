using Microsoft.AspNetCore.Mvc;
using Omega.Models;
using Omega.Models.DAOModels;

namespace Omega.ClientApp.src.components.Calendar
{
    public class CategoryController : Controller
    {

        DAOCategory dAOcategory = new DAOCategory();
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("/api/categories")]
        public IActionResult GetCategories()
        {
            try
            {
                var categories = dAOcategory.GetCategories();
                return Ok(categories);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
           
        }
    }
}
