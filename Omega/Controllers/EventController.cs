using Microsoft.AspNetCore.Mvc;
using Omega.Models;
using System.Data.SqlClient;

namespace Omega.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventController : ControllerBase
    {
        private readonly IConfiguration _configuration;

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
        [Route("/api/calendar/events")]
        public IActionResult GetEvents()
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Omega_Conn")))
                {
                    connection.Open();

                    string query = "SELECT * FROM Event_Test";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            List<EventDto> events = new List<EventDto>();
                            while (reader.Read())
                            {
                                events.Add(new EventDto
                                {
                                    Id = (int)reader["Id"],
                                    Description = (string)reader["Description"],
                                    Date = (DateTime)reader["Date"]
                                });
                            }
                            return Ok(events);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // log the exception or return an error response
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("/api/calendar/createEvent")]
        public IActionResult Post(EventDto eventData)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Omega_Conn")))
                {
                    connection.Open();

                    string query = "INSERT INTO Event_Test (Description, Date) VALUES (@description,@date )";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@description", eventData.Description);
                        command.Parameters.AddWithValue("@date", eventData.Date);
                        command.ExecuteNonQuery();
                    }
                }

                return Ok();
            }
            catch (Exception ex)
            {
                // log the exception or return an error response
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPut("{id:int}")]
        [Route("/api/calendar/event/put/{id}")]
        public IActionResult Put(int id, [FromBody] EventDto eventData)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Omega_Conn")))
                {
                    connection.Open();

                    string query = "UPDATE Event_Test SET Description = @description, Date = @date WHERE Id = @id";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@id", id);
                        command.Parameters.AddWithValue("@description", eventData.Description);
                        command.Parameters.AddWithValue("@date", eventData.Date);
                        command.ExecuteNonQuery();
                    }
                }

                return Ok();
            }
            catch (Exception ex)
            {
                // log the exception or return an error response
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        [Route("/api/calendar/event/delete/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Omega_Conn")))
                {
                    connection.Open();

                    string query = "DELETE FROM Event_Test WHERE Id = @id";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@id", id);
                        command.ExecuteNonQuery();
                    }
                }

                return Ok();
            }
            catch (Exception ex)
            {
                // log the exception or return an error response
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

    }
}
