namespace MuseumAPI.Dto
{
    public class PaintingDto
    {
 
            public string Name { get; set; }
            public string Description { get; set; }
            public string ImageUrl { get; set; }
            public int Price { get; set; }
            public string Theme { get; set; }
            public bool IsSold { get; set; }
            public int ArtistId { get; set; }
        public string ArtistName { get; set; }
    }
    
}
