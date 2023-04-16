using Microsoft.AspNetCore.Mvc;
using Omega.Interfaces.Base;
using Omega.Models;

namespace Omega.Interfaces.Repository
{
    /// <summary>
    /// An interface that allows implementing methods to fulfill CRUD operations.
    /// </summary>
    /// <typeparam name="T">The object.</typeparam>
    public interface IEventRepository<T> where T : IBase
    {
        /// <summary>
        /// Method that returns user's Event by user's Id
        /// </summary>
        /// <param name="user_id">user's id</param>
        /// <returns>user's Event</returns>
        public IEnumerable<T> GetAllByUser(int user_id);

        /// <summary>
        /// Method that saves event by user id and category id
        /// </summary>
        /// <param name="eventElement">event I want to save</param>
        /// <param name="user_id">Id user</param>
        /// <param name="category_id">category Id</param>
        public void Save([FromBody] Event eventElement, int user_id, int category_id);


        /// <summary>
        /// Methods that updates user's event 
        /// </summary>
        /// <param name="eventElement">event to be updated</param>
        /// <param name="event_id">id of event to know which events are need to be updated </param>
        public void Update( [FromBody]Event eventElement, int event_id);

        /// <summary>
        /// Methods that return Event by id
        /// </summary>
        /// <param name="id">id of the event I want to return </param>
        /// <returns>Event</returns>
        public Event GetEventById(int id);

        /// <summary>
        /// Methods that deletes event 
        /// </summary>
        /// <param name="event_id">od of the event</param>
        public void DeleteEventById(int event_id);
    }
}
