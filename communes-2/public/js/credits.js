'use strict'

page('/communes-2/credits', async function () {
    await renderTemplate(templates('./templates/credits.mustache'));

    document.getElementById("boutonRetour").addEventListener('click', function () {
        page('/communes-2/');
    });
});