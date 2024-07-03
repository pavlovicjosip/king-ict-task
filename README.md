# Zadatak za posao Frontend Developera @KingICT 2024.

Projekt je kreiran pomoću Create React App (https://github.com/facebook/create-react-app).

## Skripte

- Za pokretanje aplikacije potrebno je pokrenuti `npm run start`
- Za pokretanje testova potrebno je pokrenuti `npm run test`
- Za build aplikacije potrebno je pokrenuti `npm run build`



## Dokumentacija

>[!NOTE]
>Za prijavu u aplikaciju možete koristiti npr. korisničko ime: emilys i lozinku: emilyspass , dostupni su i ostali korisnici s portala dummyjson


>[!WARNING]
>Za neke riječi u dokumentaciji koristim engleski jezik jer nemaju adekvatan prijevod. Kod je pisan s engleskim nazivima varijabli, metoda iz razloga što je to bolja praksa radi održavanja i konvencije programiranja.
>UI aplikacije je postavljen na hrvatski jezik isključivo iz razloga što se prijavljujem u firmu koja radi s hrvatskim produktima. 
>Vrlo lako se može dodati i višejezičnost ukoliko je potrebno te to možemo raspraviti.

Arhitektura aplikacije je složena tako da raščlani aplikaciju na manje dijelove koji bi u budućnosti bili lakši za održavanje te kako bi se komponente mogle ekstraktirati i ponovno iskoristiti.
S obzirom da ova je aplikacija primjer online trgovine u ovom trenutku je dovoljan tradicionalni Monolit. Međutim, gledano u budućnost, odvajanjem komponenti i njihovih stilova unutar shared foldera, iste se mogu ekstraktirati u zasebnu biblioteku koja bi se mogla koristiti u drugim projektima. Nastavno na to, nije isključiva ni opcija prebacivanja Monolita u MikroFrontend arhitekturu, gdje bi se primjerice aplikacija razdvojila na module kao što su Prikaz proizvoda, košarica, korisnički profil, platni sustav itd... U slučaju da nije nužno koristiti različite tehnologije te ako jedan tim radi na kompletnoj aplikaciji dovoljno bi bilo prebaciti Monolit u Monorepo (npr. jedan od alata koji to rade je Nx). Monorepo omogućava lakši razvoj jer se sve nalazi u jednom repozitoriju iako su svi moduli odvojeni i moguće ih je zasebno testirati i deployat.

Trenutna struktura aplikacije se dijeli na:

- pages: glavne stranice aplikacije gdje svaka predstavlja svoju rutu (Main, Login, Profil, Košarica itd..)
- components: komponente koje se koriste u projektu
-- shared: komponente koje se mogu koristiti na više mjesta u projektu, ne smiju sadržavati poslovnu logiku
- services: servisi zaduženi za nekakvu logiku kao što je npr. autentikacija ili komunikacija s backendom
- styles: potencijalni globalni stilovi za aplikaciju




Prikaz strukture:

![image](https://github.com/pavlovicjosip/king-ict-task/assets/26819142/41a1a5e1-3079-4598-8604-ba3a4ecee7de)



Za dizajn komponenti sam koristio Bootstrap bibilioteku te sam neke od komponenti prebacio u zasebne wrapper komponente kako bi se mogle dodatno stilizirati i prilagoditi potrebama projekta. Iz tog razloga komponente koje se mogu ponovno koristiti imaju prefix King.
Osobno smatram da, ukoliko projekt iziskuje visoku jedinstvenost dizajna, ne bi trebali koristiti biblioteke kao što su Bootstrap, MaterialUI jer nisu namjenjeni "overridanju" stilova te dolazi vrlo lako do konflikta u stilovima. U tom slučaju bi trebalo komponente raditi ispočetka te kreirati vlastiti dizajn sistem.

Aplikacija vizualno izgleda ovako:
- prikaz shopa koji sadrži kontrole te prikaz produkta. Svaki produkt je ista komponenta kartice koja se prilagođava podatcima. Svaka kartica ima dodavanje u košaricu, odabir količine, gumb detalji za prikaz detalja, prikaz ocjene te cijena.

![image](https://github.com/pavlovicjosip/king-ict-task/assets/26819142/6a910856-e615-4b13-8eae-7e2bae656321)

- prikaz kada se prozor suzi na manju širinu gdje gumb "Filteri" omogućava otvaranje modala s istim kontrolama koje su bile na lijevoj strani. Također, to je ista komponenta.

![image](https://github.com/pavlovicjosip/king-ict-task/assets/26819142/3226406a-d9cf-40f5-bc09-271424c43487)

- prikaz prozora za prijavu

![image](https://github.com/pavlovicjosip/king-ict-task/assets/26819142/ffb9bd9f-b9ce-408d-a85f-e2966f81097d)


- prikaz prozora kad je unešen neispravan korisnik

![image](https://github.com/pavlovicjosip/king-ict-task/assets/26819142/4ce13d29-2265-4c2f-970c-044cf26626cf)

Prijaviti se možete kao netko od korisnika ili portalu pristupiti kao anonimni korisnik.

U oba slučaja radi dodavanje u košaricu koje izgleda kao na slici. Omogućeno je editiranje količine i micanje iz košarice te se na kraju sve zbraja i oduzima pod "Ukupno". Na gumb "Kupi" nažalost nećete moći kupiti ništa.

![image](https://github.com/pavlovicjosip/king-ict-task/assets/26819142/ab6cc17f-6a34-4a4f-a7b2-3c71c76a2a60)




##  Dodatne stvari:

- dodavanje folder za modele: refaktor aplikacije kako bi se koristio typescript umjesto javascripta te kako bi se mogli definirati modeli ili interfejsi za svaku komponentu koja ih koristi. Na taj način osiguravamo da se koriste tipovi podataka koji postoje (primjerice pri komunikaciji s backendom) te se smanjuje vjerojatnost pogreške programera.

- Primjer interfejsa Producta:

```typescript
const Product{
  title:string;
  quantity:number;
  image:string;
  ...
}

```

## Osiguranje kvalitete koda:
- Testiranje koda sam prikazao u jednom testu pod ShoopingCart.test.js. jer nemam vremena sve pokriti testovima u ovom trenutku. Osobno sam mišljenja da bi pokrivenost UNIT testova trebala iznositi između 60% i 80% iz razloga što je to dovoljno da se osigura kvaliteta koda dok sve više od toga mislim da je gubitak vremena jer postoje metode koje nema smisla testirati. Također testiranje aplikacije ne bi trebalo stati na testiranju koda nego bi, ukoliko postoji, QA odjel trebao dodatno testirati ponašanje aplikacije (manualno ili automatizirano testiranje).
- nastavno na greške u developmentu, dobra odluka bi bila koristiti Eslint bibilioteku koja forsira ispravno pisanje koda. Definira se pravilima u konfiguracijskoj datoteci na globalnoj razini aplikacije.
- primjer nekih od pravila bi bili:
  -- osiguranje da svaka metoda vraća određeni tip podataka ili ne vraća ništa ("void").
  -- osiguranje da se nekorišteni importi izbace iz koda.
  -- osiguranje da ne postoji "any" kao tip podataka, nego da se uvijek mora definirati pravi tip.




## Sigurnost i zaštita podataka

Neke od mjera koje bi trebali koristiti su:

- Instaliranje SSL/TLS certifikata na serveru kako bi se koristio HTTPS umjesto HTTP-a.
- Enkripcija osjetljivih podataka u bazi podataka, moguće je koristiti neke od algoritama kao što su AES itd...
- Lozinke bi uvijek trebale biti hashirane unutar baze umjesto spremane kao tekst. Ako je potrebno uz hashiranje se koristi i "salt" za dodatnu sigurnost.
- Unutar aplikacije je potrebno postaviti zaštitu na rute koje ne želimo prikazati anonimnim korisnicima. U Angularu se za to koriste "Guardovi", dok u Reactu je moguće napraviti wrapper kao što je ProtectedRoute kojeg možete vidjeti u projektu pod servisima.
- Za prijavu korisnika je dobro koristiti JWT token kojeg sam i koristio unutar aplikacije, implementacija je u servisima. Bolja stvar od trenutne implementacije s lokalnom memorijom bi bila korištenje kolačića jer su manje ranjivi od XSS napada.
- Za osiguranje od napada kao što su XSS ili CSRF dobro je koristiti neke od biblioteka kao što su DOMPurify s kojim možemo sanitizirati korisničke unose tako da unos, koji je potencijalno maliciozni JS kod, pretvorimo u običan tekstualni format.
- Dodatni alat koji se može koristiti je 2FA autentikacija koja omogućuje dodatni sloj verifikacije (npr. autentikator na mobitelu).
- Iako nije strogo povezano za frontend dio, na bazi protiv SQL injection napada je dobro koristiti "prepared statements" koji su odvojene naredbe od korisničkog unosa ili parametrizirane upite.

  
## CI/CD

U ovom trenutku postoji više tehnologija koje omogućavaju proces naseljavanja na produkcijske ili testne servere. Okvirni koraci koji se koriste neovisno o tehnologiji bi bili:

1. Commit promjena na repozitorij kao što je Github.
2. Okidanje CI pipelinea na commitu gdje se povlače nove promjene.
3. Instaliranje ovisnosti unutar projekta (dependecies), pokreće se ```npm install```
4. Pokretanje UNIT testova (za nastavak koraka svi testovi bi trebali proći)
5. Build aplikacije, pokreće se ```npm build``` koji pakira aplikaciju i stvara verziju koja je spremna za naseljavanje.
6. Naseljavanje na testne servere gdje postoje dodatna testiranja van aplikacije.
7. Naseljavanje na produkciju ili dedicirani server.

U slučaju Githuba, ovi koraci se mogu definirati unutat Github Actionsa tj. github yml datoteke. Primjer je slika ispod koja je preuzeta s docs.github.com

![image](https://github.com/pavlovicjosip/king-ict-task/assets/26819142/b8241fa8-900f-4f21-8432-4bd29afa72e2)





