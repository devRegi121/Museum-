function fetchAllArtists() {
    
    $.ajax({
        url: 'https://localhost:44326/api/Artist/get-all-artists',
        method: "GET",
        dataType: "json",
        success: function (artists) {
           
            if (artists.length === 0) {
                $('#artists-container').html('No artists found.');
                return;
            }

        
            displayArtists(artists);
        },
        error: function (xhr, status, error) {
            console.error('Error fetching artists:', error);
            $('#artists-container').html('Error fetching artists. Please try again later.');
        }
    });
}


function displayArtists(artists) {
    const container = $("#artists-container");
    container.empty(); 

    // Iterate over each artist and create a card for them
    artists.forEach(artist => {
        const artistCard = `
            <div class="card mb-3" style="max-width: 100%;">
                <div class="row g-0">
                    <div class="col-md-4 p-0">
                        <img src="${artist.imageUrl}" class="img-fluid card-img-top" alt="${artist.name}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${artist.name}</h5>
                            <p class="card-text">${artist.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.append(artistCard); 
    });
}


$(document).ready(fetchAllArtists);
