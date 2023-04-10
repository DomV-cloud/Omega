using Omega.Exceptions;
using Omega.Interfaces.Repository;
using System.Data;
using System.Data.SqlClient;

namespace Omega.Models.DAOModels
{
    public class DAOUsers : IRepository<Users>
    {
        private readonly IConfiguration _configuration;

        public DAOUsers()
        {
            
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        public void Delete(int id)
        {
            using (SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("Omega_Conn")))
            {
                using (SqlCommand command = new SqlCommand("DELETE Users WHERE  = @id", conn))
                {
                    command.Parameters.Add("@id", SqlDbType.Int).Value = id;
                    conn.Open();
                    command.ExecuteNonQuery();

                }
            }
        }
     
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
    public IEnumerable<Users> GetAll()
        {

            using (SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("Omega_Conn")))
            {
                using (SqlCommand command = new SqlCommand("SELECT * FROM [Users]", conn))
                {
                    conn.Open();
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Users apartment = new Users
                            {
                                Id = reader.GetInt32(0),
                                Lname = reader.GetString(1),
                                Fname = reader.GetString(2),
                                Email = reader.GetString(3),
                                Phone_number = reader.GetString(4)

                            };
                            yield return apartment;
                        }
                    }
                }
            }
           
        }




        /// <summary>
        /// Returns a User object based on its ID. Throws an exception if the connection to the database fails or if there is no user with the given ID.
        /// </summary>
        /// <param name="id">The ID of the user to retrieve.</param>
        /// <returns>The User object with the specified ID.</returns>
        public Users GetById(int id)
        {
            Users user = null;

           
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
                                    Id = reader.GetInt32(0),
                                    Lname = reader.GetString(1),
                                    Fname = reader.GetString(2),
                                    Email = reader.GetString(3),
                                    Phone_number = reader.GetString(4)
                                };
                            }
                        }
                    }
                }
          
            return user;
        }
    

    public bool IsServerConnected()
        {
            throw new NotImplementedException();
        }

        public void Save(Users element)
        {
            
        }
    }
}
