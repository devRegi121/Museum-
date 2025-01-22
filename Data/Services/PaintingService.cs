using MuseumAPI.Data.Models;
using MuseumAPI.Dto;

namespace MuseumAPI.Data.Services
{
        public class PaintingService
        {
            private AppDbContext _context;

            public PaintingService(AppDbContext context)
            {
                _context = context;
            }

            public void AddPainting(PaintingDto painting)
            {
                var _painting = new PaintingsModel()
                {
                    Name = painting.Name,
                    Description = painting.Description,
                    ImageUrl = painting.ImageUrl,
                    price = painting.Price,
                    theme = painting.Theme,
                    isSold = painting.IsSold,
                    ArtistId = painting.ArtistId,
                    

                };
                _context.Paintings.Add(_painting);
                _context.SaveChanges();


            }

            public List<PaintingsModel> GetAllPaintings()
            {
                var _allPaintings = _context.Paintings.ToList();
                return _allPaintings;
            }

            
            public PaintingsModel GetPaintingById(int paintingId)
            {
                var _painting = _context.Paintings.FirstOrDefault(p => p.Id == paintingId);
                return _painting;
            }

            
            public PaintingsModel UpdatePaintingById(int paintingId, PaintingDto painting)
            {
                var _painting = _context.Paintings.FirstOrDefault(p => p.Id == paintingId);
            if (_painting != null)
            {
                _painting.Name = painting.Name;
                _painting.Description = painting.Description;
                _painting.ImageUrl = painting.ImageUrl;
                _painting.price = painting.Price;
                _painting.theme = painting.Theme;
                _painting.isSold = painting.IsSold;
                _painting.ArtistId = painting.ArtistId;
                 
                    _context.SaveChanges();
                }
                return _painting;
            }

            
            public void DeletePaintingById(int paintingId)
            {
                var _painting = _context.Paintings.FirstOrDefault(p => p.Id == paintingId);
                if (_painting != null)
                {
                    _context.Paintings.Remove(_painting);
                    _context.SaveChanges();
                }
            }
        }
    }

