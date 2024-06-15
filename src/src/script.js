const API_URL = 'https://api.jikan.moe/v4'; //URL of the API

let search_input = document.getElementById("anime-name");
search_input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("search-btn").click();
  }
});

function getSearch() {
    var animequery;
    const animeName = document.getElementById('anime-name').value;
    if (animeName!==''){
        animequery='anime?q=';
    }
    const resultsContainer = document.getElementById('anime-list');
    resultsContainer.innerHTML = ''; //Clears the previous Search
    fetch(`${API_URL}/${animequery}/${animeName}&sfw=true`)
    .then(response => response.json())
    .then(data => {
        data.data.forEach(item => {
            const anime = item;
            const animeDataDiv = document.createElement('div');
            animeDataDiv.innerHTML=`
            <div class="anime-card">
                <div class="anime-image">
                    <img src="${anime.images.jpg.large_image_url}">
                </div>
                <div class="anime-details">
                    <p class="anime-title"><b><a class="a" href="${anime.url}" target="_blank">${anime.title}</a></b></p>
                    <p><b>English Title:</b> ${anime.title_english}<p>
                    <p><b>Japanese Title:</b> ${anime.title_japanese}<p>
                    <p><b>Type:</b> ${anime.type}</p>
                    <p><b>Episodes:</b> ${anime.episodes}</p>
                    <p><b>Status:</b> ${anime.status}</p>
                    <p><b>Aired:</b> ${anime.aired.string}</p>
                    <p><b>Premiered:</b> ${anime.season} ${anime.year}</p>
                    <p><b>Score:</b> ${anime.score}</p>
                    <p><b>Rank:</b> ${anime.rank}</p>
                    <p><b>Rating:</b> ${anime.rating}</p>
                    <p><b>Synopsis:</b> ${anime.synopsis}</p>
                    
                </div>
            </div>
            `;
            resultsContainer.appendChild(animeDataDiv);
        })
    });
}

function getSeasonal() {
    const year = document.getElementById('year').value;
    const season = document.getElementById('season').value;
    const animeList = document.getElementById('anime-list');
    animeList.innerHTML = ''; // Clears previous results
    fetch(`${API_URL}/seasons/${year}/${season}`)
        .then(response => response.json())
        .then(data => {
            data.data.forEach(item => {
                const anime = item;
                const animeItem = document.createElement('div');
                animeItem.innerHTML=`
                <div class="anime-card">
                    <div class="anime-image">
                        <img src="${anime.images.jpg.large_image_url}">
                    </div>
                    <div class="anime-details">
                        <p class="anime-title"><b><a class="a" href="${anime.url}" target="_blank">${anime.title}</a></b></p>
                        <p><b>English Title:</b> ${anime.title_english}<p>
                        <p><b>Japanese Title:</b> ${anime.title_japanese}<p>
                        <p><b>Type:</b> ${anime.type}</p>
                        <p><b>Episodes:</b> ${anime.episodes}</p>
                        <p><b>Status:</b> ${anime.status}</p>
                        <p><b>Aired:</b> ${anime.aired.string}</p>
                        <p><b>Premiered:</b> ${anime.season} ${anime.year}</p>
                        <p><b>Score:</b> ${anime.score}</p>
                        <p><b>Rank:</b> ${anime.rank}</p>
                        <p><b>Rating:</b> ${anime.rating}</p>
                        <p class="anime-synopsis"><b>Synopsis:</b> ${anime.synopsis}</p>
                        
                    </div>
                </div>
                `;
                animeList.appendChild(animeItem);
            });
        })
        .catch(error => {
            console.error('Error fetching anime list:', error);
        });
}

// GO TO TOP BUTTON
let mybutton = document.getElementById("myBtn");
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        mybutton.style.display = "block";
    }else {
        mybutton.style.display = "none";
    }
}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}