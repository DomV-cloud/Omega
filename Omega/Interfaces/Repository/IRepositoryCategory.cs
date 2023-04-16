using Omega.Interfaces.Base;

namespace Omega.Interfaces.Repository
{
    public interface IRepositoryCategory<T> where T : IBase
    {
        public IEnumerable<T> GetCategories();
    }
}
