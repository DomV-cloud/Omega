namespace Omega.Interfaces.Base
{
    /// <summary>
    /// Interface that handling IDENTITY atribute in MSSQL.
    /// It automatically add new Id. With no need specify it in INSERT SQL command
    /// </summary>
    public interface IBase
    {
        public int Id { get; set; }
    }
}
