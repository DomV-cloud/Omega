using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Omega.Exceptions;
using Omega.Models;
using Omega.Models.DAOModels;
using System.Data.SqlClient;

namespace Omega.Controllers
{

    /// <summary>
    /// Event controller for Web API.
    /// This event allows CRUD operations
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class EventController : ControllerBase
    {
        //Initialization of the configuration file 
        private readonly IConfiguration _configuration;
        
        
        //Initialization of the DAOEvent class, which uses Repository pattern
        DAOEvent events = new DAOEvent();

        /// <summary>
        /// Contructor for controller that enables connection to database
        /// </summary>
        /// <param name="configuration">configuration file for connection into the database</param>
        public EventController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        /// <summary>
        /// HTTP method GET request which render/return UI(view)
        /// </summary>
        /// <returns>UI(view)</returns>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok();
        }

        /// <summary>
        /// HTTP method sends GET request which return all events based on event ID
        /// </summary>
        /// <param name="eventId">id of the event</param>
        /// <returns>all events whit specific id</returns>
        [HttpGet]
        [Route("/api/calendar/event/get/{eventId}")]
        public IActionResult GetEvent(int eventId)
        {
            try
            {
                // Call method GetEventById(eventId) from DAO class
                var eventElement = events.GetEventById(eventId);
                return Ok(eventElement);
                
            }
            catch (InvalidInput ex)
            {
                // Handle the InvalidInput exception thrown by the DAO method
                // Return an error response with status code 400 Bad Request
                return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                // Handle the InvalidInput exception thrown by the DAO method
                // Return an error response with status code 400 Bad Request
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        /// <summary>
        /// HTTP method sends GET request, which retrieves all user's events based on user's Id
        /// </summary>
        /// <param name="userId">Id of the user</param>
        /// <returns>all user's events based on user's Id</returns>
        [HttpGet]
        [Route("/api/calendar/events/{userId}")]
        public IActionResult GetEvents(int userId)
        {
            try
            {
                // Call method GetAllByUser(userId) from DAO class
                var events = this.events.GetAllByUser(userId);
                return Ok(events);
            }
            catch (InvalidInput ex)
            {
                // Handle the InvalidInput exception thrown by the DAO method
                // Return an error response with status code 400 Bad Request
                return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                // Handle the InvalidInput exception thrown by the DAO method
                // Return an error response with status code 500 Internal Server Error
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        /// <summary>
        /// HTTP method sends POST request.
        /// Creates new user's event.
        /// </summary>
        /// <param name="eventData">Event data I want to store</param>
        /// <param name="userid">Id of the user who want to store new event</param>
        /// <returns></returns>
        [HttpPost]
        [Route("/api/calendar/createEvent/{userId}")]
        public IActionResult Post([FromBody] Event eventData, int userid)
        {
            try
            {
                // Save method from DAO class that stores new data into Database
                events.Save(new Event
                {
                    Event_name = eventData.Event_name,
                    Event_date = eventData.Event_date,
                    Fk_event_user = eventData.Fk_event_category,
                    Fk_event_category = eventData.Fk_event_category,
                }, userid, 1);
            }
            catch (NullReferenceException ex)
            {
                // Handle the InvalidInput exception thrown by the DAO method
                // Return an error response with status code 400 Bad Request
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            catch (InvalidInput ex)
            {
                // Handle the InvalidInput exception thrown by the DAO method
                // Return an error response with status code 500 Internal Server Error
                return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
            }
            return Ok();
        }




        /// <summary>
        /// HTTP method sends PUT request for updating event 
        /// </summary>
        /// <param name="eventId">Id of the user</param>
        /// <param name="eventData">Data which user want to update</param>
        /// <returns></returns>
        [HttpPut("{eventId:int}")]
        [Route("/api/calendar/event/put/{eventId}")]
        public IActionResult Put(int eventId,[FromBody]Event eventData)
        {
            try
            {
                // Call Update() method from DAO, which updates event in database
                events.Update(eventData, eventId);
                return Ok();
            }
            catch (InvalidInput ex)
            {
                // Handle the InvalidInput exception thrown by the DAO method
                // Return an error response with status code 400 Bad Request
                return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                // Handle the InvalidInput exception thrown by the DAO method
                // Return an error response with status code 500 Internal Server Error
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message} {ex.StackTrace}");
            }
        }

        /// <summary>
        /// HTTP method DELETE sends request for deleting specific event
        /// </summary>
        /// <param name="id">id of the event user want to delete</param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        [Route("/api/calendar/event/delete/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                events.DeleteEventById(id);              
                return Ok();
            }
            catch (InvalidInput ex)
            {
                // Handle the InvalidInput exception thrown by the DAO method
                // Return an error response with status code 400 Bad Request
                return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                // Handle the InvalidInput exception thrown by the DAO method
                // Return an error response with status code 500 Internal Server Error
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

    }
}
