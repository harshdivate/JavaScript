const global={
    currentPage : window.location.pathname,
}

//DisplayPopularMovies

async function displayPopularMovies(){
    const {results} = await fetchAPIData('movie/popular');
    const grid=document.querySelector('.grid');
    results.forEach((movie)=>{
        const div=document.createElement('div');
        div.classList.add('card');
        div.innerHTML=`
        <a href="movie-details.html?id=${movie.id}">
          ${
            movie.poster_path ? `<img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="Movie Title"
          />` : `<img
          src="../images/no-image.jpg"
          class="card-img-top"
          alt="Movie Title"
        />`
          }
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.original_title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
          </p>
        </div>
      `
       
        console.log(movie);
        grid.appendChild(div);
    })
    
}


//Display Popular TV Shows
async function displayPopularTVShows(){
    const {results} = await fetchAPIData('tv/popular');
    const grid=document.querySelector('#popular-shows');
    results.forEach(tvshow=>{
        const div=document.createElement('div');
        div.classList.add('card');
        div.innerHTML=`
        <div class="card">
          <a href="tv-details.html?id=${tvshow.id}">
            <img
              src="https://image.tmdb.org/t/p/w500${tvshow.poster_path}"
              class="card-img-top"
              alt="${tvshow.original_name}"
            />
          </a>
          <div class="card-body">
            <h5 class="card-title">${tvshow.original_name}</h5>
            <p class="card-text">
              <small class="text-muted">Aired:${tvshow.first_air_date}</small>
            </p>
          </div>
        </div>
      `
       
        console.log(tvshow);
        grid.appendChild(div);
    })
    
}

async function displayMovieDetails(){
  const movieid=window.location.search;
  const id=parseInt(movieid.split('=')[1]);
  const result =await fetchAPIData(`movie/${id}`);
  const movieDetails=document.querySelector('#movie-details');
  console.log(result);
  const div=document.createElement('div');
  div.classList.add('details-top');

  div.innerHTML=`<div class="details-top">
  <div>
  ${
    result.poster_path ? `<img
    src="https://image.tmdb.org/t/p/w500${result.poster_path}"
    class="card-img-top"
    alt="Movie Title"
  />` : `<img
  src="../images/no-image.jpg"
  class="card-img-top"
  alt="${result.poster_path}"
/>`
  }
  </div>
  <div>
    <h2>${result.title}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${result.vote_average.toFixed(1)} / 10
    </p>
    <p class="text-muted">Release Date: ${result.release_date}</p>
    <p>
      ${result.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
      ${result.genres.map((genre)=>
        `<li>${genre.name}</li>`
      ).join(' ')}
    </ul>
    <a href="${result.homepage}" target="./index.html" class="btn">Visit Movie Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Movie Info</h2>
  <ul>
    <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(result.budget)}</li>
    <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(result.revenue)}</li>
    <li><span class="text-secondary">Runtime:</span> ${result.runtime}</li>
    <li><span class="text-secondary">Status:</span> ${result.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">
  ${
    result.production_companies.map(r=>`<span>${r.name}</span>`
      ).join(' ')
  }
  </div>
</div>
`
  console.log(result.production_companies.forEach(r=>{
    console.log(r.name);
  }));
  
  movieDetails.appendChild(div);
}


function addCommasToNumber(number){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

}

{/* <div class="details-top">
          <div>
            <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="Movie Title"
            />
          </div>
          <div>
            <h2>Movie Title</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              8 / 10
            </p>
            <p class="text-muted">Release Date: XX/XX/XXXX</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              atque molestiae error debitis provident dolore hic odit, impedit
              sint, voluptatum consectetur assumenda expedita perferendis
              obcaecati veritatis voluptatibus. Voluptatum repellat suscipit,
              quae molestiae cupiditate modi libero dolorem commodi obcaecati!
              Ratione quia corporis recusandae delectus perspiciatis consequatur
              ipsam. Cumque omnis ad recusandae.
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              <li>Genre 1</li>
              <li>Genre 2</li>
              <li>Genre 3</li>
            </ul>
            <a href="#" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $1,000,000</li>
            <li><span class="text-secondary">Revenue:</span> $2,000,000</li>
            <li><span class="text-secondary">Runtime:</span> 90 minutes</li>
            <li><span class="text-secondary">Status:</span> Released</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">Company 1, Company 2, Company 3</div>
        </div> */}


async function fetchAPIData(endpoint){
    const API_KEY='a46d34aed90eed5822851dd1c4b29070';
    const API_URL='https://api.themoviedb.org/3/';
    showSpinner();
    const response=await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}`);

    const data=response.json();
    hideSpinner();
    return data;
}


function showSpinner(){
    document.querySelector('.spinner').classList.add('show');
}

function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show');
}

//HighLight Active Link
function hightlightActiveLink(page){
    const links=document.querySelectorAll('.nav-link')
    links.forEach((l)=>{
        if(l.getAttribute('href')===global.currentPage){
            l.classList.add('active');
        }
    })
}

function init(){
    switch(global.currentPage){
        case '/' :
        case 'index.html':

            displayPopularMovies();
            break;
        case '/shows.html':
            displayPopularTVShows();
            console.log('Shows');
            break;
        case '/movie-details.html':
            // console.log(URL);
            displayMovieDetails();
            console.log('Movie Details');
            break;

        case '/tv-details.html':
            console.log('TV Details');
            break;
        
        case '/search.html':
                console.log('Search');
                break;

    }
    hightlightActiveLink();   
}

document.addEventListener('DOMContentLoaded',init)