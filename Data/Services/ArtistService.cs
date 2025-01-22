using Microsoft.IdentityModel.Tokens;
using MusemAPI.Dto;
using MuseumAPI.Data.Models;


namespace MuseumAPI.Data.Services
{
    public class ArtistService
    {
            private AppDbContext _context;
        public ArtistService(AppDbContext context)
        {
            _context = context;
        }
        public void addArtist(AddArtistDto artist)
        {
            var _artist = new ArtistModel()
            {
                Name = artist.Name,
                Description = artist.Description,
                ImageUrl = artist.ImageUrl
            };
            _context.Artists.Add(_artist);
            _context.SaveChanges();
        }

        public List<ArtistModel> GetArtists()
        {
            var _allArtists = _context.Artists.ToList();
            return _allArtists;
        }

        public ArtistModel GetArtistById(int artistId)
        {
            var _artist = _context.Artists.FirstOrDefault(n => n.Id == artistId);
            return _artist;
        }

        public ArtistModel updateArtistById(int artistId, AddArtistDto artist)
        {
            var _artist = _context.Artists.FirstOrDefault(n => n.Id == artistId);
            if (_artist != null)
            {
                _artist.Name = artist.Name;
                _artist.Description = artist.Description;
                _artist.ImageUrl = artist.ImageUrl;
                _context.SaveChanges();
            }
            return _artist;
        }

        public void DeleteArtistById(int artistId)
        {
            var _artist = _context.Artists.FirstOrDefault(n => n.Id == artistId);
            if (_artist != null)
            {
                _context.Artists.Remove(_artist);
                _context.SaveChanges();
            }
        }
    }
}
