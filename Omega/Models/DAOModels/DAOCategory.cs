using Microsoft.Extensions.Configuration;
using Omega.Exceptions;
using Omega.Interfaces.Repository;
using System.Data.SqlClient;

namespace Omega.Models.DAOModels
{
    public class DAOCategory : IRepositoryCategory<Category>
    {
        IConfiguration _configuration;
        string query;

        public DAOCategory()
        {
            _configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();
        }

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
