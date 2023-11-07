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

  //Overlay for background image
  displayBackgroundImage('movie',result.backdrop_path);
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


async function displayShowDetails(){
  const showid = window.location.search;
  const id = parseInt(showid.split('=')[1]);
  const show = await fetchAPIData(`tv/${id}`);
  const div = document.querySelector('#show-details');
  displayBackgroundImage('show',show.backdrop_path);
  console.log(show.backdrop_path);
  div.innerHTML=`      
  <div class="details-top">
  <div>
    ${
      show.poster_path ? `
      <img
      src="https://image.tmdb.org/t/p/w500${show.poster_path}";
      class="card-img-top"
      alt="${show.original_name}"
    />` : `<img
    src="../images/no-image.jpg"
    class="card-img-top"
    alt="${show.original_name}"
      />`
    }
  </div>
  <div>
    <h2>${show.original_name}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${show.vote_average.toFixed(1)}/ 10
    </p>
    <p class="text-muted">Release Date: ${show.first_air_date}</p>
    <p>
     ${show.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
     ${
        show.genres.map((g)=>`<li>${g.name}</li>`).join('')
     }
    </ul>
    <a href="${show.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Show Info</h2>
  <ul>
    <li><span class="text-secondary">Number Of Episodes:</span> ${show.number_of_episodes}</li>
    <li>
      <span class="text-secondary">Last Episode To Air:</span> ${show.last_air_date}
    
    </li>
    <li><span class="text-secondary">Status:</span> ${show.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">
      ${
        show.production_companies.map(p=>`<li>${p.name}</li>`).join('')
      }
  </div>
</div>`
 

console.log(show);
}


//Display Backdrop  on Details Page
function displayBackgroundImage(type,background_path){
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage=`url(https://image.tmdb.org/t/p/original/${background_path})`;
  overlayDiv.style.backgroundRepeat='no-repeat';
  overlayDiv.style.backgroundPosition='center';
  overlayDiv.style.backgroundSize='cover';
  overlayDiv.style.height='100vh';
  overlayDiv.style.width='100vw';
  overlayDiv.style.position='absolute';
  overlayDiv.style.top='0';
  overlayDiv.style.left='0';
  overlayDiv.style.zIndex='-1';
  overlayDiv.style.opacity='0.1';
  
  if(type==='movie'){
    document.querySelector('#movie-details').appendChild(overlayDiv);
  }else if(type==='show'){
    console.log('her');
    document.querySelector('#show-details').appendChild(overlayDiv);

  }
}

function addCommasToNumber(number){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

}




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
            displayShowDetails();
            break;
        
        case '/search.html':
                console.log('Search');
                break;

    }
    hightlightActiveLink();   
}

document.addEventListener('DOMContentLoaded',init)