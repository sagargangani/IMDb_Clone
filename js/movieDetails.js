document.addEventListener("DOMContentLoaded", function () {
    
    const movie_url =
      `https://api.themoviedb.org/3/movie/901362?api_key=1491aa4180d9309a4964a1da139035b1`;
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
        // const movie = data.results;
  
        // movies.forEach((movie) => {
        //   const movieCard = movieDetailsCard(data);
        //   console.log(movieCard);
        //   movieDetailsContainer.innerHTML = movieCard;
        console.log(movieDetailsCard(data));
          movieDetailsContainer.innerHTML = movieDetailsCard(data);
                  // });

        // Increment the page for the next request
        // current_page++;
      })
    
});

function movieDetailsCard(data) {
    const movieDetailsContainer = document.createElement("div");
    movieDetailsContainer.classList.add("movie-details");

    const imagePath = data.poster_path
      ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
      : "https://via.placeholder.com/150";


    // const movieDetails = `
    //     <img class="movie-poster" src="${imagePath}" alt="${data.title}">
    //     <h2>${data.title}</h2>
    //     <p><strong>Release Date:</strong> ${data.releaseDate}</p>
    //     <p><strong>Duration:</strong> ${data.duration}</p>
    //     <p><strong>Genre:</strong> ${data.genre}</p>
    //     <p><strong>Description:</strong> ${data.description}</p>
    //     <a href="index.html" class="back-button">Back to Movies</a>
    // `;
    console.log(data);
    const movieDetails = `
        

    <div class="card" style="justify-content : center; margin-left : 10%; margin-right : 10%; height: 30%;">
  <img src="${imagePath}" class="card-img-top" alt="${data.title}" style="object-fit : cover; height : 5%;">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
        
    `;

    // movieDetailsContainer.innerHTML = movieDetails;
    return movieDetails;
}

