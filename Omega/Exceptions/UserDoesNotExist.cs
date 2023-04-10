namespace Omega.Exceptions
{
    public class UserDoesNotExist : Exception
    {
        public UserDoesNotExist() : base() { }
        public UserDoesNotExist(string message) : base(message) { }
        public UserDoesNotExist(string message, Exception innerException) : base(message, innerException) { }

    }
}
