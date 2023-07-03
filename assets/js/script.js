let mainVideoEl = document.querySelector('.video-play');
let suggestionsEl = document.querySelector('.suggest-list');
let searchBoxEl = document.querySelector('#moviename');
let movieNameRef = document.getElementById("moviename");
let result = document.getElementById("fill");

async function MovieData(){

  let movieName = movieNameRef.value;

  //If search is empty
  if (movieName.length <= 0) {
    result.innerHTML = `<h1><strong>Please Enter A Movie Name</strong></h1>`;
  }
  //If search is NOT empty
  else {
    var movie = document.getElementById("moviename").value;
    let url =`https://www.omdbapi.com/?t=${movie}&apikey=5bc37ae5`
    let res = await fetch(url)
    let data = await res.json();

      var box = document.getElementById("fill")
      box.innerHTML = null;

      var poster = document.createElement("img")
      poster.src = data.Poster;

      var title = document.createElement("p")
      title.innerHTML = `Title: ${data.Title}`;

      var Actors = document.createElement("p")
      Actors.innerText = "Actors: "+ data.Actors;

      var Awards = document.createElement("p")
      Awards.innerText = "Awards: "+ data.Awards;

      var year = document.createElement("p")
      year.innerText = `Release Date: ${data.Released}`;

      var genre = document.createElement("p")
      genre.innerText = "Genres: " + data.Genre;

      var boxoffice = document.createElement("p")
      boxoffice.innerText = `BoxOffice: ${data.BoxOffice}`;

      var language = document.createElement("p")
      language.innerText = "Language: "+ data.Language;

      var rating = document.createElement("p")
      rating.innerText = `imdbRating: ${data.imdbRating}`;

      var Director= document.createElement("p")
      Director.innerText = "Director: "+ data.Director;

      var Plot= document.createElement("p")
      Plot.innerText = "Plot: "+ data.Plot;

      let display = document.createElement("p")
      display.setAttribute("class","box")
      display.append(poster, title, Awards, genre, year,language,rating,Director,Actors,boxoffice,Plot)

      box.append(display);

      console.log(data);
  } 
}
var showTrailer = () => {
var searchMovie = searchBoxEl.value;
searchMovie += `${searchMovie}trailer`
var url = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&maxResults=4&type=video&videoEmbeddable=true&key=AIzaSyCx-CxS-80q1yfvlKnjp2Lb9tiPQQppwaA&q=' + searchMovie;

fetch(url)
.then(response => response.json())
.then(

    result => {
  mainVideoEl.textContent = '';
  mainVideoEl.innerHTML = `<iframe class="embed-responsive-item" src=https://www.youtube.com/embed/${result.items[0].id.videoId} allowFullScreen title='youtube player' />`;
  populateSuggestions(result.items.slice(1, 10));
  console.log(result);
})
.catch(error => {
  console.log(error);
  document.querySelector('.video-play').textContent = error;
});
};

const populateSuggestions = (videos) => {
suggestionsEl.textContent = '';

for (video of videos) {
let videoElement = `<a href="#" class="suggested" data-videoId=${video.id.videoId} ><img src=${video.snippet.thumbnails.medium.url} /></a>`;
suggestionsEl.insertAdjacentHTML('beforeend', videoElement);
}

document.querySelectorAll('a.suggested').forEach((element) => {
element.addEventListener('click', (e) => {
  let videoid = e.currentTarget.dataset.videoid;
  mainVideoEl.textContent = '';
  mainVideoEl.innerHTML = `<iframe class="embed-responsive-item" src=https://www.youtube.com/embed/${videoid} allowFullScreen title='youtube player' />`;
});
});
};

document.querySelector('button').addEventListener('click', () => {
showTrailer();
MovieData();
});


showTrailer();


