// luodaan muuttujia alussa
let oppilasLista = []
let i = 1
let luokatLista = []

// Funktio, joka tekee radioInputteja sen verran, kuinka paljon ladataan luokkia localStoragesta
function createRadioInputs(maara) {
    var radioContainer = document.getElementById('valikko')

    for (var i = 0; i < maara; i++) {
      var newRadioInput = document.createElement('input')
      newRadioInput.type = 'radio'
      newRadioInput.name = 'luokka'
      newRadioInput.value = 'newValue' + i
      newRadioInput.id = i.toString()
      radioContainer.appendChild(newRadioInput)
      var spanText = document.createElement('span')
      spanText.textContent = 'Luokka ' + (i+1)
      radioContainer.appendChild(spanText)
      radioContainer.appendChild(document.createElement('br'))
    }
}

// tämä hakee localStorageen tallennetut luokat ja tekee funktiolla niistä radioInputteja
let luokkienMaara = 0
for (let i = 1; i <= 10; i++) {
    let valiMuistiLista = localStorage.getItem('luokka' + i.toString());
    if (valiMuistiLista) {
        luokkienMaara++
        let muokattuLista = JSON.parse(valiMuistiLista);
        luokatLista.push(muokattuLista)
    }
}
createRadioInputs(luokkienMaara)

console.log(luokatLista)

// funktio listan sekoittamista varten. Pohja haettu internetistä...
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) { 
   
        var j = Math.floor(Math.random() * (i + 1))
                   
        var temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
}

// kun radio-inputtia vaihdetaan, niin se reagoi ja tallentaa sen väliaikaisesti nimiListaan. 
let nimiLista = ''
const radioNapit = document.querySelectorAll('input[name=luokka]')
radioNapit.forEach(button => {
    button.addEventListener('change', function() {
        if (this.checked) {
            const arvo = this.value

            for (let i = 0; i < luokatLista.length; i++)
                if (arvo === "newValue"+i) {
                    oppilasLista = [...luokatLista[i]]
                }
        }
        nimiLista = ""
        for (let i = 1; i < oppilasLista.length+1; i++){
            if (i % 4 == 0){
                nimiLista += oppilasLista[i-1] + ',<br>'
            } else {
                nimiLista += oppilasLista[i-1] + ', '
            }
            
        }
    })
})

// nappia painamalla nimilista siirretään jaettavaksi
document.querySelector('#lisaa_luokka').addEventListener('click', () => {
    document.querySelector('#oppilaslista').innerHTML = 'Luokka:<br>' + nimiLista
})

// tässä lisätään oppilaita, jotka voidaan jakaa ryhmiin tai tallentaa luokaksi
document.querySelector('#lisaa_oppilas').addEventListener('click', () => {
    
    const oppilas = document.querySelector('#oppilas')
    lisays = oppilas.value
    oppilasLista.push(lisays)

    oppilas.value = ''
    oppilas.focus()

    let nimiLista = ''
    for (let i = 1; i < oppilasLista.length+1; i++){
        if (i % 4 == 0){
            nimiLista += oppilasLista[i-1] + ',<br>'
        } else {
            nimiLista += oppilasLista[i-1] + ', '
        }
        
    }

    document.querySelector('#oppilaslista').innerHTML = 'Luokka:<br>' + nimiLista
})

// tämä tallentaa luokan localStorageen
document.querySelector('#talleta-välimuistiin').addEventListener('click', () => {
    const luokanNimi = document.querySelector(".luokan-nimi").value
    localStorage.setItem(luokanNimi, JSON.stringify(oppilasLista))
    console.log("käytiin")
    console.log(oppilasLista)
})

// arvotaan ryhmät sen mukaan, millaiseksi on haluttu ryhmäkoot. 
document.querySelector('#arvo').addEventListener('click', () => {
    let jaetutRyhmat = []
    let apuRyhma = []
    let ryhmaNro = 1
    const ryhmaKoko = document.querySelector('#ryhmakoko')
    const koko = ryhmaKoko.value
    sekoitettuLista = shuffleArray(oppilasLista)
    for (let i = 1; i < sekoitettuLista.length+1; i++){
        apuRyhma.push(' '+ sekoitettuLista[i-1])
        if (i % koko == 0){
            jaetutRyhmat.push('<br>'+'( Ryhmä '+ryhmaNro+':'+apuRyhma+')')
            apuRyhma = []
            ryhmaNro++
        }
    }
    if (apuRyhma.length >0){
        jaetutRyhmat.push('<br>'+'( Ryhmä '+ryhmaNro+':'+apuRyhma+')' + '<br>')
    }

    ryhmaKoko.value = ''
    ryhmaKoko.focus()

    document.querySelector('#jaetut_ryhmat').innerHTML = jaetutRyhmat
})

// jos ei olla tyytyväisiä arvonnan tuloksiin ja halutaan alottaa alusta, tyhjennetään paletti
document.querySelector('#tyhjennä').addEventListener('click', () => {
    document.querySelector('#oppilaslista').innerHTML = ''
    oppilasLista = []
    document.querySelector('#jaetut_ryhmat').innerHTML = ''
    jaetutRyhmat = []
    apuRyhma = []
})
