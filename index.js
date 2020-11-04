const cardContainer = document.getElementById("card-container")
const spotlightContainer = document.getElementById("spotlight-container")


function Artist (name, country, genre, image, lyric) {
    this.name = name
    this.country = country
    this.genre = genre
    this.image = image
    this.lyric = lyric

    this.perform = function() {
        return '"' + lyric + '"'
    }
}

let artistList = [];


(function () {
fetch("/resources/data.json")
    .then(response=>response.json())
    .then(data=> {
        data.artists.forEach(artist => {
            artistList.push(new Artist(artist.name, artist.country, artist.genre, artist.image, artist.lyric))
        });
       
        artistList.forEach(artist => {
            const card = document.createElement("div")
            card.classList.add("card")
            card.style.width = "14rem"
            card.style.margin = "0.1rem"

            const cardImage = document.createElement("img")
            cardImage.classList.add("card-image-top")
            cardImage.src = artist.image
            cardImage.alt = "Card image cap"
            cardImage.style.height = "8rem"

            const cardBody = document.createElement("div")
            cardBody.classList.add("card-body")

            const cardTitle = document.createElement("h5")
            cardTitle.classList.add("card-title")
            cardTitle.style.borderBottom = "1px solid black"
            cardTitle.innerText = artist.name

            const cardCountry = document.createElement("p")
            cardCountry.classList.add("card-text")
            cardCountry.innerText = "Country: "+artist.country

            const cardGenre = document.createElement("p")
            cardGenre.classList.add("card-text")
            cardGenre.innerText = "Genre: "+artist.genre

            const cardButton = document.createElement("button")
            cardButton.classList.add("btn", "btn-primary")
            cardButton.innerText = "Perform!"
            cardButton.addEventListener("click", function() {
                alert(artist.perform())
            })

            cardBody.append(cardTitle, cardCountry, cardGenre, cardButton)
            card.append(cardImage, cardBody)
            cardContainer.appendChild(card)

        });

        const cloneCards = cardContainer.cloneNode(true)
        const cards = cloneCards.childNodes    

        const spotlightCard = cards[Math.floor(Math.random()*artistList.length)+1]
        const tempBody = spotlightCard.childNodes
        tempBody[1].lastChild.remove()

        spotlightContainer.appendChild(spotlightCard)
    });
})();
    

