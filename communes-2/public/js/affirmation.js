'use strict'

// Show slider
var slideIndex;

page('/communes-2/affirmation', async function () {
    await renderTemplate(templates('./templates/affirmation.mustache'));

    let gameData = JSON.parse(localStorage.getItem('gameData'));
    let indiceP = document.getElementById('indiceText');
    if (gameData['numeroEssai'] == 2) {
        indiceP.innerHTML="";
        let response3 = await fetch('api/indice/' + gameData['communeCourante']['libelleCommune']);
        let indice = await response3.json();
        indiceP.innerHTML = indice['string'];

        showmesg("Mauvaise réponse", "#ED6464");

        // Affichage box affirmation
        var aff_box = document.getElementById("affirmation");
        aff_box.style.bottom ="-190px";

        var indice_box = document.getElementById("indice-box");
        indice_box.style.bottom ="0";

    } else {
        indiceP.innerHTML = "Pas d'indice au premier essai !";
    }

    const nbMaxCommunes = 5;
    let response = await fetch('api/carte');
    const dataCarte = await response.json();

    // Recuperation des données du jeu et affichage du nombre actuel
    let nombreCommuneActuelle = document.getElementById('numeroCommuneActuelle');
    let nombreCommuneMax = document.getElementById('numeroCommuneMax');

    let nbCommuneActuelle = nbMaxCommunes - gameData['communes'].length;

    nombreCommuneMax.innerHTML = nbMaxCommunes;
    nombreCommuneActuelle.innerHTML = nbCommuneActuelle;

    let response2 = await fetch('api/affirmations/' + gameData['communeCourante']['libelleCommune']);
    let affirmations = await response2.json();

    //Recuperation des div dans lesquelles on va afficher les affirmations
    let divAffirmations = document.getElementsByClassName('affirmation-content')


    //parcourt des div et insertion des affirmations
    for (let i = 0; i < divAffirmations.length; i++) {
        divAffirmations.item(i).textContent = affirmations[i]['string'];
    }

    slideIndex = 1;
    showAffirmation(slideIndex);

    // Add event click on affirmation box
    let slide = document.getElementById("show");
    slide.addEventListener("click", (event)=>{
        if (slide !== event.target) return;
        var slider = document.getElementById("slider");
        slider.style.bottom ="-190px";

        var box = document.getElementById("affirmation");
        box.style.bottom = "0";
    });

    let box_aff = document.getElementById("sliderline-aff");

    let box_af = document.getElementById("affirmation");
    box_af.addEventListener("click", (event)=>{
        if (box_af !== event.target && box_aff !== event.target ) return;
        var bo = document.getElementById("affirmation");
        bo.style.bottom ="-190px";

        var slider = document.getElementById("slider");
        slider.style.bottom = "0";
    });

    let indicebutton = document.getElementById("indice");
    indicebutton.addEventListener("click", (event)=>{
        if (indicebutton !== event.target) return;
        var indicebox = document.getElementById("indice-box");
        indicebox.style.bottom ="0";

        var slider = document.getElementById("slider");
        slider.style.bottom ="-190px";
    });

    let indicebox = document.getElementById("indice-box");
    indicebox.addEventListener("click", (event)=>{
        //if (indicebox !== event.target) return;
        var indiceb = document.getElementById("indice-box");
        indiceb.style.bottom ="-190px";

        var slider = document.getElementById("slider");
        slider.style.bottom ="0";
    });

    // ------ Gestion de la map
    var map = L.map('map', {
        zoomSnap: 0.5
    }).setView([47.00,-1.70], 8.5);
    //var bounds = [[47.856,-2.63],[46.845,-0.895]];
    //var img = L.imageOverlay('img/loireAtlantique.png', bounds).addTo(map);
    //map.fitBounds(bounds);

    /* ---------------------ICONES CARTES--------------------------- */
    const iconSize1 = [125,125];
    const iconAnchor1 = [70,100];
    const iconSize2 = [80,80];
    const iconAnchor2 = [40,65];
    const iconSize3 = [60,60];
    const iconAnchor3 = [50,50];

    // ICONES 1

    var iconElephant1 = L.icon({
        iconUrl: 'img/illustrations/nantes1.svg',
        iconSize: iconSize1,
        iconAnchor: iconAnchor1
    });

    var iconChateaubriant1 = L.icon({
        iconUrl: 'img/illustrations/chateaubriant.svg',
        iconSize: iconSize1,
        iconAnchor: iconAnchor1
    });

    var iconVoilier1 = L.icon({
        iconUrl: 'img/illustrations/pornic.svg',
        iconSize: iconSize1,
        iconAnchor: iconAnchor1
    });

    var iconArbre1 = L.icon({
        iconUrl: 'img/illustrations/arbre1.svg',
        iconSize: iconSize1,
        iconAnchor: iconAnchor1
    });

    var iconBuisson1 = L.icon({
        iconUrl: 'img/illustrations/buisson.svg',
        iconSize: iconSize1,
        iconAnchor: iconAnchor1
    });

    var elephant1 = L.marker([47.15,-1.50], {icon: iconElephant1, interactive: false});
    var chateaubriant1 = L.marker([47.72,-1.38], {icon: iconChateaubriant1, interactive: false});
    var voilier1 = L.marker([47.14, -2.10], {icon: iconVoilier1, interactive: false});
    var arbre1 = L.marker([47.39,-2.21], {icon: iconArbre1, interactive: false});
    var buisson1 = L.marker([47.53,-1.80], {icon: iconBuisson1, interactive: false});
    var buisson1bis = L.marker([46.95,-1.70], {icon: iconBuisson1, interactive: false});

    // ICONES 2

    var iconArbre2 = L.icon({
        iconUrl: 'img/illustrations/arbre1.svg',
        iconSize: iconSize2,
        iconAnchor: iconAnchor2
    });

    var iconBuisson2 = L.icon({
        iconUrl: 'img/illustrations/buisson.svg',
        iconSize: iconSize2,
        iconAnchor: iconAnchor2
    });

    var iconVache2 = L.icon({
        iconUrl: 'img/illustrations/plesse.svg',
        iconSize: iconSize2,
        iconAnchor: iconAnchor2
    });

    var iconCentrale2 = L.icon({
        iconUrl: 'img/illustrations/cordemais.svg',
        iconSize: iconSize2,
        iconAnchor: iconAnchor2
    });

    var iconVoilier2 = L.icon({
        iconUrl: 'img/illustrations/pornic.svg',
        iconSize: iconSize2,
        iconAnchor: iconAnchor2
    });

    var iconBernerie2 = L.icon({
        iconUrl: 'img/illustrations/labernerie.svg',
        iconSize: iconSize2,
        iconAnchor: iconAnchor2
    });

    var iconGuitare2 = L.icon({
        iconUrl: 'img/illustrations/Clisson.svg',
        iconSize: iconSize2,
        iconAnchor: iconAnchor2
    });

    var iconElephant2 = L.icon({
        iconUrl: 'img/illustrations/nantes1.svg',
        iconSize: iconSize2,
        iconAnchor: iconAnchor2
    });

    var iconZebre2 = L.icon({
        iconUrl: 'img/illustrations/laboissiere.svg',
        iconSize: iconSize2,
        iconAnchor: iconAnchor2
    });

    var iconChateaubriant2 = L.icon({
        iconUrl: 'img/illustrations/chateaubriant.svg',
        iconSize: iconSize2,
        iconAnchor: iconAnchor2
    });

    var iconAvion2 = L.icon({
        iconUrl: 'img/illustrations/bouguenais.svg',
        iconSize: iconSize2,
        iconAnchor: iconAnchor2
    });

    var arbre21 = L.marker([47.35, -2.21], {icon: iconArbre2, interactive: false}); // NO
    var arbre22 = L.marker([47.43, -1.51], {icon: iconArbre2, interactive: false}); // Nort-sur-Erdre
    var buisson21 = L.marker([47.00, -1.65], {icon: iconBuisson2, interactive: false}); // SO
    var buisson22 = L.marker([47.145, -1.25], {icon: iconBuisson2, interactive: false}); // SO Boissiere
    var buisson23 = L.marker([47.145, -1.16], {icon: iconBuisson2, interactive: false}); // SE Boissiere
    var buisson24 = L.marker([47.38, -1.18], {icon: iconBuisson2, interactive: false}); // Ancenis
    var buisson25 = L.marker([47.66, -1.34], {icon: iconBuisson2, interactive: false}); // SE Chateaubriant
    var vache2 = L.marker([47.54, -1.89], {icon: iconVache2, interactive: false});
    var centrale2 = L.marker([47.29, -1.84], {icon: iconCentrale2, interactive: false});
    var voilier2 = L.marker([47.10, -2.13], {icon: iconVoilier2, interactive: false});
    var bernerie2 = L.marker([47.00, -2.00], {icon: iconBernerie2, interactive: false});
    var guitare2 = L.marker([47.10, -1.27], {icon: iconGuitare2, interactive: false});
    var elephant2 = L.marker([47.19, -1.51], {icon: iconElephant2, interactive: false});
    var zebre2 = L.marker([47.19, -1.22], {icon: iconZebre2, interactive: false});
    var chateaubriant2 = L.marker([47.72, -1.38], {icon: iconChateaubriant2, interactive: false});
    var avion2 = L.marker([47.13, -1.67], {icon: iconAvion2, interactive: false});

    // ICONES 3

    var iconChateaubriant3 = L.icon({
        iconUrl: 'img/illustrations/chateaubriant.svg',
        iconSize: iconSize2,
        iconAnchor: iconAnchor2
    });

    var iconBuisson3 = L.icon({
        iconUrl: 'img/illustrations/buisson.svg',
        iconSize: iconSize3,
        iconAnchor: iconAnchor3
    });

    var iconArbre31 = L.icon({
        iconUrl: 'img/illustrations/arbre1.svg',
        iconSize: iconSize3,
        iconAnchor: iconAnchor3
    });

    var iconArbre32 = L.icon({
        iconUrl: 'img/illustrations/arbre2.svg',
        iconSize: iconSize3,
        iconAnchor: iconAnchor3
    });

    var iconArbre33 = L.icon({
        iconUrl: 'img/illustrations/arbre3.svg',
        iconSize: iconSize3,
        iconAnchor: iconAnchor3
    });

    var iconVache3 = L.icon({
        iconUrl: 'img/illustrations/plesse.svg',
        iconSize: iconSize3,
        iconAnchor: iconAnchor3
    });

    var iconSapin3 = L.icon({
        iconUrl: 'img/illustrations/sapin.svg',
        iconSize: iconSize3,
        iconAnchor: iconAnchor3
    });

    var iconRemparts3 = L.icon({
        iconUrl: 'img/illustrations/guerande.svg',
        iconSize: iconSize3,
        iconAnchor: iconAnchor3
    });

    var iconCasino3 = L.icon({
        iconUrl: 'img/illustrations/labaule.svg',
        iconSize: iconSize3,
        iconAnchor: iconAnchor3
    });

    var iconPaquebot3 = L.icon({
        iconUrl: 'img/illustrations/stnazaire.svg',
        iconSize: iconSize3,
        iconAnchor: iconAnchor3
    });

    var iconVoilier3 = L.icon({
        iconUrl: 'img/illustrations/pornic.svg',
        iconSize: iconSize3,
        iconAnchor: iconAnchor3
    });

    var iconBernerie3 = L.icon({
        iconUrl: 'img/illustrations/labernerie.svg',
        iconSize: iconSize3,
        iconAnchor: iconAnchor3
    });

    var iconCentrale3 = L.icon({
        iconUrl: 'img/illustrations/cordemais.svg',
        iconSize: iconSize3,
        iconAnchor: iconAnchor3
    });

    var iconElephant3 = L.icon({
        iconUrl: 'img/illustrations/nantes1.svg',
        iconSize: iconSize3,
        iconAnchor: iconAnchor3
    });

    var iconAvion3 = L.icon({
        iconUrl: 'img/illustrations/bouguenais.svg',
        iconSize: iconSize3,
        iconAnchor: iconAnchor3
    });

    var iconAnneaux3 = L.icon({
        iconUrl: 'img/illustrations/nantes2.svg',
        iconSize: iconSize3,
        iconAnchor: iconAnchor3
    });

    var iconSapin3 = L.icon({
        iconUrl: 'img/illustrations/sapin.svg',
        iconSize: iconSize3,
        iconAnchor: iconAnchor3
    });

    var iconVignes3 = L.icon({
        iconUrl: 'img/illustrations/vallet.svg',
        iconSize: iconSize3,
        iconAnchor: iconAnchor3
    });

    var iconGuitare3 = L.icon({
        iconUrl: 'img/illustrations/Clisson.svg',
        iconSize: iconSize3,
        iconAnchor: iconAnchor3
    });

    var iconZebre3 = L.icon({
        iconUrl: 'img/illustrations/laboissiere.svg',
        iconSize: iconSize3,
        iconAnchor: iconAnchor3
    });

    var chateaubriant3 = L.marker([47.72,-1.38], {icon: iconChateaubriant3, interactive: false});
    var buisson31 = L.marker([47.70,-1.35], {icon: iconBuisson3, interactive: false}); // SO Chateaubriant
    var buisson32 = L.marker([47.59,-1.25], {icon: iconBuisson3, interactive: false}); // Le Pin / Petit Auverné
    var arbre321 = L.marker([47.43,-1.15], {icon: iconArbre32, interactive: false}); // NO Ancenis
    var arbre331 = L.marker([47.43,-1.20], {icon: iconArbre33, interactive: false}); // NO Ancenis
    var arbre322 = L.marker([47.57,-1.60], {icon: iconArbre32, interactive: false}); // Nozay
    var arbre311 = L.marker([47.42,-1.64], {icon: iconArbre31, interactive: false}); // Heric
    var vache3 = L.marker([47.55,-1.89], {icon: iconVache3, interactive: false});
    var sapin3 = L.marker([47.50,-2.05], {icon: iconSapin3, interactive: false});
    var buisson33 = L.marker([47.42,-2.00], {icon: iconBuisson3, interactive: false}); // Campbon1
    var buisson34 = L.marker([47.42,-2.10], {icon: iconBuisson3, interactive: false}); // Campbon2
    var remparts3 = L.marker([47.33,-2.43], {icon: iconRemparts3, interactive: false});
    var casino3 = L.marker([47.27,-2.35], {icon: iconCasino3, interactive: false});
    var paquebot3 = L.marker([47.24,-2.21], {icon: iconPaquebot3, interactive: false});
    var voilier3 = L.marker([47.10,-2.10], {icon: iconVoilier3, interactive: false});
    var bernerie3 = L.marker([47.07,-2.02], {icon: iconBernerie3, interactive: false});
    var centrale3 = L.marker([47.28,-1.87], {icon: iconCentrale3, interactive: false});
    var arbre312 = L.marker([47.00,-1.81], {icon: iconArbre31, interactive: false}); // Machecoul
    var buisson35 = L.marker([46.95,-1.65], {icon: iconBuisson3, interactive: false}); // Corcoué sur Logne 1
    var buisson36 = L.marker([46.95,-1.60], {icon: iconBuisson3, interactive: false}); // Corcoué sur Logne 2
    var elephant3 = L.marker([47.20,-1.53], {icon: iconElephant3, interactive: false});
    var avion3 = L.marker([47.16,-1.61], {icon: iconAvion3, interactive: false});
    var anneaux3 = L.marker([47.18,-1.57], {icon: iconAnneaux3, interactive: false});
    var vignes3 = L.marker([47.06,-1.44], {icon: iconVignes3, interactive: false});
    var guitare3 = L.marker([47.09,-1.26], {icon: iconGuitare3, interactive: false});
    var zebre3 = L.marker([47.22,-1.21], {icon: iconZebre3, interactive: false});

    var iconsGroup1 = new L.FeatureGroup();
    var iconsGroup2 = new L.FeatureGroup();
    var iconsGroup3 = new L.FeatureGroup();

    iconsGroup1.addLayer(elephant1);
    iconsGroup1.addLayer(chateaubriant1);
    iconsGroup1.addLayer(voilier1);
    iconsGroup1.addLayer(arbre1);
    iconsGroup1.addLayer(buisson1);
    iconsGroup1.addLayer(buisson1bis);

    iconsGroup2.addLayer(arbre21);
    iconsGroup2.addLayer(arbre22);
    iconsGroup2.addLayer(vache2);
    iconsGroup2.addLayer(centrale2);
    iconsGroup2.addLayer(voilier2);
    iconsGroup2.addLayer(bernerie2);
    iconsGroup2.addLayer(buisson21);
    iconsGroup2.addLayer(guitare2);
    iconsGroup2.addLayer(elephant2);
    iconsGroup2.addLayer(zebre2);
    iconsGroup2.addLayer(buisson22);
    iconsGroup2.addLayer(buisson23);
    iconsGroup2.addLayer(buisson24);
    iconsGroup2.addLayer(chateaubriant2);
    iconsGroup2.addLayer(buisson25);
    iconsGroup2.addLayer(avion2);

    iconsGroup3.addLayer(chateaubriant3);
    iconsGroup3.addLayer(buisson31);
    iconsGroup3.addLayer(buisson32);
    iconsGroup3.addLayer(arbre321);
    iconsGroup3.addLayer(arbre331);
    iconsGroup3.addLayer(arbre322);
    iconsGroup3.addLayer(arbre311);
    iconsGroup3.addLayer(vache3);
    iconsGroup3.addLayer(sapin3);
    iconsGroup3.addLayer(buisson33);
    iconsGroup3.addLayer(buisson34);
    iconsGroup3.addLayer(remparts3);
    iconsGroup3.addLayer(casino3);
    iconsGroup3.addLayer(paquebot3);
    iconsGroup3.addLayer(voilier3);
    iconsGroup3.addLayer(bernerie3);
    iconsGroup3.addLayer(centrale3);
    iconsGroup3.addLayer(arbre312);
    iconsGroup3.addLayer(buisson35);
    iconsGroup3.addLayer(buisson36);
    iconsGroup3.addLayer(elephant3);
    iconsGroup3.addLayer(avion3);
    iconsGroup3.addLayer(anneaux3);
    iconsGroup3.addLayer(vignes3);
    iconsGroup3.addLayer(guitare3);
    iconsGroup3.addLayer(zebre3);


    map.on('zoomend', function() {
        let zoom = map.getZoom();
        if(zoom <= 8.5 && zoom > 7.5) {
            map.removeLayer(iconsGroup2);
            map.removeLayer(iconsGroup3);
            map.addLayer(iconsGroup1);
        } else if (zoom > 8.5 && zoom <= 9.5) {
            map.removeLayer(iconsGroup1);
            map.removeLayer(iconsGroup3);
            map.addLayer(iconsGroup2);
        } else if (zoom > 9.5 && zoom <= 11) {
            map.removeLayer(iconsGroup1);
            map.removeLayer(iconsGroup2);
            map.addLayer(iconsGroup3);
        } else {
            map.removeLayer(iconsGroup1);
            map.removeLayer(iconsGroup2);
            map.removeLayer(iconsGroup3);
        }
    });

    map.addLayer(iconsGroup1);

    /* ------------------------------------------------------------ */
    // On affiche la map google maps derrière.
    var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        /*attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',*/
        id: 'mapbox/light-v9',
        tileSize: 512,
        zoomOffset: -1
    });//.addTo(map);

    map.zoomControl.remove();


    const exteriorStyleDroite = {
        "color": "#445072", //#5B6C9A
        "fillColor": "#F0E4D8",
        "weight": 1,
        "opacity": 0.5,
        "fillOpacity": 1
    };

    const exteriorStyleGauche = {
        "color": "#9F4B3F", //#EA6D5B
        "fillColor": "#F0E4D8",
        "weight": 1,
        "opacity": 0.5,
        "fillOpacity": 1
    };

    const exteriorStyleCentre = {
        "color": "#619275", //#83C49E
        "fillColor": "#F0E4D8",
        "weight": 1,
        "opacity": 0.5,
        "fillOpacity": 1
    };

    // On ajoute le fichier GEOJson comme une couche.
    L.geoJson(dataCarte, {
        // Plusieurs paramètres pour pouvoir modifier ce qu'on affiche, la manière dont on l'affiche, etc.
        // Voir ici les différentes possiblités pour les options : https://leafletjs.com/examples/geojson/

        // Changement de la couleur en fonction de la propriété "orientation"
        style : function(feature, layer) {
            switch (gameData['orientation']) {

                case "Centre":
                    switch (feature.properties.orientation) {
                        case "Centre": return {color: "#619275", fillColor: "#83C49E", weight: 1, fillOpacity: 1};
                        case "Droite": return exteriorStyleCentre; // gris
                        case "Gauche": return exteriorStyleCentre; // gris
                    };
                case "Droite":
                    switch (feature.properties.orientation) {
                        case "Centre": return exteriorStyleDroite; // gris
                        case "Droite": return {color: "#445072", fillColor: "#5B6C9A", weight: 1, fillOpacity: 1};
                        case "Gauche": return exteriorStyleDroite; // gris
                    };
                case "Gauche":
                    switch (feature.properties.orientation) {
                        case "Centre": return exteriorStyleGauche; // gris
                        case "Droite": return exteriorStyleGauche; // gris
                        case "Gauche": return {color: "#9F4B3F", fillColor: "#EA6D5B", weight: 1, fillOpacity: 1};
                    };
            }
        },
        // Affichage des villes qui ont seulement la proprité orientation à "Gauche" ou à "Droite"
        filter: function(feature, layer) {
            return true;
        },
        // Pour chaque ville.
        onEachFeature: function(feature, layer) {
            // Voir ici les différentes possibilités pour chaque layer : https://leafletjs.com/reference.html#layer

            // Affichage d'un popup avec la propriété "nom" quand on click dessus.
            if(feature.properties.orientation == gameData['orientation']) {
                // Lors d'un click, on appelle la fonction "whenClicked"

                layer.on({
                    click: popup
                });
            }

        }
    }).addTo(map);

    let reject = document.getElementById("reject-btn");
    reject.addEventListener("click", (event)=>{
        let infobox = document.getElementById("panel-confirm");
        infobox.style.visibility = "hidden";
    });

    let accept = document.getElementById("confirm-btn");
    accept.addEventListener("click", ()=>{
        let infobox = document.getElementById("panel-confirm");
        let selectedValue = document.getElementById("counrty-name").innerHTML;
        infobox.style.visibility = "hidden";
        // On passe au truc suivant.
        roundEnding(selectedValue, gameData['communeCourante']['libelleCommune']);
    });

    // Affichage c'est partie
    if(gameData['numeroEssai'] == 1){
        showmesg("C\'est parti !", "#282246");
    }
});

function popup(e){
    let selectedValue = e.target.feature.properties.nom;
    let infobox = document.getElementById("panel-confirm");
    infobox.style.visibility = "visible";

    let p = document.getElementById("counrty-name");
    p.innerHTML = selectedValue;
}

function roundEnding(selectedValue, rightValue) {
    let scoreRound = 0;
    let nbEssaiSuivant = 1;
    let gameData = JSON.parse(localStorage.getItem('gameData'));
    let nbCommunesJouees = gameData['nbreCommunesJouees'];
    let communePrecedente = gameData['communePrecedente'];

    if(gameData['numeroEssai'] == 1) {
        if(selectedValue == rightValue) {
            // Gagné premier.
            scoreRound = 5000;
            nbCommunesJouees++;
            communePrecedente = gameData['communeCourante'];
        } else {
            // Perdu premier essai
            nbEssaiSuivant = 2;
        }
    } else {
        if (selectedValue == rightValue) {
            // Gagné deuxieme essai
            scoreRound = 2500;
            nbCommunesJouees++;
            communePrecedente = gameData['communeCourante'];
        } else {
            // Perdu deuxieme essai
            nbCommunesJouees++;
            communePrecedente = gameData['communeCourante'];
            calculateScore(selectedValue, rightValue).then(score => {
                localStorage.setItem('gameData', JSON.stringify({
                    'orientation': gameData['orientation'],
                    'score' : gameData['score'] + score,
                    'scoreIntermediaire': score,
                    'nbreCommunesTrouvees': gameData['nbreCommunesTrouvees'] + (selectedValue == rightValue ? 1 : 0),
                    'nbreCommunesJouees': nbCommunesJouees,
                    'numeroEssai': nbEssaiSuivant,
                    'communePrecedente': communePrecedente,
                    'communeCourante' : nbEssaiSuivant == 2 ? gameData['communeCourante'] : gameData['communes'].pop(),
                    'communes': gameData['communes']
                }));
                page('/communes-2/resultatInterFalse');
            });
        }
    }

    if(selectedValue == rightValue || gameData['numeroEssai'] == 1) {
        localStorage.setItem('gameData', JSON.stringify({
            'orientation': gameData['orientation'],
            'score' : gameData['score'] + scoreRound,
            'scoreIntermediaire': scoreRound,
            'nbreCommunesTrouvees': gameData['nbreCommunesTrouvees'] + (selectedValue == rightValue ? 1 : 0),
            'nbreCommunesJouees': nbCommunesJouees,
            'numeroEssai': nbEssaiSuivant,
            'communePrecedente': communePrecedente,
            'communeCourante' : nbEssaiSuivant == 2 ? gameData['communeCourante'] : gameData['communes'].pop(),
            'communes': gameData['communes']
        }));
    }


    // REDIRECTION VERS LA BONNE PAGE.
    if(selectedValue == rightValue) page('/communes-2/resultatInterTrue')
    else {
        // Si on s'est trompés et que c'était le second essai, on arrive sur la page d'échec, sinon sur la page avec un indice en plus
        if(nbEssaiSuivant == 2) page('/communes-2/affirmation');
    }


}

/**
 * Calcule le score obtenu pour le second tour. On se base sur la distance entre la ville sélectionnée et la bonne ville.
 *
 * @param {String} selectedValue
 * @param {String} rightValue
 */
async function calculateScore(selectedValue, rightValue) {
    const scoreReussite = 2500;
    const maxScoreEchec = 2000;

    if(selectedValue == rightValue) return scoreReussite;

    /**
     * Pour les coordonnées, on utilisera la première valeur du tableau coordinates du geojson.json
     * En valeur de référence, on prendra la plus grande distance possible (à déterminer).
     * On fait le ratio entre la distance entre les selectedValue et rightValue sur la plus grande distance, que l'on multiplie par le scoreMax.
     **/

    const distanceMax = 179378; // Cela correspond à la distance en mètres la plus longue en Loire-Atlantique, entre les bords éloignés de Piriac-sur-Mer et Montrelais
    let scoreRetour = await fetch('api/distance/' + selectedValue + '/' + rightValue)
    .then(function(response) {
        return response.json();
    })
    .then(function(responseJson) {
        let score = (1 - (responseJson / distanceMax)) * maxScoreEchec;
        return Math.round(score);
    });
    return scoreRetour;
}

function sliderplus(n) {
    showAffirmation(slideIndex += n);
}

function slidercurrent(n) {
    showAffirmation(slideIndex = n);
}

function showAffirmation(n) {
    var i;
    var slides = document.getElementsByClassName("affirmation-content");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
      if (n < 1) {slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("active", "");
      }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

// Show firt message !
function showmesg(message, color){
    let msg = document.getElementById("message");
    msg.innerHTML=message;
    msg.style.color = color;
    msg.removeAttribute("class");
    msg.setAttribute("class", "reem-kufi" );
    msg.setAttribute("class", "fadeOutLeft" );
}

// sleep
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }