using Omega.Interfaces.Base;

namespace Omega.Models
{
    /// <summary>
    /// Represents a category.
    /// </summary>
    public class Category : IBase
    {
        private int id;
        private string category_name;
        private string category_color;

        /// <summary>
        /// Initializes a new instance of the <see cref="Category"/> class.
        /// </summary>
        /// <param name="category_name">The name of the category.</param>
        /// <param name="category_color">The color of the category.</param>
        public Category(string category_name = "", string category_color = "")
        {
            this.id = 0;
            this.category_name = category_name;
            this.category_color = category_color;
        }

        /// <summary>
        /// Returns a string representation of the category object.
        /// </summary>
        /// <returns>A string that represents the current object.</returns>
        public override string? ToString()
        {
            return "id:" + id + "name:" + category_name + "color:" + category_color;
        }

        /// <summary>
        /// Gets or sets the category id.
        /// </summary>
        public int Id { get => id; set => id = value; }

        /// <summary>
        /// Gets or sets the name of the category.
        /// </summary>
        public string Category_name { get => category_name; set => category_name = value; }

        /// <summary>
        /// Gets or sets the color of the category.
        /// </summary>
        public string Category_color { get => category_color; set => category_color = value; }
    }
}
