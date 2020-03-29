//npm install swapi-node
const swapi = require('swapi-node');

//Función para conectar a la API
function getDataStarWars(url, callback){
    swapi.get(url).then((result) => {
        callback(result);
    });
}

//Función para obtener las películas
function getInfoPeliculas(informacionSW,callback){

    //arreglo de películas
    let peliculas = [];

    //Recorro las películas
    informacionSW.forEach(peliculaSW => {
    
        //Defino un objeto para las películas
        let pelicula = new Object();
        
        //Defino propiedades
        pelicula.nombre = peliculaSW.title;
        pelicula.planetasSW = peliculaSW.planets;
        pelicula.planetas = [];
        pelicula.actoresSW = peliculaSW.characters;
        pelicula.actores = [];
        pelicula.navesSW = peliculaSW.starships;
        pelicula.nave = new Object();

        //Agrego la película al array
        peliculas.push(pelicula);

        //Obtengo los actores
    });

    callback(peliculas);
}

//Función para obtener planetas
function getInfoPlanetas(planetasSW, callback){
    //Arreglo de planetas
    let planetas = [];

    //Promesa para recorrer el array y finalizar cuando termine de recorrerlo
    var bar = new Promise((resolve, reject) => {
        planetasSW.forEach((planetaSW, index, array) => {
            //Defino un objeto para los planetas
            let planeta = new Object();

            //console.log(planetaSW);
            getDataStarWars(planetaSW, function(infoPlanetaSW){
                
                //Defino propiedades
                planeta.nombre = infoPlanetaSW.name;
                planeta.terreno = infoPlanetaSW.terrain;
                planeta.gravedad = infoPlanetaSW.gravity;
                planeta.diametro = infoPlanetaSW.diameter;
                planeta.poblacion = infoPlanetaSW.population;

                //Agrego el planeta al array
                planetas.push(planeta);

                if (index === array.length -1) resolve();
            });
        });
    });
    
    bar.then(() => {
        callback(planetas);
    });
    
}


//Función para obtener actores
function getInfoActores(actoresSW, callback){
    
    //Arreglo de actores
    let actores = [];

    //Defino una promesa para los actores
    var bar = new Promise((resolve, reject) => {
        actoresSW.forEach((actorSW, index, array) => {
            //Defino un objeto para los planetas
            let actor = new Object();

            //console.log(actorSW);
            getDataStarWars(actorSW, function(infoActorSW){
                getDataStarWars(infoActorSW.homeworld, function(infoPlanetaOrigenSW){
                    //Defino propiedades
                    //Defino propiedades
                    actor.url = actorSW;
                    actor.nombre = infoActorSW.name;
                    actor.genero = infoActorSW.gender;
                    actor.colorCabello = infoActorSW.hair_color;
                    actor.colorPiel = infoActorSW.skin_color;
                    actor.colorOjos = infoActorSW.eye_color;
                    actor.estatura = infoActorSW.height;
                    actor.planetaOrigenURL = infoActorSW.homeworld;
                    actor.planetaOrigen = infoPlanetaOrigenSW.name;
    
                    //Agrego el planeta al array
                    actores.push(actor);
    
                    if (index === array.length -1) resolve();
                });
            });
        });
    });
    
    bar.then(() => {
        //console.log('actores');
        callback(actores);
    });
}

//Función para obtener naves
function getInfoNaves(navesSW, callback){
    //Arreglo de naves
    let naves = [];

    //Promesa para recorrer el array y finalizar cuando termine de recorrerlo
    var bar = new Promise((resolve, reject) => {
        navesSW.forEach((naveSW, index, array) => {
            //Defino un objeto para los naves
            let nave = new Object();

            //console.log(naveSW);
            getDataStarWars(naveSW, function(infoNaveSW){
                
                //Defino propiedades
                nave.url = naveSW;
                nave.nombre = infoNaveSW.name;
                nave.modelo = infoNaveSW.model;
                nave.tamano = infoNaveSW.length;
                nave.fabricante = infoNaveSW.manufacturer;
                nave.numeroPasajeros = infoNaveSW.passengers;

                //Agrego el nave al array
                naves.push(nave);

                if (index === array.length -1) resolve();
            });
        });
    });
    
    bar.then(() => {
        callback(naves);
    });
    
}

function compareTamano(naveA,naveB) {
    const tamanioA = (!parseFloat(naveA.tamano)) ? -1 : parseFloat(naveA.tamano);
    const tamanioB = (!parseFloat(naveB.tamano)) ? -1 : parseFloat(naveB.tamano);
    let comparison = 0;

    if (tamanioA >= tamanioB) {
        comparison = -1;
    } else if (tamanioA < tamanioB) {
        comparison = 1;
    }
    
    return comparison;
}

//Funcion para ordenar las naves
function getNaveMayor(navesSW, callback){

    getInfoNaves(navesSW, function(naves){
        naves.sort(compareTamano);

        callback(naves[0]);
    });
}

module.exports = {
	getDataStarWars,
	getInfoPeliculas,
	getInfoPlanetas,
    getInfoActores,
    getInfoNaves,
    getNaveMayor
}