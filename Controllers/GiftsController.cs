using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MuseumAPI.Data.Services;
using MuseumAPI.Dto;

namespace MuseumAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GiftController : ControllerBase
    {
        private readonly GiftService _giftService;

        public GiftController(GiftService giftService)
        {
            _giftService = giftService;
        }

        [HttpPost("add-gift")]
        public IActionResult AddGift([FromBody] GiftDto gift)
        {
            _giftService.AddGift(gift);
            return Ok("Gift added successfully");
        }

       
        [HttpGet("get-all-gifts")]
        public IActionResult GetAllGifts()
        {
            var allGifts = _giftService.GetAllGifts();
            return Ok(allGifts);
        }

      
        [HttpGet("get-gift-by-id/{id}")]
        public IActionResult GetGiftById(int id)
        {
            var gift = _giftService.GetGiftById(id);
            if (gift == null) return NotFound("Gift not found");
            return Ok(gift);
        }

       
        [HttpPut("update-gift-by-id/{id}")]
        public IActionResult UpdateGiftById(int id, [FromBody] GiftDto gift)
        {
            var updatedGift = _giftService.UpdateGiftById(id, gift);
            if (updatedGift == null) return NotFound("Gift not found for update");
            return Ok(updatedGift);
        }

       
        [HttpDelete("delete-gift-by-id/{id}")]
        public IActionResult DeleteGiftById(int id)
        {
            _giftService.DeleteGiftById(id);
            return Ok("Gift deleted successfully");
        }
    }
}
