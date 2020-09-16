let button = document.querySelector('#submit');
let reference = document.querySelector('#reference');
let inputText = document.querySelector('.input');

const eventInput = (event) => {
    event.preventDefault();
    inputText.value === "" ? null : (
      CallMovies(inputText.value),
      button.reset()
    )
}

const CallMovies = (value) => {

  setTimeout(async() => {
    let res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=7e849978&s=${value}`)
    let data = await res.json();
    let { Search, Response } = data;
    Response === "False" ?
        (
            noMovie(value)
        ) 
        :
        (
            MovieMaping(Search)
        ) 
  }, 2000);
}

const MovieMaping = (movies) => {

    movies.map(movie => {
        let { Title, Year, Poster } = movie;
        let cards = `
            <div class="column is-one-quarter">
                <div class="card">
                    <div class="card-image">
                        <figure class="image is-3by4">
                            <img src="${Poster}" alt="Placeholder image">
                        </figure>
                    </div>
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-4">${Title}</p>
                            <p class="subtitle is-6">Año: ${Year}</p>
                        </div>
                </div>
            </div>
            `;
        reference.innerHTML += cards;
    })

}

const noMovie = (value) => {

const message = `
    <div class="column deleteNode"></div>
    <div class="column is-half deleteNode">
        <div class="notification is-primary pt-4 pb-4 pl-4 pr-4 ml-4 mr-4">
            <p class=" subtitle has-text-centered">
            <b>Ups!</b>
            ... No encontramos <strong>${value}</strong>.
            <br/>
            <b>Pruebe con otra! 😃 </b> 
            </p>
        </div>
    </div>
    <div class="column deleteNode"></div>
`;
reference.innerHTML = message;
removeMessage();
}

const removeMessage = () => {

  setTimeout(() => {
    let parentNode = document.querySelectorAll('.deleteNode')
    reference.remove(parentNode);
    location.reload();   
  }, 5000);
}



// reference.addEventListener('click', removeMessage);
button.addEventListener('submit', eventInput);