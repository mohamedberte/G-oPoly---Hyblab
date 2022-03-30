const fs = require('fs');
const Papa = require('papaparse');

/**
 * Lis un fichier CSV et le parse dans un tableau.
 * @param {String} filePath le chemin d'accès au fichier CSV
 * @returns ?
 */
const readCSV = async (filePath) => {
    const csvFile = fs.readFileSync(filePath);
    const csvData = csvFile.toString();
    return new Promise(resolve => {
        Papa.parse(csvData, {
            header: true,
            complete: results => {
                console.log('Parse : complete', results.data.length, 'records.');
                resolve(results.data);
            }
        });
    });
};

/**
 * Récupère les données d'un CSV et les mets dans un dictionnaire (map) avec pour clé l'attribut passé en paramètre
 * @param {String} key l'attribut des données qui servira de clé
 * @param {String} csvFilePath le chemin d'accès vers le fichier csv
 */
 module.exports.fetchDataAsDict = async (key, csvFilePath) => {
    try {
        let parsedData = await readCSV(csvFilePath);
        const mapData = new Map();
        for(const index in parsedData) {
            mapData.set(parsedData[index][key],parsedData[index]);
        }
        return mapData;
    } catch (error) {
        console.log(error);
    }


}

/**
 * Sauvegarde un dictionnaire de données dans un fichier CSV
 * @param {Map} dict la Map de données à sauvegarder
 * @param {String} csvFilePath le chemin d'accès vers le fichier csv
 */
 module.exports.saveCSV = async (dict, csvFilePath) => {

    // Transforme la Map en tableau d'objets.
    let dataArray = Array.from(dict, ([name, value]) => value);
    // Transformation du tableau en chaine de caractères à écrire dans le fichier CSV.
    var string = Papa.unparse(dataArray);
    // Ecriture dans le fichier CSV.
    fs.writeFileSync(csvFilePath, string);
}

/**
 * Fonction permettant de récupérer un attribut d'un fichier CSV et de le mettre dans les propriétés du fichier au format GeoJSON.
 * Exemple :
 *
 * modifyGeoJson(tilesGeoJson, 'Population.csv', 'nom', 'libelleCommune', 'orientation', 'orientation', 'test.json');
 * modifyGeoJson(tilesGeoJson, 'Population.csv', 'nom', 'libelleCommune', 'pop', 'population', 'test.json');
 *
 * On recopie, dans le fichier 'test.json', le fichier tilesGeoJSON donné en entrée auquel on ajoute pour chaque ville appelée par l'attribut "nom" dans le JSON et "libelleCommune" dans le CSV, la propriété appelée "population" dans le CSV et qu'on appellera "pop" dans le JSON.
 *
 * @param {JSONFile} jsonFile fichier JSON d'entrée : modifier le require('*.json') en haut du fichier, mettre le nom de la variable
 * @param {String} csvFilePath chemin vers le fichier CSV d'entrée.
 * @param {String} jsonLinkProperty nom de l'attribut dans les propriétés du JSON permettant de faire la jointure avec le fichier CSV (dans notre cas on prendra la plupart du temps nom)
 * @param {String} csvLinkProperty nom de l'attribut dans le fichier CSV permettant de faire la jointure avec le JSON (dans notre cas on prendra la plupart du temps libelleCommune)
 * @param {String} newJsonProperty nom de l'attribut JSON qui prendra la propriété, s'il n'existe pas il sera crée
 * @param {String} actualCSVProperty nom de l'attribut dans le fichier CSV qui sera mis dans le JSON.
 * @param {String} outputFilePath chemin vers le fichier JSON de sortie. Ecrase le fichier s'il existe déjà.
 */
 module.exports.modifyGeoJson = function(jsonFile, csvFilePath, jsonLinkProperty, csvLinkProperty, newJsonProperty, actualCSVProperty, outputFilePath) {

    fetchDataAsDict(csvLinkProperty, csvFilePath).then(data => {

        for(const index in jsonFile['features']) {
            if(data.get(jsonFile['features'][index]['properties'][jsonLinkProperty]) === undefined) {
                jsonFile['features'][index]['properties'] = {...jsonFile['features'][index]['properties'], [newJsonProperty]: "undefined"};
            } else {
                var property = data.get(jsonFile['features'][index]['properties'][jsonLinkProperty])[actualCSVProperty];
                jsonFile['features'][index]['properties'] = {...jsonFile['features'][index]['properties'], [newJsonProperty]: property};
            }
        }

        fs.writeFileSync(outputFilePath, JSON.stringify(jsonFile));
    });
}

/**
 * Retourne un tableau passé en parametre avec des elements d'un autre
 * @param {Array} tabResult tableau auquel on va ajouter les éléments de l'autre
 * @param {Array} tabEntree tableau auquel on va prendre les élements pour les ajouter dans l'autre
 * @param {Number} nombreAInserer nombre d'element à ajouter dans le tableau à retourner
 * @returns le tableau passé en parametre avec n nouveau elements de l'autre tableau
 */
module.exports.remplirTableau =  function (tabResult, tabEntree , nombreAInserer) {
    let compteur = 0;
    while(compteur < nombreAInserer) {
        let indice = Math.floor(Math.random()*(tabEntree.length));

        //On évite les doublons
        if(!tabResult.includes(tabEntree[indice])) {
            tabResult.push(tabEntree[indice]);
            compteur++;
        }
    }
    return tabResult;
}


/**
 * Retourne la distance en mètres entre deux coordonnées géographiques.
 * @param {[latitude, longitude]} pointA 
 * @param {[latitude, longitude]} pointB 
 * @returns distance en mètres entre pointA et pointB
 */
module.exports.calculateDistance = function(pointA, pointB) {

    const R = 6371e3;
    const phi1 = pointA[0] * Math.PI/180;
    const phi2 = pointB[0] * Math.PI/180;

    const deltaPhi = (pointB[0] - pointA[0]) * Math.PI/180;
    const deltaLambda = (pointB[1] - pointA[1]) * Math.PI/180;

    const a = Math.sin(deltaPhi/2) * Math.sin(deltaPhi/2) + Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda/2) * Math.sin(deltaLambda/2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    const d = R * c;

    return d;
}
