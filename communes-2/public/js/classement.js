'use strict'

page('/communes-2/classement', async function () {
    await renderTemplate(templates('./templates/classement.mustache'));

    document.getElementById("boutonRetour").addEventListener('click', function () {
        page('/communes-2/');
    });

    let response = await fetch('api/classement');
    const classement = await response.json();

    creationClassement(classement);
});

function creationClassement(tabClassement){
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
    textClassement.appendChild(text)
}