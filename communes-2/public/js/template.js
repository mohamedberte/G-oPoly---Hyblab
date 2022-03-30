'use strict'

// fonction utilitaire permettant de faire du 
// lazy loading (chargement à la demande) des templates
const templates = (() => {
    let templates = {};
    return function load(url) {
        if (templates[url]) {
            return Promise.resolve(templates[url]);
        }
        else {
            return fetch(url)
                .then(res => res.text())
                .then(text => {
                    return templates[url] = text;
                })
        }
    }
})();

// fonction utilitaire de rendu d'un template
async function renderTemplate(template, context = true) {
    // On rend le template
    const rendered = Mustache.render(await template, context);
    // Et on l'insère dans le body
    let body = document.getElementById('main');
    body.innerHTML = rendered;
}