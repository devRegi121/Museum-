using MuseumAPI.Data.Models;
using MuseumAPI.Data.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace MuseumAPI.Data.Services
{
    public class TicketsService
    {
        private readonly AppDbContext _context;

        public TicketsService(AppDbContext context)
        {
            _context = context;
        }

        
        public void AddTickets(TicketsDTO ticketsDto)
        {
            var ticketsModel = new TicketsModel
            {
                VisitDate = ticketsDto.VisitDate,
                Email = ticketsDto.Email,
                PaymentMethod = ticketsDto.PaymentMethod,
                MembershipPlan = ticketsDto.MembershipPlan,
                TotalAmount = (int)ticketsDto.TotalAmount,
                Tickets = ticketsDto.Tickets.Select(t => new TicketDetail
                {
                    TicketType = t.TicketType,
                    Quantity = t.Quantity,
                    Price = (int)t.Price
                }).ToList()
            };

            _context.Tickets.Add(ticketsModel);
            _context.SaveChanges();
        }

        
        public List<TicketsModel> GetAllTicketPurchases()
        {
            return _context.Tickets
                            .Include(t => t.Tickets)  
                            .ToList();
        }


     
        public TicketsModel GetTicketPurchaseById(int ticketPurchaseId)
        {
            return _context.Tickets.FirstOrDefault(t => t.Id == ticketPurchaseId);
        }

        
        public TicketsModel UpdateTicketPurchaseById(int ticketPurchaseId, TicketsDTO ticketsDto)
        {
            var existingTicketPurchase = _context.Tickets.FirstOrDefault(t => t.Id == ticketPurchaseId);
            if (existingTicketPurchase != null)
            {
                existingTicketPurchase.VisitDate = ticketsDto.VisitDate;
                existingTicketPurchase.Email = ticketsDto.Email;
                existingTicketPurchase.PaymentMethod = ticketsDto.PaymentMethod;
                existingTicketPurchase.MembershipPlan = ticketsDto.MembershipPlan;
                existingTicketPurchase.TotalAmount = (int)ticketsDto.TotalAmount;

                
                existingTicketPurchase.Tickets = ticketsDto.Tickets.Select(t => new TicketDetail
                {
                    TicketType = t.TicketType,
                    Quantity = t.Quantity,
                    Price = (int)t.Price
                }).ToList();

                _context.SaveChanges();
            }
            return existingTicketPurchase;
        }

      
        public void DeleteTicketPurchaseById(int ticketPurchaseId)
        {
            var existingTicketPurchase = _context.Tickets.FirstOrDefault(t => t.Id == ticketPurchaseId);
            if (existingTicketPurchase != null)
            {
                _context.Tickets.Remove(existingTicketPurchase);
                _context.SaveChanges();
            }
        }
    }
}
