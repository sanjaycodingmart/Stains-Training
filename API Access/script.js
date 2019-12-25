let frst=setInterval(async function fet(){
    const a = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
    console.log(a);
    const data = await a.json();
    console.log(data);
    latitude =data.latitude ;
    longitude =data.longitude;
    console.log(latitude , longitude);
    document.querySelector('#lat').textContent=latitude;
    const lon = document.querySelector('#lon').textContent=longitude;
},30);

let latitude,longitude;
fet().catch(error => {
    console.error(error);
});