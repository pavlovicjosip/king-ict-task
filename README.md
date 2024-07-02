# Zadatak za posao Frontend Developera @KingICT 2024.

Projekt je kreiran pomoću Create React App (https://github.com/facebook/create-react-app).

## Skripte

Za pokretanje aplikacije potrebno je pokrenuti `npm run start`

## Dokumentacija

Arhitektura aplikacije je složena tako da raščlani aplikaciju na manje dijelove koji bi u budućnosti bili lakši za održavanje te kako bi se komponente mogle ekstraktirati i ponovno iskoristiti.
S obzirom da ova je aplikacija primjer online trgovine dovoljan je tradicionalni Monolit. Međutim,gledano u budućnost, odvajanjem komponenti i njihovih stilova unutar shared foldera, iste se mogu ekstraktirati u zaseban library koji bi se mogao koristiti u drugim projektima. Nastavno na to, nije isključiva ni opcija prebacivanja Monolita u MikroFrontend arhitekturu, gdje bi se primjerice aplikacija razdvojila na module kao što su Prikaz proizvoda, košarica, korisnički profil, platni sustav itd... U slučaju da nije nužno koristiti različite tehnologije te ako jedan tim radi na kompletnoj aplikaciji dovoljno je prebaciti Monolit u Monorepo (npr. Nx alat). Monorepo omogućava lakši razvoj jer se sve nalazi u jednom repozitoriju iako su svi moduli odvojeni i moguće ih je zasebno testirati i deployat.

Trenutna struktura aplikacije se dijeli na:

- pages: glavne stranice aplikacije gdje svaka predstavlja svoju rutu (Main, Login, Profil, Košarica itd..)
- components: komponente koje se koriste u projektu
- - shared: komponente koje se mogu koristiti na više mjesta u projektu, ne smiju sadržavati poslovnu logiku
-services: servisi zaduženi za nekakvu logiku kao što je npr. autentikacija ili komunikacija s backendom
- styles: potencijalni globalni stilovi za aplikaciju

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
