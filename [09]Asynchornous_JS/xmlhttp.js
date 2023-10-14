const xhr=new XMLHttpRequest();
const ul=document.getElementById('result');


xhr.open('GET','./movies.json');


xhr.onreadystatechange=function (){
    if(xhr.status===200 && xhr.readyState===4){
        const data=JSON.parse(this.responseText);

        data.forEach((d)=>{
            console.log(d);
            const li=document.createElement('li');
            console.log(d.movie);
            const movie=document.createTextNode(d.title);
            const year=document.createTextNode(d.year);

            li.appendChild(movie);
            li.appendChild(year);
            ul.appendChild(li);
        });
    }
}

xhr.send();