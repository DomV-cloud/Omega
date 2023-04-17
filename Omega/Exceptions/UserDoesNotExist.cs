namespace Omega.Exceptions
{
    /// <summary>
    /// Exception that is thrown when a user tries to log in with invalid credentials.
    /// </summary>
    public class UserDoesNotExist : Exception
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="UserDoesNotExist"/> class.
        /// </summary>
        public UserDoesNotExist() : base() { }

        /// <summary>
        /// Initializes a new instance of the <see cref="UserDoesNotExist"/> class with a specified error message.
        /// </summary>
        /// <param name="message">The message that describes the error.</param>
        public UserDoesNotExist(string message) : base(message) { }

        /// <summary>
        /// Initializes a new instance of the <see cref="UserDoesNotExist"/> class with a specified error message and a reference to the inner exception that is the cause of this exception.
        /// </summary>
        /// <param name="message">The message that describes the error.</param>
        /// <param name="innerException">The exception that is the cause of the current exception, or a null reference if no inner exception is specified.</param>
        public UserDoesNotExist(string message, Exception innerException) : base(message, innerException) { }
    }
}
