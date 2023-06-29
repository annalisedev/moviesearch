// console.log("hello Rishav");

// console.log('Chris');

// function myFunction() {
//     // Declare variables
//     var input, filter, ul, li, a, i, txtValue;
//     input = document.getElementById('myInput');
//     filter = input.value.toUpperCase();
//     ul = document.getElementById("myUL");
//     li = ul.getElementsByTagName('li');
  
//     // Loop through all list items, and hide those who don't match the search query
//     for (i = 0; i < li.length; i++) {
//       a = li[i].getElementsByTagName("a")[0];
//       txtValue = a.textContent || a.innerText;
//       if (txtValue.toUpperCase().indexOf(filter) > -1) {
//         li[i].style.display = "";
//       } else {
//         li[i].style.display = "none";
//       }
//     }
//   }

async function MovieData(){
  var movie = document.getElementById("movie").value;
  let url =`https://www.omdbapi.com/?t=${movie}&apikey=5bc37ae5`
  let res = await fetch(url)
  let data = await res.json();

  console.log(data);
  
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
}

