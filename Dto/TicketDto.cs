namespace MuseumAPI.Data.DTOs
{

    public class TicketDetailDTO
    {

        public string TicketType { get; set; } 
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }

    public class TicketsDTO
    {
        public List<TicketDetailDTO> Tickets { get; set; } = new List<TicketDetailDTO>(); 
        public DateTime VisitDate { get; set; }
        public string Email { get; set; }
        public string PaymentMethod { get; set; }
        public string? MembershipPlan { get; set; }
        public decimal TotalAmount { get; set; } 
    }
}
