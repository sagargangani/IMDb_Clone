let current_page=1;

document.addEventListener("DOMContentLoaded", () => {
    const nextButton = document.getElementById('next_button');
    nextButton.addEventListener('click', loadNextPage);

    // Load initial data
    loadNextPage();
  
   
  
    
  
   
  });

  function redirect_To_Details(tvId){
    window.location.href = 'tv_showDetails.html';
    localStorage.setItem('tv_Id', tvId);
  }

  function loadNextPage(){
    
    const tv_url =
      `https://api.themoviedb.org/3/tv/top_rated?api_key=1491aa4180d9309a4964a1da139035b1&page=${current_page}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer 1491aa4180d9309a4964a1da139035b1",
      },
    };
  
    const tvContainer = document.querySelector(".tv-container");
    tvContainer.innerHTML="";
  
    

      fetch(tv_url, options)
      .then((res) => res.json())
      .then((data) => {
        const tvShows = data.results.slice(0, 50);
  
        tvShows.forEach((tv) => {
          localStorage.setItem('tv_Id', tv.id);
          const tvCard = createTVShowCard(tv);
          tvContainer.appendChild(tvCard);
        });
                // Increment the page for the next request
                current_page++;
      })
      .catch((err) => console.error("error:" + err));
  }

  function createTVShowCard(tv) {
    const tvCard = document.createElement("div");
    tvCard.classList.add("tv-card");

    const imagePath = tv.poster_path
      ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
      : "https://via.placeholder.com/150";
    const tvInfo = `

    <div class="card">
      <div class="card-image" onclick="redirect_To_Details(${tv.id})">
        <img src="${imagePath}" alt="${tv.name}" />
      </div>
      <div class="card-content" onclick="redirect_To_Details(${tv.id})">
        <h2>${tv.name}</h2>
        <p><strong>First Air Date:</strong> ${tv.first_air_date}</p>
        <p><strong>Rating:</strong> ${tv.vote_average}</p>
        <p>${tv.overview.slice(0,100)}</p>
      </div>
    </div>
    `;

    tvCard.innerHTML = tvInfo;
    return tvCard;
  }
  function toggleTheme() {
    const body = document.body;
    body.classList.toggle("dark-theme");
  }