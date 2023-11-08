navigator.geolocation.getCurrentPosition(success,error,{enableHighAccuracy:true});

function success(position){
    console.log(position);
     const latitue=position.coords.latitude;
    const longitute=position.coords.longitude;
     document.querySelector('h1').innerHTML = `Latitude is ${latitue} and Longitude is ${longitute} `
}

function error(){
    console.log('Error');
}