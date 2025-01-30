$(document).ready(function () {
    const API_BASE_URL = "https://localhost:44326/api/Work";
    const viewWorksButton = $("#view-works");
    const addWorkButton = $("#add-work");
    const workListSection = $("#work-list");
    const workFormSection = $("#work-form-section");
    const worksContainer = $("#works-container");
    const workForm = $("#work-form");
    $("#work-form-section").hide(); 

    let isWorkListVisible = false;

    function fetchWorks() {
        $.ajax({
            url: API_BASE_URL,
            method: "GET",
            success: function (works) {
                worksContainer.empty();
                if (Array.isArray(works) && works.length > 0) {
                    works.forEach((work) => {
                        const creationDate = work.creationDate ? new Date(work.creationDate).toISOString().split('T')[0] : "N/A";
    
                        const listItem = `
                            <li>
                                <span>Name: ${work.name || "Unknown Name"}</span><br>
                                <span>Artist: ${work.artist || "Unknown Artist"}</span><br>
                                <span>Description: ${work.description || "No Description"}</span><br>
                                <span>Category: ${work.category || "No Category"}</span><br>
                                <span>Creation Date: ${creationDate}</span><br>
                                <span>Creation Date Text: ${work.creationDateText || "N/A"}</span><br>
                                <span>Era: ${work.era || "Unknown Era"}</span><br>
                                <div>
                                    <button class="edit-btn" data-id="${work.id}">Edit</button>
                                    <button class="delete-btn" data-id="${work.id}">Delete</button>
                                </div>
                            </li>`;
                        worksContainer.append(listItem);
                    });
                } else {
                    worksContainer.append("<li>No works available.</li>");
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching works:", error);
                alert("Error fetching works. Please try again.");
            },
        });
    }
    viewWorksButton.on("click", function () {
        if (isWorkListVisible) {
            worksContainer.empty();
            viewWorksButton.text("View Works");
        } else {
            fetchWorks();
            viewWorksButton.text("Hide Works");
        }
        isWorkListVisible = !isWorkListVisible;
    });
$('#search-form').on('submit', function (event) {
    event.preventDefault(); 

    const searchField = $('#search-field').val();
    const searchQuery = $('#search-input').val().trim();

    if (!searchQuery) {
        $('#works-container').html('<p>Please enter a keyword to search.</p>');
        return;
    }

    $('#works-container').html('<p>Loading...</p>');

    $.ajax({
        url: `${API_BASE_URL}/search`, 
        method: 'GET',
        data: { field: searchField, query: searchQuery }, 
        success: function (data) {
            $('#works-container').empty(); 

            if (!data || data.length === 0) {
                $('#works-container').append('<p>No works found matching your search.</p>');
            } else {
                const worksList = data.map(work => `
                    <li>
                        <h3>${work.name}</h3>
                        <p><strong>Artist:</strong> ${work.artist}</p>
                        <p><strong>Category:</strong> ${work.category}</p>
                        <p><strong>Era:</strong> ${work.era}</p>
                        <p><strong>Description:</strong> ${work.description}</p>
                       <p><strong>Creation Date:</strong> ${work.creationDate ? new Date(work.creationDate).toLocaleDateString() : 'N/A'}</p>

                        <p><strong>Creation Date (Text):</strong> ${work.creationDateText}</p>
                    </li>
                `).join('');
                $('#works-container').append(`<ul>${worksList}</ul>`);
            }

            $('#search-field').val('');  
            $('#search-input').val('');  
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
            $('#works-container').empty();
            $('#works-container').append('<p>Error fetching works. Please try again later.</p>');
        }
    });
});

addWorkButton.on("click", function () {
    workForm[0].reset();
    $("#work-id").val(""); 

    toggleSection("work-form-section"); 
});

$("#cancel-btn").on("click", function () {
    $("#work-id").val(""); 
    $("#name").val(""); 
    $("#artist").val(""); 
    $("#description").val(""); 
    $("#category").val(""); 
    $("#creation_date_text").val(""); 
    $("#creation_date").val(""); 
    $("#era").val(""); 
    toggleSection("work-list");
});

function toggleSection(section) {
    $("#work-list").hide(); 
    $("#work-form-section").hide(); 

    $("#" + section).show();
}

 workForm.on("submit", function (e) {
    e.preventDefault();

    const id = $("#work-id").val();
    const name = $("#name").val();
    const artist = $("#artist").val();
    const description = $("#description").val();
    const category = $("#category").val();
    const creationDateText = $("#creation_date_text").val();
    const creationDateActual = $("#creation_date").val();
    const era = $("#era").val();

    if (!name || !era) {
        alert("Please fill in all required fields (Name, Era).");
        return;
    }

    const work = {
        id,
        name,
        artist,
        description,
        category,
        creationDate: creationDateActual || null,  
        creationDateText: creationDateText || null, 
        era,
    };

    if (id) {
        updateWork(id, work);  
    } else {
        createWork(work);  
    }
});

function createWork(work) {
    $.ajax({
        url: API_BASE_URL,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(work),
        success: function () {
            toggleSection("work-list"); 
            fetchWorks();
        },
        error: function (xhr, status, error) {
            console.error("Error creating work:", error);
            alert("Error creating work. Please try again.");
        },
    });
}

function updateWork(id, work) {
    console.log("Work ID to Update:", id); 
    console.log("Work Data to Update:", work);  

    $.ajax({
        url: `${API_BASE_URL}/${id}`,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(work),
        success: function (response, status, xhr) {
            console.log("Update Success:", response);
            toggleSection("work-list"); 
            fetchWorks();  
        },
        error: function (xhr, status, error) {
            console.error("Error updating work:", error || xhr.responseText);
            alert("Error updating work. Please try again.");
        },
    });
}
worksContainer.on("click", ".edit-btn", function () {
    const id = $(this).data("id");

    if (!id) {
        console.error("No ID found for the selected work.");
        alert("Error: Unable to find the work ID.");
        return;
    }

    $.ajax({
        url: `${API_BASE_URL}/${id}`,
        method: "GET",
        success: function (work) {
            if (!work) {
                console.error("Work details not found for ID:", id);
                alert("Work details not found.");
                return;
            }

            $("#work-id").val(work.id);
            $("#name").val(work.name || "");
            $("#artist").val(work.artist || "");
            $("#description").val(work.description || "");
            $("#category").val(work.category || "");
            $("#creation_date_text").val(work.creationDateText || "");  
           
            const creationDate = work.creationDate ? new Date(work.creationDate) : null;
            if (creationDate) {
                const formattedDate = creationDate.toISOString().split('T')[0]; 
                $("#creation_date").val(formattedDate);  
            } else {
                $("#creation_date").val(""); 
            }

            $("#era").val(work.era || "");

            toggleSection("work-form-section"); 
        },
        error: function (xhr, status, error) {
            console.error("Error fetching work details:", error || xhr.responseText);
            alert("Error loading work details. Please try again.");
        },
    });
});
function toggleSection(section) {

    $("#work-list").hide();
    $("#work-form-section").hide(); 

    $("#" + section).show();
}


worksContainer.on("click", ".delete-btn", function () {
    const id = $(this).data("id");

    if (!id) {
        console.error("No ID found for deletion.");
        alert("Error: Unable to find the work ID for deletion.");
        return;
    }

    const confirmationMessage = `Are you sure you want to delete the work with ID: ${id}?`;
    $('#delete-modal-message').text(confirmationMessage);

    $('#delete-modal').addClass('show');

    $('#confirm-delete-btn').on('click', function () {
        $.ajax({
            url: `${API_BASE_URL}/${id}`,
            method: "DELETE",
            success: function () {
                $('#delete-modal').removeClass('show');  
                fetchWorks();  
            },
            error: function (xhr, status, error) {
                console.error("Error deleting work:", error || xhr.responseText);
                alert("Error deleting work. Please try again.");
                $('#delete-modal').removeClass('show');  
            },
        });
    });

    $('#cancel-delete-btn').on('click', function () {
        $('#delete-modal').removeClass('show');  
    });
});

});
