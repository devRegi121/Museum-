using MuseumAPI.Data.Models;
using MuseumAPI.Dto;
using ShoppingCartAPI.DTOs;
using ShoppingCartAPI.Models;
using System.Collections.Generic;
using System.Linq;

namespace MuseumAPI.Data.Services
{
    public class ShoppingCartService
    {
        private AppDbContext _context;

        public ShoppingCartService(AppDbContext context)
        {
            _context = context;
        }

        public void AddCartItem(string username, AddCartItemDTO dto)
        {
            var cartItem = _context.CartItems.FirstOrDefault(
                item => item.Username == username && item.ProductName == dto.ProductName);

            if (cartItem != null)
            {
                
                cartItem.Quantity += dto.Quantity;
            }
            else
            {
                
                var newCartItem = new CartItem
                {
                    ProductName = dto.ProductName,
                    Price = dto.Price,
                    Quantity = dto.Quantity,
                    Username = username
                };
                _context.CartItems.Add(newCartItem);
            }

            
            _context.SaveChanges();
        }


        public List<CartItem> GetCartItems(string username)
        {
            return _context.CartItems.Where(item => item.Username == username).ToList();
        }

        public bool RemoveCartItem(int id, string username)
        {
            var cartItem = _context.CartItems.FirstOrDefault(item => item.Id == id && item.Username == username);
            if (cartItem != null)
            {
                _context.CartItems.Remove(cartItem);
                _context.SaveChanges();
                return true;
            }
            return false;
        }
        public void ClearCart(string username)
        {
           
            var userCartItems = _context.CartItems.Where(item => item.Username == username).ToList();

            if (userCartItems.Any())
            {
                
                _context.CartItems.RemoveRange(userCartItems);
                _context.SaveChanges(); 
            }
        }


        public decimal GetCartTotal(string username)
        {
            return _context.CartItems
                .Where(item => item.Username == username)
                .Sum(item => item.Price * item.Quantity);
        }
    }
}
