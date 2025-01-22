using Microsoft.AspNetCore.Mvc;
using MuseumAPI.Data.Services;
using ShoppingCartAPI.DTOs;
using ShoppingCartAPI.Models;
using System.Collections.Generic;

namespace ShoppingCartAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShoppingCartController : ControllerBase
    {
        private readonly ShoppingCartService _shoppingCartService;

        public ShoppingCartController(ShoppingCartService shoppingCartService)
        {
            _shoppingCartService = shoppingCartService;
        }

        
        [HttpPost("AddItem")]
        public IActionResult AddCartItem(string username, [FromBody] AddCartItemDTO dto)
        {
            if (string.IsNullOrEmpty(username))
            {
                return BadRequest("Username is required.");
            }

            if (dto == null || dto.Quantity <= 0 || string.IsNullOrEmpty(dto.ProductName))
            {
                return BadRequest("Invalid cart item data.");
            }

            _shoppingCartService.AddCartItem(username, dto);
            return Ok("Item added to the cart successfully.");
        }

        [HttpGet("GetItems")]
        public IActionResult GetCartItems(string username)
        {
            if (string.IsNullOrEmpty(username))
            {
                return BadRequest("Username is required.");
            }

            var cartItems = _shoppingCartService.GetCartItems(username);

            if (cartItems == null || cartItems.Count == 0)
            {
                return NotFound("No items found in the cart.");
            }

            return Ok(cartItems);
        }

        
        [HttpDelete("RemoveItem")]
        public IActionResult RemoveCartItem(int id, string username)
        {
            if (string.IsNullOrEmpty(username))
            {
                return BadRequest("Username is required.");
            }

            var result = _shoppingCartService.RemoveCartItem(id, username);

            if (!result)
            {
                return NotFound("Cart item not found or could not be removed.");
            }

            return Ok("Item removed from the cart successfully.");
        }

        [HttpGet("GetTotal")]
        public IActionResult GetCartTotal(string username)
        {
            if (string.IsNullOrEmpty(username))
            {
                return BadRequest("Username is required.");
            }

            var total = _shoppingCartService.GetCartTotal(username);

            return Ok(new { TotalAmount = total });
        }

        [HttpDelete("ClearCart")]
        public IActionResult ClearCart([FromQuery] string username)
        {
            if (string.IsNullOrWhiteSpace(username))
            {
                return BadRequest("Username is required.");
            }

            try
            {
                _shoppingCartService.ClearCart(username);
                return Ok(new { Message = "Cart cleared successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = "An error occurred while clearing the cart.", Details = ex.Message });
            }
        }
    }
}
