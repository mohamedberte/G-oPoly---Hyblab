'use strict'

page('/communes-2/resultatInterFalse', async function () {
    await renderTemplate(templates('./templates/resultatInter.mustache'));
    document.getElementById('titreScoreInter').textContent = "MAUVAISE RÉPONSE";
    document.getElementById('nomCommune').textContent = "La commune était "+JSON.parse(localStorage.getItem('gameData')).communePrecedente.libelleCommune;
    initResultatInter();
});

page('/communes-2/resultatInterTrue', async function () {
    await renderTemplate(templates('./templates/resultatInter.mustache'));
    document.getElementById("background-confetti").src = "video/confetti.gif";
    document.getElementById('titreScoreInter').textContent = "BONNE RÉPONSE";
    initResultatInter();
});


function initResultatInter(){
    let gameData = JSON.parse(localStorage.getItem('gameData'));

    // Affichage du score
    document.getElementById('scoreInter').textContent = gameData.scoreIntermediaire;

    // Ajout addEventListener aux boutons
    document.getElementById("true-btn").addEventListener('click', function () {
        document.getElementById("background-confetti").src = "";
        page('/communes-2/information');
    });

    document.getElementById("false-btn").addEventListener('click', function () {
        document.getElementById("background-confetti").src = "";
        if (gameData.nbreCommunesJouees >= 5){
            page('/communes-2/resultatFinal');
        } else {
            page('/communes-2/affirmation');
        }
    });
}