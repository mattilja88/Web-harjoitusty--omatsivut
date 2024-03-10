// luodaan muuttujat ja tarvittavat listat
let tanaanLista = []
let huomennaLista = []
let ylihuomennaLista = []
let x = 0
let a = 0
// haetaan html-tiedostosta tarvittavat kohdat joihin lisätään tietoa
const pvmTanaan = document.querySelector(".pvm-tänään")
const saaTanaan = document.querySelector(".säähavainnot-tänään")
const pvmHuomenna = document.querySelector(".pvm-huomenna")
const saaHuomenna = document.querySelector(".säähavainnot-huomenna")
const pvmYlihuomenna = document.querySelector(".pvm-ylihuomenna")
const saaYlihuomenna = document.querySelector(".säähavainnot-ylihuomenna")

// haetaan sijainti säähavaintoja varten
const getLocation = () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            getWeather(position.coords.latitude, position.coords.longitude)
        }),(error => {
            alert(error)
        })
    } else {
        alert("Your browser does not support geolocation")
    }
}

// käytetään openwatheria, joka hakee myös sääennustuksia
const url = 'https://api.openweathermap.org/data/2.5/forecast?'
const api_key = "" // lisää tähän api-avain
let saaObjektiLista = []

const getWeather = (lat, lng) => {
    const address = url + 
    'lat=' + lat +
    '&lon=' + lng +
    '&units=metric' + 
    '&appid=' + api_key
    axios.get(address)
        .then(response => {
            const json = response.data
            // sääennustuksia on json-tiedostossa listana, joten haetaan 40 ensimmäistä. 
            for (let i = 0; i < 40; i++){
                const tanaan = viikonPaivaksi(json.list[i].dt)
                const lampo = json.list[i].main.temp.toFixed(1)
                const tuuli = json.list[i].wind.speed.toFixed(1)
                let objekti = { päivä: tanaan.paiva, kello: tanaan.kellonAika, lämpötila: lampo, tuuli: tuuli, pvm: tanaan.pvm+'.'+tanaan.kk }
                saaObjektiLista.push(objekti)
            }
            // kutsutaan funktiot
            pvmListat()
            lisaaTekstit()
        }).catch(error => {
            alert(error)
        })
}

// tämä muuttaa weatherapin unixTimestampin päiviksi, kellonajaksi, kuukaudeksi ja päivämääräksi
function viikonPaivaksi(unixTimestamp) {
    const milliseconds = unixTimestamp * 1000;
    const date = new Date(milliseconds);
    const dayOfWeek = date.getUTCDay();
    const weekdays = ['sunnuntai', 'maanantai', 'tiistai', 'keskiviikko', 'torstai', 'perjantai', 'lauantai'];
    const paiva = weekdays[dayOfWeek];
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const kellonAika = `${hours}:${minutes}`
    const kk = date.getMonth() + 1;
    const pvm = date.getDate();

    return {paiva, kellonAika, kk, pvm }
}

// tässä on listaiterointihirviö funktiona, jolla rakensin päivämäärät näkyviin. Funktio kutsutaan getWeatherissa
const pvmListat = () => {
    for (let i = 0; i < 40; i++){
        if (i > 0 && saaObjektiLista[i].päivä !=saaObjektiLista[0].päivä ){
            if (x >= 8){
                while (a < 8){
                    ylihuomennaLista.push(saaObjektiLista[i].päivä)
                    ylihuomennaLista.push(saaObjektiLista[i].pvm)
                    ylihuomennaLista.push(saaObjektiLista[i].kello)
                    ylihuomennaLista.push(saaObjektiLista[i].lämpötila)
                    ylihuomennaLista.push(saaObjektiLista[i].tuuli)
                    a++
                    i++
                }
            }
            while (x < 8){
                huomennaLista.push(saaObjektiLista[i].päivä)
                huomennaLista.push(saaObjektiLista[i].pvm)
                huomennaLista.push(saaObjektiLista[i].kello)
                huomennaLista.push(saaObjektiLista[i].lämpötila)
                huomennaLista.push(saaObjektiLista[i].tuuli)
                x++
                if (x<8){
                    i++
                }
                
            }
        }
        if (saaObjektiLista[i].päivä == saaObjektiLista[0].päivä){
            tanaanLista.push(saaObjektiLista[i].päivä)
            tanaanLista.push(saaObjektiLista[i].pvm)
            tanaanLista.push(saaObjektiLista[i].kello)
            tanaanLista.push(saaObjektiLista[i].lämpötila)
            tanaanLista.push(saaObjektiLista[i].tuuli)
        }
    }

    console.log(tanaanLista)
    console.log(huomennaLista)
    console.log(ylihuomennaLista)
}

// tämä lisää päivämäärän säätietolistan tiedot tekstiksi, jotka voidiin sitten sijoittaa html-dokumenttiin
const lisaaTekstit = () => {
    let tekstiTanaan = ''
    for (let i = 0; i<tanaanLista.length; i++){
        pvmTanaan.innerHTML = tanaanLista[0] + ' ' + tanaanLista[1]+'<br><br>'
        if (tanaanLista[i] != tanaanLista[0] && tanaanLista[i] != tanaanLista[1]){
            tekstiTanaan += tanaanLista[i] + ' Lämpötila: ' + tanaanLista[i+1] + '&#8451; Tuuli: ' + tanaanLista[i+2]+'m/s<br><br>'
            i+=2
        }
    }
    console.log(tekstiTanaan)
    saaTanaan.innerHTML = tekstiTanaan
    let tekstiHuomenna = ''
    for (let i = 0; i<huomennaLista.length; i++){
        pvmHuomenna.innerHTML = huomennaLista[0] + ' ' + huomennaLista[1]+'<br><br>'
        if (huomennaLista[i] != huomennaLista[0] && huomennaLista[i] != huomennaLista[1]){
            tekstiHuomenna += huomennaLista[i] + ' Lämpötila: ' + huomennaLista[i+1] + '&#8451; Tuuli: ' + huomennaLista[i+2] +'m/s<br><br>'
            i+=2
        }
    }
    saaHuomenna.innerHTML = tekstiHuomenna
    console.log(tekstiHuomenna)
    let tekstiYlihuomenna = ''
    for (let i = 0; i<ylihuomennaLista.length; i++){
        pvmYlihuomenna.innerHTML = ylihuomennaLista[0] + ' ' + ylihuomennaLista[1]+'<br><br>'
        if (ylihuomennaLista[i] != ylihuomennaLista[0] && ylihuomennaLista[i] != ylihuomennaLista[1]){
            tekstiYlihuomenna += ylihuomennaLista[i] + ' Lämpötila: ' + ylihuomennaLista[i+1] + '&#8451; Tuuli: ' + ylihuomennaLista[i+2]+'m/s<br><br>'
            i+=2
        }
    }
    console.log(tekstiYlihuomenna)
    saaYlihuomenna.innerHTML = tekstiYlihuomenna
}

// kutsutaan lopussa getLocation funktiota, jonka sisällä on muita funktioita
getLocation()