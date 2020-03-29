//Importo archivo de funciones
const funciones = require('./funciones');
const fs = require('fs');

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
                    funciones.getNaveMayor(pelicula.navesSW, function(naveMayor){
                        pelicula.nave = naveMayor;

                        funciones.getInfoPlanetas(pelicula.planetasSW, function(infoPlanetaSW){
                            //Defino propiedades
                            pelicula.planetas = infoPlanetaSW;
            
                            if (index === array.length -1) resolve();
                        });
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