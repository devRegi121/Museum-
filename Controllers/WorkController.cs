using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Projekti.Data;
using Projekti.Models;

namespace Projekti.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkController : ControllerBase
    {
        private readonly MuseumDbContext _context;

        public WorkController(MuseumDbContext context)
        {
            _context = context;
        }

        // GET: api/works
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Work>>> GetWorks()
        {
            var works = await _context.Works
                .Select(work => new Work
                {
                    Id = work.Id,
                    Name = work.Name,
                    Artist = work.Artist,
                    Description = work.Description,
                    Category = work.Category,
                    CreationDate = work.CreationDate,
                    CreationDateText = work.CreationDateText ?? "No Date Available", 
                    Era = work.Era
                })
                .ToListAsync();

            return Ok(works);
        }



        // GET: api/works/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Work>> GetWork(int id)
        {
            var work = await _context.Works.FindAsync(id);
            if (work == null)
            {
                return NotFound(new { Message = $"Work with ID {id} not found." });
            }

            return Ok(work);
        }

        // POST: api/works
        [HttpPost]
        public async Task<ActionResult<Work>> CreateWork(Work work)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            work.Id = 0;

            _context.Works.Add(work);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException e)
            {
                return StatusCode(500, new { Message = "An error occurred while saving the work.", Error = e.Message });
            }

            return CreatedAtAction(nameof(GetWork), new { id = work.Id }, work);
        }


        // PUT: api/works/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWork(int id, Work updatedWork)
        {
            if (id != updatedWork.Id)
            {
                return BadRequest(new { Message = "ID mismatch." });
            }

            var existingWork = await _context.Works.FindAsync(id);
            if (existingWork == null)
            {
                return NotFound(new { Message = $"Work with ID {id} not found." });
            }

            existingWork.Name = updatedWork.Name;
            existingWork.Artist = updatedWork.Artist;
            existingWork.Description = updatedWork.Description;
            existingWork.Category = updatedWork.Category;
            existingWork.CreationDate = updatedWork.CreationDate;
            existingWork.CreationDateText = updatedWork.CreationDateText;
            existingWork.Era = updatedWork.Era;

            _context.Entry(existingWork).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }


        // DELETE: api/works/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWork(int id)
        {
            var work = await _context.Works.FindAsync(id);
            if (work == null)
            {
                return NotFound(new { Message = $"Work with ID {id} not found." });
            }

            _context.Works.Remove(work);
            await _context.SaveChangesAsync();

            return Ok(new { Message = $"Work with ID {id} deleted successfully." });
        }

        // GET: api/works/search
        [HttpGet("search")]
        public IActionResult SearchWorks(string field, string query)
        {
            IEnumerable<Work> results;

            switch (field.ToLower())
            {
                case "name":
                    results = _context.Works.Where(w => w.Name.Contains(query));
                    break;
                case "artist":
                    results = _context.Works.Where(w => w.Artist.Contains(query));
                    break;
                case "category":
                    results = _context.Works.Where(w => w.Category.Contains(query));
                    break;
                case "era":
                    results = _context.Works.Where(w => w.Era.Contains(query));
                    break;
                default:
                    return BadRequest("Invalid search field.");
            }

            return Ok(results);
        }


    }
}
