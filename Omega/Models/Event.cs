using Omega.Interfaces.Base;
using System;

namespace Omega.Models
{
    /// <summary>
    /// Represents an event with a name, date, user and category.
    /// </summary>
    public class Event : IBase
    {
        private int id;
        private string event_name;
        private DateTime event_date;
        private int fk_event_user;
        private int fk_event_category;

        /// <summary>
        /// Initializes a new instance of the Event class with the specified parameters.
        /// </summary>
        /// <param name="event_name">The name of the event.</param>
        /// <param name="event_date">The date of the event.</param>
        /// <param name="fk_event_user">The ID of the user who created the event.</param>
        /// <param name="fk_event_category">The ID of the category of the event.</param>
        public Event(string event_name = "", DateTime event_date = default, int fk_event_user = 0, 
            int fk_event_category = 0)
        {
            this.id = 0;
            this.event_name = event_name;
            this.event_date = event_date;
            this.fk_event_user = fk_event_user;
            this.fk_event_category = fk_event_category;
        }

        /// <summary>
        /// Gets or sets the ID of the event.
        /// </summary>
        public int Id { get => id; set => id = value; }

        /// <summary>
        /// Gets or sets the name of the event.
        /// </summary>
        public string Event_name { get => event_name; set => event_name = value; }

        /// <summary>
        /// Gets or sets the date of the event.
        /// </summary>
        public DateTime Event_date { get => event_date; set => event_date = value; }

        /// <summary>
        /// Gets or sets the ID of the user who created the event.
        /// </summary>
        public int Fk_event_user { get => fk_event_user; set => fk_event_user = value; }

        /// <summary>
        /// Gets or sets the ID of the category of the event.
        /// </summary>
        public int Fk_event_category { get => fk_event_category; set => fk_event_category = value; }
    }
}
