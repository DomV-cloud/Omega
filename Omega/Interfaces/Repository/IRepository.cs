using Omega.Interfaces.Base;

namespace Omega.Interfaces.Repository
{

        /// <summary>
        /// An interface that allows implementing methods to fulfill CRUD operations.
        /// </summary>
        /// <typeparam name="T">The object.</typeparam>
        public interface IRepository<T> where T : IBase
        {
        /// <summary>
        /// A method that saves an object to the database.
        /// </summary>
        /// <param name="element">The object to be saved.</param>
        void Save(T element);

            /// <summary>
            /// A method that delets an object from the database.
            /// </summary>
            /// <param name="id">The object's id to be deleted.</param>
            void Delete(int id );

            /// <summary>
            /// A collection (SELECT) that contains objects in the database.
            /// </summary>
            /// <returns>Returns a collection of objects.</returns>
            IEnumerable<T> GetAll();

            /// <summary>
            /// A method that returns an object with the specified ID.
            /// </summary>
            /// <param name="id">The ID of the object.</param>
            /// <returns>The object with the specified ID.</returns>
            T GetById(int id);

            /// <summary>
            /// A method that checks if the user is connected each time a query is made to the database.
            /// </summary>
            /// <returns>Returns true if the user is connected.</returns>
            bool IsServerConnected();
        }
    }

