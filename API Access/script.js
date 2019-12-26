
let api = apiCall();
let search = '';
count = 0;
let url = 'http://api.giphy.com/v1/gifs/trending?api_key='+api+'&offset='+count;

//fetch function for gif api
async function getGIF(url){
    const response = await fetch(url);
    const json = await response.json();

    json.data.forEach(imgid => {
        let container = document.querySelector('#container');
        let img = document.createElement('IMG');
        img.src=imgid.images.preview_gif.url;
        img.height = 300;
        container.appendChild(img);
    });
}

//scrolling event
document.addEventListener('scroll', () => {
    let total = document.documentElement.scrollHeight - window.innerHeight;
    let scrolV = window.scrollY;

    

    if(scrolV==total){
        count+=25;
        if(search==''){
            url = 'http://api.giphy.com/v1/gifs/trending?api_key='+api+'&offset='+count;
        }
        else{
            url = 'http://api.giphy.com/v1/gifs/search?q='+search+'&api_key='+api+'&offset='+count;
        }
        getGIF(url);   
    }
});



//initial calling
getGIF(url).catch(error => {
    console.error(error);
});


//search for gif
function srch(){
    search = document.getElementById('input').value;
    document.querySelector('#container').innerHTML = "";
    url = 'http://api.giphy.com/v1/gifs/search?q='+search+'&api_key='+api+'&offset='+count;
    getGIF(url);
}