# Web-sivusto harjoitustyönä

Sivustojen idea lähti kokemuksestani opettajana ala-asteella. Loin sivustopohjan, johon voi kerätä linkkejä opettajan työtä varten sekä omia webpohjaisia minisovelluksia, 
joista voisi olla jotain apua ala-asteen opettajan työssä. Nyt kehittelin sanasokkelosovelluksen, ristikkosovelluksen ja ryhmäjakosovelluksen. Etusivulle laitoin säätiedot
nykyhetkesstä sekä pari päivää tulevaisuuteen. Sää tietojen hakemiseen tarvitaan Api-avain, joka tulee lisätä functions.js-tiedoston riville 30. 

### Sanasokkelu

Sovelluksessa ensin määritellään haluttu rivien ja sarakkeiden määrät. Rivit ja sarakkeet voi asettaa joko Enter-painikkeella tai asetus-napista. Tämän jälkeen litään sanasokkeloon
halutut sanat, joka lisätään kirjoituksen jälkeen Enter-painikkeella. Kun ollaan tyytyväisiä sanamäärään, luodaan sanasokkelo Tee sanat-painikkeella. Tämän jälkeen vielä voidaan 
valita millainen saateteksti laitetaan kuvaan. Joko ilman apuja tai kuinka monta sanaa on löydettävissä tai lista sanoista, jotka sokkelosta tulisi löytää. Tehtävän voi ladata 
kuvaksi, jonka jälkeen se on helppo tulostaa oppilaalle tehtäväksi. 

### Ristikko

Sovellukseen määritellään ensin sana ja tälle sanalle jokin selitys. Kun sana ja selitys on kirjoitettu, nämä vahvistetaan Enter-painikkeella. Kun on haluttu määrä sanoja, painetaan 
näytä pystysanat-nappia, jolloin se näyttää kaikki vaihtoehdot pystysanojen tekemiseen. Mikäli et ole tyytyväinen pystysanoihin, niin sekoita ristikko uudestaan, jolloin
sovellus asettaa sanat erijärjestykseen ja tulee eri vaihtoehdot pystysanoille. Valitse haluttu pystysana ja esikatsele ristikkoa. Tämän jälkeen voit vielä sekoittaa ristikon
uudestaan. Kun olet tyytyväinen ristikkoon, niin valmista tyhjä ristikko ja voit ladata sen myös kuvaksi, josta se on helppo tulostaa tehtäväksi.

### Ryhmäjako

Ryhmäjakosovelluksen ideana on arpoa omasta luokasta halutun kokoisia ryhmiä. Sovelluksessa lisätään kaikkien oppilaiden nimet. Nämä muodostuvat listaksi, josta voi arpoa halutun
kokoisia ryhmiä. Aluksi käsin kirjoitetun luokan voi tallentaa sivustodataan eli local storageen. Tallennus täytyy tehdä nimellä luokka1, luokka2 jne. jotta sen lataaminen myöhemmin
onnistuu. Jos talletuksia on tehty, voit sovelluksessa valita jo valmiin luokan ja tehdä siitä ryhmäjaksoarvonnat. 
