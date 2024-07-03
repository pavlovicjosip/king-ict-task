# Zadatak za posao Frontend Developera @KingICT 2024.

Projekt je kreiran pomoću Create React App (https://github.com/facebook/create-react-app).

## Skripte

Za pokretanje aplikacije potrebno je pokrenuti `npm run start`
Za pokretanje testova potrebno je pokrenuti `npm run test`
Za build aplikacije potrebno je pokrenuti `npm run build`

## Dokumentacija

Arhitektura aplikacije je složena tako da raščlani aplikaciju na manje dijelove koji bi u budućnosti bili lakši za održavanje te kako bi se komponente mogle ekstraktirati i ponovno iskoristiti.
S obzirom da ova je aplikacija primjer online trgovine u ovom trenutku je dovoljan tradicionalni Monolit. Međutim, gledano u budućnost, odvajanjem komponenti i njihovih stilova unutar shared foldera, iste se mogu ekstraktirati u zasebnu biblioteku koja bi se mogla koristiti u drugim projektima. Nastavno na to, nije isključiva ni opcija prebacivanja Monolita u MikroFrontend arhitekturu, gdje bi se primjerice aplikacija razdvojila na module kao što su Prikaz proizvoda, košarica, korisnički profil, platni sustav itd... U slučaju da nije nužno koristiti različite tehnologije te ako jedan tim radi na kompletnoj aplikaciji dovoljno bi bilo prebaciti Monolit u Monorepo (npr. jedan od alata koji to rade je Nx ). Monorepo omogućava lakši razvoj jer se sve nalazi u jednom repozitoriju iako su svi moduli odvojeni i moguće ih je zasebno testirati i deployat.

Trenutna struktura aplikacije se dijeli na:

- pages: glavne stranice aplikacije gdje svaka predstavlja svoju rutu (Main, Login, Profil, Košarica itd..)
- components: komponente koje se koriste u projektu
- - shared: komponente koje se mogu koristiti na više mjesta u projektu, ne smiju sadržavati poslovnu logiku
-services: servisi zaduženi za nekakvu logiku kao što je npr. autentikacija ili komunikacija s backendom
- styles: potencijalni globalni stilovi za aplikaciju




Prikaz strukture:
![image](https://github.com/pavlovicjosip/king-ict-task/assets/26819142/41a1a5e1-3079-4598-8604-ba3a4ecee7de)



Za dizajn komponenti sam koristio Bootstrap te sam neke od komponenti prebacio u zasebne wrapper komponente kako bi se mogle dodatno stilizirati i prilagoditi potrebama projekta. Iz tog razloga kompoenente koje se mogu ponovno koristiti imaju prefix King.
Osobno smatram da, ukoliko projekt iziskuje visoku jedinstvenost dizajna, ne bi trebali koristiti biblioteke kao što su Bootstrap, MaterialUI jer nisu namjenjeni velikom "overridanju" stilova te dolazi vrlo lako do konflikata u stilovima. U tom slučaju bi trebalo komponenete raditi iz početka te kreirati vlastiti dizajn sistem.

Aplikacija vizualno izgleda ovako:
- prikaz shopa koji sadrži kontrole te prikaz produkta. Svaki produkt je ista komponenta kartice koja se prilagođava podatcima. Svaka kartica ima dodavanje u košaricu, odabir količine, gumb detalji za prikaz detalja, prikaz ocjene te cijena.
- druga slika je prikaz kada se prozor suzi na manju širinu gdje gumb "Filteri" omogućava otvaranje modala s istim kontrolama koje su bile na lijevoj strani. Također, to je ista komponenta.
![image](https://github.com/pavlovicjosip/king-ict-task/assets/26819142/6a910856-e615-4b13-8eae-7e2bae656321)

![image](https://github.com/pavlovicjosip/king-ict-task/assets/26819142/3226406a-d9cf-40f5-bc09-271424c43487)


S lijeve strane su kontrole koje se prilikom sužavanja 






Dodatne stvari:

- models: refaktor aplikacije kako bi se koristio typescript umjesto javascripta te kako bi se mogli definirati modeli ili interfejsi za svaku komponentu koja ih koristi. Na taj način osiguravamo da se koriste tipovi podataka koji postoje (primjerice pri komunikaciji s backendom) te se smanjuje vjerojatnost pogreške programera.

- Primjer interfejsa Producta:

```typescript
const Product{
  title:string;
  quantity:number;
  image:string;
  ...
}

```

Osiguranje kvalitete koda:
- nastavno na greške u developmentu, dobra odluka bi bila koristiti eslint bibilioteku koja forsira ispravno pisanje koda. Definira se pravilima u konfiguracijskoj datoteci na globalnoj razini aplikacije.
- primjer nekih od pravila bi bili:
  -- osiguranje da svaka metoda vraća određeni tip podataka ili "void"
  -- osiguranje da se nekorišteni importi izbace iz koda
  -- osiguranje da ne postoji "any" kao tip podataka, nego da se uvijek mora definirati pravi tip.




## Sigurnost i zaštita podataka

Neke od mjera koje bi trebali koristiti su:

- Instaliranje SSL/TLS certifikata na serveru kako bi se koristio HTTPS umjesto HTTP-a.
- Enkripcija osjetljivih podataka u bazi podataka, moguće je koristiti neke od algoritama kao što su AES itd..
- Lozinke bi uvijek trebale biti hashirane unutar baze umjesto spremane kao tekst. Ako je potrebno uz hashiranje se koristi i "salt" za dodatnu sigurnost.
- Unutar aplikacije je potrebno postaviti zaštitu na rute koje ne želimo prikazati anonimnim korisnicima. U Angularu se za to koriste "Guardovi", dok u Reactu je moguće napraviti wrapper kao što je ProtectedRoute kojeg možete vidjeti u projektu pod servisima.
- Za prijavu korisnika je dobro koristiti JWT token kojeg sam i koristio unutar aplikacije, implementacija je u servisima. Bolja stvar od trenutne implementacije s lokalnom memorijom bi bila korištenje kolačića jer su manje ranjivi od XSS napada.
- Za osiguranje od napada kao što su XSS ili CSRF dobro je koristiti neke od biblioteka kao što su DOMPurify s kojim možemo sanitizirati korisničke unose tako da unos, koji je potencijalno maliciozni JS kod, pretvorimo u običan tekstualni format.
- Dodatni alat koji se može koristiti je 2FA autentikacija koja omogućuje dodatni sloj verifikacije (npr. autentikator na mobitelu).
- Iako nije strogo povezano za frontend dio, na bazi protiv SQL injection napada je dobro koristiti "prepared statements" koji su odvojene naredbe od korisničkog unosa ili parametrizirane upite.

  
-- 


