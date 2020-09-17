// selectores
let button = document.querySelector('#submit');
let reference = document.querySelector('#reference');
let inputText = document.querySelector('.input');
let spinner = document.querySelector('.spinner');


/************************
evento que se activa con
el submit del formulario
************************/
const eventInput = (event) => {

    event.preventDefault();

    inputText.value === ""
        ? null 
        : CallMovies(inputText.value), button.reset()
}


/************************
llama a la api ó te dice
que intentes otra peli...
************************/
const CallMovies = (value) => {
    // spinner in
    spinner.style.display = "flex";

  setTimeout(async() => {
    // spinner out
    spinner.style.display = "none"

    let res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=7e849978&s=${value}`)
    let data = await res.json();

    let { Search, Response } = data;  
    
    Response === "False"
    ? noMovie(value)
    : MovieMaping(Search);
  }, 2000);
}


/************************
si pelis SI, agrega pelis
************************/
const MovieMaping = ( movies ) => {

    movies.map( movie => {
        let { Title, Year, Poster } = movie;
        let cards = `
        <div class="column is-one-quarter deleteNode">
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


/*********************************
si pelis NO, mensaje programado...
*********************************/
const noMovie = ( value ) => {

    addMesagge(value)
    removeMessage();
}


/******************************
...agrega mensaje
******************************/
const addMesagge = (value) => {

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
}


/******************************
...quita mensaje
******************************/
const removeMessage = () => {

  setTimeout(() => {
    let parentNode = document.querySelectorAll('.deleteNode')
    reference.remove(parentNode);
    location.reload();   
  }, 5000);
}


// eventos dom
button.addEventListener('submit', eventInput);