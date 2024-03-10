import { Square } from "./square.js"

// Muuttujat
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext('2d')
ctx.fillStyle = 'lightblue'
ctx.fillRect(0, 0, canvas.width, canvas.height)
let ristikkolista = []
let sanaSelitysLista = []
let pisin = ''
let sanat = ''
let kaikkisanat_lista = []
let pystyt= 'Paina "muodosta rivi" ja valitse näistä pystysana:<br>'
let indeksit = []
let kerroin = 1
let ristikkolista_kopio = []
let pisin_pituus = 0
let placeholder_nro = 1

// lisää enterillä halutut sanat ristikkoon
document.querySelector('#sanaselitys').addEventListener('keypress', (e) => {
    const sana = document.querySelector('#sana')
    const sana_selitys = document.querySelector('#sanaselitys')
    if (e.keyCode === 13){
        kerroin *= sana.value.length
        console.log(kerroin)
        ristikkolista.push(sana.value.toLowerCase())
        sanaSelitysLista.push(sana_selitys.value)
        console.log(ristikkolista)
        sanat += sana.value + ' '
        document.querySelector("#kaikkisanat").innerHTML = sanat
        if (sana.value.length > pisin.length){
            pisin = sana.value
        }
        sana.value = ''
        sana.focus()
        sana_selitys.value = ''
        pisin_pituus = pisin.length
        placeholder_nro++
        document.querySelector('#sana').placeholder = placeholder_nro + '. sana'
        document.querySelector('#sanaselitys').placeholder = placeholder_nro + '. sanan selitys'
        console.log(ristikkolista.length)
    }
})


// tämä koodi muodostaa mahdolliset pystyrivit
let x = 0;
document.querySelector("#muodosta_rivi").addEventListener('click', () =>{
    let apulista = [];
    let apulista2 = [];
    console.log(kaikkisanat_lista)
    for (let sana of kaikkisanat_lista[ristikkolista.length - 1]) {
        for (let kirjain of ristikkolista[0]) {
            if (kirjain === sana[0]) {
                apulista.push(sana);
            }
        }
    }
    apulista = Array.from(new Set(apulista));
    
    let x = 1;
    for (let i = 0; i < ristikkolista.length; i++) {
        try {
            for (let kirjain of ristikkolista[i + 1]) {
                for (let sana of apulista) {
                    if (kirjain === sana[x]) {
                        apulista2.push(sana);
                    }
                }
            }
            apulista = apulista2.slice();
            apulista2 = [];
            x++;
        } catch (error) {
        }
    }
    
    apulista = Array.from(new Set(apulista));

    for (let i in apulista){
        pystyt += apulista[i] + ' '
    }
    document.querySelector("#pystysanat").innerHTML = pystyt
    
    console.log(apulista)
})

// tehdään sekoitusfunktio, joka sekoittaa nimilistan ja niille annettavat vihjeet samassa suhteessa.
// tätä tarvitaan, mikäli ei olla tyytyväisiä ensimmäiseen funktioon. 
function shuffleTwoLists(list1, list2) {
    let combinedList = [];
    for (let i = 0; i < Math.min(list1.length, list2.length); i++) {
        combinedList.push([list1[i], list2[i]]);
    }

    for (let i = combinedList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [combinedList[i], combinedList[j]] = [combinedList[j], combinedList[i]];
    }

    let shuffledList1 = [];
    let shuffledList2 = [];
    for (let pair of combinedList) {
        shuffledList1.push(pair[0]);
        shuffledList2.push(pair[1]);
    }

    return [shuffledList1, shuffledList2];
}
 
// halutaan tehdä ristikko uudestaa, koska ensimmäiseen ei oltu tyytyväisiä  
document.querySelector("#sekoita_ristikko").addEventListener('click', ()=>{
    ristikko_truefalse = []
    document.querySelector("#pystysana").value = ""
    if (ristikkolista.length == ristikkolista_kopio.length){
        ristikkolista = ristikkolista_kopio.slice()
    }
    indeksit = []           // pyyhitään vanhat indeksit, jotta ristikko on oikein muotoiltu
    let [sekoitettu1, sekoitettu2] = shuffleTwoLists(ristikkolista, sanaSelitysLista)
    ristikkolista = sekoitettu1
    sanaSelitysLista = sekoitettu2
    console.log(ristikkolista, sanaSelitysLista)  // sekoitetaan sanat funktion avulla
    document.querySelector("#pystysanat").innerHTML = ""
    pystyt = ""
    document.querySelector("#tähän").innerHTML = ""
    ristikko = ""
    let apulista = [];
    let apulista2 = [];
    for (let sana of kaikkisanat_lista[ristikkolista.length - 1]) {
        for (let kirjain of ristikkolista[0]) {
            if (kirjain === sana[0]) {
                apulista.push(sana);
            }
        }
    }
    apulista = Array.from(new Set(apulista));
    
    let x = 1;
    for (let i = 0; i < ristikkolista.length; i++) {
        try {
            for (let kirjain of ristikkolista[i + 1]) {
                for (let sana of apulista) {
                    if (kirjain === sana[x]) {
                        apulista2.push(sana);
                    }
                }
            }
            apulista = apulista2.slice();
            apulista2 = [];
            x++;
        } catch (error) {
        }
    }
    
    apulista = Array.from(new Set(apulista));

    for (let i in apulista){
        pystyt += apulista[i] + ' '
    }
    document.querySelector("#pystysanat").innerHTML = pystyt
    
})

// tämä muodostaa ristikon tekstiksi
let suurinIndeksi = 0
let keskitys = 0
let ristikko = ""
let ristikko_truefalse = []
document.querySelector("#ristikko").addEventListener('click', () =>{
    suurinIndeksi = 0
    const valinta = document.querySelector("#pystysana").value.toLowerCase()
    ristikkolista_kopio = ristikkolista.slice()
    for (let i = 0; i < ristikkolista.length; i++){
        try{
            const indeksi = ristikkolista[i].indexOf(valinta[i])
            if (indeksi>suurinIndeksi){
                suurinIndeksi=indeksi
            }
            indeksit.push(indeksi)
            let str = ristikkolista[i]
            let strArray = str.split("")
            strArray[indeksi] = "|"+valinta[i]+"|"
            str = strArray.join("")
            ristikkolista[i] = str
        }
        catch{
            continue
        } 
    }
    for (let i = 0; i < ristikkolista.length; i++){
        let sana_truefalse = []
        let ristikko_sana = ''
        for (let a = 0; a < (suurinIndeksi-indeksit[i]); a++){
            ristikko_sana += '&nbsp'
            sana_truefalse.push(0)
        }
        for (let u = 0; u < ristikkolista[i].length; u++){
            if (ristikkolista[i][u] === "|" && ristikkolista[i][u+2] === "|"){
                sana_truefalse.push(1)
                u+=2
                continue
            }
            if (ristikkolista[i][u] === " "){
                sana_truefalse.push(2)
            } else {
                sana_truefalse.push(3)
            }
            
        }
        ristikko_sana += ristikkolista[i]+'<br>'
        ristikko += ristikko_sana
        ristikko_truefalse.push(sana_truefalse)
        if (sana_truefalse.length > keskitys){
            keskitys = sana_truefalse.length
        }
    }
    document.querySelector("#tähän").innerHTML = ristikko
    console.log(ristikko_truefalse)
})

// funktio, jonka avulla piirretään neliöitä ristikkoa varten
const drawSquare = (sijainti_x, sijainti_y, koko, color, leveys, taytto) => {
    const x = sijainti_x
    const y = sijainti_y
    const height = koko
    const vari = color
    const lineWidth = leveys
    const fillColor = taytto
    const square = new Square(x,y,height,vari, lineWidth, fillColor)
    square.setLineWidth = lineWidth
    square.draw(ctx)
}

// tämä luo tyhjän ristikon valmiiksi täytettäväksi
document.querySelector("#tyhjäristikko").addEventListener('click', () => {
    
    let leveys = 2
    let naytonLeveys = window.innerWidth
    canvas.width = 768
    canvas.height = window.innerHeight
    let koko = (canvas.width-150)/(keskitys)
    if (koko > 40){
        koko = 40
    }
    ctx.fillStyle = '#F9F1F0'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    console.log(naytonLeveys)
    if (naytonLeveys <= 600){
        canvas.width = naytonLeveys
        koko = (canvas.width-100)/keskitys
        leveys = 1
    }
    let x = canvas.width/2 - (keskitys*koko)/2
    let y = 50
    let valkoinen = "#F9F1F0"
    let musta = "#000000"

    // tässä ristikko_truefalse-listasta etsitään arvo
    for (let alkio of ristikko_truefalse){
        for(let totuus of alkio){
            if (totuus === 0 ){ // Tehdään valkoinen ruutu, joka näkyy tyhjänä tilana
                drawSquare(x,y,koko, valkoinen,leveys, valkoinen)
            }  if (totuus ===2) { // tehdään musta ruutu, mikäli sanassa on välilyönti
                drawSquare(x,y,koko, musta,leveys, musta)
            } if (totuus ===3) { // tehdään tyhjä ruutu mustilla reunoilla kirjtainta varte
                drawSquare(x,y,koko, musta,leveys, valkoinen)
            } if (totuus === 1) { // paksumpi ruutu keskelle muodostuvaa sanaa varten
                drawSquare(x,y,koko, musta,(leveys+5), valkoinen)
                x+= leveys
            }
            x += koko + leveys
        }
        x = canvas.width/2 - (keskitys*koko)/2
        y += koko + leveys
    }
    y += koko + leveys
    let nro = 1
    for (let alkio of sanaSelitysLista){
        if (koko < 20){
            ctx.font = koko + "px Arial"
        } else {
            ctx.font = "20px Arial"
        }
        ctx.fillStyle = "black"
        ctx.fillText(nro.toString() + '. ' + alkio, (canvas.width/2-ctx.measureText(alkio).width/2), y)
        y += koko + leveys
        nro++
        console.log("alkion pituus: " + ctx.measureText(alkio).width)
    }
})

// muodostetaan valmiista ristikosta kuva
const downloadBtn = document.getElementById('downloadBtn');
downloadBtn.addEventListener('click', () => {

    canvas.width = 768
    canvas.height = 1097
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    let leveys = 2
    let koko = (canvas.width-150)/(keskitys)
        if (koko > 40){
        koko = 40
    }
    console.log(suurinIndeksi)
    console.log("keskitys : " + keskitys)
    console.log("koko : "+koko)
    console.log("näytön leveys : " + canvas.width)
    console.log("keskitys*koko : " + keskitys*koko)
    
    let x = (canvas.width/2 - (keskitys*koko)/2)-30
    let y = 100
    let valkoinen = "#ffffff"
    let musta = "#000000"
    for (let alkio of ristikko_truefalse){
        for(let totuus of alkio){
            if (totuus === 0 ){
                drawSquare(x,y,koko, valkoinen,leveys, valkoinen)
            }  if (totuus ===2) {
                drawSquare(x,y,koko, musta,leveys, musta)
            } if (totuus ===3) {
                drawSquare(x,y,koko, musta,leveys, valkoinen)
            } if (totuus === 1) {
                drawSquare(x,y,koko, musta,(leveys+5), valkoinen)
                x+= 2
            }
            x += koko + leveys
        }
        x = (canvas.width/2 - (keskitys*koko)/2)-30
        y += koko + leveys
    }
    y += koko + leveys
    let nro = 1
    for (let alkio of sanaSelitysLista){
        ctx.font = "20px Arial"
        ctx.fillStyle = "black"
        ctx.fillText(nro.toString() + '. ' + alkio, (canvas.width/2-ctx.measureText(alkio).width/2), y)
        y += koko + leveys
        nro++
    }
    const dataURL = canvas.toDataURL('image/png')
    // Luo linkin
    const link = document.createElement('a')
    link.download = 'ristikko.png'
    link.href = dataURL 
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
})

// Funktiot linkin käsittelyä varten. Nämä 
function fetchXML(url) {
    return fetch(url)
        .then(response => response.text())
        .then(xmlData => {
            const parser = new DOMParser()
            const xmlDoc = parser.parseFromString(xmlData, 'text/xml')
            return xmlDoc;
        })
}

function extractWords(xmlDoc) {
    const sElements = xmlDoc.querySelectorAll('s')
    const wordsList = Array.from(sElements, sElement => sElement.textContent)
    return wordsList
}

// Tässä edellämuodostettujen funktioiden avulla tehdään netistä ladatun xml-tiedostosta kaikkien sanojenlista
// Tämä on tavallaan koko sovelluksen ydin, koska se hakee ehdolle yli 90000 suomenkielisestä sanasta, miten muodostetaan pystysana
const xmlURL = './xml/kotus-sanalista_v1.xml'
fetchXML(xmlURL)
    .then(xmlDoc => {
        const wordsList = extractWords(xmlDoc);
        console.log(wordsList);
        for (let i = 0; i <15; i++) {
            let list = []
            for (let sana in wordsList) {
                if (wordsList[sana].length == i+1){
                    list.push(wordsList[sana])
                }
            }
            kaikkisanat_lista.push(list)
        }
        console.log(kaikkisanat_lista)
    })
    .catch(error => {
        console.error('Error fetching or parsing XML:', error)
    })

