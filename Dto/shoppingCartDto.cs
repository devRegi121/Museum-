namespace ShoppingCartAPI.DTOs
{
    public class AddCartItemDTO
    {
        public string ProductName { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}

