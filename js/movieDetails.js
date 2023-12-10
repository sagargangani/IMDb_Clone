document.addEventListener("DOMContentLoaded", function () {
    const id = localStorage.getItem('movieId');
    const movie_url =
      `https://api.themoviedb.org/3/movie/${id}?api_key=1491aa4180d9309a4964a1da139035b1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer 1491aa4180d9309a4964a1da139035b1",
      },
    };
    // Populate movie details
    const movieDetailsContainer = document.querySelector(".movie_container");

    fetch(movie_url, options)
      .then((res) => res.json())
      .then((data) => {

        console.log(movieDetailsCard(data));
          movieDetailsContainer.innerHTML = movieDetailsCard(data);

      })
    
});

function movieDetailsCard(data) {
    const movieDetailsContainer = document.createElement("div");
    movieDetailsContainer.classList.add("movie-details");

    const imagePath = data.poster_path
      ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
      : "https://via.placeholder.com/150";

    console.log(data);
    const movieDetails = `
        
    
        <div class="movie-details-container" >
            <div class="row">
                <!-- Movie Poster -->
                <div class="col-md-4">
                    <img src="${imagePath}" alt="${data.title}" class="img-fluid">
                </div>
                <!-- Movie Information -->
                <div class="col-md-8">
                    <h1 class="mb-3">${data.title}</h1>
                    <p><strong>Release Year : </strong>${data.release_date}</p>
                    <p><strong>Genre : </strong>${data.genres.map((res) => ` ${res.name} `)}  
                    </p>
                    <p><strong>Duration : </strong>${data.runtime}</p
                    <p><strong>Rating : </strong> ${data.vote_average}/10</p>
                    <p><strong>Description : </strong>${data.overview}</p>
                    <br>
                    <br>
                    <br>
                    <button class="watchtrailer"><i class="fa fa-play"> Trailer</i></button>
                    <button class="watchlist"> Add to WatchList</button>
                </div>
            <div>
        </div>

        
    `;
    return movieDetails;
}

