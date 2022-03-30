'use strict'

page('/communes-2/resultatFinal', async function () {
    await renderTemplate(templates('./templates/resultatFinal.mustache'));

    let scoreJoueur = JSON.parse(localStorage.getItem('gameData')).score;
    if (scoreJoueur === undefined) scoreJoueur = 0;

    // affichage du score
    document.getElementById('scoreTotal').textContent = scoreJoueur;

    // affichage du titre
    switch (scoreJoueur) {
        case scoreJoueur > 24500:
            document.getElementById('scoreTitre').textContent = "VOUS ÊTES UN AS EN POLITIQUE !";
            break;
        case scoreJoueur > 20000:
            document.getElementById('scoreTitre').textContent = "VOUS ÊTES CALÉ EN POLITIQUE ! ";
            break;
        case scoreJoueur > 10000:
            document.getElementById('scoreTitre').textContent = "VOUS ÊTES BON EN POLITIQUE !";
            break;
        default:
            document.getElementById('scoreTitre').textContent = "VOUS AVEZ FAIT DE VOTRE MIEUX !";
            break;
    }

    // affichage ou non du tableau des scores
    let response = await fetch('api/lastClassement');
    const lastClassement = await response.json();
    let saveBtn = document.getElementById("save-btn");
    if (parseInt(lastClassement.point) < scoreJoueur) {
        saveBtn.style.display = "block";
        saveBtn.addEventListener('click', function () {
            page('/communes-2/classementChange');
        });
    } else {
        saveBtn.style.display = "none";
    }

    document.getElementById("rePlay-btn").addEventListener('click', function () {
        page('/communes-2/gameChoice');
    });
});