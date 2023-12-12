// awards.js
document.addEventListener("DOMContentLoaded", () => {
    // Fetch awards and events data from your desired API endpoint
    const bestCategoriesData = [
      {
        title: "Best Movie",
        description: "The most outstanding movie of the year.",
        image: "https://images.unsplash.com/photo-1510022079733-8b58aca7c4a9?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        title: "Director of the Year",
        description: "Celebrating the exceptional directorial achievements.",
        image: "https://images.unsplash.com/photo-1616341591186-91b23ad59a26?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      // Add more entries as needed
    ];
  
    const relevantEventsData = [
      {
        title: "Annual Film Festival",
        date: "2023-08-15",
        image: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        title: "Celebrity Awards Night",
        date: "2023-09-20",
        image: "https://images.unsplash.com/photo-1584634407036-a403356514cd?q=80&w=1782&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      // Add more entries as needed
    ];
  
    const videosData = [
      {
        title: "Highlights of Best Movie",
        videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
      },
      {
        title: "Behind the Scenes: Director of the Year",
        videoUrl: "https://www.youtube.com/watch?v=example2",
      },
      // Add more entries as needed
    ];
  
    const otherEventsData = [
      {
        title: "Red Carpet Gala",
        link: "#",
      },
      {
        title: "Industry Symposium",
        link: "#",
      },
      // Add more entries as needed
    ];
  
    const bestCategoriesContainer = document.querySelector(".best-categories .row");
    const relevantEventsContainer = document.querySelector(".relevant-events .row");
    const videosContainer = document.querySelector(".videos");
  
    // Function to create cards
    function createCard(data) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.classList.add("text-center");
      card.classList.add("my-3");
      card.classList.add("h-75");
  
      const imagePath = data.image || "https://via.placeholder.com/150";
      const cardContent = `
        <img src="${imagePath}" class="card-img-top w-50 h-50 mx-auto mt-3" alt="${data.title}">
        <div class="card-body">
          <h5 class="card-title">${data.title}</h5>
          <p class="card-text">${data.description || formatDate(data.date)}</p>
        </div>
      `;
  
      card.innerHTML = cardContent;
      return card;
    }
  
    // Function to create video iframe
    function createVideoIframe(videoUrl) {
      const iframe = document.createElement("iframe");
      iframe.setAttribute("src", videoUrl);
      iframe.setAttribute("width", "100%");
      iframe.setAttribute("height", "315");
      iframe.setAttribute("allowfullscreen", "true");
      return iframe;
    }
  
    // Populate Best Categories
    bestCategoriesData.forEach((category) => {
      const card = createCard(category);
      bestCategoriesContainer.appendChild(card);
    });
  
    // Populate Relevant Events
    relevantEventsData.forEach((event) => {
      const card = createCard(event);
      relevantEventsContainer.appendChild(card);
    });
  
    // Populate Videos
    videosData.forEach((video) => {
      const videoIframe = createVideoIframe(video.videoUrl);
      const videoCard = createCard({ title: video.title });
      videoCard.querySelector(".card-body").appendChild(videoIframe);
      videosContainer.appendChild(videoCard);
    });
  
    // Populate Other Events Links
    const otherEventsList = document.querySelector(".other-events-list");
    otherEventsData.forEach((event) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `<a href="${event.link}">${event.title}</a>`;
      otherEventsList.appendChild(listItem);
    });
  
    // Helper function to format date
    function formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
  });
  