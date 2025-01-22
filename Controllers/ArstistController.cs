using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusemAPI.Dto;
using MuseumAPI.Data.Services;




namespace MusemAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArtistController : ControllerBase  
    {
        public ArtistService _artistService;
        public ArtistController(ArtistService artistService)
        {
            _artistService = artistService;
        }

        [HttpPost("add-artist")]
        public IActionResult AddArtist([FromBody] AddArtistDto artist)
        {
            _artistService.addArtist(artist);
            return Ok();
        }


        [HttpGet("get-all-artists")]
        public IActionResult GetAllArtists()
        {
            var allArtists = _artistService.GetArtists();
            return Ok(allArtists);
        }

        [HttpGet("get-artist-by-id/{id}")]
        public IActionResult GetArtistById(int id)
        {
            var artist = _artistService.GetArtistById(id);
            return Ok(artist);
        }

        [HttpPut("update-artist-by-id/{id}")]
        public IActionResult UpdateArtistById(int id, [FromBody] AddArtistDto artist)
        {
            var updatedArtist = _artistService.updateArtistById(id, artist);
            return Ok(updatedArtist);
        }

        [HttpDelete("delete-artist-by-id/{id}")]
        public IActionResult DeleteArtistById(int id)
        {
            _artistService.DeleteArtistById(id);
            return Ok();
        }
    }
}
