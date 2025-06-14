const imagesWrapper = document.querySelector(".images");
const loadMoreBtn = document.querySelector(".loadMore");
const searchInput = document.querySelector(".searchBox input");

const apiKey = "ZSeUo04jS0Wvb7ww2HDu2sgBZ76UtuymrI1wCexLdYJAIdxw7TxFPHAR";

const perPage = 15;
let currentPage = 1;
let searchTerm = null;

const generateHTML = (images) => {
    imagesWrapper.innerHTML += images.map(img => 
        `<li class="card">
            <img src="${img.src.large2x}" alt="img-1">
            <div class="details">
                <div class="photographer">
                    <i class="uil uil-camera"></i>
                    <span>${img.photographer}</span>
                </div>
                <button><i class="uil uil-import"></i></button>
            </div>
        </li>`
    ).join("");
}

const getImages = (apiUrl) => {
    loadMoreBtn.innerHTML = "Loading....";
    loadMoreBtn.classList.add("disabled");
    fetch(apiUrl, {
        headers: { Authorization: apiKey }
    }).then(res => res.json()).then(data => {
        // console.log(data);
        generateHTML(data.photos);
        loadMoreBtn.innerHTML = "Load More";
        loadMoreBtn.classList.remove("disabled");
    })
}

const loadMoreImages = () => {
    currentPage++;
    let apiUrl = `https://api.pexels.com/v1/curated?per_page=${currentPage}&per_page=${perPage}`;
    getImages(apiUrl);
}

const loadSearchImages = (e) => {
    if(e.key === "Enter"){
        // console.log("Enter key Pressed");
        currentPage = 1;
        searchTerm = e.target.value;
        imagesWrapper.innerHTML = "";
        getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`);
    }
}

getImages(`https://api.pexels.com/v1/curated?per_page=${currentPage}&per_page=${perPage}`);
loadMoreBtn.addEventListener("click", loadMoreImages);
searchInput.addEventListener("keyup", loadSearchImages);