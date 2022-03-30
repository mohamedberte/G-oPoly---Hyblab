'use strict';

const app = require( 'express' )();
const helper = require('./helper');
const bodyParser = require('body-parser')

// parse application/json
app.use(bodyParser.json())

app.get('/carte', function(req, res) {
    let dataCarte = require('../public/data/geojson.json')
    res.json(dataCarte);
});

app.get('/distance/:ville1/:ville2', function(req, res) {

    try {
        let ville1 = req.params.ville1;
        let ville2 = req.params.ville2;
    
        // peut etre appel à l'API ?
        let dataCarte = require('../public/data/geojson.json')
    
        let coord1 = dataCarte['features'].filter(function(feature) {
            return feature['properties']['nom'] == ville1;
        })[0]['geometry']['coordinates'][0][0];
    
        let coord2 = dataCarte['features'].filter(function(feature) {
            return feature['properties']['nom'] == ville2;
        })[0]['geometry']['coordinates'][0][0];
    
        res.json(helper.calculateDistance(coord1, coord2));
    } catch(error) {
        console.log(error);
    }

});

//Endpoint retournant 5 communes tirées aléatoirement selon leur orientation
app.get('/communes/:orientation', function(req, res) {
    let listesCommunes = []; //Liste des communes déterminées pour le jeu

    //remplissage des communes de Loire-Atlantique
    helper.fetchDataAsDict('libelleCommune','communes-2/public/data/communes.csv').then(data => {
        try {

            //Nouveau tableau contenant seulement les communes de l'orientation passé en paramètre
            const communesOrientation = []

            //Tri des communes selon l'orientation
            data.forEach(commune => {
                if(commune['orientation'] == req.params.orientation) {
                communesOrientation.push(commune)
                }
            })

            //Selection aléatoire des 5 communes
            listesCommunes =  helper.remplirTableau(listesCommunes, communesOrientation, 5);

            res.json(listesCommunes);
        } catch (error) {
            console.log(error)
        }
    })
});


async function getInformationCommune(nomCommune) {
    let commune = helper.fetchDataAsDict('libelleCommune', 'communes-2/public/data/communes.csv').then(data => {
        let communeTrouvee = null;
        data.forEach(commune => {
            if (commune['libelleCommune'] == nomCommune) communeTrouvee = commune;
        });
        return communeTrouvee; 
    });

    return commune;
}

app.get('/commune/:commune', function(req, res) {

    let nomCommune = req.params.commune;
    getInformationCommune(nomCommune).then(data => { 
        res.json(data);
    });

});

app.get('/affirmations/:commune', function(req, res) {
    let affirmationsJson = require('../public/data/affirmations.json');
    let affirmationsJsonCopie = JSON.parse(JSON.stringify(affirmationsJson));
    let affirmations = affirmationsJsonCopie.affirmations;
    let listeAffirmations = [];
    let communeNom = req.params.commune;

    getInformationCommune(communeNom)
    .then(commune => {
        try {
            //Selection aléatoire des 5 affirmations
            listeAffirmations = helper.remplirTableau(listeAffirmations, affirmations['politique'], 3);
            listeAffirmations = helper.remplirTableau(listeAffirmations, affirmations['non-politique'], 2);

            //Ajout de l'information dans les affirmations
            for (let i = 0; i < listeAffirmations.length; i++) {
                let informations = listeAffirmations[i]['columns'];

                let compteur = 0;
                //On va de A à Z
                for(let asciiCode = 65; asciiCode < 91; asciiCode++) {
                    let letter = String.fromCharCode(asciiCode);
                    let pattern = letter+letter+letter; //Le pattern est de type AAA, BBB, ZZZ dans le json
                    if(listeAffirmations[i]['string'].includes(pattern)) {

                        //Remplacement du pattern par l'information correspondante
                        listeAffirmations[i]['string'] = listeAffirmations[i]['string'].replace(pattern, commune[informations[compteur]]);
                        compteur++;
                    }

                    else break; //Si plus de pattern correspondant, on stoppe la boucle
                }
            }
            res.json(listeAffirmations);
        } catch(error) {
            console.log(error);
        }
    })

    
});

app.get('/indice/:commune', function(req, res) {
    let affirmationsJson = require('../public/data/affirmations.json');
    let affirmations = JSON.parse(JSON.stringify(affirmationsJson));
    let indices = affirmations.indice;
    let nomCommune = req.params.commune;
    let index = Math.floor(Math.random()*(indices.length));
    let indiceChoisi = indices[index];
    let informations = indiceChoisi['columns'];

    getInformationCommune(nomCommune)
    .then(commune => {

        try {
            let compteur = 0;

            for(let asciiCode = 65; asciiCode < 91; asciiCode++) {
                let letter = String.fromCharCode(asciiCode);
                let pattern = letter+letter+letter; //Le pattern est de type AAA, BBB, ZZZ dans le json
                if(indiceChoisi['string'].includes(pattern)) {
        
                    //Remplacement du pattern par l'information correspondante
                    indiceChoisi['string'] = indiceChoisi['string'].replace(pattern, commune[informations[compteur]]);
                    compteur++;
                }
        
                //else break; //Si plus de pattern correspondant, on stoppe la boucle
            }
            res.json(indiceChoisi);
        } catch(error) {
            console.log(error);
        }
    });
});

app.get('/classement', function(req, res) {
    let linesClassement = [];

    helper.fetchDataAsDict('place','communes-2/public/data/classement.csv').then(data => {
        data.forEach(line => linesClassement.push(line));
        res.json(linesClassement);
    });
});

app.get('/lastClassement', function(req, res) {
    helper.fetchDataAsDict('place','communes-2/public/data/classement.csv').then(data => {
        res.json(data.get("10ème"));
    });
});

app.post('/newClassement', function(req, res) {
    helper.saveCSV(new Map(Object.entries(req.body)),'communes-2/public/data/classement.csv');
});

// Export our API
module.exports = app;

