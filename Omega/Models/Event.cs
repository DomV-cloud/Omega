using Omega.Interfaces.Base;
using System;

namespace Omega.Models
{
    /// <summary>
    /// Represents an event with a name, date, user and category.
    /// </summary>
    public class Event : IBase
    {
      


        /// <summary>
        /// Gets or sets the ID of the event.
        /// </summary>
        public int Id { get ; set ; }

        /// <summary>
        /// Gets or sets the name of the event.
        /// </summary>
        public string? Event_name { get; set; }

        /// <summary>
        /// Gets or sets the date of the event.
        /// </summary>
        public DateTime Event_date { get; set; }

        /// <summary>
        /// Gets or sets the ID of the user who created the event.
        /// </summary>
        public int Fk_event_user { get; set; }

        /// <summary>
        /// Gets or sets the ID of the category of the event.
        /// </summary>
        public int Fk_event_category { get; set; }
    }
}
