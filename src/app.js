//Importo archivo de funciones
const funciones = require('./funciones');

//Inicio la ejecución
function runApi(callback){
    urlPeliculas = 'https://swapi.co/api/films';
    //Obtengo la data
    funciones.getDataStarWars(urlPeliculas, function(informacionSW){
                
        //Una vez obtenida la data, proceso las películas
        funciones.getInfoPeliculas(informacionSW.results, function(peliculas){
            
            //Por cada película debo sacar los planetas
            var bar = new Promise((resolve, reject) => {
                peliculas.forEach((pelicula, index, array) => {       
                    //console.log(actorSW);
                    funciones.getInfoPlanetas(pelicula.planetasSW, function(infoPlanetaSW){
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
                        funciones.getInfoActores(pelicula.actoresSW, function(infoActorSW){
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
	console.log(resultado);
})

//-------------------------------------- PRUEBAS PROMESAS

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

//---------------------- PRUEBA MAYOR
// function runApi2(callback){
//     urlPeliculas = 'https://swapi.co/api/films';
//     let navesSW = [ 
//         'https://swapi.co/api/starships/15/',
//         'https://swapi.co/api/starships/10/',
//         'https://swapi.co/api/starships/11/',
//         'https://swapi.co/api/starships/12/',
//         'https://swapi.co/api/starships/21/',
//         'https://swapi.co/api/starships/22/',
//         'https://swapi.co/api/starships/23/',
//         'https://swapi.co/api/starships/3/',
//         'https://swapi.co/api/starships/17/' 
//     ];

//     let actores = [];

//     funciones.getNaveMayor(navesSW, function(navesOrder){
//         callback(navesOrder);
//     });
// }

// runApi2(function(resultado){
// 	console.log(resultado);
// })