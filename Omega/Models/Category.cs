using Omega.Interfaces.Base;

namespace Omega.Models
{
    /// <summary>
    /// Represents a category.
    /// </summary>
    public class Category : IBase
    {
        /// <summary>
        /// Gets or sets the category id.
        /// </summary>
        public int Id { get ; set ; }

        /// <summary>
        /// Gets or sets the name of the category.
        /// </summary>
        public string? Category_name { get; set; }

        /// <summary>
        /// Gets or sets the color of the category.
        /// </summary>
        public string? Category_color { get; set; }
    }
}
