namespace Omega.Exceptions
{
    public class InvalidInput : Exception
    {
        public InvalidInput() : base() { }
        public InvalidInput(string message) : base(message) { }
        public InvalidInput(string message, Exception innerException) : base(message, innerException) { }

    }
}
