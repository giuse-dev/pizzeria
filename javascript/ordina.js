let totalePizzeOrdinate = 0;
let totaleRusticiOrdinati = 0;
let totaleBevandeOrdinate = 0;


function selezionaCategoria(event){

  let divPizze = document.getElementsByClassName('pizze')[0];
  let divRosticceria = document.getElementsByClassName('rosticceria')[0];
  let divBevande = document.getElementsByClassName('bevande')[0];

  let buttonPizze = document.getElementById('categoria-button-pizze');
  let buttonRosticceria = document.getElementById('categoria-button-rosticceria');
  let buttonBevande = document.getElementById('categoria-button-bevande');
  
  let idElem = event.target.id;

  if(idElem == 'categoria-button-pizze' ){

    divPizze.classList.add('selected');
    buttonPizze.style.fontSize = '1.4em';
    buttonPizze.style.fontWeight = 'bold';

    divRosticceria.classList.remove('selected');
    buttonRosticceria.style.fontSize = '1.2em';
    buttonRosticceria.style.fontWeight = 'normal';

    divBevande.classList.remove('selected');
    buttonBevande.style.fontSize = '1.2em';
    buttonBevande.style.fontWeight = 'normal';
        
  }else if(idElem == 'categoria-button-rosticceria'){

    divPizze.classList.remove('selected');
    buttonPizze.style.fontSize = '1.2em';
    buttonPizze.style.fontWeight = 'normal';

    divRosticceria.classList.add('selected');
    buttonRosticceria.style.fontSize = '1.4em';
    buttonRosticceria.style.fontWeight = 'bold';

    divBevande.classList.remove('selected');
    buttonBevande.style.fontSize = '1.2em';
    buttonBevande.style.fontWeight = 'normal';

  }else{

    divPizze.classList.remove('selected');
    buttonPizze.style.fontSize = '1.2em';
    buttonPizze.style.fontWeight = 'normal';

    divRosticceria.classList.remove('selected');
    buttonRosticceria.style.fontSize = '1.2em';
    buttonRosticceria.style.fontWeight = 'normal';

    divBevande.classList.add('selected');
    buttonBevande.style.fontSize = '1.4em';
    buttonBevande.style.fontWeight = 'bold';

  }

}

function onRadioSelection(event, prezzo){
  let radioButton = document.getElementById(event.target.id);

  let grandParent = radioButton.parentElement.parentElement;

  //prendi il penultimo elemento figlio
  let prezzoParagraph = grandParent.lastElementChild.previousElementSibling;
  
  prezzoParagraph.innerHTML = prezzo +'0 &euro;';
}

// resetta i radioButton a checked=false
//(chiamo questa funzione ad ogni reload)
function resetAll(){
  let radioList = document.getElementsByClassName('radio');
  for(let i = 0; i < radioList.length; i++){
    radioList[i].checked = false;
  }
}


//aggiungo gli events onclick al div prodotto (sarebbero gli ocnlick degli ingredienti delle pizze del div prodotto)
let listaDivProdottoIngredients = document.getElementsByClassName('rmv-ingr');
for(let i = 0; i < listaDivProdottoIngredients.length; i++){
  listaDivProdottoIngredients[i].addEventListener('click', removeIngr);
}

let elencoPrezziIngredienti = {
  acciughe: 1,
  carciofi: 0.5,
  cipolla: 0.5,
  funghi: 0.5,
  mozzarella: 1,
  'mozz. di bufala': 2,
  melanzane: 0.5,
  olive: 0.5,
  pancetta: 1,
  patatine: 1,
  peperoni: 0.5,
  pomodoro: 0.5,
  prosciutto: 1,
  'salame piccante': 1,
  salsiccia: 1,
  speck: 1,
  wurstel: 1,
  zucchine: 0.5
}

//rimuove l'ingrediente e aggiorna il prezzo della pizza
function removeIngr(event){
  let div = document.getElementById(event.currentTarget.id);
  
  let span = div.nextElementSibling;
  let br = span.nextElementSibling;

  let priceParagraph = div.parentNode.lastElementChild.previousElementSibling;
  let stringaPrezzo = priceParagraph.innerHTML;
  let prezzo = parseFloat(stringaPrezzo);
  
  let nomeIngr = span.textContent;

  let costoIngr = elencoPrezziIngredienti[nomeIngr];
  prezzo -= costoIngr;

  // se prezzo è intero, aggiungi '.00 &euro;' altimenti, aggiungi '0 &euro;'
  if(prezzo == Math.floor(prezzo)){ //se prezzo è un numero intero
    prezzo = prezzo +'.00 &euro;';

  }else{ //se prezzo è un numero decimale
    prezzo = prezzo +'0 &euro;';
  }
  priceParagraph.innerHTML = prezzo;

  div.removeEventListener('click', removeIngr);

  div.parentNode.removeChild(div);
  span.parentNode.removeChild(span);
  br.parentNode.removeChild(br);

}

//aggiunge l'ingrediente e aggiorna il prezzo della pizza
function addIngr(event){
  
}

//aggiungo gli events onclick al div-ingredienti
let listaDivIngredients = document.getElementsByClassName('square-button-div');
for(let i = 0; i < listaDivIngredients.length; i++){
  listaDivIngredients[i].addEventListener('click', addPrezzoIngr);
}

//array di stringhe (le stringhe sono i nomi degli ingredienti)
let listaIngredientiAggiunti = [];

// aggiunge il prezzo dell'ingrediente al totale del div-ingredienti
function addPrezzoIngr(event){

  let div = document.getElementById(event.currentTarget.id);

  //cambio l immagine del div che funge da button
  div.firstChild.src='../img/close-button2.png';

  //aggiungo la classe che evidenzia la riga
  let spanIngrediente = div.parentElement.parentElement;
  spanIngrediente.classList.add('evidenzia');

  //aggiorno il prezzo totale dell' "aggiunta corrente"
  let p_costoAggiunte = document.getElementById('tot-conferma-agg-ingr');
  let prezzoIngr = parseFloat(div.parentElement.innerHTML);

  //il costo delle aggiunte/rimozioni fatte finore (per quanto riguarda la pizza corrente)
  let totCorrente = parseFloat( p_costoAggiunte.innerHTML.substring(7) ); //(7 : numero di lettere "totale:")
  totCorrente += prezzoIngr;

  // se totCorrente è intero, aggiungi '.00 &euro;' altimenti, aggiungi '0 &euro;'
  if(totCorrente == Math.floor(totCorrente)){ //se totCorrente è un numero intero
    totCorrente = totCorrente +'.00 &euro;';

  }else{ //se totCorrente è un numero decimale
    totCorrente = totCorrente +'0 &euro;';
  }

  p_costoAggiunte.innerHTML = 'Totale: '+ totCorrente;

  //aggiunge alla lista ingredienti l'ingrediente selezionato
  listaIngredientiAggiunti.push(spanIngrediente.textContent);

  //cambio l evento onclick del div
  div.removeEventListener('click', addPrezzoIngr);
  div.addEventListener('click', removePrezzoIngr);
}

// rimuove il prezzo dell'ingrediente dal totale del div-ingredienti
function removePrezzoIngr(event){

  let div = document.getElementById(event.currentTarget.id);

  //cambio l immagine del div che funge da button
  div.firstChild.src='../img/square-button1.png';

  //rimuovo la classe che evidenzia la riga
  let spanIngrediente = div.parentElement.parentElement;
  spanIngrediente.classList.remove('evidenzia');

  //aggiorno il prezzo totale dell' "aggiunta corrente"
  let p_costoAggiunte = document.getElementById('tot-conferma-agg-ingr');
  let prezzoIngr = parseFloat(div.parentElement.innerHTML);

  //il costo delle aggiunte/rimozioni fatte finore (per quanto riguarda la pizza corrente)
  let totCorrente = parseFloat( p_costoAggiunte.innerHTML.substring(7) ); //(7 : numero di lettere "totale:")
  totCorrente -= prezzoIngr;

  // se totCorrente è intero, aggiungi '.00 &euro;' altimenti, aggiungi '0 &euro;'
  if(totCorrente == Math.floor(totCorrente)){ //se totCorrente è un numero intero
    totCorrente = totCorrente +'.00 &euro;';

  }else{ //se totCorrente è un numero decimale
    totCorrente = totCorrente +'0 &euro;';
  }

  p_costoAggiunte.innerHTML = 'Totale: '+ totCorrente;

  //sostanzialmente rimuove la stringa ingrediente dalla lista di ingredienti
  listaIngredientiAggiunti = listaIngredientiAggiunti.filter( ingrediente => {
    return ingrediente.toLowerCase() != spanIngrediente.textContent.toLowerCase();
  } );

  //cambio l evento onclick del div
  div.removeEventListener('click', removePrezzoIngr);
  div.addEventListener('click', addPrezzoIngr);

}

//funzione che crea gli elementi pda aggiungere al div prodotto
//viene invocata dal button di div-ingredienti (aggiungi)
function creaIngrProdotto(idPadre, idDiv, nomeIngrediente){

  let div = document.createElement('div');
  div.id = idDiv;
  div.classList.add('rmv-ingr');
  div.addEventListener('click', removeIngr);

  let img = document.createElement('img');
  img.src = "../img/close-red.png";

  div.appendChild(img);

  let span = document.createElement('span');
  span.classList.add('ingrediente');
  span.textContent= nomeIngrediente;

  let br = document.createElement('br');

  let divPadre = document.getElementById(idPadre);

  
  let listaFigli = divPadre.children;
  let elemTarget = null; //l elemento prima del quale voglio inserire div,span e br;
  for(let i = 0; i< listaFigli.length; i++){
    
    let figlioCorrente = listaFigli[i];
    if(figlioCorrente.classList[0] == "add-ingr"){
      elemTarget = figlioCorrente;
    }

  }
  
  divPadre.insertBefore(br, elemTarget);
  divPadre.insertBefore(span, br);
  divPadre.insertBefore(div, span);
}

//l'id del current padre, servira per inserire degli ingredienti aggiuntivi (es: 'margh-div-ingr')
let idPadre = '';

let listaIdSpanDaNascondere= [];
function scegliIngr(event){

  let padre = document.getElementById( event.currentTarget.id ).parentElement;
  idPadre = padre.id;


  //prendo gli ingredienti presenti nel prodotto cosi da evitare di mostrarglieli nella selezione
  let listaIngredientiPresenti = [];
  let figliSpan = padre.getElementsByTagName('span');
  for(let i = 0; i < figliSpan.length-1; i++){
    listaIngredientiPresenti.push(figliSpan[i].textContent);
    let ingrediente = figliSpan[i].textContent;
    if(ingrediente == 'salame piccante'){
      ingrediente = ingrediente.substring(0,6) +'-'+ ingrediente.substring(7);
      listaIdSpanDaNascondere.push('span-'+ ingrediente);
    }else if(ingrediente == 'mozz. di bufala'){
      listaIdSpanDaNascondere.push('span-bufala');
    }else{
      listaIdSpanDaNascondere.push('span-'+ ingrediente);
    }
  }


  for(let i = 0; i < listaIdSpanDaNascondere.length; i++){
    let spanCorrente = document.getElementById(listaIdSpanDaNascondere[i]);
    spanCorrente.style.display = 'none';
    spanCorrente.nextElementSibling.style.display= 'none'; //è il <br> appena dopo lo span
  }

  document.getElementsByClassName('div-overlay')[0].style.display = 'block';
  document.getElementsByClassName('div-ingredienti')[0].style.display = 'block';

}

function addFromIngrToProd(){
  let spanIngredients = document.getElementsByClassName("evidenzia");

  let listaNomiIngredients = [];
  for(let i = 0; i < spanIngredients.length; i++){
    listaNomiIngredients.push(spanIngredients[i].firstChild.textContent.toLowerCase());
  }

  for(let i = 0; i < listaNomiIngredients.length; i++){
    let nomeIngrediente = listaNomiIngredients[i];
    
    //aumento il prezzo della pizza, sommando il costo dell'ingrediente
    let prezzo_paragraph = document.getElementById(idPadre).lastElementChild.previousElementSibling;
    let prezzo = parseFloat(prezzo_paragraph.textContent);
    prezzo += elencoPrezziIngredienti[nomeIngrediente];

    // se prezzo è intero, aggiungi '.00 &euro;' altimenti, aggiungi '0 &euro;'
    if(prezzo == Math.floor(prezzo)){ //se prezzo è un numero intero
      prezzo = prezzo +'.00 &euro;';

    }else{ //se prezzo è un numero decimale
      prezzo = prezzo +'0 &euro;';
    }  
    prezzo_paragraph.innerHTML = prezzo;
  
    let primaParte = idPadre.substring(0, idPadre.indexOf('-'));
    let idDiv = primaParte +'-div-'+ nomeIngrediente;
    creaIngrProdotto(idPadre, idDiv, nomeIngrediente);
  }
  

  //rimuovo la classe evidenzia
  let evidenziati = document.querySelectorAll('.evidenzia');
  for(let i = 0; i < evidenziati.length; i++){
    evidenziati[i].classList.remove('evidenzia');
  }

  //rimetto l'immagine verde col + del div che funge da button per selezionare gli ingredienti
  let selezionati = document.querySelectorAll('.square-button-div');
  for(let i = 0; i < selezionati.length; i++){
    let currentImg = selezionati[i].firstElementChild;
    if(currentImg.src.indexOf('close-button2.png') != -1){
      currentImg.src ='../img/square-button1.png';
    }
  }

  // rimuovo gli eventlistener che abbassano il prezzo del div ingredienti una volta cliccati
  // e aggiungo quelli che lo aumentano una volta cliccati (anche se sono ripetuti,uguali,
  // non vengono chiamati 2 volte)
  let listaDivIngredients = document.getElementsByClassName('square-button-div');
  for(let i = 0; i < listaDivIngredients.length; i++){
    listaDivIngredients[i].addEventListener('click', addPrezzoIngr);
    listaDivIngredients[i].removeEventListener('click', removePrezzoIngr);
  }

  //azzero il totale del div ingredienti visualizzato all inizio
  document.getElementById('tot-conferma-agg-ingr').innerHTML = 'Totale: 0.00 &euro;';

  document.getElementsByClassName('div-overlay')[0].style.display = 'none';
  document.getElementsByClassName('div-ingredienti')[0].style.display = 'none';

  for(let i = 0; i < listaIdSpanDaNascondere.length; i++){
    let spanCorrente = document.getElementById(listaIdSpanDaNascondere[i]);
    spanCorrente.style.display = 'flex';
    spanCorrente.nextElementSibling.style.display= 'initial'; //è il <br> appena dopo lo span
  }

  listaIdSpanDaNascondere = [];
}

function addPizzaToResoconto(event){
  //titolo h2
  let contenitore = event.currentTarget.parentElement.parentElement;
  let h2Elem = contenitore.firstElementChild;

  let listaSpan = h2Elem.nextElementSibling.getElementsByTagName('span');
  let listaIngredienti = [];
  for(let i = 0; i < listaSpan.length - 1; i++){ //mi fermo alla penultima posizione perchè non voglio
                                                // il testo dello span 'aggiungi ingrediente'
    
      listaIngredienti[i] = listaSpan[i].textContent;
  }

  let prezzo_par = h2Elem.nextElementSibling.getElementsByTagName('p')[0];

  createPizzaDivInResoconto(h2Elem.textContent, listaIngredienti, prezzo_par.textContent);

  //aggiorno il prezzo del costo tot
  let prezzoPizza = parseFloat(prezzo_par.textContent);

  let pCostoTot = document.getElementById('costo-tot');
  let costoTotNumber = parseFloat(pCostoTot.textContent.substring(7));

  costoTotNumber += prezzoPizza;

  //3 operazioni per evitare l errore matematico di conversione di js..
  costoTotNumber *= 10;
  costoTotNumber = Math.round(costoTotNumber);
  costoTotNumber /= 10;

  // se costoTotNumber è intero, aggiungi '.00 &euro;' altimenti, aggiungi '0 &euro;'
  if(costoTotNumber == Math.floor(costoTotNumber)){ //se costoTotNumber è un numero intero
    costoTotNumber = costoTotNumber +'.00 &euro;';

  }else{ //se costoTotNumber è un numero decimale
    costoTotNumber = costoTotNumber +'0 &euro;';
  }

  pCostoTot.innerHTML = 'Totale: '+ costoTotNumber;

}

let idPizze = 0;
function createPizzaDivInResoconto(nomePizza, ingredienti, prezzo){
  
  let div = document.createElement('div');
  div.id = 'div-pizza-'+ idPizze;
  div.classList.add('div-prodotto-resoconto');
  idPizze++;

  let pNomePizza = document.createElement('p');
  pNomePizza.classList.add('nome-prodotto-resoconto');
  pNomePizza.textContent = nomePizza;
  div.appendChild(pNomePizza);

  let pIngredientiPizza = document.createElement('p');
  pIngredientiPizza.classList.add('descrizione-prodotto-resoconto');
  
  let stringaIngredienti = '(';
  for(let i = 0; i < ingredienti.length; i++){
    
    if( i == ingredienti.length -1){
      stringaIngredienti += ingredienti[i]+')'
    }else{
      stringaIngredienti += ingredienti[i]+', '
    }

  }

  pIngredientiPizza.textContent = stringaIngredienti;
  div.appendChild(pIngredientiPizza);

  
  let pPrezzoPizza = document.createElement('p');
  pPrezzoPizza.classList.add('prezzo-prodotto-resoconto');
  pPrezzoPizza.innerHTML = 'prezzo: '+ prezzo;
  div.appendChild(pPrezzoPizza);

  //button script
  let buttonRimuovi = document.createElement('button');
  buttonRimuovi.classList.add('button-rimuovi-resoconto');
  buttonRimuovi.addEventListener('click', rimuoviDiv);

  function rimuoviDiv(){

    //aggiorno il prezzo del costo tot

    let prezzoPizza = parseFloat(prezzo);

    let pCostoTot = document.getElementById('costo-tot');
    let costoTotNumber = parseFloat(pCostoTot.textContent.substring(7));
    costoTotNumber -= prezzoPizza;

    //3 operazioni per evitare l errore matematico di conversione di js..
    costoTotNumber *= 10;
    costoTotNumber = Math.round(costoTotNumber);
    costoTotNumber /= 10;

    // se costoTotNumber è intero, aggiungi '.00 &euro;' altimenti, aggiungi '0 &euro;'
    if(costoTotNumber == Math.floor(costoTotNumber)){ //se costoTotNumber è un numero intero
      costoTotNumber = costoTotNumber +'.00 &euro;';

    }else{ //se costoTotNumber è un numero decimale
      costoTotNumber = costoTotNumber +'0 &euro;';
    }

    pCostoTot.innerHTML = 'Totale: '+ costoTotNumber;

    buttonRimuovi.removeEventListener('click', rimuoviDiv);
    div.parentNode.removeChild(div);

  }

  buttonRimuovi.textContent = 'RIMUOVI';
  div.appendChild(buttonRimuovi);
  //fine button script

  let contenitore = document.getElementById('resoconto-div-pizze');
  contenitore.appendChild(div);
}


function addRusticoToResoconto(event){

  let contenitore = event.currentTarget.parentElement;
  let radioButtons = contenitore.getElementsByTagName('input');

  //se l 'utente non ha selezionato uno dei due radio, questo metodo non deve fare nulla
  let nome= '';
  let descrizione = '';
  let prezzo = '';

  let radioButton1 = radioButtons[0];
  let radioButton2 = radioButtons[1];

  if(radioButton1.checked || radioButton2.checked){
    nome = contenitore.firstElementChild.textContent;

    if(radioButton1.checked){
      let labelText = radioButton1.nextElementSibling.textContent;
      descrizione = labelText.substring(0, labelText.length -9);
      prezzo = labelText.substring(labelText.length -7, labelText.length -3);
      prezzo = parseFloat(prezzo);
    }
    else{
      let labelText = radioButton2.nextElementSibling.textContent;
      descrizione = labelText.substring(0, labelText.length -9);
      prezzo = labelText.substring(labelText.length -7, labelText.length -3);
      prezzo = parseFloat(prezzo);
    }

    createRusticoDivInResoconto(nome, descrizione, prezzo);

    //aggiorno il prezzo del costo tot

    let pCostoTot = document.getElementById('costo-tot');
    let costoTotNumber = parseFloat(pCostoTot.textContent.substring(7));

    costoTotNumber += prezzo;


    //3 operazioni per evitare l errore matematico di conversione di js..
    costoTotNumber *= 10;
    costoTotNumber = Math.round(costoTotNumber);
    costoTotNumber /= 10;

    // se costoTotNumber è intero, aggiungi '.00 &euro;' altimenti, aggiungi '0 &euro;'
    if(costoTotNumber == Math.floor(costoTotNumber)){ //se costoTotNumber è un numero intero
      costoTotNumber = costoTotNumber +'.00 &euro;';

    }else{ //se costoTotNumber è un numero decimale
      costoTotNumber = costoTotNumber +'0 &euro;';
    }

    pCostoTot.innerHTML = 'Totale: '+ costoTotNumber;

  }

}

let idRustici = 0;
function createRusticoDivInResoconto(nomeRustico, descrizione, prezzo){

  let div = document.createElement('div');
  div.id = 'div-rustico-'+ idRustici;
  div.classList.add('div-prodotto-resoconto');
  idRustici++;

  let pNomeRustico = document.createElement('p');
  pNomeRustico.classList.add('nome-prodotto-resoconto');
  pNomeRustico.textContent = nomeRustico;
  div.appendChild(pNomeRustico);

  let pDescrizioneRustico = document.createElement('p');
  pDescrizioneRustico.classList.add('descrizione-prodotto-resoconto');
  pDescrizioneRustico.textContent = descrizione;
  div.appendChild(pDescrizioneRustico);

  let pPrezzoRustico = document.createElement('p');
  pPrezzoRustico.classList.add('prezzo-prodotto-resoconto');
  
  if(prezzo == Math.floor(prezzo)){ //se prezzo è un numero intero
    prezzo = prezzo +'.00 &euro;';

  }else{ //se prezzo è un numero decimale
    prezzo = prezzo +'0 &euro;';
  }

  pPrezzoRustico.innerHTML ='Prezzo: '+ prezzo;
  div.appendChild(pPrezzoRustico);

  let buttonRimuovi = document.createElement('button');
  buttonRimuovi.classList.add('button-rimuovi-resoconto');
  buttonRimuovi.addEventListener('click', rimuoviDiv);

  function rimuoviDiv(){

    //aggiorno il prezzo del costo tot
    let prezzoRustico = parseFloat(prezzo);

    let pCostoTot = document.getElementById('costo-tot');
    let costoTotNumber = parseFloat(pCostoTot.textContent.substring(7));
    costoTotNumber -= prezzoRustico;

    //3 operazioni per evitare l errore matematico di conversione di js..
    costoTotNumber *= 10;
    costoTotNumber = Math.round(costoTotNumber);
    costoTotNumber /= 10;

    // se costoTotNumber è intero, aggiungi '.00 &euro;' altimenti, aggiungi '0 &euro;'
    if(costoTotNumber == Math.floor(costoTotNumber)){ //se costoTotNumber è un numero intero
      costoTotNumber = costoTotNumber +'.00 &euro;';

    }else{ //se costoTotNumber è un numero decimale
      costoTotNumber = costoTotNumber +'0 &euro;';
    }

    pCostoTot.innerHTML = 'Totale: '+ costoTotNumber;

    buttonRimuovi.removeEventListener('click', rimuoviDiv);
    div.parentNode.removeChild(div);

  }

  buttonRimuovi.textContent = 'RIMUOVI';
  div.appendChild(buttonRimuovi);
  //fine button script

  let contenitore = document.getElementById('resoconto-div-rustici');
  contenitore.appendChild(div);

}

function addBevandaToResoconto(event){

  let contenitore = event.currentTarget.parentElement;
  
  let nome= '';
  let prezzo = '';

  nome = contenitore.firstElementChild.textContent;

  let prezzoPar = contenitore.getElementsByTagName('p')[0];
  prezzo = parseFloat(prezzoPar.textContent);


  createBevandaDivInResoconto(nome, prezzo);

  let pCostoTot = document.getElementById('costo-tot');
  let costoTotNumber = parseFloat(pCostoTot.textContent.substring(7));

  costoTotNumber += prezzo;


  //3 operazioni per evitare l errore matematico di conversione di js..
  costoTotNumber *= 10;
  costoTotNumber = Math.round(costoTotNumber);
  costoTotNumber /= 10;

  // se costoTotNumber è intero, aggiungi '.00 &euro;' altimenti, aggiungi '0 &euro;'
  if(costoTotNumber == Math.floor(costoTotNumber)){ //se costoTotNumber è un numero intero
    costoTotNumber = costoTotNumber +'.00 &euro;';

  }else{ //se costoTotNumber è un numero decimale
    costoTotNumber = costoTotNumber +'0 &euro;';
  }

  pCostoTot.innerHTML = 'Totale: '+ costoTotNumber;
}

let idBevande = 0;
function createBevandaDivInResoconto(nomeBevanda, prezzo){

  let div = document.createElement('div');
  div.id = 'div-bevanda-'+ idBevande;
  div.classList.add('div-prodotto-resoconto');
  idBevande++;

  let pNomeBevanda = document.createElement('p');
  pNomeBevanda.classList.add('nome-prodotto-resoconto');
  pNomeBevanda.textContent = nomeBevanda;
  div.appendChild(pNomeBevanda);

  let pPrezzoBevanda = document.createElement('p');
  pPrezzoBevanda.classList.add('prezzo-prodotto-resoconto');
  
  if(prezzo == Math.floor(prezzo)){ //se prezzo è un numero intero
    prezzo = prezzo +'.00 &euro;';

  }else{ //se prezzo è un numero decimale
    prezzo = prezzo +'0 &euro;';
  }

  pPrezzoBevanda.innerHTML ='Prezzo: '+ prezzo;
  div.appendChild(pPrezzoBevanda);

  let buttonRimuovi = document.createElement('button');
  buttonRimuovi.classList.add('button-rimuovi-resoconto');
  buttonRimuovi.addEventListener('click', rimuoviDiv);

  function rimuoviDiv(){

    //aggiorno il prezzo del costo tot
    let prezzoBevanda = parseFloat(prezzo);

    let pCostoTot = document.getElementById('costo-tot');
    let costoTotNumber = parseFloat(pCostoTot.textContent.substring(7));
    costoTotNumber -= prezzoBevanda;

    //3 operazioni per evitare l errore matematico di conversione di js..
    costoTotNumber *= 10;
    costoTotNumber = Math.round(costoTotNumber);
    costoTotNumber /= 10;

    // se costoTotNumber è intero, aggiungi '.00 &euro;' altimenti, aggiungi '0 &euro;'
    if(costoTotNumber == Math.floor(costoTotNumber)){ //se costoTotNumber è un numero intero
      costoTotNumber = costoTotNumber +'.00 &euro;';

    }else{ //se costoTotNumber è un numero decimale
      costoTotNumber = costoTotNumber +'0 &euro;';
    }

    pCostoTot.innerHTML = 'Totale: '+ costoTotNumber;

    buttonRimuovi.removeEventListener('click', rimuoviDiv);
    div.parentNode.removeChild(div);

  }

  buttonRimuovi.textContent = 'RIMUOVI';
  div.appendChild(buttonRimuovi);
  //fine button script

  let contenitore = document.getElementById('resoconto-div-bevande');
  contenitore.appendChild(div);

}