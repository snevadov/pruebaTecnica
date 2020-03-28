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
        pelicula.nave = [];

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

//Inicio la ejecución
function runApi(callback){
    urlPeliculas = 'https://swapi.co/api/films';
    //Obtengo la data
    getDataStarWars(urlPeliculas, function(informacionSW){
                
        //Una vez obtenida la data, proceso las películas
        getInfoPeliculas(informacionSW.results, function(peliculas){
            
            //Por cada película debo sacar los planetas
            var bar = new Promise((resolve, reject) => {
                peliculas.forEach((pelicula, index, array) => {       
                    //console.log(actorSW);
                    getInfoPlanetas(pelicula.planetasSW, function(infoPlanetaSW){
                        //Defino propiedades
                        pelicula.planetas = infoPlanetaSW;
        
                        if (index === array.length -1) resolve();
                    });
                });
            });
            
            bar.then(() => {
                //console.log('actores');
                //callback(peliculas);

                //Por cada película debo sacar los actores
                var bar = new Promise((resolve, reject) => {
                    peliculas.forEach((pelicula, index, array) => {       
                        //console.log(actorSW);
                        getInfoActores(pelicula.actoresSW, function(infoActorSW){
                            //Defino propiedades
                            pelicula.actores = infoActorSW;
            
                            if (index === array.length -1) resolve();
                        });
                    });
                });
                
                bar.then(() => {
                    //console.log('actores');
                    callback(peliculas);
                });
            });
        });
    });
}

//llamo la función
runApi(function(resultado){
	console.log(resultado[3]);
})

//-------------------------------------- PRUEBA

// //Inicio la ejecución
// function runApi2(callback){
//     urlPeliculas = 'https://swapi.co/api/films';
//     let actoresSW = [
//         'https://swapi.co/api/people/1/',
//         'https://swapi.co/api/people/3/',
//         'https://swapi.co/api/people/5/',
//         'https://swapi.co/api/people/13/',
//         'https://swapi.co/api/people/14/',
//         'https://swapi.co/api/people/27/',
//         'https://swapi.co/api/people/84/',
//         'https://swapi.co/api/people/85/',
//         'https://swapi.co/api/people/86/',
//         'https://swapi.co/api/people/87/',
//         'https://swapi.co/api/people/88/' 
//     ];

//     let actores = [];

//     var bar = new Promise((resolve, reject) => {
//         actoresSW.forEach((actorSW, index, array) => {
//             //Defino un objeto para los planetas
//             let actor = new Object();

//             //console.log(actorSW);
//             getDataStarWars(actorSW, function(infoActorSW){
//                 //Defino propiedades
//                 actor.url = actorSW;
//                 actor.nombre = infoActorSW.name;
//                 actor.genero = infoActorSW.gender;
//                 actor.colorCabello = infoActorSW.hair_color;
//                 actor.colorPiel = infoActorSW.skin_color;
//                 actor.colorOjos = infoActorSW.eye_color;
//                 actor.estatura = infoActorSW.height;
//                 actor.planetaOrigen = infoActorSW.homeworld;

//                 //Agrego el planeta al array
//                 actores.push(actor);

//                 if (index === array.length -1) resolve();
//             });
//         });
//     });
    
//     bar.then(() => {
//         //console.log('actores');
//         callback(actores);
//     });
// }

// runApi2(function(resultado){
// 	console.log(resultado);
// })