const global={
    currentPage : window.location.pathname,
    search : {
      term : '',
      type : '',
      page:1,
      totalPages :1,
      totalResults:1
    }
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
  // console.log(result);
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
 
  
  movieDetails.appendChild(div);
}

async function search(){
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  global.search.type= urlParams.get('type');
  global.search.term = urlParams.get('search-term');
  console.log(global.search.term);
  if(global.search.term !=='' && global.search.term !== null){
    //clg
    const {results,total_pages,page,total_results} = await  searchAPIData();
    global.search.page=page;
    global.search.totalPages=total_pages;
    global.search.totalResults=total_results;

    console.log(global.search.totalPages);

    if(results.length===0){
      showAlert('No Result Found','error');
      return;
    }

    displaySearchResults(results);
      
  }else{
    showAlert('Please Enter a movie','error');
  }
}

function displaySearchResults(results){
  document.querySelector('#search-results').innerHTML='';
  document.querySelector('#search-results-heading').innerHTML='';
  document.querySelector('#pagination').innerHTML='';
  const searchResults=document.querySelector('#search-results');
  results.forEach(result =>{
    const div=document.createElement('div');
    div.classList.add("card");
    div.innerHTML=`
    
    <a href="${
      global.search.type === 'movie' ? `movie-details.html?id=${result.id}` : `tv-details.html?id=${result.id}`    }">
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
      
    </a>
    <div class="card-body">
      <h5 class="card-title">${global.search.type === 'movie' ? result.original_title : result.original_name}</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${
          global.search.type === 'movie' ? result.release_date : result.first_air_date
        }
          </small>
      </p>
    </div>

    `
    document.querySelector('#search-results-heading').innerHTML=`
        <h1 >${results.length} OF ${global.search.totalResults} FOR ${global.search.term} </h1>
    `
    searchResults.appendChild(div);
  })

  displayPagination();
}

function displayPagination(){

  const div=document.createElement('div');
  div.classList.add('pagination');
  div.innerHTML=`
  <button class="btn btn-primary" id="prev">Prev</button>
  <button class="btn btn-primary" id="next">Next</button>
  <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>`;
  document.querySelector('#pagination').appendChild(div);

  //Disable the prev button if on page 1
  if(global.search.page ===1){
    document.querySelector('#prev').disabled=true;
  }


  if(global.search.page === global.search.totalPages){
    document.querySelector('#next').disabled=true;
  }

  //Add Event Listener
  document.querySelector('#next').addEventListener('click',async ()=>{
    global.search.page++;
    const { results ,total_pages} = await searchAPIData();
    displaySearchResults(results);
  });


  document.querySelector('#prev').addEventListener('click',async ()=>{
    global.search.page--;
    const {results,total_pages} = await searchAPIData();
    displaySearchResults(results)
  })
}


// Show Alert
function showAlert(message, className){
  const alertDiv= document.createElement('div');
  alertDiv.classList.add('alert',className);
  alertDiv.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertDiv);

  setTimeout(()=>{
    alertDiv.remove();
  },3000)
}

async function displaySlider(){
  const { results } = await fetchAPIData('movie/now_playing');
  console.log(results);
  
  results.forEach((result)=>{
    const div= document.createElement('div');
    div.classList.add("swiper-slide");

    div.innerHTML=`
                  <a href="movie-details.html?id=${result.id}">
                     <img src="https://image.tmdb.org/t/p/w500${result.poster_path}" alt="${result.original_title}" />
                   </a>
                   <h4 class="swiper-rating">
                     <i class="fas fa-star text-secondary"></i> ${result.vote_average.toFixed(1)} / 10
                   </h4>
                 
    `;
    document.querySelector('.swiper-wrapper').appendChild(div);
    initSwiper();
  })
}

function initSwiper(){
  const swiper=new Swiper('.swiper',{
    slidesPerView : 1,
    spaceBetween: 30,
    freeMode : true ,
    loop : true, 
    autoplay: {
      delay : 4000,
      disableOnInteraction : false
    },
    breakpoints :{
      500:{
        slidesPerView :2
      },
      700:{
        slidesPerView :3
      },
      1200:{
        slidesPerView :4
      },
    }
      
  })
}




async function displayShowDetails(){
  const showid = window.location.search;
  const id = parseInt(showid.split('=')[1]);
  const show = await fetchAPIData(`tv/${id}`);
  const div = document.querySelector('#show-details');
  displayBackgroundImage('show',show.backdrop_path);
  // console.log(show.backdrop_path);
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


async function searchAPIData(){
  const API_KEY='a46d34aed90eed5822851dd1c4b29070';
  const API_URL='https://api.themoviedb.org/3/';
  showSpinner();
  console.log(global.search.term);
  const response=await fetch(`${API_URL}search/${global.search.type}?api_key=${API_KEY}&query=${global.search.term}&page=${global.search.page}`);

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
                displaySlider();
                displayPopularMovies();
                break;
        case 'index.html':
            displaySlider();
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
                search();
                break;

    }
    hightlightActiveLink();   
}

document.addEventListener('DOMContentLoaded',init)