# What I Learned — Situation Monitor Project Reflection

**Date:** 2026-05-27
**Version:** v2.3.4
**Author:** Jussi Mäntynен

---

## 🇬🇧 English

### Technical Learning

There had been a gap of over 15 years since the last time I wrote code seriously. We reached a fully production-ready result in four days — including four forced pauses when the context window ran out and the session had to be restarted. The tooling on Claude's side, GitHub, and Dropbox worked seamlessly together. I would not have believed it possible.

The most accurate description I have is this: Jean-Luc Picard's Holodeck arrived on 27 May 2026. We coded everything from the couch, giving feedback by taking photos of the screen with an iPhone. That is not a metaphor. That is what happened.

I started with a VIC-20. Games had to be typed in by hand from POKE and PEEK listings in the back pages of a magazine before you could play them with the neighbour's kid on your own machine. The distance from that moment to this one is difficult to overstate.

---

### AI Collaboration

I started with Grok. Grok itself suggested Claude and said it was the right direction for my use case. I now use both, primarily from iOS. The future is going to be remarkable.

What surprised me most: the collaboration got better with every iteration. The first sessions were exploratory. By the end, we had a shared language, a shared process, and a shared understanding of what quality looks like. That kind of calibration usually takes weeks with a new human colleague. Here it happened within hours.

The next hardware step is a Mac Mini with Claude running 24/7/365. The fact that this is now a meaningful sentence — that a single person with a phone and a cloud account can reach this level in under a week — is something I would not have predicted even six months ago.

---

### Process and Quality

This way of working maps directly onto everything I have done in the last 20 years — except that all the potholes feel like they have been filled in. The hallucinations, the forgetting, the shortcuts I anticipated: they all happened exactly as expected. But we automated around all of them.

The pattern is the same as always: start with versioning, design for scalability from day one, verify every implementation, and regression-test everything. AI always tries to guess, help, and shortcut — which means it interprets rather than executes. That is where the human judgment sits.

My Nokia system-testing skills — years of validating C++ against real user behaviour in a lab — turned out to be exactly the right background for 2026. The most valuable thing a human brings to an AI-assisted project is not the ability to write code. It is the ability to know when the output is wrong, and to have built the scaffolding that catches it automatically.

---

### TPM / PM / BDM Perspective

All three roles converged in this project, exactly as I believe they will converge across the industry. Understanding the end user's need, developing the narrative from that need, and then having an AI execute the implementation — that is not a future scenario. That is what we did.

The team of the future may well be: one TPM/PM/BDM person and a Claude-scale AI equivalent to 1–100 engineers. The human brings the why. The AI brings the how. The human stays accountable for the result.

---

### If I Started Again

I would have started six months earlier.

I want to thank a few friends who suggested exactly that — they know who they are. Thank you.

---

## 🇫🇮 Suomi (alkuperäinen)

### Tekninen oppiminen

Edellisestä koodauksesta oli yli 15 vuotta taukoa, mutta neljässä päivässä pääsimme täysin maaliin — sisältäen neljä pakotettua taukoa kun konteksti-ikkuna täyttyi ja sessio piti aloittaa alusta. Clauden, GitHubin ja Dropboxin työkalut toimivat saumattomasti yhteen. En olisi voinut uskoa tätä mahdolliseksi.

Paras kuvaus on tämä: Jean-Luc Picardin Holodeck saapui 27.5.2026. Koodasimme kaiken sohvalta, antaen palautetta ottamalla kuvia näytöstä iPhonella. Se ei ole vertauskuva. Se on mitä tapahtui.

Aloitin VIC-20:llä. Pelit piti kirjoittaa käsin POKE ja PEEK -komennoista lehden takasivuilta ennen kuin pääsi pelaamaan naapurin pojan kanssa omalla koneellaan. Matka siitä hetkestä tähän on vaikea liioitella.

### AI-yhteistyö

Aloitin Grokilla. Grok itse ehdotti Claudea ja sanoi, että se on oikea suunta minun tapauksessani. Käytän molempia nyt, pääasiassa iOS:ltä. Tulevaisuus tulee olemaan huikea.

Suurin yllätys: yhteistyö parani jokaisen iteraation myötä. Ensimmäiset sessiot olivat tutkivia. Loppuun mennessä meillä oli yhteinen kieli, yhteinen prosessi ja yhteinen ymmärrys siitä mitä laatu tarkoittaa. Tällainen kalibrointi vie yleensä viikkoja uuden ihmiskollegion kanssa. Tässä se tapahtui tunneissa.

Seuraava askel on Mac Mini, johon Claude asennetaan pyörimään 24/7/365. Se, että tämä on nyt merkityksellinen lause — että yksi ihminen puhelimella ja pilvipalveluilla pääsee tälle tasolle alle viikossa — on jotain mitä en olisi ennustanut edes puoli vuotta sitten.

### Prosessi ja laatu

Tämä toimintamalli vastaa täysin sitä mitä olen tehnyt 20 viimeistä vuotta — paitsi että kaikki kuopat tuntuvat olevan tasoitettu. Oletin hallusinaatiot, unohtamisen ja oikaisuyritykset — ne tapahtuivat juuri kuten oletin. Mutta saimme kaiken automatisoitua.

Kaava on sama kuin aina: aloita versioinnista, suunnittele skaalautuvuus heti alusta, verifioi jokainen implementaatio, testaa regressiot automaattisesti. AI koittaa aina arvata, auttaa ja oikaista — joka tarkoittaa, että se tulkitsee eikä toteuta. Siinä ihmisen harkinta istuu.

Nokia-järjestelmätestaustaidot — vuosia C++-koodin validointia laboratoriossa oikeana käyttäjänä — osoittautuivat juuri oikeaksi taustaksi vuodelle 2026. Arvokkain asia jonka ihminen tuo AI-avusteiseen projektiin ei ole kyky kirjoittaa koodia. Se on kyky tietää milloin lopputulos on väärä — ja olla rakentanut automaatio joka sen kaappaa.

### TPM / PM / BDM -näkökulma

Kaikki kolme roolia sulautuivat yhteen tässä projektissa, aivan kuten uskon niiden sulautuvan koko toimialalla. Loppukäyttäjän tarpeen ymmärtäminen, narratiivin kehittäminen siitä tarpeesta, ja sitten AI toteuttaa implementoinnin — tämä ei ole tulevaisuuden skenaario. Tämä on mitä teimme.

Tulevaisuuden tiimi voi hyvin olla: yksi TPM/PM/BDM-kaveri ja Claude-tason AI joka vastaa 1–100 insinööriä. Ihminen tuo miksi. AI tuo miten. Ihminen kantaa vastuun tuloksesta.

### Jos aloittaisit uudelleen

Olisin aloittanut jo 6 kuukautta aikaisemmin.

Haluan kiittää muutamaa ystävää jotka ehdottivat juuri sitä — he tietävät ketä he ovat. Kiitos.
