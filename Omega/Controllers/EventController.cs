using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Omega.Exceptions;
using Omega.Models;
using Omega.Models.DAOModels;
using System.Data.SqlClient;

namespace Omega.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        DAOEvent events = new DAOEvent();

        public EventController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok();
        }


        [HttpGet]
        [Route("/api/calendar/event/get/{eventId}")]
        public IActionResult GetEvent(int eventId)
        {
            try
            {
                var eventElement = events.GetEventById(eventId);
                return Ok(eventElement);
                
            }
            catch (InvalidInput ex)
            {

                return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpGet]
        [Route("/api/calendar/events/{userId}")]
        public IActionResult GetEvents(int userId)
        {
            try
            {
                var events = this.events.GetAllByUser(userId);
                return Ok(events);
            }
            catch (InvalidInput ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }



        [HttpPost]
        [Route("/api/calendar/createEvent/{userId}")]
        public IActionResult Post([FromBody] Event eventData, int userid)
        {
            try
            {
                
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

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            catch (InvalidInput ex)
            {

                return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
            }
            return Ok();
        }


        [HttpPut("{eventId:int}")]
        [Route("/api/calendar/event/put/{eventId}")]
        public IActionResult Put(int eventId,[FromBody]Event eventData)
        {
            try
            {
                events.Update(eventData, eventId);
                return Ok();
            }
            catch (InvalidInput ex)
            {
                // log the exception or return an error response
                return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                // log the exception or return an error response
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message} {ex.StackTrace}");
            }
        }

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
                // log the exception or return an error response
                return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                // log the exception or return an error response
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

    }
}
