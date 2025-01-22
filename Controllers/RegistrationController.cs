using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusemAPI.Dto;
using MuseumAPI.Data.Models;
using MuseumAPI.Data.Services;

namespace MuseumAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly RegistrationService _registrationService;

        public RegistrationController(RegistrationService registrationService)
        {
            _registrationService = registrationService;
        }

        [HttpGet("all-users")]
        public IActionResult GetAllUsers()
        {
            var users = _registrationService.getAllUsers();
            return Ok(users);
        }

        [HttpGet("get-user-byId/{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _registrationService.getUserById(id);
            return Ok(user);
        }


        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterDto user)
        {
    
            var currentRole = Request.Headers["Role"].ToString();

            try
            {
                _registrationService.RegisterUser(user, currentRole);
                return Ok(new { message = "Registration successful!" });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        [HttpPost("register-newUser")]
        public IActionResult RegisterUser([FromBody] RegisterDto user)
        {
            if (user == null)
            {
                return BadRequest("Invalid registration data.");
            }

            try
            {
                _registrationService.RegisterUser(user);
                return Ok("User registered successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete-user/{id}")]
        public IActionResult DeleteUser(int id)
        {
            _registrationService.DeleteUser(id);
            return Ok();
        }

        [HttpPut("update-user/{id}")]
        public IActionResult UpdateUser(int id, [FromBody] RegisterDto updatedUser)
        {
           
                _registrationService.UpdateUser(id, updatedUser);
                return Ok("User updated successfully.");
            
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginUserDto loginDto)
        {
            if (loginDto == null)
            {
                return BadRequest("Invalid login data.");
            }

            try
            {
                var user = _registrationService.AuthenticateUser(loginDto);

                return Ok(new { message = "Login successful!", user, });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}

