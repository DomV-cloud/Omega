using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Omega.Exceptions;
using Omega.Interfaces.Repository;
using System.Data.SqlClient;

namespace Omega.Models.DAOModels
{
    /// <summary>
    /// Data Access Object for Event entities. Implements the IEventRepository interface.
    /// </summary>
    public class DAOEvent : IEventRepository<Event>
    {
        IConfiguration _configuration;
        string query;

        /// <summary>
        /// Constructor that sets up the IConfiguration object by reading from the appsettings.json file.
        /// </summary>
        public DAOEvent()
        {
            _configuration = new ConfigurationBuilder()
                 .AddJsonFile("appsettings.json")
                 .Build();
        }

        /// <summary>
        /// Deletes an event from the database by its ID.
        /// </summary>
        /// <param name="event_id">The ID of the event to be deleted.</param>
        public void DeleteEventById(int event_id)
        {
            if (event_id.GetType() != typeof(int) || event_id < 0)
            {
                throw new InvalidInput("Invalid inputs");
            }
            using (SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("Omega_Conn")))
            {
                query = "DELETE Event WHERE Id = @event_id";
                conn.Open();

                using (SqlCommand command = new SqlCommand(query, conn))
                {
                    command.Parameters.AddWithValue("@event_id", event_id);

                    command.ExecuteNonQuery();
                }
                conn.Close();

            }
        }

        /// <summary>
        /// Retrieves an event from the database by its ID.
        /// </summary>
        /// <param name="event_id">The ID of the event to be retrieved.</param>
        /// <returns>The Event object with the provided ID.</returns>
        /// <exception cref="InvalidInput">Thrown when the provided event ID is not an integer or is negative.</exception>
        public Event GetEventById(int event_id)
        {

            if (event_id.GetType() != typeof(int) || event_id < 0)
            {
                throw new InvalidInput("Invalid inputs");
            }
            Event eventElement = null;

            using (SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("Omega_Conn")))
            {
                query = "SELECT * FROM Event WHERE Id = @event_id";
                conn.Open();

                using (SqlCommand command = new SqlCommand(query, conn))
                {
                    command.Parameters.AddWithValue("@event_id", event_id);

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            eventElement = new Event
                            {
                                Id = (int)reader["Id"],
                                Event_name = (string)reader["Event_name"],
                                Event_date = (DateTime)reader["Event_date"],
                                Fk_event_user = (int)reader["Fk_event_user"],
                                Fk_event_category = (int)reader["Fk_event_category"],
                            };
                        }
                    }
                }

            }

            return eventElement;
        }
        /// <summary>
        /// Updates Event based on event id
        /// </summary>
        /// <param name="eventElemnt">data to be updated</param>
        /// <param name="event_id">id of the even to be updated</param>
        /// <exception cref="InvalidInput">excepiton is thrown when User enters invalid id of the updated event</exception>
        public void Update([FromBody] Event eventElemnt, int event_id)
        {
            if (eventElemnt == null || event_id.GetType() != typeof(int))
            {
                throw new InvalidInput("Invalid inputs");
            }
            using (SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("Omega_Conn")))
            {
                query = "UPDATE Event SET event_name = @event_name, event_date = @event_date, fk_event_category = @event_category " +
                    "WHERE Id = @event_id;";
                conn.Open();
                using (SqlCommand command = new SqlCommand(query, conn))
                {
                    command.Parameters.AddWithValue("@event_name", eventElemnt.Event_name);
                    command.Parameters.AddWithValue("@event_date", eventElemnt.Event_date);
                    command.Parameters.AddWithValue("@event_category", 1);
                    command.Parameters.AddWithValue("@event_id", event_id);

                    command.ExecuteNonQuery();
                }
            }
        }

        /// <summary>
        /// Method Retrieves all user's events 
        /// </summary>
        /// <param name="user_id">id of the user</param>
        /// <returns></returns>
        /// <exception cref="InvalidInput">excepiton is thrown when user id does not exist or does not match with user</exception>
        public IEnumerable<Event> GetAllByUser(int user_id)
        {
            if (user_id.GetType() != typeof(int) || user_id < 0)
            {
                throw new InvalidInput("Id is not integer or have negative value");
            }

            List<Event> events = new List<Event>();

            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Omega_Conn")))
            {
                connection.Open();

                string query = "SELECT * FROM Event WHERE fk_event_user = @user_id";
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@user_id", user_id);
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Event eventData = new Event
                            {
                                Id = (int)reader["Id"],
                                Event_name = (string)reader["Event_name"],
                                Event_date = (DateTime)reader["Event_date"],
                                Fk_event_user = (int)reader["Fk_event_user"],
                                Fk_event_category = (int)reader["Fk_event_category"],
                            };
                            events.Add(eventData);
                        }
                    }
                }

                connection.Close();
            }

            return events;
        }






        /// <summary>
        /// Method which stores new events to the database 
        /// </summary>
        /// <param name="eventElement">Event to be stored</param>
        /// <param name="user_id">id of the user</param>
        /// <param name="category_id">id of the category(set to default - 1)</param>
        /// <exception cref="NullReferenceException">Thrown when the eventElement parameter is null</exception>
        /// <exception cref="InvalidInput">Thrown when user enter invalids data into form for createing new Event</exception>
        public void Save([FromBody]Event eventElement, int user_id ,int category_id)
        {
            if (eventElement == null)
            {
                throw new NullReferenceException("User cannot be null");
            }

            using (SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("Omega_Conn")))
            {
                conn.Open();
                query = "INSERT INTO Event (event_name, event_date, fk_event_user, fk_event_category) " +
                    "VALUES (@event_name, @event_date,@fk_event_user, @fk_event_category)";

                using (SqlCommand command = new SqlCommand(query, conn))
                {
                    if (eventElement.Event_name == null || eventElement.Event_date == null
     || eventElement.Event_name.GetType() != typeof(string)
     || eventElement.Event_date.GetType() != typeof(DateTime))
                    {
                        throw new InvalidInput("Inputs are not valid");
                    }

                    command.Parameters.AddWithValue("@event_name", eventElement.Event_name);
                    command.Parameters.AddWithValue("@event_date", eventElement.Event_date);
                    command.Parameters.AddWithValue("@fk_event_user", user_id);
                    command.Parameters.AddWithValue("@fk_event_category", category_id);

                    command.ExecuteNonQuery();
                }
                conn.Close();

            }
        }
    }
}

