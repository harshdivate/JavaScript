const btn=document.getElementById('joke-btn');
const xhr=new XMLHttpRequest();
const jokeContainer=document.getElementById('joke');


xhr.onreadystatechange= function(){
    if(this.status===200 && this.readyState===4){
        const data=JSON.parse(this.responseText);
        const joke=data.value;
        console.log(joke);
        addJokeToDom(joke);
    }
}

function addJokeToDom(joke){
    jokeContainer.innerHTML=joke

}


function getJoke(){
    xhr.open('GET','https://api.chucknorris.io/jokes/random');
    xhr.send();
}





btn.addEventListener('click',getJoke);
