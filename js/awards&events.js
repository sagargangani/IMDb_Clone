//  Author Name : Jayti Patel
// Student Id : C0895313 
document.addEventListener("DOMContentLoaded", () => {

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
    
  ];

  const videosData = [
    {
      title: "Behind the scenes",
      videoUrl: "https://www.youtube.com/watch?v=NPmzTHdUv-o",
      date: "2023-06-01",
      description: "See all the celebs at the 2022 Emmy Awards after-parties behind the scenes!",
      image: "https://images.unsplash.com/photo-1563208800-6b789bd31d95?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "STARmeter Awards",
      videoUrl: "https://www.youtube.com/watch?v=UXRuGGvXaHs",
      date: "2023-06-01",
      description:"Eternals star Priyanka Chopra receives the first-ever IMDb STARmeter Award",
      image: "https://images.unsplash.com/photo-1656761961817-fc9bad62f5df?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    
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
    <div class="card-body">
    <h5 class="card-title">${data.title}</h5>
    <img src="${imagePath}" class="xcard-img-top w-50 h-50 mx-auto mt-3" alt="${data.title}">
        <p class="card-text pt-5 fw-bolder">${data.description || formatDate(data.date)}</p>
      </div>
    `;

    card.innerHTML = cardContent;
    return card;
  }


  // Function to create video iframe
  function createVideoIframe(videoUrl) {
    const iframe = document.createElement("iframe");
    iframe.setAttribute("src", `https://www.youtube-nocookie.com/embed/${getYouTubeVideoId(videoUrl)}`);
    iframe.setAttribute("width", "50%");
    iframe.style.margin = "auto";
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
    const videoCard = createCard({
      title: video.title,
      image: video.image,
      description: video.description, 
      head_desc: video.head_desc
    });
    videoCard.querySelector(".card-body").appendChild(videoIframe);
    videoCard.querySelector(".card-body").classList.add("card");
    videoCard.querySelector(".card-body").classList.add("text-center");
    videoCard.querySelector(".card-body").classList.add("my-3");
    videoCard.querySelector(".card-body").classList.add("h-75");
    videosContainer.appendChild(videoCard);
  });

  // Helper function to format date
  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  // Helper function to extract YouTube video ID from the URL
  function getYouTubeVideoId(url) {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  }
});
  
