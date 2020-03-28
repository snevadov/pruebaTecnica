//npm install swapi-node
const swapi = require('swapi-node');

// swapi.getPerson(1).then((result) => {
//     console.log(result);
// });

let starwars = [];

// swapi.get('https://swapi.co/api/films').then((result) => {
//     console.log(result.results);
// });

swapi.get('https://swapi.co/api/films').then((result) => {
    //console.log(result.results);
    result.results.forEach(peliculaSW => {
        
        //Defino un objeto para las películas
        let pelicula = new Object();
        
        //Defino propiedades
        pelicula.nombre = peliculaSW.title;
        let planetas = [];
        let actores = [];


        //Obtengo las películas
        peliculaSW.planets.forEach(urlPlaneta => {
            swapi.get(urlPlaneta).then((planetaSW) => {
                let planeta = new Object();
                planeta.nombre = planetaSW.name;
                planeta.terreno = planetaSW.terrain;
                planeta.gravedad = planetaSW.gravity;
                planeta.diametro = planetaSW.diameter;
                planeta.poblacion = planetaSW.population;
                planetas.push(planeta);
            });
        });
        pelicula.planetas = planetas;

        //Obtengo los actores
        peliculaSW.characters.forEach(urlActor => {
            swapi.get(urlActor).then((actorSW) => {
                let actor = new Object();
                actor.nombre = actorSW.name;
                actor.genero = actorSW.gender;
                actor.colorCabello = actorSW.hair_color;
                actor.colorPiel = actorSW.skin_color;
                actor.colorOjos = actorSW.eye_color;
                actor.estatura = actorSW.height;
                actor.planetaOrigen = actorSW.homeworld;

                //especies
                // swapi.get(actorSW.species[1]).then((especieSW) => {
                //     let especie = new Object();
                //     especie.nombre = especieSW.name;
                //     especie.genero = especieSW.language;
                //     especie.colorCabello = especieSW.average_height;
                //     actor.especie = especie;
                // });
                actores.push(actor);
            });
        });
        pelicula.actores = actores;

        
        console.log(pelicula);
    });
});