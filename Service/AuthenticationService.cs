using Projekti.Models;
using System.Collections.Generic;
using System.Linq;
namespace Projekti.Service
{
    public class AuthenticationService
    {
        private List<User> users = new List<User>();

        public AuthenticationService()
        {
            // Initialize with some sample users
            users.Add(new User { Username = "admin", Password = "admin123", Role = UserRole.Admin });
            users.Add(new User { Username = "user", Password = "user123", Role = UserRole.User });
        }

        public User Authenticate(string username, string password)
        {
            return users.FirstOrDefault(u => u.Username == username && u.Password == password);
        }
    }
}
