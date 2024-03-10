import { Square } from "./Square.js"

// luodaan tarvittavia muuttujia. 
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext('2d')
let riviLista = []
let sanaRuudukko = []
let sanaLista = []
let meniRistikkoon = []
let kaikkiSanat = ""
let rivin_pituus = 0
let sarakkeen_pituus = 0
let apuTeksti = ""

const asetaRivit = () => {
    for (let i = 0; i < rivit.value ; i++){
        riviLista.push('*')
    }
    document.querySelector('#rivittekstinä').innerHTML = 'Rivit: ' + rivit.value
    rivin_pituus = rivit.value
    rivit.value = ""
    document.querySelector("#sarakkeet").focus() 
}

const asetaSarakkeet = () => {
    for (let i = 0; i < sarakkeet.value ; i++){
        sanaRuudukko.push([...riviLista])
    }
    document.querySelector('#sarakkeettekstinä').innerHTML = 'Sarakkeet: ' + sarakkeet.value
    sarakkeen_pituus = sarakkeet.value
    sarakkeet.value = ""
    document.querySelector("#sana").focus()
    console.log(sanaRuudukko)
}

// tällä luodaan sanasokkelon rivien määrät
document.querySelector("#rivit").addEventListener('keydown', (e) => {
    const rivit = document.querySelector("#rivit")
    if (e.key === "Tab" || e.key === "Enter") {
        asetaRivit()
    }
})

// tällä luodaan sarakkeiden määrät
document.querySelector("#sarakkeet").addEventListener('keydown', (e) => {
    const sarakkeet = document.querySelector("#sarakkeet")
    if (e.key === "Tab" || e.key === "Enter") {
        asetaSarakkeet()
    }
})

document.querySelector("#aseta-rivit").addEventListener('click', ()=>{
    const rivit = document.querySelector("#rivit")
    asetaRivit()
})

document.querySelector("#aseta-sarakkeet").addEventListener('click', ()=>{
    const sarakkeet = document.querySelector("#sarakkeet")
    asetaSarakkeet()
})

// Luodaan sanat, jotka halutaan piikottaa sanasokkeloon. 
document.querySelector("#sana").addEventListener('keypress', (e) => {
    const sana = document.querySelector("#sana")
    if (e.keyCode === 13) {
        if (sana.value.length > riviLista.length || sana.value.length > sanaRuudukko.length){
            alert("sana on liian pitkä...")
        } else {
            sanaLista.push(sana.value.toUpperCase())
            kaikkiSanat += sana.value + " "
            document.querySelector('#kaikkisanat').innerHTML = kaikkiSanat
        }
        sana.value = ""
        sana.focus()
        console.log(sanaLista)
    }
})

// funktio neliöiden piirtämiseen
const drawSquare = (sijainti_x, sijainti_y, koko, color, leveys, taytto, teksti) => {
    const x = sijainti_x
    const y = sijainti_y
    const height = koko
    const vari = color
    const lineWidth = leveys
    const fillColor = taytto
    const text = teksti
    const square = new Square(x,y,height,vari,lineWidth,fillColor,text)
    square.setLineWidth = lineWidth
    square.draw(ctx)
}

// valmistetaan sanaristikko. 
document.querySelector('#valmista').addEventListener('click', () => {
    for (const sana of sanaLista) {
        // arvotaan, laitetaanko sana pystyyn vai vaakaan
        const valinta = Math.floor(Math.random() * 2) + 1
        let yritykset = 0
        // vaakarivit
        if (valinta === 1) {
            while (yritykset < 1000000) {
                yritykset++
                const satunnainenRivipaikka = Math.floor(Math.random() * (rivin_pituus - sana.length));
                const satunnainenRivi = Math.floor(Math.random() * sarakkeen_pituus);
                let voikoSijoittaa = false;
                
                // sana sijoitetaan vain, mikäli ruudun paikalla on merkki '*'
                if (sanaRuudukko[satunnainenRivi][satunnainenRivipaikka] === "*" || sanaRuudukko[satunnainenRivi][satunnainenRivipaikka] === sana[0]) {
                    let x = 0;
    
                    for (const kirjain of sana) {
                        // testataan, ovatko muut ruudut vapaana joko siten, että kirjain on aiemmasta sanasta sama, tai siinä on merkki '*'
                        if (sanaRuudukko[satunnainenRivi][satunnainenRivipaikka + x] === kirjain || sanaRuudukko[satunnainenRivi][satunnainenRivipaikka + x] === "*") {
                            voikoSijoittaa = true;
                        } else {
                            voikoSijoittaa = false;
                            break;
                        }
                        x++;
                    }
    
                    x = 0;
                    if (voikoSijoittaa) {
                        for (const kirjain of sana) {
                            sanaRuudukko[satunnainenRivi][satunnainenRivipaikka + x] = kirjain;
                            x++;
                        }
                        meniRistikkoon.push(sana)
                        break;
                    }
                }
            }
        }
        // pystyrivit. Sama ajatus kuin vaakarivissä.
        if (valinta === 2) {
            while (yritykset < 1000000) {
                yritykset++
                const satunnainenRivipaikka = Math.floor(Math.random() * rivin_pituus);
                const satunnainenRivi = Math.floor(Math.random() * (sarakkeen_pituus - sana.length));
                let voikoSijoittaa = false;
    
                if (sanaRuudukko[satunnainenRivi][satunnainenRivipaikka] === "*" || sanaRuudukko[satunnainenRivi][satunnainenRivipaikka] === sana[0]) {
                    let x = 0;
    
                    for (const kirjain of sana) {
                        if (sanaRuudukko[satunnainenRivi + x][satunnainenRivipaikka] === kirjain || sanaRuudukko[satunnainenRivi + x][satunnainenRivipaikka] === "*") {
                            voikoSijoittaa = true;
                        } else {
                            voikoSijoittaa = false;
                            break;
                        }
                        x++;
                    }
    
                    x = 0;
    
                    if (voikoSijoittaa) {
                        for (const kirjain of sana) {
                            sanaRuudukko[satunnainenRivi + x][satunnainenRivipaikka] = kirjain;
                            x++;
                        }
                        meniRistikkoon.push(sana)
                        break;
                    }
                }
            }
        }
    }

    // Lisätään tyhjiin paikkoihin satunnainen kirjain, ja kaikki kirjaimet muutetaan isoiksi
    const kirjaimet = "abcdefghijklmnopqrstywxyzåäö";
    for (let i = 0; i < sarakkeen_pituus; i++) {
        for (let a = 0; a < rivin_pituus; a++) {
            if (sanaRuudukko[i][a] === "*") {
                const randomIndex = Math.floor(Math.random() * kirjaimet.length);
                sanaRuudukko[i][a] = kirjaimet[randomIndex].toUpperCase()
            }
        }
    }

    // luodaan muuttujia canvasin piirtoa varten ja kutsutaan aiempaa funktiota, joten sanasokkelo on valmis
    let x = 10
    let y = 10
    let koko = 40
    let viivanVari = "black"
    let viivanPaksuus = 2
    let tayttoVari = "white"
    canvas.width = rivin_pituus*koko +50
    canvas.height = sarakkeen_pituus*koko +50
    for (let i = 0; i < sarakkeen_pituus; i++) {
        for (let a = 0; a < rivin_pituus; a++) {
            drawSquare(x,y,koko,viivanVari,viivanPaksuus,tayttoVari,sanaRuudukko[i][a])
            x += koko 
        }
        y += koko
        x = 10
    }

    console.log(sanaRuudukko)
    console.log(meniRistikkoon)
    let eiMahtunut = sanaLista.filter(item => !meniRistikkoon.includes(item));
    console.log(eiMahtunut)
    if (eiMahtunut.length > 0) {
        alert("Ristikkoon ei saatu sijoitettua seuraavia: " + eiMahtunut.toString())
    }
    
})

// tässä koodipätkä, että jos valitaan radio-buttonista ohjeet sanasokkelon tekijälle
let apuTekstiLista = []
const radioNapit = document.querySelectorAll('input[name=avut]')
const output = document.getElementById('saate');
radioNapit.forEach(button => {
    button.addEventListener('change', function() {
        if (this.checked) {
            const arvo = this.value

            if (arvo === '0') {
                apuTekstiLista = []
                apuTeksti = "Etsi mahdollisimman monta sanaa."
                apuTekstiLista.push(apuTeksti)
            } else if ( arvo === '1') {
                apuTekstiLista = []
                apuTeksti = "Etsi " + meniRistikkoon.length + " sanaa."
                apuTekstiLista.push(apuTeksti)
            } else if (arvo === '2') {
                apuTekstiLista = []
                apuTeksti = "Etsi seuraavat sanat: "
                apuTekstiLista.push(apuTeksti)
                apuTeksti = ""
                let x = 1;
                for (let sana of meniRistikkoon){
                    apuTeksti += sana + "  "
                    if (x%5 == 0){
                        apuTekstiLista.push(apuTeksti)
                        apuTeksti = ""
                    }
                    x += 1
                }
                apuTekstiLista.push(apuTeksti)
            }
        }
        let lause = ""
        for (let sana of apuTekstiLista){
            lause += sana + ' '
        }
        output.textContent = lause
    })
})

// muodostetaan valmiista ristikosta kuva
const downloadBtn = document.getElementById('downloadBtn');
downloadBtn.addEventListener('click', () => {

    canvas.width = 768
    canvas.height = 1097
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    let koko = 40
    if (rivin_pituus >10) {
        koko = (canvas.width-100)/rivin_pituus
    }
    let aloitaPiirto = canvas.width/2-rivin_pituus*koko/2
    let x = aloitaPiirto
    let y = 50
    let viivanVari = "black"
    let viivanPaksuus = 2
    let tayttoVari = "white"
    
    ctx.font = "30px Arial"
    ctx.fillStyle = "black"
    let otsikko = "SANASOKKELO"
    ctx.fillText("SANASOKKELO", canvas.width/2-ctx.measureText(otsikko).width/2, y)
    y += 35
    ctx.font = "15px Arial"
    for (let lause of apuTekstiLista){
        ctx.fillText(lause, canvas.width/2-ctx.measureText(lause).width/2, y)
        y += 20
    }    
    
    y += koko
    for (let i = 0; i < sarakkeen_pituus; i++) {
        for (let a = 0; a < rivin_pituus; a++) {
            drawSquare(x,y,koko,viivanVari,viivanPaksuus,tayttoVari,sanaRuudukko[i][a])
            x += koko 
        }
        y += koko
        x = aloitaPiirto
    }
    // Tekee canvasista kuvan
    const dataURL = canvas.toDataURL('image/png');

    // Luo linkin
    const link = document.createElement('a');
    link.download = 'etsi-sanat.png';
    link.href = dataURL; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
})