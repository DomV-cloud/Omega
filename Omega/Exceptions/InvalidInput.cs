namespace Omega.Exceptions
{
    /// <summary>
    /// /Exception that is thrown when user enter Invalid inputs
    /// </summary>
    public class InvalidInput : Exception
    {
        public InvalidInput() : base() { }
        public InvalidInput(string message) : base(message) { }
        public InvalidInput(string message, Exception innerException) : base(message, innerException) { }

    }
}
