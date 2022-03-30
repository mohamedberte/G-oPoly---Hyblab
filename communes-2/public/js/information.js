'use strict'

page('/communes-2/information', async function () {
    await renderTemplate(templates('./templates/information.mustache'));

    // Init swiper slider
    const swiper = new Swiper("#mySwiper", {
        direction: "vertical",
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    document.getElementById("first-slide").addEventListener('scroll', () => {
        swiper.slideNext()
    });

    // chargement de la visualisation
    let nom_commune = "Libellé de la commune";
    let gameData = JSON.parse(localStorage.getItem('gameData'));
    let communeCourante = gameData['communePrecedente']['libelleCommune'];


    let remplacer_virgule_par_point = function(decimal) {
        return parseFloat((decimal+"").replace(",","."));
    }

    let data_Nom_Voix = function(d, commune){
        let l = 0;
        while(commune != d[l][nom_commune]){
            l++;
        }
        let n = d[l]; 
        let tab =  [];
        for(let i= 1; i<6; i++){
            let NomC = `NomC${i}`;
            let Voix = `% Voix/ExpC${i}`;
            tab.push({"NomC" : n[NomC], "Voix" : remplacer_virgule_par_point(n[Voix]), "Commune" : commune, "InscritsCommune" : n["Inscrits"], "OrientationCommune" : n["Orientation"], "VotantsCommune" : n["Votants"], "AbstentionsCommune" : n["Abstentions"], "BlancsCommune" : n["Blancs"], "NulsCommune" : n["Nuls"], "ExprimésCommune" : n["Exprimés"]});
        }
        
        return tab;
    }

    let data_Nom_Voix_2T = function(d, commune){
        let l = 0;
        while(commune != d[l][nom_commune]){
            l++;
        }
        let n = d[l]; 
        let tab2 =  [];
        let V1 = "% Voix/Exp" ;
        let V2 = "% Voix/Exp__1";
        let N1 ="Nom";
        let N2 = "Nom__1";
        tab2.push({"Nom2T" : n[N1], "Voix2T" : remplacer_virgule_par_point(n[V1]), "Commune2T" : commune, "InscritsCommune" : n["Inscrits"], "VotantsCommune" : n["Votants"], "AbstentionsCommune" : n["Abstentions"], "BlancsCommune" : n["Blancs"], "NulsCommune" : n["Nuls"], "ExprimésCommune" : n["Exprimés"]});
        tab2.push({"Nom2T" : n[N2], "Voix2T" : remplacer_virgule_par_point(n[V2]), "Commune2T" : commune, "InscritsCommune" : n["Inscrits"], "VotantsCommune" : n["Votants"], "AbstentionsCommune" : n["Abstentions"], "BlancsCommune" : n["Blancs"], "NulsCommune" : n["Nuls"], "ExprimésCommune" : n["Exprimés"]});  

        return tab2;
    }

    let dataSet = data_Nom_Voix(dat,communeCourante);
    let data2t = data_Nom_Voix_2T(data2,communeCourante);


    pie(data2t);
    histo(dataSet);


    //Info commune tour1
    const info1 = document.querySelector("#sous_titre1");
    const  ul = document.createElement("ul");
    const  li7 = document.createElement("li");
    const  li1 = document.createElement("li");
    const  li2 = document.createElement("li");
    const  li3 = document.createElement("li");
    const  li4 = document.createElement("li");
    const  li5 = document.createElement("li");
    const  li6 = document.createElement("li");
    
    ul.className = "popUp-infoCommune";
    
    li7.innerHTML = `Orientation de la commune : ${dataSet[0].OrientationCommune}`;
    li1.innerHTML = `Nombre d'inscrits : ${dataSet[0].InscritsCommune}`;
    li2.innerHTML = `Nombre de votants : ${dataSet[0].VotantsCommune}`;
    li3.innerHTML = `Nombre d'abstentionistes : ${dataSet[0].AbstentionsCommune}`;
    li4.innerHTML = `Nombre de bulletins blancs : ${dataSet[0].BlancsCommune}`;
    li5.innerHTML = `Nombre de bulletins nuls : ${dataSet[0].NulsCommune}`;
    li6.innerHTML = `Nombre de bulletins exprimés : ${dataSet[0].ExprimésCommune}`;


    info1.appendChild(ul);
    ul.appendChild(li7);
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);
    ul.appendChild(li5);
    ul.appendChild(li6);
    
    //Info commune tour2
    const info2 = document.querySelector("#sous_titre2");
    const  ul2 = document.createElement("ul");
    const  li21 = document.createElement("li");
    const  li22 = document.createElement("li");
    const  li23 = document.createElement("li");
    const  li24 = document.createElement("li");
    const  li25 = document.createElement("li");
    const  li26 = document.createElement("li");
    
    ul2.className = "popUp-infoCommune";
    
    li21.innerHTML = `Nombre d'inscrits : ${data2t[0].InscritsCommune}`;
    li22.innerHTML = `Nombre de votants : ${data2t[0].VotantsCommune}`;
    li23.innerHTML = `Nombre d'abstentionistes : ${data2t[0].AbstentionsCommune}`;
    li24.innerHTML = `Nombre de bulletins blancs : ${data2t[0].BlancsCommune}`;
    li25.innerHTML = `Nombre de bulletins nuls : ${data2t[0].NulsCommune}`;
    li26.innerHTML = `Nombre de bulletins exprimés : ${data2t[0].ExprimésCommune}`;

    info2.appendChild(ul2);
    ul2.appendChild(li21);
    ul2.appendChild(li22);
    ul2.appendChild(li23);
    ul2.appendChild(li24);
    ul2.appendChild(li25);
    ul2.appendChild(li26);

    document.getElementById("continue-btn").addEventListener('click', function () {
        if (gameData['nbreCommunesJouees'] >= 5){
            page('/communes-2/resultatFinal');
        } else {
            page('/communes-2/affirmation');
        }
    });
});

function histo(dataSet) {
    const margin = 20;
    const width = 330 - 2 * margin;
    const height = 250 - 2 * margin;
    let col = ["#282246"];

    d3.select("#histogramme").selectAll("*").remove();
    let svg = d3.select("#histogramme")
        .append("svg")
        .attr("width", width + margin )
        .attr("height", height +  6 * margin)
        .attr('transform', `translate(${margin}, ${margin - 20})`)
        

    const chart = svg.append('g')
    .attr('transform', `translate(${margin*1.2}, ${margin * 2})`)
    
    const color = d3.scaleOrdinal(col)
    color.domain(d => d.NomC)
    color.range();

    const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(dataSet.map(data => data.Voix)) + 5])
        
    chart.append('g')
        .call(d3.axisLeft(yScale))
        .selectAll("text")
            .attr("fill", "black" );

    const xScale = d3.scaleBand()
        .range([0, width - 40])
        .domain(dataSet.map(data => data.NomC))
        .padding(0.1)

    chart.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale))
        .style('font-size', '9px')
        .selectAll("text")	
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)")
            .attr("fill", "black")
            .attr("font-family", "Bebas Neue");

        
    const makeYLines = () => d3.axisLeft()
        .scale(yScale)
  
    chart.append('g')
        .attr('class', 'grid')
        .call(makeYLines()
          .tickSize(-width, 0, 0)
          .tickFormat('')
          
        )

    const barGroups = chart.selectAll()
        .data(dataSet)
        .enter()
        .append('g')
  
    barGroups
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (g) => xScale(g.NomC) + 5 )
        .attr('y', (g) => yScale(g.Voix) )
        .attr('height', (g) => height - yScale(g.Voix))
        .attr('width', xScale.bandwidth() - 10)
        .attr('fill', d => color(d.NomC))

    /*barGroups 
      .append('text')
      .attr('class', 'value')
      .attr('x', (a) => xScale(a.NomC) + xScale.bandwidth() / 2)
      .attr('y', (a) => yScale(a.Voix) - 3)
      .style('font-size', '10px')
      .attr('text-anchor', 'middle')
      .text((a) => `${a.Voix}%`)*/


    svg.append('text')
      .attr('class', 'title')
      .attr('x', 330 / 2 )
      .attr('y', 25)
      .style('font-size', '18px')
      .attr('text-anchor', 'middle')
      .text(`${dataSet[0].Commune}`)
      .selectAll("text")
        .attr("fill", "white");
}

function pie(data2t){
    let col = ["#ED6464","#83C49E"]; 
    const size = 300;
    const fourth = size / 4;
    const half = size / 2;
    const labelOffset = fourth / 2;
    const container = d3.select("#pie_chart");

    const chart = container.append('svg')
        .style('width', '100%')
        .attr('transform', `translate(${0}, ${50})`)
        .attr('viewBox', `6 10 ${size-5} ${size/1.4}`);

    const plotArea = chart.append('g')
        .attr('transform', `translate(${half}, ${half/1.2})`);

    const color = d3.scaleOrdinal(col)
    color.domain(d => d.Nom2T)
    color.range();

    const pie = d3.pie()
        .sort(null)
        .value(d => d.Voix2T);
      
    const arcs = pie(data2t);

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(fourth);

    const arcLabel = d3.arc()
        .innerRadius(labelOffset)
        .outerRadius(labelOffset);

    plotArea.selectAll('path')
            .data(arcs)
            .enter()
            .append('path')
            .attr('fill', d => color(d.value))
            .attr('stroke', 'white')
            .attr('d', arc)

    const labels = plotArea.selectAll('text')
        .data(arcs)
        .enter()
        .append('text')
        .style('text-anchor', 'middle')
        .style('alignment-baseline', 'middle')
        .style('font-size', '7px')
        .attr('transform', d => `translate(${arcLabel.centroid(d)})`)

    labels.append('tspan')
          .attr('y', '0.01em')
          .attr('x', 0)
          .text(d => `${d.data.Nom2T} (${d.value}%)`);
}