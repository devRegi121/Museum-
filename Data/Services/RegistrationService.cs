using MusemAPI.Dto;
using MuseumAPI.Data.Models;

namespace MuseumAPI.Data.Services
{
    public class RegistrationService
    {

        private readonly AppDbContext _context;

        public RegistrationService(AppDbContext context)
        {
            _context = context;
        }

        public void RegisterUser(RegisterDto user, string? currentAdminRole = null)
        {

            if (user.Role != null && user.Role.ToLower() == "admin")
            {
                if (currentAdminRole == null || currentAdminRole.ToLower() != "admin")
                {
                    throw new UnauthorizedAccessException("Only admins can assign the 'Admin' role.");
                }
            }


            var newUser = new UserModel
            {
                Username = user.Username,
                Email = user.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(user.Password),
                FirstName = user.FirstName,
                LastName = user.LastName,
                PhoneNumber = user.PhoneNumber,
                Address = user.Address,
                City = user.City,
                Country = user.Country,
                ZipCode = user.ZipCode,
                Role = user.Role ?? "User"
            };

            _context.Users.Add(newUser);
            _context.SaveChanges();
        }
        public void DeleteUser(int id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
        }
     
        public List<UserModel> getAllUsers()
        {
            return _context.Users.ToList();
        }

        public UserModel getUserById(int id)
        {
            var user = _context.Users.FirstOrDefault(u=> u.Id== id);
            return user;
        }

        public void UpdateUser(int id, RegisterDto updatedUser)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);

            if (user == null)
            {
                throw new Exception("User not found.");
            }

            // Update user properties
            user.Username = updatedUser.Username ?? user.Username;  // Only update if provided
            user.Email = updatedUser.Email ?? user.Email;
            user.Password = !string.IsNullOrEmpty(updatedUser.Password) ? BCrypt.Net.BCrypt.HashPassword(updatedUser.Password) : user.Password;
            user.FirstName = updatedUser.FirstName ?? user.FirstName;
            user.LastName = updatedUser.LastName ?? user.LastName;
            user.PhoneNumber = updatedUser.PhoneNumber ?? user.PhoneNumber;
            user.Address = updatedUser.Address ?? user.Address;
            user.City = updatedUser.City ?? user.City;
            user.Country = updatedUser.Country ?? user.Country;
            user.ZipCode = updatedUser.ZipCode ?? user.ZipCode;
            user.Role = updatedUser.Role ?? user.Role;  // Default to current role if no update

            _context.SaveChanges();
        }


        public UserModel AuthenticateUser(LoginUserDto loginDto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == loginDto.Username);
            if (user == null)
                throw new UnauthorizedAccessException("Invalid credentials.");

            // Compare provided password with the stored password hash
            if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
                throw new UnauthorizedAccessException("Invalid credentials.");

            return user;
        }
    }
}


