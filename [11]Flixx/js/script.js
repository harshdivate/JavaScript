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
        case '/movies-details.html':
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