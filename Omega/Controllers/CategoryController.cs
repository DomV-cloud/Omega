using Microsoft.AspNetCore.Mvc;
using Omega.Models;
using Omega.Models.DAOModels;

namespace Omega.ClientApp.src.components.Calendar
{
    // The CategoryController class handles requests related to categories in the calendar.
    public class CategoryController : Controller
    {
        // A DAOCategory object used to interact with the database.
        DAOCategory dAOcategory = new DAOCategory();

        // Returns the index view for categories.
        public IActionResult Index()
        {
            return View();
        }

        // HTTP GET method for getting all categories.
        [HttpGet]
        [Route("/api/categories")]
        public IActionResult GetCategories()
        {
            try
            {
                // Retrieves all categories from the database using the DAOCategory object.
                var categories = dAOcategory.GetCategories();
                // Returns the retrieved categories as a response with a 200 status code.
                return Ok(categories);
            }
            catch (Exception ex)
            {
                // Returns an error response with a 500 status code if an exception occurs.
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

        }
    }
}
