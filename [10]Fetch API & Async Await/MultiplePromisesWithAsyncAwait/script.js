async function getAllData(){
    const moviesRes= await fetch('./movies.json');
    const moives=await moviesRes.json();
    const actorsRes= await fetch('./actors.json');
    const actors=await actorsRes.json();
    const directorsRes= await fetch('./directors.json');
    const directors=await directorsRes.json();
    console.log(moives,actors,directors);
}

getAllData();