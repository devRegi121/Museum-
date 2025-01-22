
        $.ajax({
            url: 'https://localhost:44326/api/Ticket/get-all-tickets',
            type: 'GET',
            success: function(ticketData) {
                console.log('Ticket Data:', ticketData); 

                // Display ticket data in the table
                const ticketDetailsTable = $("#ticketDetails tbody");

                ticketData.forEach(ticket => {
                    const row = $("<tr></tr>");

                    
                    const ticketIdCell = $("<td></td>").text(ticket.id);
                    row.append(ticketIdCell);

                   
                    const ticketDetailsCell = $("<td></td>");
                    const nestedTable = $("<table></table>").addClass("ticket-details-table");

                 
                    const nestedHeaderRow = $("<tr></tr>").html("<th>Ticket Type</th><th>Quantity</th><th>Price</th>");
                    nestedTable.append(nestedHeaderRow);

                    // Add rows for each ticket detail
                    ticket.tickets.forEach(ticketDetail => {
                        const nestedRow = $("<tr></tr>").html(`
                            <td>${ticketDetail.ticketType}</td>
                            <td>${ticketDetail.quantity}</td>
                            <td>$${ticketDetail.price}</td>
                        `);
                        nestedTable.append(nestedRow);
                    });

                  
                    ticketDetailsCell.append(nestedTable);
                    row.append(ticketDetailsCell);

                   
                    const visitDateCell = $("<td></td>").text(new Date(ticket.visitDate).toLocaleDateString());
                    row.append(visitDateCell);

                   
                    const emailCell = $("<td></td>").text(ticket.email);
                    row.append(emailCell);

                    
                    const paymentMethodCell = $("<td></td>").text(ticket.paymentMethod);
                    row.append(paymentMethodCell);

                    
                    const membershipPlanCell = $("<td></td>").text(ticket.membershipPlan || 'None');  // Default to 'None' if no membership plan is provided
                    row.append(membershipPlanCell);

                    const totalAmountCell = $("<td></td>").text(`$${ticket.totalAmount}`);
                    row.append(totalAmountCell);

                   
                    const deleteButtonCell = $("<td></td>");
                    const deleteButton = $("<button></button>").text("Delete")
                        .addClass("delete-button")
                        .click(function() {
                            deleteTicket(ticket.id, row);
                        });
                    deleteButtonCell.append(deleteButton);
                    row.append(deleteButtonCell);

                    
                    ticketDetailsTable.append(row);
                });
            },
            error: function(xhr, status, error) {
                console.error('Error fetching ticket data:', error);
                alert("Failed to load ticket data. Please check the console for details.");
            }
        });

     
        function deleteTicket(ticketId, row) {
                $.ajax({
                url: `https://localhost:44326/api/Ticket/delete-ticket/${ticketId}`,

                    type: 'DELETE',
                    success: function(response) {
                        if (response) {
                            row.remove();
                        } else {
                            alert("Failed to delete ticket. Please try again.");
                        }
                    },
                    error: function(xhr, status, error) { 
                        alert("An error occurred while deleting the ticket.");
                    }
                });
            
        }
