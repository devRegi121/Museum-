namespace MuseumAPI.Data.Models
{
    public class PaintingsModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public int price { get; set; }
        public string theme { get; set; }
         public Boolean isSold { get; set; }

        //Navigation property
        public int ArtistId { get; set; }
        public ArtistModel Artist { get; set; }
    }
}
