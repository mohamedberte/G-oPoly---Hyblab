'use strict'

page('/communes-2/game', async function () {
    await renderTemplate(templates('./templates/game.mustache'));

    const Retourbtn = document.getElementById("boutonRetour");
    Retourbtn.addEventListener('click', function () {
        page('/communes-2/');
    });
});



