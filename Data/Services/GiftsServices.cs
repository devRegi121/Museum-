using MuseumAPI.Data.Models;
using MuseumAPI.Dto;

namespace MuseumAPI.Data.Services
{
    public class GiftService
    {
        private AppDbContext _context;

        public GiftService(AppDbContext context)
        {
            _context = context;
        }

        public void AddGift(GiftDto gift)
        {
            var _gift = new GiftsModel()
            {
                Name = gift.Name,
                Code = gift.Code,
                Price = gift.Price,
                Url= gift.Url
            };
            _context.Gifts.Add(_gift);
            _context.SaveChanges();
        }

     
        public List<GiftsModel> GetAllGifts()
        {
            var _allGifts = _context.Gifts.ToList();
            return _allGifts;
        }

        public GiftsModel GetGiftById(int giftId)
        {
            var _gift = _context.Gifts.FirstOrDefault(n => n.Id == giftId);
            return _gift;
        }

        public GiftsModel UpdateGiftById(int giftId,GiftDto gift)
        {
            var _gift = _context.Gifts.FirstOrDefault(n => n.Id == giftId);
            if (_gift != null)
            {
                _gift.Name = gift.Name;
                _gift.Code = gift.Code;
                _gift.Price = gift.Price;
                _gift.Url = gift.Url;
                _context.SaveChanges();
            }
            return _gift;
        }

        public void DeleteGiftById(int giftId)
        {
            var _gift = _context.Gifts.FirstOrDefault(n => n.Id == giftId);
            if (_gift != null)
            {
                _context.Gifts.Remove(_gift);
                _context.SaveChanges();
            }
        }
    }
}
