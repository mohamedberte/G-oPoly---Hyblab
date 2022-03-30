'use strict'

page('/communes-2/classementChange', async function () {
    await renderTemplate(templates('./templates/classementChange.mustache'));

    let response = await fetch('api/classement');
    const classement = await response.json();

    creationClassementChange(classement);

    document.getElementById("boutonRetour").addEventListener('click', function () {
        page('/communes-2/resultatFinal');
    });

    document.getElementById("save-btn").addEventListener('click', function () {
        let pseudoJoueur = document.getElementById("pseudo").value;
        let scoreJoueur = JSON.parse(localStorage.getItem('gameData')).score;

        // on recrée le classement avec le nouveau score
        if (pseudoJoueur.length > 0)  {
            if (pseudoJoueur.length <= 10){
                const mapData = new Map();
                let decalage = false;
                for (let index = 0; index < classement.length-1; index++) {
                    if (decalage){
                        mapData.set(classement[index+1].place,{place: classement[index+1].place, point: classement[index].point, nom: classement[index].nom});
                    } else {
                        if (parseInt(classement[index].point) > scoreJoueur) {
                            mapData.set(classement[index].place,classement[index]);
                        } else {
                            mapData.set(classement[index].place,{place: classement[index].place, point: scoreJoueur.toString(), nom: pseudoJoueur});
                            mapData.set(classement[index+1].place,{place: classement[index+1].place, point: classement[index].point, nom: classement[index].nom});
                            decalage = true;
                        }
                    }
                }
        
                if (!decalage && classement[classement.length-1].point < scoreJoueur) {
                    mapData.set(classement[classement.length-1].place,{place: classement[classement.length-1].place, point: scoreJoueur.toString(), nom: pseudoJoueur});
                } else if (!decalage && classement[classement.length-1].point > scoreJoueur) {
                    mapData.set(classement[classement.length-1].place,classement[classement.length-1]); 
                }
        
                fetch('api/newClassement',{
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    method: 'POST',
                    body: JSON.stringify(Object.fromEntries(mapData))
                });

                page('/communes-2/gameChoice');
            } else {
                printError("Le pseudo est trop long.");
            }
        } else {
            printError("Merci de mettre un pseudo.");
        }
    });
});

function printError(message){
    // On affiche le message
    document.getElementById('divError').innerHTML = message;
    
    // On l'efface 3 secondes plus tard
    setTimeout(function() {
        document.getElementById('divError').innerHTML = "";
    },3000);
}

function creationClassementChange(tabClassement){
    const textClassement = document.getElementById("textClassement");
    while (textClassement.firstChild) { textClassement.firstChild.remove() }
    
    let text = document.createElement('div');
    text.classList.add("horizontal-box");
    let place = document.createElement('div');
    place.classList.add("vertical-box-classement");
    place.classList.add("popUp-Space");
    let point = document.createElement('div');
    point.classList.add("vertical-box-classement");
    point.classList.add("popUp-Space");
    let nom = document.createElement('div');
    nom.classList.add("vertical-box-classement");
    nom.classList.add("popUp-Space");

    for (let index = 0; index < tabClassement.length; index++) {
        let placeText = document.createElement('p');
        placeText.textContent = tabClassement[index].place;

        let pointText = document.createElement('p');
        pointText.textContent = tabClassement[index].point+"pts";

        let nomText = document.createElement('p');
        nomText.textContent = tabClassement[index].nom;

        place.appendChild(placeText);
        point.appendChild(pointText);
        nom.appendChild(nomText);
    }

    text.appendChild(place);
    text.appendChild(point);
    text.appendChild(nom);
    textClassement.appendChild(text);

    document.getElementById("textScore").textContent = "votre score : "+JSON.parse(localStorage.getItem('gameData')).score+" points";
}