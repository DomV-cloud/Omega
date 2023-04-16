using Omega.Exceptions;
using Omega.Interfaces.Repository;
using System.Data;
using System.Data.SqlClient;

namespace Omega.Models.DAOModels
{
    public class DAOUsers : IUsersRepository<Users>
    {
        private readonly IConfiguration _configuration;
        private string? query;

        public DAOUsers()
        {
            _configuration = new ConfigurationBuilder()
                  .AddJsonFile("appsettings.json")
                  .Build();
        }
    
        /// <summary>
        /// Returns a User object based on its ID. Throws an exception if the connection to the database fails or if there is no user with the given ID.
        /// </summary>
        /// <param name="id">The ID of the user to retrieve.</param>
        /// <returns>The User object with the specified ID.</returns>
        public Users GetById(int id)
        {
            Users user = null;
            if (id.GetType() != typeof(int) || id < 0)
            {
                throw new InvalidInput("Invalid id. Id must be just number");
            }
           
                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Omega_Conn")))
                {
                    connection.Open();
                    string query = "SELECT * FROM Users WHERE Id = @Id";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@Id", id);

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                user = new Users
                                {
                                    Id = (int)reader["Id"],
                                    Lname = (string)reader["lname"],
                                    Fname = (string)reader["fname"],
                                    Email = (string)reader["email"],
                                    Phone_number = (string)reader["phone_number"],
                                    Password = (string)reader["password"]
                                };
                            }
                        }
                    }
                }
          
            return user;
        }


        public Users Authetication(string email, string password)
        {
            Users user = null;
            if (email.GetType() != typeof(string) || password.GetType() != typeof(string))
            {
                throw new InvalidInput("Wrong format for email or password");
            }

            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Omega_Conn")))
            {
                connection.Open();
                string query = "SELECT * FROM Users WHERE email = @email AND password = @password;";
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@email", email);
                    command.Parameters.AddWithValue("@password", password);

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            user = new Users
                            {
                                Id = reader.GetInt32(0),
                                Lname = reader.GetString(1),
                                Fname = reader.GetString(2),
                                Email = reader.GetString(3),
                                Phone_number = reader.GetString(4),
                                Password = reader.GetString(5)
                            };
                        }
                    }
                    connection.Close();
                }
            }

            return user;
        }

   
        public void Save(Users user)
        {
            if (user == null)
            {
                throw new NullReferenceException("User cannot be null");
            }

            using (SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("Omega_Conn")))
            {
                conn.Open();
                query = "INSERT INTO Users (fname, lname, email, phone_number, password) VALUES(@fname, @lname, @email, @phone_number, @password);";

                using (SqlCommand command = new SqlCommand(query, conn))
                {
                    if (user.Fname.GetType() != typeof(string) || user.Lname.GetType() != typeof(string)
                        || user.Email.GetType() != typeof(string) || user.Phone_number.GetType() != typeof(string) 
                        || user.Phone_number.Length > 9 
                        )
                    {
                        throw new InvalidInput("Inputs are not valid");
                    }
                    command.Parameters.AddWithValue("@fname", user.Fname );
                    command.Parameters.AddWithValue("@lname", user.Lname);
                    command.Parameters.AddWithValue("@email", user.Email);
                    command.Parameters.AddWithValue("@phone_number", user.Phone_number);
                    command.Parameters.AddWithValue("@password", user.Password);

                    command.ExecuteNonQuery();
                }
                conn.Close();

            }
        }
    }
}
