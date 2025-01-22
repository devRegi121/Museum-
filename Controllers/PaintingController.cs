using Microsoft.AspNetCore.Mvc;
using MuseumAPI.Data.Models;
using MuseumAPI.Data.Services;
using MuseumAPI.Dto;
using System.Collections.Generic;

namespace MuseumAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaintingsController : ControllerBase
    {
        private readonly PaintingService _paintingService;

        public PaintingsController(PaintingService paintingService)
        {
            _paintingService = paintingService;
        }

        [HttpGet("get-all-paintings")]
        public ActionResult<List<PaintingsModel>> GetAllPaintings()
        {
            var paintings = _paintingService.GetAllPaintings();
            if (paintings == null || paintings.Count == 0)
            {
                return NotFound("No paintings found.");
            }
            return Ok(paintings);
        }

       
        [HttpGet("get-painting-byId{id}")]
        public ActionResult<PaintingsModel> GetPaintingById(int id)
        {
            var painting = _paintingService.GetPaintingById(id);
            if (painting == null)
            {
                return NotFound($"Painting with ID {id} not found.");
            }
            return Ok(painting);
        }

       
        [HttpPost("add-painting")]
        public ActionResult AddPainting([FromBody] PaintingDto paintingDto)
        {
            if (paintingDto == null)
            {
                return BadRequest("Invalid painting data.");
            }

            _paintingService.AddPainting(paintingDto);
            return CreatedAtAction(nameof(GetPaintingById), new { id = paintingDto.Name }, paintingDto);
        }

        
        [HttpPut("update-painting/{id}")]
        public ActionResult UpdatePainting(int id, [FromBody] PaintingDto paintingDto)
        {
            if (paintingDto == null)
            {
                return BadRequest("Painting data is required.");
            }

            if (string.IsNullOrWhiteSpace(paintingDto.Name) || paintingDto.Price <= 0 || paintingDto.ArtistId <= 0)
            {
                return BadRequest("Invalid painting data. Name, Price, and ArtistId are required.");
            }

            Console.WriteLine($"Processing Update for Painting ID {id}");
            var updatedPainting = _paintingService.UpdatePaintingById(id, paintingDto);

            if (updatedPainting == null)
            {
                return NotFound($"Painting with ID {id} not found.");
            }

            return Ok(updatedPainting);
        }


        
        [HttpDelete("delete-painting/{id}")]
        public ActionResult DeletePainting(int id)
        {
            var painting = _paintingService.GetPaintingById(id);
            if (painting == null)
            {
                return NotFound($"Painting with ID {id} not found.");
            }

            _paintingService.DeletePaintingById(id);
            return Ok("Painted deleted succesfuly."); 
        }
    }
}
