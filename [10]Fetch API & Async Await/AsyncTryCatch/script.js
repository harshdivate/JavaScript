const getUsers = async function(){
    try{
        const response = await fetch('https://httpstat.us/404');
        if(!response.ok){
            throw new Error ('Not Found')
        }
        const data=await response.json();
        console.log(data);
    }
    catch(e){
        console.log(e);
    }
}

getUsers();