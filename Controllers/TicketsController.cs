using Microsoft.AspNetCore.Mvc;
using MuseumAPI.Data.DTOs;
using MuseumAPI.Data.Models;
using MuseumAPI.Data.Services;

namespace MuseumAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TicketController : ControllerBase
    {
        private readonly TicketsService _ticketsService;

        public TicketController(TicketsService ticketsService)
        {
            _ticketsService = ticketsService;
        }

        
        [HttpPost("add-ticket")]
        public IActionResult AddTicket([FromBody] TicketsDTO ticketsDto)
        {
            if (ticketsDto == null)
                return BadRequest("Ticket details cannot be null.");

            try
            {
                _ticketsService.AddTickets(ticketsDto);
                return Ok("Ticket purchase successfully added.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while adding the ticket: {ex.Message}");
            }
        }

        
        [HttpGet("get-all-tickets")]
        public IActionResult GetAllTickets()
        {
            try
            {
                var tickets = _ticketsService.GetAllTicketPurchases();
                return Ok(tickets);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving ticket purchases: {ex.Message}");
            }
        }

        [HttpGet("get-ticket/{id}")]
        public IActionResult GetTicketById(int id)
        {
            try
            {
                var ticket = _ticketsService.GetTicketPurchaseById(id);
                if (ticket == null)
                    return NotFound($"Ticket with ID {id} not found.");

                return Ok(ticket);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving the ticket: {ex.Message}");
            }
        }

        [HttpPut("update-ticket/{id}")]
        public IActionResult UpdateTicketById(int id, [FromBody] TicketsDTO ticketsDto)
        {
            if (ticketsDto == null)
                return BadRequest("Ticket details cannot be null.");

            try
            {
                var updatedTicket = _ticketsService.UpdateTicketPurchaseById(id, ticketsDto);
                if (updatedTicket == null)
                    return NotFound($"Ticket with ID {id} not found.");

                return Ok("Ticket purchase successfully updated.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while updating the ticket: {ex.Message}");
            }
        }

       
        [HttpDelete("delete-ticket/{id}")]
        public IActionResult DeleteTicketById(int id)
        {
            try
            {
                var ticket = _ticketsService.GetTicketPurchaseById(id);
                if (ticket == null)
                    return NotFound($"Ticket with ID {id} not found.");

                _ticketsService.DeleteTicketPurchaseById(id);
                return Ok("Ticket purchase successfully deleted.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while deleting the ticket: {ex.Message}");
            }
        }
    }
}
    