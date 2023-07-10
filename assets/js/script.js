var mainVideoEl = document.querySelector(".video-play");
var suggestionsEl = document.querySelector(".suggest-list");
var searchBoxEl = document.querySelector("#moviename");
let result = document.getElementById("fill");

// Retrieve previous searches from local storage and display the last 10
var previousSearches = JSON.parse(localStorage.getItem("previousSearches")) || [];
var previousSearchesList = document.getElementById("previousSearches");

// Limit the previous searches to the last 7
previousSearches = previousSearches.slice(-7);

// Reverse the order of previous searches to bring the newest one to the top
previousSearches.reverse();

previousSearches.forEach((searchTerm) => {
  var listItem = document.createElement("li");
  listItem.textContent = searchTerm;
  listItem.addEventListener("click", () => {
    searchBoxEl.value = searchTerm;
    loadMovies(searchTerm);
  });
  listItem.addEventListener("mouseenter", () => {
    listItem.classList.add("highlight");
  });
  listItem.addEventListener("mouseleave", () => {
    listItem.classList.remove("highlight");
  });
  previousSearchesList.appendChild(listItem);
});

// Remove duplicates from previous searches array
previousSearches = [...new Set(previousSearches)];

// Update previous searches in the HTML
function updatePreviousSearches() {
  previousSearchesList.innerHTML = ""; // Clear previous searches list

  // Reverse the order of previous searches to bring the newest one to the top
  previousSearches.reverse();

  // Display the updated previous searches in the HTML
  previousSearches.forEach((searchTerm) => {
    var listItem = document.createElement("li");
    listItem.textContent = searchTerm;
    listItem.addEventListener("click", () => {
      searchBoxEl.value = searchTerm;
      loadMovies(searchTerm);
    });
    listItem.addEventListener("mouseenter", () => {
      listItem.classList.add("highlight");
    });
    listItem.addEventListener("mouseleave", () => {
      listItem.classList.remove("highlight");
    });
    previousSearchesList.appendChild(listItem);
  });

  // Limit the previous searches to the last 7
  previousSearches = previousSearches.slice(-7);

  // Save the updated previous searches to local storage
  localStorage.setItem("previousSearches", JSON.stringify(previousSearches));
}

//function to search movie data on OMDB

async function movieData(movie, movieId) {
  console.log("Getting data for " + movie + " with id " + movieId);
  //If search is empty
  if (movie.length <= 0) {
    result.innerHTML = `<h1><strong>Please Enter A Movie Name</strong></h1>`;
  }
  //If search is NOT empty
  else {
    let url = `https://www.omdbapi.com/?t=${movie}&apikey=5bc37ae5`;
    let res = await fetch(url);
    let data = await res.json();

    var box = document.getElementById("fill");
    box.innerHTML = null;

    var poster = document.createElement("img");
    poster.src = data.Poster;

    var title = document.createElement("p");
    title.innerHTML = `Title: ${data.Title}`;

    var Actors = document.createElement("p");
    Actors.innerText = "Actors: " + data.Actors;

    var Awards = document.createElement("p");
    Awards.innerText = "Awards: " + data.Awards;

    var year = document.createElement("p");
    year.innerText = `Release Date: ${data.Released}`;

    var genre = document.createElement("p");
    genre.innerText = "Genres: " + data.Genre;

    var boxoffice = document.createElement("p");
    boxoffice.innerText = `BoxOffice: ${data.BoxOffice}`;

    var language = document.createElement("p");
    language.innerText = "Language: " + data.Language;

    var rating = document.createElement("p");
    rating.innerText = `imdbRating: ${data.imdbRating}`;

    var Director = document.createElement("p");
    Director.innerText = "Director: " + data.Director;

    var Plot = document.createElement("p");
    Plot.innerText = "Plot: " + data.Plot;

    let display = document.createElement("p");
    display.setAttribute("class", "box");
    display.append(
      poster,
      title,
      Awards,
      genre,
      year,
      language,
      rating,
      Director,
      Actors,
      boxoffice,
      Plot
    );

    box.append(display);

    console.log(data);
  }

  // Save the current search term to local storage
  previousSearches.push(movie);
  localStorage.setItem("previousSearches", JSON.stringify(previousSearches));
  updatePreviousSearches(); // Update previous searches in HTML
}

//function to pull trailers from Youtube, adds 'trailer' to any search that the user inputs
var showTrailer = (searchMovie) => {
  searchMovie += `${searchMovie}trailer`;
  var url =
    "https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&maxResults=4&type=video&videoEmbeddable=true&key=YOUR_YOUTUBE_API_KEY&q=" +
    searchMovie;

  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      mainVideoEl.textContent = "";
      mainVideoEl.innerHTML = `<iframe class="embed-responsive-item" src=https://www.youtube.com/embed/${result.items[0].id.videoId} allowFullScreen title='youtube player' />`;
      populateSuggestions(result.items.slice(1, 10));
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
      document.querySelector(".video-play").textContent = error;
    });
};

const populateSuggestions = (videos) => {
  suggestionsEl.textContent = "";

  for (video of videos) {
    let videoElement = `<a href="#" class="suggested" data-videoId=${video.id.videoId} ><img src=${video.snippet.thumbnails.medium.url} /></a>`;
    suggestionsEl.insertAdjacentHTML("beforeend", videoElement);
  }

  document.querySelectorAll("a.suggested").forEach((element) => {
    element.addEventListener("click", (e) => {
      let videoid = e.currentTarget.dataset.videoid;
      mainVideoEl.textContent = "";
      mainVideoEl.innerHTML = `<iframe class="embed-responsive-item" src=https://www.youtube.com/embed/${videoid} allowFullScreen title='youtube player' />`;
    });
  });
};

async function loadMovies(searchTerm) {
  const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=5bc37ae5`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  console.log(data.Search);
  // if (data.Response == "True") displayMovieList(data.Search);
  if (data.Response === "True") {
    var sources = [];
    data.Search.forEach(function (movie) {
      sources.push({
        label: `${movie.Title} - ${movie.Year}`,
        value: movie.Title,
        imdbID: movie.imdbID,
      });
    });
    $("#moviename").autocomplete({
      source: sources,
      select: function (event, selected) {
        const item = selected.item;
        console.log("Selected item", item);
        if (item && item.value) {
          showTrailer(item.label);
          movieData(item.value, item.imdbID);
        }
        console.log(item);
      },
    });
    // $("#moviename").focus();
    $("#moviename").autocomplete("search", searchTerm);
  }
}

document.getElementById("search-button").addEventListener("click", () => {
  const searchTerm = searchBoxEl.value.trim();
  loadMovies(searchTerm);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const searchTerm = searchBoxEl.value.trim();
    loadMovies(searchTerm);
  }
});
