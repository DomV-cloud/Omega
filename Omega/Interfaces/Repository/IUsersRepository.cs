using Omega.Interfaces.Base;
using Omega.Models;

namespace Omega.Interfaces.Repository
{
    /// <summary>
    /// An interface that allows implementing methods to fulfill CRUD operations.
    /// </summary>
    /// <typeparam name="T">The object.</typeparam>
    public interface IUsersRepository<T> where T : IBase
    {
        /// <summary>
        /// Methods that authenticate user by his email and password
        /// </summary>
        /// <param name="email">user's email</param>
        /// <param name="password">user's password</param>
        /// <returns></returns>
        public Users Authetication(string email, string password);

        /// <summary>
        /// Methods that saves user to database
        /// </summary>
        /// <param name="user">user as object</param>
        public void Save(Users user);
    }
}
