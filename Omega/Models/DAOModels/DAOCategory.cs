using Microsoft.Extensions.Configuration;
using Omega.Exceptions;
using Omega.Interfaces.Repository;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace Omega.Models.DAOModels
{
    /// <summary>
    /// Implementation of IRepositoryCategory for accessing Category data in the database.
    /// </summary>
    public class DAOCategory : IRepositoryCategory<Category>
    {
        IConfiguration _configuration;
        string query;

        /// <summary>
        /// Initializes a new instance of the <see cref="DAOCategory"/> class.
        /// </summary>
        public DAOCategory()
        {
            _configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();
        }

        /// <summary>
        /// Retrieves all categories from the database.
        /// </summary>
        /// <returns>A list of categories.</returns>
        /// <exception cref="SqlException">Thrown when an error occurs while accessing the database.</exception>
        public IEnumerable<Category> GetCategories()
        {
            List<Category> categories = new List<Category>();

            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Omega_Conn")))
            {
                connection.Open();

                string query = "SELECT * FROM Category";
                using (SqlCommand command = new SqlCommand(query, connection))
                {

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Category category = new Category
                            {
                                Id = (int)reader["Id"],
                                Category_name = (string)reader["Category_name"],
                                Category_color = (string)reader["Category_color"],
                            };
                            categories.Add(category);
                        }
                    }
                }

                connection.Close();
            }

            return categories;
        }
    }
}
