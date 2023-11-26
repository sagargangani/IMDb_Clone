document.addEventListener("DOMContentLoaded", () => {
  const movie_url =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=93d7a9f8ea42eb50058f6fc4f4396c4e";
  const tv_url =
    "https://api.themoviedb.org/3/tv/top_rated?api_key=93d7a9f8ea42eb50058f6fc4f4396c4e";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer 93d7a9f8ea42eb50058f6fc4f4396c4e",
    },
  };

  const movieContainer = document.querySelector(".movie-container");
  const tvContainer = document.querySelector(".tv-container");

  fetch(movie_url, options)
    .then((res) => res.json())
    .then((data) => {
      const movies = data.results.slice(0, 4);

      movies.forEach((movie) => {
        const movieCard = createMovieCard(movie);
        movieContainer.appendChild(movieCard);
      });
    })
    .catch((err) => console.error("error:" + err));

  fetch(tv_url, options)
    .then((res) => res.json())
    .then((data) => {
      const tvShows = data.results.slice(0, 4);

      tvShows.forEach((tv) => {
        const tvCard = createTVShowCard(tv);
        tvContainer.appendChild(tvCard);
      });
    })
    .catch((err) => console.error("error:" + err));

  function createMovieCard(movie) {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    const imagePath = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/150";
    const movieInfo = `
      <div class="card-image">
        <img src="${imagePath}" alt="${movie.title}"/>
      </div>
      <div style="padding: 10px;" class="card-content">
        <h2 style=" font-weight: bold;">${movie.title}</h2>
        <p><strong>Release Date:</strong> ${movie.release_date}</p>
        <p><strong>Rating:</strong> ${movie.vote_average}</p>
        <p>${movie.overview.slice(0, 150)} ...</p>
      </div>
    `;

    movieCard.innerHTML = movieInfo;
    return movieCard;
  }

  function createTVShowCard(tv) {
    const tvCard = document.createElement("div");
    tvCard.classList.add("tv-card");

    const imagePath = tv.poster_path
      ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
      : "https://via.placeholder.com/150";
    const tvInfo = `
      <div class="card-image">
        <img src="${imagePath}" alt="${tv.name}" />
      </div>
      <div style="padding: 10px;" class="card-content">
        <h2 style="font-weight: bold;">${tv.name}</h2>
        <p><strong>First Air Date:</strong> ${tv.first_air_date}</p>
        <p><strong>Rating:</strong> ${tv.vote_average}</p>
        <p>${tv.overview.slice(0, 150)} ...</p>
      </div>
    `;

    tvCard.innerHTML = tvInfo;
    return tvCard;
  }
});

function toggleTheme() {
  const body = document.body;
  body.classList.toggle("dark-theme");
}
