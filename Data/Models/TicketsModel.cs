namespace MuseumAPI.Data.Models
{
    public class TicketDetail
    {
        public int Id { get; set; }
        public string TicketType { get; set; } 
        public int Quantity { get; set; }
        public int Price { get; set; }
    }

    public class TicketsModel
    {
        public int Id { get; set; }
        public List<TicketDetail> Tickets { get; set; } = new List<TicketDetail>(); 
        public DateTime VisitDate { get; set; }
        public string Email { get; set; }
        public string PaymentMethod { get; set; }
        public string? MembershipPlan { get; set; }
        public int TotalAmount { get; set; } 
    }
}
