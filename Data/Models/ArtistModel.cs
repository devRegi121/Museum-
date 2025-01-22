namespace MuseumAPI.Data.Models
{
    public class ArtistModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        //Navigation property
        public List<PaintingsModel> Paintings { get; set; }

    }
}
