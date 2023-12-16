// Author Name : Het Pandya
// Student Id : C0892917

document.addEventListener("DOMContentLoaded", function () {
  const id = localStorage.getItem("tv_Id");
  const movie_url = `https://api.themoviedb.org/3/tv/${id}?api_key=1491aa4180d9309a4964a1da139035b1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer 1491aa4180d9309a4964a1da139035b1",
    },
  };
  // Populate movie details
  const movieDetailsContainer = document.querySelector(".tv_show_container");

  fetch(movie_url, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(tvDetailsCard(data));
      movieDetailsContainer.innerHTML = tvDetailsCard(data);
    });
});

function toggleTheme() {
  const body = document.body;
  body.classList.toggle("dark-theme");
}

function tvDetailsCard(data) {
  const movieDetailsContainer = document.createElement("div");
  movieDetailsContainer.classList.add("movie-details");

  const imagePath = data.poster_path
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
    : "https://via.placeholder.com/150";

  console.log(data);
  const movieDetails = `
        
    
        <div class="tvshow-details-container" >
            <div class="row">
                <!-- Movie Poster -->
                <div class="col-md-4">
                    <img src="${imagePath}" alt="${
    data.name
  }" class="img-fluid">
                    <div class="play-icon">
                      <span>&#9658;</span>
                    </div>
                </div>

                <!-- Tv_Show Information -->
                <div class="col-md-8">
                    <h1 class="mb-3">${data.name}</h1>
                    <p><strong>Last Season Release : </strong>${
                      data.last_air_date
                    }</p>
                    <p><strong>Genre : </strong>${data.genres.map(
                      (res) => ` ${res.name} `
                    )}  
                    </p>
                    <p><strong>Seasons : </strong>${data.seasons.map(
                      (res) => ` ${res.name} `
                    )}  
                    </p>
                    <p><strong>Rating : </strong> ${data.vote_average}/10</p>
                    <p><strong>Description : </strong>${data.overview}</p>
                    <br>
                    <br>
                    <br>
                    <button class="watchtrailer"><i class="fa fa-play"></i> Watch Trailer</button>
                    <button class="watchlist"> Add to WatchList</button>
                </div>
            <div>
        </div>

        
    `;
  return movieDetails;
}

function toggleMenu() {
  var mobileMenu = document.querySelector(".mobile-menu");
  mobileMenu.classList.toggle("active");
}
