namespace Projekti.Models
{
    public class User
    {
        public string Username { get; set; }
        public string Password { get; set; } // Consider hashing passwords for security
        public UserRole Role { get; set; }
    }

}
