using Omega.Interfaces.Base;

namespace Omega.Models
{
    /// <summary>
    /// Represents a TodoItem in the system.
    /// </summary>
    public class TodoItem : IBase
    {
        private int id;
        private int fk_user_id;
        private int fk_category_id;
        private string item_name;
        private string description;
        private DateTime todo_date;

        /// <summary>
        /// Initializes a new instance of the TodoItem class.
        /// </summary>
        /// <param name="fk_user_id">The ID of the user associated with the TodoItem.</param>
        /// <param name="fk_category_id">The ID of the category associated with the TodoItem.</param>
        /// <param name="item_name">The name of the TodoItem.</param>
        /// <param name="description">The description of the TodoItem.</param>
        /// <param name="todo_date">The due date of the TodoItem.</param>
        public TodoItem(int fk_user_id = 0, int fk_category_id = 0, string item_name = "",
            string description = "", DateTime todo_date = default)
        {
            this.id = 0;
            this.fk_user_id = fk_user_id;
            this.fk_category_id = fk_category_id;
            this.item_name = item_name;
            this.description = description;
            this.todo_date = todo_date;
        }

        /// <summary>
        /// Returns a string that represents the current TodoItem object.
        /// </summary>
        /// <returns>A string that represents the current TodoItem object.</returns>
        public override string? ToString()
        {
            return "Id" + id + "item:" + item_name;
        }

        /// <summary>
        /// Gets or sets the category id.
        /// </summary>
        public int Id { get => id; set => id = value; }

        /// <summary>
        /// Gets or sets the FK user id.
        /// </summary>
        /// 

        public int Fk_user_id { get => fk_user_id; set => fk_user_id = value; }
        /// <summary>
        /// Gets or sets the FK category id.
        /// </summary>
        public int Fk_category_id { get => fk_category_id; set => fk_category_id = value; }

        /// <summary>
        /// Gets or sets the item name.
        /// </summary>
        public string Item_name { get => item_name; set => item_name = value; }

        /// <summary>
        /// Gets or sets the description.
        /// </summary>
        public string Description { get => description; set => description = value; }

        /// <summary>
        /// Gets or sets todo date
        /// </summary>
        public DateTime Todo_date { get => todo_date; set => todo_date = value; }
    }
}
