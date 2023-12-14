let current_page=1;

document.addEventListener("DOMContentLoaded", () => {
    const nextButton = document.getElementById('next_button');
    nextButton.addEventListener('click', loadNextPage);

    // Load initial data
    loadNextPage();
    
   
  
    
  
   
  });
  // const moviClick = document.querySelector('.movie-container');
  //   moviClick.addEventListener('click', redirect_To_Details);
  function redirect_To_Details(movieId){
    window.location.href = 'movieDetails.html';
    localStorage.setItem('movieId', movieId);
  }

  function loadNextPage(){
    
    const movie_url =
      `https://api.themoviedb.org/3/movie/now_playing?api_key=1491aa4180d9309a4964a1da139035b1&page=${current_page}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer 1491aa4180d9309a4964a1da139035b1",
      },
    };
  
    const movieContainer = document.querySelector(".movie-container");
    movieContainer.innerHTML="";
  
    fetch(movie_url, options)
      .then((res) => res.json())
      .then((data) => {
        const movies = data.results.slice(0, 50);
  
        movies.forEach((movie) => {
          localStorage.setItem('movieId', movie.id);
          const movieCard = createMovieCard(movie);
          movieContainer.appendChild(movieCard);
        });

        // Increment the page for the next request
        current_page++;
      })
      .catch((err) => console.error("error:" + err));
  }

  function createMovieCard(movie) {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    const imagePath = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/150";
    const movieInfo = `


    <div class="card">
      <div class="card-image" onclick="redirect_To_Details(${movie.id})">
          <img src="${imagePath}" alt="${movie.title}" />
      </div>
      <div class="card-content" onclick="redirect_To_Details(${movie.id})">
          <h2>${movie.title}</h2>
          <p><strong>Release Date:</strong> ${movie.release_date}</p>
          <p><strong>Rating:</strong> ${movie.vote_average}</p>
          <p>${movie.overview.slice(0,100)}</p>
      </div>
    </div>
    `;

    movieCard.innerHTML = movieInfo;
    return movieCard;
  }
  function toggleTheme() {
    const body = document.body;
    body.classList.toggle("dark-theme");
  }